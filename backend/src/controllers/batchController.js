const { z } = require('zod');
const { prisma, fallbackStore, getIsPrismaConnected } = require('../config/db');

const batchSchema = z.object({
  name: z.string().min(2, 'Batch name required'),
  level: z.string().min(2, 'Level required (e.g. Beginner, Intermediate, Advanced, Arangetram Prep)'),
  instructor_name: z.string().min(2, 'Instructor name required'),
  schedule_days: z.string().min(2, 'Schedule days required (e.g. Mon, Wed, Fri)'),
  schedule_time: z.string().min(2, 'Schedule time required (e.g. 05:00 PM - 06:30 PM)'),
  fee_amount: z.number().nonnegative('Fee amount must be positive'),
});

/**
 * Get all batches (Public & Authenticated)
 */
async function getAllBatches(req, res, next) {
  try {
    const isDb = getIsPrismaConnected();

    if (isDb && prisma) {
      const batches = await prisma.batch.findMany({
        include: {
          enrollments: {
            where: { status: 'active' },
            include: {
              student: {
                select: { id: true, name: true, email: true, phone: true, profile_photo_url: true },
              },
            },
          },
        },
        orderBy: { name: 'asc' },
      });

      const formatted = batches.map(b => ({
        id: b.id,
        name: b.name,
        level: b.level,
        instructor_name: b.instructor_name,
        schedule_days: b.schedule_days,
        schedule_time: b.schedule_time,
        fee_amount: Number(b.fee_amount),
        studentCount: b.enrollments.length,
        students: b.enrollments.map(e => e.student),
      }));

      return res.status(200).json({
        success: true,
        data: formatted,
        message: 'Batches fetched successfully.',
      });
    } else {
      const formatted = fallbackStore.batches.map(b => {
        const enrs = fallbackStore.enrollments.filter(e => e.batch_id === b.id && e.status === 'active');
        const students = enrs.map(e => {
          const s = fallbackStore.users.find(u => u.id === e.student_id);
          return s ? { id: s.id, name: s.name, email: s.email, phone: s.phone, profile_photo_url: s.profile_photo_url } : null;
        }).filter(Boolean);

        return {
          id: b.id,
          name: b.name,
          level: b.level,
          instructor_name: b.instructor_name,
          schedule_days: b.schedule_days,
          schedule_time: b.schedule_time,
          fee_amount: Number(b.fee_amount),
          studentCount: students.length,
          students,
        };
      });

      return res.status(200).json({
        success: true,
        data: formatted,
        message: 'Batches fetched successfully.',
      });
    }
  } catch (error) {
    next(error);
  }
}

/**
 * Get Batch by ID
 */
async function getBatchById(req, res, next) {
  try {
    const { id } = req.params;
    const isDb = getIsPrismaConnected();

    if (isDb && prisma) {
      const batch = await prisma.batch.findUnique({
        where: { id },
        include: {
          enrollments: {
            include: { student: true },
          },
        },
      });

      if (!batch) return res.status(404).json({ success: false, data: null, message: 'Batch not found.' });

      return res.status(200).json({
        success: true,
        data: {
          ...batch,
          fee_amount: Number(batch.fee_amount),
          students: batch.enrollments.map(e => e.student),
        },
        message: 'Batch retrieved.',
      });
    } else {
      const batch = fallbackStore.batches.find(b => b.id === id);
      if (!batch) return res.status(404).json({ success: false, data: null, message: 'Batch not found.' });

      const enrs = fallbackStore.enrollments.filter(e => e.batch_id === id);
      const students = enrs.map(e => fallbackStore.users.find(u => u.id === e.student_id)).filter(Boolean);

      return res.status(200).json({
        success: true,
        data: {
          ...batch,
          students,
        },
        message: 'Batch retrieved.',
      });
    }
  } catch (error) {
    next(error);
  }
}

/**
 * Create new Batch (Admin only)
 */
async function createBatch(req, res, next) {
  try {
    const validated = batchSchema.parse(req.body);
    const isDb = getIsPrismaConnected();

    if (isDb && prisma) {
      const batch = await prisma.batch.create({
        data: validated,
      });

      return res.status(201).json({
        success: true,
        data: batch,
        message: 'Batch created successfully.',
      });
    } else {
      const newBatch = {
        id: `batch-${Date.now()}`,
        ...validated,
        created_at: new Date(),
      };
      fallbackStore.batches.push(newBatch);

      return res.status(201).json({
        success: true,
        data: newBatch,
        message: 'Batch created successfully.',
      });
    }
  } catch (error) {
    next(error);
  }
}

/**
 * Update Batch (Admin only)
 */
async function updateBatch(req, res, next) {
  try {
    const { id } = req.params;
    const validated = batchSchema.partial().parse(req.body);
    const isDb = getIsPrismaConnected();

    if (isDb && prisma) {
      const updated = await prisma.batch.update({
        where: { id },
        data: validated,
      });

      return res.status(200).json({
        success: true,
        data: updated,
        message: 'Batch updated successfully.',
      });
    } else {
      const idx = fallbackStore.batches.findIndex(b => b.id === id);
      if (idx === -1) return res.status(404).json({ success: false, data: null, message: 'Batch not found.' });

      fallbackStore.batches[idx] = { ...fallbackStore.batches[idx], ...validated };
      return res.status(200).json({
        success: true,
        data: fallbackStore.batches[idx],
        message: 'Batch updated successfully.',
      });
    }
  } catch (error) {
    next(error);
  }
}

/**
 * Delete Batch (Admin only)
 */
async function deleteBatch(req, res, next) {
  try {
    const { id } = req.params;
    const isDb = getIsPrismaConnected();

    if (isDb && prisma) {
      await prisma.batch.delete({ where: { id } });
      return res.status(200).json({ success: true, data: null, message: 'Batch deleted successfully.' });
    } else {
      const idx = fallbackStore.batches.findIndex(b => b.id === id);
      if (idx === -1) return res.status(404).json({ success: false, data: null, message: 'Batch not found.' });

      fallbackStore.batches.splice(idx, 1);
      return res.status(200).json({ success: true, data: null, message: 'Batch deleted successfully.' });
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllBatches,
  getBatchById,
  createBatch,
  updateBatch,
  deleteBatch,
};
