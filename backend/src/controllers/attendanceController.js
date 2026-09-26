const { z } = require('zod');
const { prisma, fallbackStore, getIsPrismaConnected, recordAdminActivity, getAdminInfoFromReq } = require('../config/db');

const markAttendanceSchema = z.object({
  batch_id: z.string(),
  date: z.string(), // YYYY-MM-DD
  records: z.array(
    z.object({
      student_id: z.string(),
      status: z.enum(['present', 'absent', 'late']),
      remarks: z.string().optional(),
    })
  ),
});

/**
 * Mark attendance for an entire batch on a specific date
 */
async function markBatchAttendance(req, res, next) {
  try {
    const { batch_id, date, records } = markAttendanceSchema.parse(req.body);
    const dateObj = new Date(date);
    const isDb = getIsPrismaConnected();
    const adminInfo = getAdminInfoFromReq(req);

    if (isDb && prisma) {
      const results = [];
      for (const rec of records) {
        const item = await prisma.attendance.upsert({
          where: {
            student_id_batch_id_date: {
              student_id: rec.student_id,
              batch_id,
              date: dateObj,
            },
          },
          update: {
            status: rec.status,
            remarks: rec.remarks || null,
          },
          create: {
            student_id: rec.student_id,
            batch_id,
            date: dateObj,
            status: rec.status,
            remarks: rec.remarks || null,
          },
        });
        results.push(item);
      }

      await recordAdminActivity({
        ...adminInfo,
        action: 'MARK_ATTENDANCE',
        entity_type: 'attendance',
        entity_id: batch_id,
        title: 'Batch Attendance Marked',
        details: `Logged attendance for ${results.length} students on date ${date}`,
      });

      return res.status(200).json({
        success: true,
        data: results,
        message: `Attendance marked for ${results.length} students on ${date}.`,
      });
    } else {
      const dateStr = date.split('T')[0];
      const results = [];

      for (const rec of records) {
        const existingIdx = fallbackStore.attendances.findIndex(
          a => a.student_id === rec.student_id && a.batch_id === batch_id && a.date === dateStr
        );

        if (existingIdx !== -1) {
          fallbackStore.attendances[existingIdx].status = rec.status;
          fallbackStore.attendances[existingIdx].remarks = rec.remarks || null;
          results.push(fallbackStore.attendances[existingIdx]);
        } else {
          const newAtt = {
            id: `att-${Date.now()}-${Math.random().toString(36).substring(7)}`,
            student_id: rec.student_id,
            batch_id,
            date: dateStr,
            status: rec.status,
            remarks: rec.remarks || null,
            created_at: new Date(),
          };
          fallbackStore.attendances.push(newAtt);
          results.push(newAtt);
        }
      }

      await recordAdminActivity({
        ...adminInfo,
        action: 'MARK_ATTENDANCE',
        entity_type: 'attendance',
        entity_id: batch_id,
        title: 'Batch Attendance Marked',
        details: `Logged attendance for ${results.length} students on date ${dateStr}`,
      });

      return res.status(200).json({
        success: true,
        data: results,
        message: `Attendance recorded for ${results.length} students on ${dateStr}.`,
      });
    }
  } catch (error) {
    next(error);
  }
}


/**
 * Bulk upload attendance via CSV data
 * Accepts JSON array parsed from CSV or raw CSV lines: student_email, batch_id, date, status, remarks
 */
