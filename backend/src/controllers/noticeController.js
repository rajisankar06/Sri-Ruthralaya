const { z } = require('zod');
const { prisma, fallbackStore, getIsPrismaConnected } = require('../config/db');

const noticeSchema = z.object({
  title: z.string().min(3),
  message: z.string().min(5),
  target: z.enum(['all', 'batch', 'student']).default('all'),
  batch_id: z.string().optional().nullable(),
  student_id: z.string().optional().nullable(),
});

/**
 * Get notices
 * Student gets filtered notices (all + their batch + personal)
 * Admin gets all
 */
async function getNotices(req, res, next) {
  try {
    const isDb = getIsPrismaConnected();
    const user = req.user; // from auth or null

    if (isDb && prisma) {
      let where = {};

      if (user && user.role === 'student') {
        // Find student's active enrollment
        const enr = await prisma.enrollment.findFirst({ where: { student_id: user.id } });
        const studentBatchId = enr?.batch_id;

        where = {
          OR: [
            { target: 'all' },
            ...(studentBatchId ? [{ target: 'batch', batch_id: studentBatchId }] : []),
            { target: 'student', student_id: user.id },
          ],
        };
      } else if (!user) {
        // Public sees only 'all' target notices
        where = { target: 'all' };
      }

      const notices = await prisma.notice.findMany({
        where,
        include: {
          batch: { select: { id: true, name: true } },
          student: { select: { id: true, name: true, email: true } },
        },
        orderBy: { created_at: 'desc' },
      });

      return res.status(200).json({ success: true, data: notices, message: 'Notices retrieved.' });
    } else {
      let notices = [...fallbackStore.notices];

      if (user && user.role === 'student') {
        const enr = fallbackStore.enrollments.find(e => e.student_id === user.id);
        const batchId = enr?.batch_id;

        notices = notices.filter(n => {
          if (n.target === 'all') return true;
          if (n.target === 'batch' && n.batch_id === batchId) return true;
          if (n.target === 'student' && n.student_id === user.id) return true;
          return false;
        });
      } else if (!user) {
        notices = notices.filter(n => n.target === 'all');
      }

      const formatted = notices.map(n => ({
        ...n,
        batch: n.batch_id ? fallbackStore.batches.find(b => b.id === n.batch_id) : null,
        student: n.student_id ? fallbackStore.users.find(u => u.id === n.student_id) : null,
      }));

      return res.status(200).json({ success: true, data: formatted, message: 'Notices retrieved.' });
    }
  } catch (error) {
    next(error);
  }
}

/**
 * Create notice (Admin only)
 */
async function createNotice(req, res, next) {
  try {
    const validated = noticeSchema.parse(req.body);
    const isDb = getIsPrismaConnected();

    if (isDb && prisma) {
      const notice = await prisma.notice.create({
        data: {
          title: validated.title,
          message: validated.message,
          target: validated.target,
          batch_id: validated.batch_id || null,
          student_id: validated.student_id || null,
        },
      });

      return res.status(201).json({ success: true, data: notice, message: 'Notice published.' });
    } else {
      const newNotice = {
        id: `not-${Date.now()}`,
        ...validated,
        created_at: new Date(),
      };
      fallbackStore.notices.unshift(newNotice);
      return res.status(201).json({ success: true, data: newNotice, message: 'Notice published.' });
    }
  } catch (error) {
    next(error);
  }
}

/**
 * Delete notice (Admin only)
 */
async function deleteNotice(req, res, next) {
  try {
    const { id } = req.params;
    const isDb = getIsPrismaConnected();

    if (isDb && prisma) {
      await prisma.notice.delete({ where: { id } });
      return res.status(200).json({ success: true, data: null, message: 'Notice deleted.' });
    } else {
      const idx = fallbackStore.notices.findIndex(n => n.id === id);
      if (idx === -1) return res.status(404).json({ success: false, data: null, message: 'Notice not found.' });
      fallbackStore.notices.splice(idx, 1);
      return res.status(200).json({ success: true, data: null, message: 'Notice deleted.' });
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getNotices,
  createNotice,
  deleteNotice,
};
