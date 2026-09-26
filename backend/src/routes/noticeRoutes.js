const express = require('express');
const router = express.Router();
const noticeController = require('../controllers/noticeController');
const { optionalAuth, authenticateToken, requireRole } = require('../middleware/auth');

// Public/Student notices view (contextual filtering)
router.get('/', optionalAuth, noticeController.getNotices);

// Admin management
router.post('/', authenticateToken, requireRole(['admin']), noticeController.createNotice);
router.delete('/:id', authenticateToken, requireRole(['admin']), noticeController.deleteNotice);

module.exports = router;
