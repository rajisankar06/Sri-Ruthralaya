const bcrypt = require('bcryptjs');
const { z } = require('zod');
const { prisma, fallbackStore, getIsPrismaConnected } = require('../config/db');

const studentCreateSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  batch_id: z.string().optional(),
  status: z.enum(['pending', 'active', 'inactive']).default('active'),
  profile_photo_url: z.string().optional(),
});

/**
 * Get all students (Admin/Staff only)
 */
async function getAllStudents(req, res, next) {
  try {
    const { status, batch_id, search } = req.query;
    const isDb = getIsPrismaConnected();

    if (isDb && prisma) {
      const where = {
        role: 'student',
      };
      if (status) where.status = status;
      if (search) {
        where.OR = [
          { name: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
          { phone: { contains: search, mode: 'insensitive' } },
        ];
      }

      let students = await prisma.user.findMany({
        where,
        include: {
          enrollments: {
            include: {
              batch: true,
            },
          },
          fees: {
            orderBy: { due_date: 'desc' },
            take: 2,
          },
          attendances: {
            take: 30,
          },
        },
        orderBy: { created_at: 'desc' },
      });

      if (batch_id) {
        students = students.filter(s => s.enrollments.some(e => e.batch_id === batch_id));
      }

      // Format with attendance % and fee status
      const formatted = students.map(s => {
        const totalAtt = s.attendances.length;
        const presentAtt = s.attendances.filter(a => a.status === 'present').length;
        const attendancePct = totalAtt > 0 ? Math.round((presentAtt / totalAtt) * 100) : 100;
        const activeBatch = s.enrollments[0]?.batch || null;
        const latestFee = s.fees[0] || null;

        return {
          id: s.id,
          name: s.name,
          email: s.email,
          phone: s.phone,
          status: s.status,
          profile_photo_url: s.profile_photo_url,
          created_at: s.created_at,
          batch: activeBatch ? { id: activeBatch.id, name: activeBatch.name, level: activeBatch.level } : null,
          attendancePct,
          feeStatus: latestFee ? latestFee.status : 'paid',
        };
      });

      return res.status(200).json({
        success: true,
        data: formatted,
        message: 'Students list fetched successfully.',
      });
    } else {
      // Fallback
      let list = fallbackStore.users.filter(u => u.role === 'student');
      if (status) list = list.filter(u => u.status === status);
      if (search) {
        const q = search.toLowerCase();
        list = list.filter(u => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || (u.phone && u.phone.includes(q)));
      }

      const formatted = list.map(s => {
        const enrs = fallbackStore.enrollments.filter(e => e.student_id === s.id);
        const batch = enrs.length > 0 ? fallbackStore.batches.find(b => b.id === enrs[0].batch_id) : null;
        const atts = fallbackStore.attendances.filter(a => a.student_id === s.id);
        const present = atts.filter(a => a.status === 'present').length;
        const attendancePct = atts.length > 0 ? Math.round((present / atts.length) * 100) : 92;
        const studentFees = fallbackStore.fees.filter(f => f.student_id === s.id);
        const latestFee = studentFees[studentFees.length - 1];

        return {
          id: s.id,
          name: s.name,
          email: s.email,
          phone: s.phone,
          status: s.status,
          profile_photo_url: s.profile_photo_url,
          created_at: s.created_at,
          batch: batch ? { id: batch.id, name: batch.name, level: batch.level } : null,
          attendancePct,
          feeStatus: latestFee ? latestFee.status : 'paid',
        };
      });

      if (batch_id) {
        return res.status(200).json({
          success: true,
          data: formatted.filter(s => s.batch && s.batch.id === batch_id),
          message: 'Students list fetched.',
        });
      }

      return res.status(200).json({
        success: true,
        data: formatted,
        message: 'Students list fetched.',
      });
    }
  } catch (error) {
    next(error);
  }
}

/**
 * Get Student details by ID
 */
async function getStudentById(req, res, next) {
  try {
    const { id } = req.params;
    const isDb = getIsPrismaConnected();

    // Security check: Student can only view their own profile, unless admin/staff
    if (req.user.role === 'student' && req.user.id !== id) {
      return res.status(403).json({
        success: false,
        data: null,
        message: 'Unauthorized: You can only access your own profile.',
      });
    }

    if (isDb && prisma) {
      const student = await prisma.user.findUnique({
        where: { id },
        include: {
          enrollments: { include: { batch: true } },
          attendances: { orderBy: { date: 'desc' }, take: 40 },
          fees: { orderBy: { due_date: 'desc' } },
        },
      });

      if (!student) {
        return res.status(404).json({ success: false, data: null, message: 'Student not found.' });
      }

      const totalAtt = student.attendances.length;
      const presentCount = student.attendances.filter(a => a.status === 'present').length;
      const attendancePct = totalAtt > 0 ? Math.round((presentCount / totalAtt) * 100) : 100;

      const { password_hash, ...safeData } = student;
      return res.status(200).json({
        success: true,
        data: {
          ...safeData,
          attendancePct,
          totalClasses: totalAtt,
          presentClasses: presentCount,
          activeBatch: student.enrollments[0]?.batch || null,
        },
        message: 'Student details retrieved.',
      });
    } else {
      const student = fallbackStore.users.find(u => u.id === id);
      if (!student) {
        return res.status(404).json({ success: false, data: null, message: 'Student not found.' });
      }

      const enrollments = fallbackStore.enrollments
        .filter(e => e.student_id === id)
        .map(e => ({ ...e, batch: fallbackStore.batches.find(b => b.id === e.batch_id) }));
      const attendances = fallbackStore.attendances.filter(a => a.student_id === id);
      const fees = fallbackStore.fees.filter(f => f.student_id === id);

      const totalAtt = attendances.length;
      const presentCount = attendances.filter(a => a.status === 'present').length;
      const attendancePct = totalAtt > 0 ? Math.round((presentCount / totalAtt) * 100) : 90;

      return res.status(200).json({
        success: true,
        data: {
          id: student.id,
          name: student.name,
          email: student.email,
          phone: student.phone,
          status: student.status,
          role: student.role,
          profile_photo_url: student.profile_photo_url,
          created_at: student.created_at,
          enrollments,
          activeBatch: enrollments[0]?.batch || null,
          attendances,
          fees,
          attendancePct,
          totalClasses: totalAtt,
          presentClasses: presentCount,
        },
        message: 'Student details retrieved.',
      });
    }
  } catch (error) {
    next(error);
  }
}

/**
 * Create new student directly by Admin
 */
async function createStudent(req, res, next) {
  try {
    const validated = studentCreateSchema.parse(req.body);
    const salt = await bcrypt.genSalt(12);
    const password_hash = await bcrypt.hash('Student@123', salt);
    const isDb = getIsPrismaConnected();

    if (isDb && prisma) {
      const student = await prisma.user.create({
        data: {
          name: validated.name,
          email: validated.email.toLowerCase(),
          password_hash,
          phone: validated.phone || null,
          profile_photo_url: validated.profile_photo_url || null,
          status: validated.status || 'active',
          role: 'student',
        },
      });

      if (validated.batch_id) {
        await prisma.enrollment.create({
          data: {
            student_id: student.id,
            batch_id: validated.batch_id,
            status: 'active',
          },
        });
      }

      return res.status(201).json({
        success: true,
        data: student,
        message: 'Student created successfully. Default password is set to Student@123.',
      });
    } else {
      const newStu = {
        id: `usr-stu-${Date.now()}`,
        name: validated.name,
        email: validated.email.toLowerCase(),
        password_hash,
        phone: validated.phone || '',
        profile_photo_url: validated.profile_photo_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        status: validated.status || 'active',
        role: 'student',
        created_at: new Date(),
      };
      fallbackStore.users.push(newStu);

      if (validated.batch_id) {
        fallbackStore.enrollments.push({
          id: `enr-${Date.now()}`,
          student_id: newStu.id,
          batch_id: validated.batch_id,
          joined_date: new Date(),
          status: 'active',
        });
      }

      return res.status(201).json({
        success: true,
        data: newStu,
        message: 'Student created successfully. Default password is set to Student@123.',
      });
    }
  } catch (error) {
    next(error);
  }
}

/**
 * Approve pending student registration
 */
async function approveStudent(req, res, next) {
  try {
    const { id } = req.params;
    const { batch_id } = req.body;
    const isDb = getIsPrismaConnected();

    if (isDb && prisma) {
      const student = await prisma.user.update({
        where: { id },
        data: { status: 'active' },
      });

      if (batch_id) {
        await prisma.enrollment.upsert({
          where: {
            student_id_batch_id: { student_id: id, batch_id },
          },
          update: { status: 'active' },
          create: {
            student_id: id,
            batch_id,
            status: 'active',
          },
        });
      }

      return res.status(200).json({
        success: true,
        data: student,
        message: `Student ${student.name} approved successfully and marked active.`,
      });
    } else {
      const student = fallbackStore.users.find(u => u.id === id);
      if (!student) {
        return res.status(404).json({ success: false, data: null, message: 'Student not found.' });
      }
      student.status = 'active';

      if (batch_id) {
        const enr = fallbackStore.enrollments.find(e => e.student_id === id);
        if (enr) {
          enr.batch_id = batch_id;
          enr.status = 'active';
        } else {
          fallbackStore.enrollments.push({
            id: `enr-${Date.now()}`,
            student_id: id,
            batch_id,
            joined_date: new Date(),
            status: 'active',
          });
        }
      }

      return res.status(200).json({
        success: true,
        data: student,
        message: `Student ${student.name} approved successfully and marked active.`,
      });
    }
  } catch (error) {
    next(error);
  }
}

/**
 * Update student profile
 */
async function updateStudent(req, res, next) {
  try {
    const { id } = req.params;
    const { name, phone, status, profile_photo_url, batch_id } = req.body;
    const isDb = getIsPrismaConnected();

    if (isDb && prisma) {
      const updated = await prisma.user.update({
        where: { id },
        data: {
          ...(name && { name }),
          ...(phone !== undefined && { phone }),
          ...(status && { status }),
          ...(profile_photo_url && { profile_photo_url }),
        },
      });

      if (batch_id) {
        // Find existing enrollment
        const existing = await prisma.enrollment.findFirst({ where: { student_id: id } });
        if (existing) {
          await prisma.enrollment.update({
            where: { id: existing.id },
            data: { batch_id },
          });
        } else {
          await prisma.enrollment.create({
            data: { student_id: id, batch_id, status: 'active' },
          });
        }
      }

      return res.status(200).json({
        success: true,
        data: updated,
        message: 'Student details updated successfully.',
      });
    } else {
      const s = fallbackStore.users.find(u => u.id === id);
      if (!s) return res.status(404).json({ success: false, data: null, message: 'Student not found.' });
      if (name) s.name = name;
      if (phone !== undefined) s.phone = phone;
      if (status) s.status = status;
      if (profile_photo_url) s.profile_photo_url = profile_photo_url;

      if (batch_id) {
        const enr = fallbackStore.enrollments.find(e => e.student_id === id);
        if (enr) {
          enr.batch_id = batch_id;
        } else {
          fallbackStore.enrollments.push({
            id: `enr-${Date.now()}`,
            student_id: id,
            batch_id,
            joined_date: new Date(),
            status: 'active',
          });
        }
      }

      return res.status(200).json({
        success: true,
        data: s,
        message: 'Student details updated successfully.',
      });
    }
  } catch (error) {
    next(error);
  }
}

/**
 * Toggle student active/inactive status
 */
async function toggleStudentStatus(req, res, next) {
  try {
    const { id } = req.params;
    const isDb = getIsPrismaConnected();

    if (isDb && prisma) {
      const student = await prisma.user.findUnique({ where: { id } });
      if (!student) return res.status(404).json({ success: false, data: null, message: 'Student not found.' });

      const newStatus = student.status === 'active' ? 'inactive' : 'active';
      const updated = await prisma.user.update({
        where: { id },
        data: { status: newStatus },
      });

      return res.status(200).json({
        success: true,
        data: updated,
        message: `Student status updated to ${newStatus}.`,
      });
    } else {
      const student = fallbackStore.users.find(u => u.id === id);
      if (!student) return res.status(404).json({ success: false, data: null, message: 'Student not found.' });

      student.status = student.status === 'active' ? 'inactive' : 'active';
      return res.status(200).json({
        success: true,
        data: student,
        message: `Student status updated to ${student.status}.`,
      });
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  approveStudent,
  updateStudent,
  toggleStudentStatus,
};
