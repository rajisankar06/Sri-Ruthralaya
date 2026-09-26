const { getAdminActivities, recordAdminActivity, getAdminInfoFromReq } = require('../config/db');

/**
 * Get Admin Activities with filtering and pagination
 * GET /api/v1/admin/activities
 */
async function getActivities(req, res, next) {
  try {
    const { limit = 50, entity_type, action, search } = req.query;
    const activities = await getAdminActivities({
      limit: parseInt(limit, 10) || 50,
      entity_type,
      action,
      search,
    });

    return res.status(200).json({
      success: true,
      data: activities,
      total: activities.length,
      message: 'Admin activity audit logs retrieved successfully.',
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Manually record an administrative activity note or custom audit entry
 * POST /api/v1/admin/activities
 */
async function logManualActivity(req, res, next) {
  try {
    const { action, entity_type = 'system', title, details, entity_id } = req.body;
    if (!title) {
      return res.status(400).json({ success: false, message: 'Activity title is required.' });
    }

    const adminInfo = getAdminInfoFromReq(req);
    const activity = await recordAdminActivity({
      ...adminInfo,
      action: action || 'MANUAL_AUDIT_LOG',
      entity_type,
      entity_id: entity_id || null,
      title,
      details: details || title,
    });

    return res.status(201).json({
      success: true,
      data: activity,
      message: 'Admin activity recorded in database.',
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getActivities,
  logManualActivity,
};
