const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');
const { authenticateToken, requireRole } = require('../middleware/auth');

// Student attendance history (authenticated)
router.get('/student', authenticateToken, attendanceController.getStudentAttendance);
router.get('/student/:student_id', authenticateToken, attendanceController.getStudentAttendance);

// Admin/Staff attendance management
router.get('/batch', authenticateToken, requireRole(['admin', 'staff']), attendanceController.getBatchAttendanceByDate);
router.get('/', authenticateToken, requireRole(['admin', 'staff']), attendanceController.getBatchAttendanceByDate);
router.post('/mark', authenticateToken, requireRole(['admin', 'staff']), attendanceController.markBatchAttendance);
router.post('/batch', authenticateToken, requireRole(['admin', 'staff']), attendanceController.markBatchAttendance);
router.post('/bulk-csv', authenticateToken, requireRole(['admin', 'staff']), attendanceController.bulkUploadCSV);

module.exports = router;
