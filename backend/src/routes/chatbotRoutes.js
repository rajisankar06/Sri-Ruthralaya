const express = require('express');
const router = express.Router();
const chatbotController = require('../controllers/chatbotController');
const { chatbotLimiter } = require('../middleware/rateLimiter');
const { optionalAuth, authenticateToken, requireRole } = require('../middleware/auth');

// Message endpoint (supports public visitors and authenticated students)
router.post('/message', chatbotLimiter, optionalAuth, chatbotController.handleChatbotMessage);

// Admin logs viewer
router.get('/logs', authenticateToken, requireRole(['admin']), chatbotController.getChatbotLogs);

module.exports = router;
