const { z } = require('zod');
const { db, fallbackStore, getIsDbConnected, isProduction, recordAdminActivity, getAdminInfoFromReq } = require('../config/db');

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
    const isDb = getIsDbConnected();
    const user = req.user; // from auth or null

    if (isProduction && !isDb) {
      return res.status(503).json({
        success: false,
        data: null,
        message: 'Database service is currently unavailable. Please try again shortly.',
      });
    }

    if (isDb) {
      let where = {};

      if (user && user.role === 'student') {
        const enr = await db.enrollment.findFirst({ where: { student_id: user.id } });
        const studentBatchId = enr?.batch_id;

        const allNotices = await db.notice.findMany();
        const filtered = allNotices.filter(n => {
          if (n.target === 'all') return true;
          if (n.target === 'batch' && studentBatchId && n.batch_id === studentBatchId) return true;
          if (n.target === 'student' && n.student_id === user.id) return true;
          return false;
        });

        return res.status(200).json({ success: true, data: filtered, message: 'Notices retrieved.' });
      } else if (!user) {
        where = { target: 'all' };
      }

      const notices = await db.notice.findMany({
        where,
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
    const isDb = getIsDbConnected();
    const adminInfo = getAdminInfoFromReq(req);

    if (isProduction && !isDb) {
      return res.status(503).json({
        success: false,
        data: null,
        message: 'Database service is currently unavailable. Please try again shortly.',
      });
    }

    let createdNotice;
    if (isDb) {
      createdNotice = await db.notice.create({
        data: {
          title: validated.title,
          message: validated.message,
          target: validated.target,
          batch_id: validated.batch_id || null,
          student_id: validated.student_id || null,
        },
      });
    } else {
      createdNotice = {
        id: `not-${Date.now()}`,
        ...validated,
        created_at: new Date(),
      };
      fallbackStore.notices.unshift(createdNotice);
    }

    await recordAdminActivity({
      ...adminInfo,
      action: 'CREATE_NOTICE',
      entity_type: 'notice',
      entity_id: createdNotice.id,
      title: 'Published Circular Notice',
      details: `Published circular "${validated.title}" targeted to ${validated.target}`,
    });

    return res.status(201).json({ success: true, data: createdNotice, message: 'Notice published.' });
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
    const isDb = getIsDbConnected();
    const adminInfo = getAdminInfoFromReq(req);

    if (isProduction && !isDb) {
      return res.status(503).json({
        success: false,
        data: null,
        message: 'Database service is currently unavailable. Please try again shortly.',
      });
    }

    let deletedTitle = id;
    if (isDb) {
      const n = await db.notice.findUnique({ where: { id } });
      if (n) deletedTitle = n.title;
      await db.notice.delete({ where: { id } });
    } else {
      const idx = fallbackStore.notices.findIndex(n => n.id === id);
      if (idx === -1) return res.status(404).json({ success: false, data: null, message: 'Notice not found.' });
      deletedTitle = fallbackStore.notices[idx].title || id;
      fallbackStore.notices.splice(idx, 1);
    }

    await recordAdminActivity({
      ...adminInfo,
      action: 'DELETE_NOTICE',
      entity_type: 'notice',
      entity_id: id,
      title: 'Deleted Circular Notice',
      details: `Deleted notice "${deletedTitle}"`,
    });

    return res.status(200).json({ success: true, data: null, message: 'Notice deleted.' });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getNotices,
  createNotice,
  deleteNotice,
};
