const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const { authenticateToken, requireRole } = require('../middleware/auth');

// Public view
router.get('/', eventController.getAllEvents);

// Admin management
router.post('/', authenticateToken, requireRole(['admin']), eventController.createEvent);
router.put('/:id', authenticateToken, requireRole(['admin']), eventController.updateEvent);
router.delete('/:id', authenticateToken, requireRole(['admin']), eventController.deleteEvent);

module.exports = router;
