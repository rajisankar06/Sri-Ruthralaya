const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');
const aiInsightsController = require('../controllers/aiInsightsController');
const adminActivityController = require('../controllers/adminActivityController');
const { authenticateToken, requireRole } = require('../middleware/auth');

// Protect all admin routes
router.use(authenticateToken, requireRole(['admin']));

// Core Analytics & KPIs
router.get('/analytics', analyticsController.getAdminAnalytics);

// Core Requirement: AI Insights Generation
router.post('/ai-insights', aiInsightsController.generateAiInsights);

// Admin Activity Database Audit Logs
router.get('/activities', adminActivityController.getActivities);
router.post('/activities', adminActivityController.logManualActivity);

module.exports = router;

