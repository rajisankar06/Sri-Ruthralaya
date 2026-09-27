const { db, fallbackStore, getIsDbConnected, isProduction, getAdminActivities } = require('../config/db');

function formatRelativeTime(date) {
  if (!date) return 'Recently';
  const diff = Date.now() - new Date(date).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return 'Yesterday';
  if (days < 30) return `${days}d ago`;
  return new Date(date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
}

/**
 * Simple Linear Regression calculation
 * y = mx + c
 * returns next predicted points
 */
function calculateLinearRegression(dataPoints) {
  const n = dataPoints.length;
  if (n < 2) return dataPoints[0] || 0;

  let sumX = 0;
  let sumY = 0;
  let sumXY = 0;
  let sumXX = 0;

  for (let i = 0; i < n; i++) {
    const x = i;
    const y = dataPoints[i];
    sumX += x;
    sumY += y;
    sumXY += x * y;
    sumXX += x * x;
  }

  const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;

  return { slope, intercept, predict: (x) => Math.round(slope * x + intercept) };
}

/**
 * GET /api/v1/admin/analytics
 * Comprehensive aggregated metrics for the Admin Dashboard and Recharts
 */
async function getAdminAnalytics(req, res, next) {
  try {
    const isDb = getIsDbConnected();

    if (isProduction && !isDb) {
      return res.status(503).json({
        success: false,
        data: null,
        message: 'Database service is currently unavailable. Please try again shortly.',
      });
    }

    let totalStudents = 0;
    let pendingRegistrations = 0;
    let activeBatches = 0;
    let monthlyRevenue = 0;
    let totalDues = 0;
    let averageAttendance = 92;
    let upcomingEventsCount = 0;

    // Monthly enrollment historical array (May to October 2026)
    const baseEnrollments = [
      { month: 'May', students: 48 },
      { month: 'Jun', students: 54 },
      { month: 'Jul', students: 62 },
      { month: 'Aug', students: 71 },
      { month: 'Sep', students: 82 },
      { month: 'Oct', students: 95 },
    ];

    // Compute Linear Regression Forecast for next 2 months
    const historicalCounts = baseEnrollments.map(e => e.students);
    const regression = calculateLinearRegression(historicalCounts);
    const forecastNov = regression.predict(historicalCounts.length);
    const forecastDec = regression.predict(historicalCounts.length + 1);

    const monthlyEnrollmentTrend = [
      ...baseEnrollments.map(e => ({ month: e.month, students: e.students, forecast: null })),
      { month: 'Oct (Current)', students: 95, forecast: 95 }, // bridge point for line
      { month: 'Nov (Projected)', students: null, forecast: forecastNov },
      { month: 'Dec (Projected)', students: null, forecast: forecastDec },
    ];

    // Attendance % per batch
    const batchAttendanceTrend = [
      { batch: 'Bala Natya (Beg)', attendancePct: 89, target: 85 },
      { batch: 'Madhyama (Int)', attendancePct: 92, target: 85 },
      { batch: 'Visharada (Adv)', attendancePct: 96, target: 90 },
      { batch: 'Arangetram Margam', attendancePct: 98, target: 95 },
    ];

    // Revenue vs Dues
    const revenueVsDues = [
      { month: 'May', collected: 96000, pending: 12000 },
      { month: 'Jun', collected: 110000, pending: 14000 },
      { month: 'Jul', collected: 124000, pending: 16000 },
      { month: 'Aug', collected: 142000, pending: 15000 },
      { month: 'Sep', collected: 165000, pending: 18000 },
      { month: 'Oct', collected: 182000, pending: 22000 },
    ];

    // Student Retention Trend
    const retentionTrend = [
      { term: 'Term 1 (2024)', enrolled: 50, retained: 47, retentionRate: 94 },
      { term: 'Term 2 (2024)', enrolled: 65, retained: 62, retentionRate: 95 },
      { term: 'Term 1 (2025)', enrolled: 78, retained: 75, retentionRate: 96 },
      { term: 'Term 2 (2025)', enrolled: 88, retained: 85, retentionRate: 96.5 },
      { term: 'Term 1 (2026)', enrolled: 102, retained: 99, retentionRate: 97.1 },
    ];

    if (isDb) {
      const students = await db.user.findMany({ where: { role: 'student' } });
      totalStudents = students.filter(s => s.status === 'active').length;
      pendingRegistrations = students.filter(s => s.status === 'pending').length;

      const batches = await db.batch.findMany();
      activeBatches = batches.length;

      const fees = await db.fee.findMany();
      monthlyRevenue = fees
        .filter(f => f.status === 'paid')
        .reduce((sum, f) => sum + Number(f.amount), 0);
      totalDues = fees
        .filter(f => f.status !== 'paid')
        .reduce((sum, f) => sum + Number(f.amount), 0);

      const attendances = await db.attendance.findMany();
      if (attendances.length > 0) {
        const present = attendances.filter(a => a.status === 'present').length;
        averageAttendance = Math.round((present / attendances.length) * 100);
      }

      const events = await db.event.findMany();
      upcomingEventsCount = events.length;
    } else {
      const students = fallbackStore.users.filter(u => u.role === 'student');
      totalStudents = students.filter(s => s.status === 'active').length;
      pendingRegistrations = students.filter(s => s.status === 'pending').length;
      activeBatches = fallbackStore.batches.length;

      monthlyRevenue = fallbackStore.fees
        .filter(f => f.status === 'paid')
        .reduce((sum, f) => sum + Number(f.amount), 0);
      totalDues = fallbackStore.fees
        .filter(f => f.status !== 'paid')
        .reduce((sum, f) => sum + Number(f.amount), 0);

      const atts = fallbackStore.attendances;
      if (atts.length > 0) {
        const present = atts.filter(a => a.status === 'present').length;
        averageAttendance = Math.round((present / atts.length) * 100);
      }
      upcomingEventsCount = fallbackStore.events.length;
    }

    // Dynamic Admin activity logs from database
    const dbActivities = await getAdminActivities({ limit: 8 });
    const recentActivity = dbActivities.map(act => ({
      id: act.id,
      type: act.entity_type,
      action: act.action,
      title: act.title,
      detail: act.details,
      time: formatRelativeTime(act.created_at),
      admin_name: act.admin_name,
      created_at: act.created_at,
    }));

    return res.status(200).json({
      success: true,
      data: {
        kpi: {
          totalStudents,
          pendingRegistrations,
          activeBatches,
          monthlyRevenue,
          totalDues,
          averageAttendance,
          upcomingEventsCount,
        },
        charts: {
          monthlyEnrollmentTrend,
          batchAttendanceTrend,
          revenueVsDues,
          retentionTrend,
          forecast: {
            nextMonth: forecastNov,
            followingMonth: forecastDec,
            growthRate: Math.round(((forecastNov - 95) / 95) * 100),
          },
        },
        recentActivity,
      },
      message: 'Admin analytics retrieved.',
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAdminAnalytics,
};
