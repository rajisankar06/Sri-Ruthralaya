const express = require('express');
const router = express.Router();
const galleryController = require('../controllers/galleryController');
const { authenticateToken, requireRole } = require('../middleware/auth');

// Public view
router.get('/', galleryController.getGallery);

// Admin management
router.post('/upload', authenticateToken, requireRole(['admin']), galleryController.uploadMedia);
router.post('/', authenticateToken, requireRole(['admin']), galleryController.addGalleryItem);
router.put('/:id', authenticateToken, requireRole(['admin']), galleryController.updateGalleryItem);
router.delete('/:id', authenticateToken, requireRole(['admin']), galleryController.deleteGalleryItem);

module.exports = router;
