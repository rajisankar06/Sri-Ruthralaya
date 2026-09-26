const express = require('express');
const router = express.Router();
const batchController = require('../controllers/batchController');
const { authenticateToken, requireRole } = require('../middleware/auth');

// Public route to view batches
router.get('/', batchController.getAllBatches);
router.get('/:id', batchController.getBatchById);

// Admin only routes
router.post('/', authenticateToken, requireRole(['admin']), batchController.createBatch);
router.put('/:id', authenticateToken, requireRole(['admin']), batchController.updateBatch);
router.delete('/:id', authenticateToken, requireRole(['admin']), batchController.deleteBatch);

module.exports = router;