async function bulkUploadCSV(req, res, next) {
  try {
    const { csvData, rows } = req.body;
    let parsedRows = rows;

    if (!parsedRows && csvData) {
      // Parse plain CSV text
      const lines = csvData.trim().split(/\r?\n/);
      const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
      parsedRows = lines.slice(1).map(line => {
        const parts = line.split(',').map(p => p.trim());
        const row = {};
        headers.forEach((h, i) => {
          row[h] = parts[i];
        });
        return row;
      });
    }

    if (!parsedRows || !Array.isArray(parsedRows) || parsedRows.length === 0) {
      return res.status(400).json({
        success: false,
        data: null,
        message: 'No valid attendance rows provided in CSV upload.',
      });
    }

    const isDb = getIsPrismaConnected();
    let processed = 0;

    for (const row of parsedRows) {
      const email = row.email || row.student_email;
      const studentId = row.student_id;
      const batchId = row.batch_id;
      const dateStr = row.date || new Date().toISOString().split('T')[0];
      const status = (row.status && ['present', 'absent', 'late'].includes(row.status.toLowerCase()))
        ? row.status.toLowerCase()
        : 'present';
      const remarks = row.remarks || 'CSV import';

      if (isDb && prisma) {
        let student;
        if (studentId) {
          student = await prisma.user.findUnique({ where: { id: studentId } });
        } else if (email) {
          student = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
        }
        if (!student) continue;

        let bId = batchId;
        if (!bId) {
          const enr = await prisma.enrollment.findFirst({ where: { student_id: student.id } });
          bId = enr?.batch_id;
        }
        if (!bId) continue;

        await prisma.attendance.upsert({
          where: {
            student_id_batch_id_date: {
              student_id: student.id,
              batch_id: bId,
              date: new Date(dateStr),
            },
          },
          update: { status, remarks },
          create: {
            student_id: student.id,
            batch_id: bId,
            date: new Date(dateStr),
            status,
            remarks,
          },
        });
        processed++;
      } else {
        let student;
        if (studentId) {
          student = fallbackStore.users.find(u => u.id === studentId);
        } else if (email) {
          student = fallbackStore.users.find(u => u.email.toLowerCase() === email.toLowerCase());
        }
        if (!student) continue;

        let bId = batchId;
        if (!bId) {
          const enr = fallbackStore.enrollments.find(e => e.student_id === student.id);
          bId = enr?.batch_id;
        }
        if (!bId) continue;

        const d = dateStr.split('T')[0];
        const existingIdx = fallbackStore.attendances.findIndex(
          a => a.student_id === student.id && a.batch_id === bId && a.date === d
        );

        if (existingIdx !== -1) {
          fallbackStore.attendances[existingIdx].status = status;
          fallbackStore.attendances[existingIdx].remarks = remarks;
        } else {
          fallbackStore.attendances.push({
            id: `att-csv-${Date.now()}-${Math.random().toString(36).substring(7)}`,
            student_id: student.id,
            batch_id: bId,
            date: d,
            status,
            remarks,
            created_at: new Date(),
          });
        }
        processed++;
      }
    }

    await recordAdminActivity({
      ...adminInfo,
      action: 'UPLOAD_ATTENDANCE_CSV',
      entity_type: 'attendance',
      title: 'Imported Attendance CSV',
      details: `Imported ${processed} attendance records via CSV spreadsheet upload`,
    });

    return res.status(200).json({
      success: true,
      data: { processedRows: processed },
      message: `Successfully imported ${processed} attendance records via CSV.`,
    });

  } catch (error) {
    next(error);
  }
}

/**
 * Get attendance for a batch on a given date
 */
async function getBatchAttendanceByDate(req, res, next) {
  try {
    const { batch_id, date } = req.query;
    if (!batch_id || !date) {
      return res.status(400).json({
        success: false,
        data: null,
        message: 'Both batch_id and date query parameters are required.',
      });
    }

    const isDb = getIsPrismaConnected();
    const dateStr = date.split('T')[0];

    if (isDb && prisma) {
      const records = await prisma.attendance.findMany({
        where: {
          batch_id,
          date: new Date(dateStr),
        },
        include: {
          student: {
            select: { id: true, name: true, email: true, profile_photo_url: true },
          },
        },
      });

      return res.status(200).json({
        success: true,
        data: records,
        message: 'Batch attendance retrieved.',
      });
    } else {
      const records = fallbackStore.attendances
        .filter(a => a.batch_id === batch_id && a.date === dateStr)
        .map(a => {
          const student = fallbackStore.users.find(u => u.id === a.student_id);
          return {
            ...a,
            student: student ? { id: student.id, name: student.name, email: student.email, profile_photo_url: student.profile_photo_url } : null,
          };
        });

      return res.status(200).json({
        success: true,
        data: records,
        message: 'Batch attendance retrieved.',
      });
    }
  } catch (error) {
    next(error);
  }
}

/**
 * Get Student attendance history
 */
async function getStudentAttendance(req, res, next) {
  try {
    const student_id = req.params.student_id || req.user.id;
    const isDb = getIsPrismaConnected();

    if (isDb && prisma) {
      const records = await prisma.attendance.findMany({
        where: { student_id },
        include: { batch: { select: { id: true, name: true } } },
        orderBy: { date: 'desc' },
      });

      const total = records.length;
      const present = records.filter(r => r.status === 'present').length;
      const late = records.filter(r => r.status === 'late').length;
      const absent = records.filter(r => r.status === 'absent').length;
      const pct = total > 0 ? Math.round(((present + late * 0.5) / total) * 100) : 100;

      return res.status(200).json({
        success: true,
        data: {
          records,
          stats: { total, present, late, absent, attendancePercentage: pct },
        },
        message: 'Student attendance retrieved.',
      });
    } else {
      const records = fallbackStore.attendances
        .filter(a => a.student_id === student_id)
        .map(a => ({
          ...a,
          batch: fallbackStore.batches.find(b => b.id === a.batch_id) || { name: 'Bharatanatyam Core' },
        }))
        .sort((a, b) => new Date(b.date) - new Date(a.date));

      const total = records.length;
      const present = records.filter(r => r.status === 'present').length;
      const late = records.filter(r => r.status === 'late').length;
      const absent = records.filter(r => r.status === 'absent').length;
      const pct = total > 0 ? Math.round(((present + late * 0.5) / total) * 100) : 92;

      return res.status(200).json({
        success: true,
        data: {
          records,
          stats: { total, present, late, absent, attendancePercentage: pct },
        },
        message: 'Student attendance retrieved.',
      });
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  markBatchAttendance,
  bulkUploadCSV,
  getBatchAttendanceByDate,
  getStudentAttendance,
};
