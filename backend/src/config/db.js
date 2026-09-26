const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

let prisma;
let isPrismaConnected = false;

try {
  prisma = new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
  });
} catch (e) {
  console.warn('⚠️ Warning: PrismaClient initialization deferred:', e.message);
}

// In-memory fallback store initialized with rich academy data
const fallbackStore = {
  users: [
    {
      id: 'usr-admin-01',
      name: 'Guru Nattiyakalaimani R. Sridevi',
      email: 'admin@sriruthralaya.com',
      password_hash: bcrypt.hashSync('Admin@123', 10),
      role: 'admin',
      phone: '+91 98421 23456',
      profile_photo_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
      status: 'active',
      created_at: new Date('2024-01-01'),
    },
    {
      id: 'usr-staff-01',
      name: 'Smt. Priyadarshini M. (BFA Dance)',
      email: 'instructor@sriruthralaya.com',
      password_hash: bcrypt.hashSync('Staff@123', 10),
      role: 'staff',
      phone: '+91 98422 67890',
      profile_photo_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      status: 'active',
      created_at: new Date('2024-03-01'),
    },
    {
      id: 'usr-stu-01',
      name: 'Ananya Ramachandran',
      email: 'ananya.r@gmail.com',
      password_hash: bcrypt.hashSync('Student@123', 10),
      role: 'student',
      phone: '+91 94431 88201',
      profile_photo_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      status: 'active',
      created_at: new Date('2025-01-15'),
    },
    {
      id: 'usr-stu-02',
      name: 'Diya Soundararajan',
      email: 'diya.s@gmail.com',
      password_hash: bcrypt.hashSync('Student@123', 10),
      role: 'student',
      phone: '+91 97890 12345',
      profile_photo_url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
      status: 'active',
      created_at: new Date('2024-06-10'),
    },
    {
      id: 'usr-stu-03',
      name: 'Kavya Krishnan',
      email: 'kavya.k@gmail.com',
      password_hash: bcrypt.hashSync('Student@123', 10),
      role: 'student',
      phone: '+91 98940 55667',
      profile_photo_url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80',
      status: 'active',
      created_at: new Date('2025-08-01'),
    },
    {
      id: 'usr-stu-04',
      name: 'Meera Natarajan',
      email: 'meera.n@gmail.com',
      password_hash: bcrypt.hashSync('Student@123', 10),
      role: 'student',
      phone: '+91 94860 99887',
      profile_photo_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
      status: 'active',
      created_at: new Date('2024-01-10'),
    },
    {
      id: 'usr-stu-05',
      name: 'Swetha Balaji',
      email: 'swetha.b@gmail.com',
      password_hash: bcrypt.hashSync('Student@123', 10),
      role: 'student',
      phone: '+91 97900 44332',
      profile_photo_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      status: 'active',
      created_at: new Date('2025-03-20'),
    },
    {
      id: 'usr-stu-06',
      name: 'Priya Vasanth',
      email: 'priya.new@gmail.com',
      password_hash: bcrypt.hashSync('Student@123', 10),
      role: 'student',
      phone: '+91 96290 77112',
      profile_photo_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80',
      status: 'pending', // Pending approval
      created_at: new Date(),
    },
  ],
  batches: [
    {
      id: 'batch-01',
      name: 'Bala Natya (Beginner Adavus)',
      level: 'Beginner',
      instructor_name: 'Guru Nattiyakalaimani R. Sridevi',
      schedule_days: 'Mon, Wed, Fri',
      schedule_time: '04:30 PM - 05:30 PM',
      fee_amount: 1800.00,
      created_at: new Date('2024-01-01'),
    },
    {
      id: 'batch-02',
      name: 'Madhyama (Intermediate Jatiswaram & Shabdam)',
      level: 'Intermediate',
      instructor_name: 'Smt. Priyadarshini M.',
      schedule_days: 'Tue, Thu, Sat',
      schedule_time: '05:30 PM - 07:00 PM',
      fee_amount: 2400.00,
      created_at: new Date('2024-01-01'),
    },
    {
      id: 'batch-03',
      name: 'Visharada (Advanced Varnam & Padam)',
      level: 'Advanced',
      instructor_name: 'Guru Nattiyakalaimani R. Sridevi',
      schedule_days: 'Saturday, Sunday',
      schedule_time: '08:00 AM - 10:30 AM',
      fee_amount: 3200.00,
      created_at: new Date('2024-01-01'),
    },
    {
      id: 'batch-04',
      name: 'Arangetram Margam Intensive',
      level: 'Arangetram Prep',
      instructor_name: 'Guru Nattiyakalaimani R. Sridevi',
      schedule_days: 'Saturday, Sunday',
      schedule_time: '04:00 PM - 07:00 PM',
      fee_amount: 4500.00,
      created_at: new Date('2024-01-01'),
    },
  ],
  enrollments: [
    { id: 'enr-01', student_id: 'usr-stu-01', batch_id: 'batch-02', joined_date: new Date('2025-01-15'), status: 'active' },
    { id: 'enr-02', student_id: 'usr-stu-02', batch_id: 'batch-03', joined_date: new Date('2024-06-10'), status: 'active' },
    { id: 'enr-03', student_id: 'usr-stu-03', batch_id: 'batch-01', joined_date: new Date('2025-08-01'), status: 'active' },
    { id: 'enr-04', student_id: 'usr-stu-04', batch_id: 'batch-04', joined_date: new Date('2024-01-10'), status: 'active' },
    { id: 'enr-05', student_id: 'usr-stu-05', batch_id: 'batch-02', joined_date: new Date('2025-03-20'), status: 'active' },
  ],
  attendances: [],
  fees: [],
  events: [
    {
      id: 'ev-01',
      title: 'Annual Natyanjali Utsav 2026',
      description: 'Grand classical showcase featuring 80+ disciples performing Varnams, Thillanas, and thematic dance drama at Sivakasi Town Hall.',
      date: new Date(Date.now() + 15 * 86400000),
      image_url: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80',
      location: 'Sivakasi Town Hall Auditorium',
      created_by: 'usr-admin-01',
      created_at: new Date(),
    },
    {
      id: 'ev-02',
      title: 'Salangai Pooja Ceremony',
      description: 'Sacred bell blessing ceremony for junior disciples stepping into intermediate training under Guru Sridevi.',
      date: new Date(Date.now() + 25 * 86400000),
      image_url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
      location: 'Sri Ruthralaya Temple Hall, Thiruthangal',
      created_by: 'usr-admin-01',
      created_at: new Date(),
    },
    {
      id: 'ev-03',
      title: 'Bharatanatyam University Grade Exam',
      description: 'Practical and theory grade examination for Tamil Nadu Music and Fine Arts University certification.',
      date: new Date(Date.now() + 45 * 86400000),
      image_url: 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=800&q=80',
      location: 'Academy Main Hall, Thiruthangal',
      created_by: 'usr-admin-01',
      created_at: new Date(),
    },
  ],
  notices: [
    {
      id: 'not-01',
      title: 'Costume & Temple Jewellery Measurements',
      message: 'All intermediate and advanced students are requested to submit their tailor measurements by this Friday for custom traditional temple costume stitching for the upcoming Natyanjali.',
      target: 'all',
      created_at: new Date(Date.now() - 2 * 86400000),
    },
    {
      id: 'not-02',
      title: 'Bala Natya Extra Class This Saturday',
      message: 'Beginner batch will have an extra 45-minute posture session on Saturday morning at 9:00 AM focusing on Aramandi and Natyarambha posture stability.',
      target: 'batch',
      batch_id: 'batch-01',
      created_at: new Date(Date.now() - 4 * 86400000),
    },
    {
      id: 'not-03',
      title: 'University Grade Exam Hall Tickets',
      message: 'Hall tickets for practical dance examination are now ready for pickup at the front desk.',
      target: 'all',
      created_at: new Date(Date.now() - 6 * 86400000),
    },
  ],
  gallery: [
    {
      id: 'gal-01',
      title: 'Navarasa Abhinaya in Varnam',
      category: 'performances',
      media_url: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1000&q=80',
      media_type: 'image',
      uploaded_at: new Date(),
    },
    {
      id: 'gal-02',
      title: 'Salangai Pooja Holy Bell Dedication',
      category: 'salangai-pooja',
      media_url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1000&q=80',
      media_type: 'image',
      uploaded_at: new Date(),
    },
    {
      id: 'gal-03',
      title: 'Arangetram Debut - Kum. Diya Margam',
      category: 'arangetram',
      media_url: 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=1000&q=80',
      media_type: 'image',
      uploaded_at: new Date(),
    },
    {
      id: 'gal-04',
      title: 'Morning Practice - Adavu Drills in Aramandi',
      category: 'classroom',
      media_url: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&w=1000&q=80',
      media_type: 'image',
      uploaded_at: new Date(),
    },
    {
      id: 'gal-05',
      title: 'Thillana Finale at Chidambaram Natyanjali',
      category: 'performances',
      media_url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1000&q=80',
      media_type: 'image',
      uploaded_at: new Date(),
    },
    {
      id: 'gal-06',
      title: 'Guru Shishya Parampara Blessing Moment',
      category: 'classroom',
      media_url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1000&q=80',
      media_type: 'image',
      uploaded_at: new Date(),
    },
  ],
  chatbotLogs: [
    {
      id: 'log-01',
      user_id: null,
      message: 'What are the class timings for beginners?',
      response: 'Our Bala Natya beginner batch meets on Monday, Wednesday, and Friday from 04:30 PM to 05:30 PM under Guru Nattiyakalaimani R. Sridevi.',
      created_at: new Date(Date.now() - 3600000 * 5),
    },
    {
      id: 'log-02',
      user_id: 'usr-stu-01',
      message: 'What is my attendance percentage this month?',
      response: 'Hello Ananya! Your current attendance is 93.3% with 14 out of 15 classes attended. Keep up the dedicated practice!',
      created_at: new Date(Date.now() - 3600000 * 2),
    },
  ],
  adminActivities: [
    {
      id: 'act-01',
      admin_id: 'usr-admin-01',
      admin_name: 'Guru Nattiyakalaimani R. Sridevi',
      admin_email: 'admin@sriruthralaya.com',
      action: 'CREATE_EVENT',
      entity_type: 'event',
      entity_id: 'ev-01',
      title: 'Scheduled Academy Event',
      details: 'Scheduled Annual Natyanjali Dance Festival 2026 at Sivakasi Town Hall Auditorium',
      ip_address: '127.0.0.1',
      created_at: new Date(Date.now() - 3600000 * 2),
    },
    {
      id: 'act-02',
      admin_id: 'usr-admin-01',
      admin_name: 'Guru Nattiyakalaimani R. Sridevi',
      admin_email: 'admin@sriruthralaya.com',
      action: 'UPLOAD_GALLERY',
      entity_type: 'gallery',
      entity_id: 'gal-01',
      title: 'Uploaded Gallery Media',
      details: 'Uploaded photo "Arangetram Solo Varnam Presentation" to category performances',
      ip_address: '127.0.0.1',
      created_at: new Date(Date.now() - 3600000 * 5),
    },
    {
      id: 'act-03',
      admin_id: 'usr-admin-01',
      admin_name: 'Guru Nattiyakalaimani R. Sridevi',
      admin_email: 'admin@sriruthralaya.com',
      action: 'MARK_ATTENDANCE',
      entity_type: 'attendance',
      entity_id: 'batch-02',
      title: 'Batch Attendance Marked',
      details: 'Logged attendance for Madhyama (Intermediate) batch with 94% present',
      ip_address: '127.0.0.1',
      created_at: new Date(Date.now() - 3600000 * 20),
    },
    {
      id: 'act-04',
      admin_id: 'usr-admin-01',
      admin_name: 'Guru Nattiyakalaimani R. Sridevi',
      admin_email: 'admin@sriruthralaya.com',
      action: 'RECORD_PAYMENT',
      entity_type: 'fee',
      entity_id: 'fee-sep-usr-stu-01',
      title: 'Fee Payment Recorded',
      details: 'Recorded monthly tuition fee ₹2,400 for Ananya Ramachandran (September 2026)',
      ip_address: '127.0.0.1',
      created_at: new Date(Date.now() - 3600000 * 36),
    },
    {
      id: 'act-05',
      admin_id: 'usr-admin-01',
      admin_name: 'Guru Nattiyakalaimani R. Sridevi',
      admin_email: 'admin@sriruthralaya.com',
      action: 'APPROVE_STUDENT',
      entity_type: 'student',
      entity_id: 'usr-stu-05',
      title: 'Approved Student Registration',
      details: 'Approved admission for Swetha Balaji and assigned to Madhyama Batch',
      ip_address: '127.0.0.1',
      created_at: new Date(Date.now() - 3600000 * 52),
    },
    {
      id: 'act-06',
      admin_id: 'usr-admin-01',
      admin_name: 'Guru Nattiyakalaimani R. Sridevi',
      admin_email: 'admin@sriruthralaya.com',
      action: 'CREATE_NOTICE',
      entity_type: 'notice',
      entity_id: 'not-01',
      title: 'Published Circular Notice',
      details: 'Published notice: "Navarathri Special Intensive Rehearsal Schedule" targeted to all students',
      ip_address: '127.0.0.1',
      created_at: new Date(Date.now() - 3600000 * 68),
    },
  ],
};

// Initialize sample attendance & fees in fallback store
(() => {
  const activeStudentIds = ['usr-stu-01', 'usr-stu-02', 'usr-stu-03', 'usr-stu-04', 'usr-stu-05'];
  const batchMapping = {
    'usr-stu-01': 'batch-02',
    'usr-stu-02': 'batch-03',
    'usr-stu-03': 'batch-01',
    'usr-stu-04': 'batch-04',
    'usr-stu-05': 'batch-02',
  };

  const today = new Date();
  activeStudentIds.forEach((stuId, stuIdx) => {
    // 20 attendance records
    for (let d = 0; d < 20; d++) {
      const attDate = new Date();
      attDate.setDate(today.getDate() - d);
      const isAbsent = (d + stuIdx) % 8 === 0;
      fallbackStore.attendances.push({
        id: `att-${stuId}-${d}`,
        student_id: stuId,
        batch_id: batchMapping[stuId],
        date: attDate.toISOString().split('T')[0],
        status: isAbsent ? 'absent' : 'present',
        remarks: isAbsent ? 'Family function' : 'Punctual with practice',
        created_at: attDate,
      });
    }

    // Fees: September (paid)
    fallbackStore.fees.push({
      id: `fee-sep-${stuId}`,
      student_id: stuId,
      amount: 2400.00,
      due_date: new Date(today.getFullYear(), 8, 5).toISOString().split('T')[0],
      paid_date: new Date(today.getFullYear(), 8, 4).toISOString().split('T')[0],
      status: 'paid',
      receipt_url: `/api/v1/fees/receipt/mock-receipt-${stuId}`,
      payment_ref: `UPI-SR-${880000 + stuIdx * 123}`,
      month: 'September 2026',
      created_at: new Date(today.getFullYear(), 8, 1),
    });

    // Fees: October
    const isPaid = stuIdx === 0 || stuIdx === 2;
    fallbackStore.fees.push({
      id: `fee-oct-${stuId}`,
      student_id: stuId,
      amount: 2400.00,
      due_date: new Date(today.getFullYear(), 9, 5).toISOString().split('T')[0],
      paid_date: isPaid ? new Date(today.getFullYear(), 9, 3).toISOString().split('T')[0] : null,
      status: isPaid ? 'paid' : (stuIdx === 4 ? 'overdue' : 'pending'),
      receipt_url: isPaid ? `/api/v1/fees/receipt/mock-receipt-${stuId}` : null,
      payment_ref: isPaid ? `UPI-SR-${990000 + stuIdx * 123}` : null,
      month: 'October 2026',
      created_at: new Date(today.getFullYear(), 9, 1),
    });
  });
})();

/**
 * Helper to extract admin user metadata from Express request
 */
function getAdminInfoFromReq(req) {
  const admin_id = req?.user?.id || 'usr-admin-01';
  const admin_name = req?.user?.name || 'Guru Nattiyakalaimani R. Sridevi';
  const admin_email = req?.user?.email || 'admin@sriruthralaya.com';
  const ip_address = req?.headers?.['x-forwarded-for'] || req?.socket?.remoteAddress || '127.0.0.1';
  return { admin_id, admin_name, admin_email, ip_address };
}

/**
 * Record an Admin Activity in database (Prisma table + fallback store)
 */
async function recordAdminActivity({
  admin_id,
  admin_name = 'Guru Nattiyakalaimani R. Sridevi',
  admin_email = 'admin@sriruthralaya.com',
  action,
  entity_type,
  entity_id = null,
  title,
  details,
  ip_address = null,
}) {
  const newActivity = {
    id: `act-${Date.now()}-${Math.random().toString(36).substring(7)}`,
    admin_id: admin_id || 'usr-admin-01',
    admin_name: admin_name || 'Guru Nattiyakalaimani R. Sridevi',
    admin_email: admin_email || 'admin@sriruthralaya.com',
    action,
    entity_type,
    entity_id: entity_id ? String(entity_id) : null,
    title,
    details: details || title,
    ip_address: ip_address || null,
    created_at: new Date(),
  };

  // Always store in fallback store for immediate consistency
  fallbackStore.adminActivities.unshift(newActivity);

  // If Prisma database is connected, persist to admin_activities table
  if (isPrismaConnected && prisma && prisma.adminActivity) {
    try {
      await prisma.adminActivity.create({
        data: {
          admin_id: newActivity.admin_id,
          admin_name: newActivity.admin_name,
          admin_email: newActivity.admin_email,
          action: newActivity.action,
          entity_type: newActivity.entity_type,
          entity_id: newActivity.entity_id,
          title: newActivity.title,
          details: newActivity.details,
          ip_address: newActivity.ip_address,
          created_at: newActivity.created_at,
        },
      });
    } catch (dbErr) {
      console.warn('⚠️ Could not write activity to Prisma DB table:', dbErr.message);
    }
  }

  return newActivity;
}

/**
 * Retrieve Admin Activities (supports filtering & limits)
 */
async function getAdminActivities({ limit = 50, entity_type = null, action = null, search = null } = {}) {
  if (isPrismaConnected && prisma && prisma.adminActivity) {
    try {
      const where = {};
      if (entity_type && entity_type !== 'all') where.entity_type = entity_type;
      if (action && action !== 'all') where.action = action;
      if (search) {
        where.OR = [
          { title: { contains: search, mode: 'insensitive' } },
          { details: { contains: search, mode: 'insensitive' } },
          { admin_name: { contains: search, mode: 'insensitive' } },
        ];
      }
      return await prisma.adminActivity.findMany({
        where,
        orderBy: { created_at: 'desc' },
        take: limit,
      });
    } catch (e) {
      console.warn('Prisma activity query fallback:', e.message);
    }
  }

  let list = [...fallbackStore.adminActivities];
  if (entity_type && entity_type !== 'all') {
    list = list.filter(a => a.entity_type === entity_type);
  }
  if (action && action !== 'all') {
    list = list.filter(a => a.action === action);
  }
  if (search) {
    const q = search.toLowerCase();
    list = list.filter(a =>
      a.title.toLowerCase().includes(q) ||
      a.details.toLowerCase().includes(q) ||
      a.admin_name.toLowerCase().includes(q)
    );
  }
  return list.slice(0, limit);
}

async function checkDatabaseConnection() {
  if (!prisma) return false;
  try {
    const connectPromise = prisma.$connect();
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Connection timed out')), 2500)
    );
    await Promise.race([connectPromise, timeoutPromise]);
    isPrismaConnected = true;
    console.log('✅ PostgreSQL / Neon DB connected successfully via Prisma');
    return true;
  } catch (err) {
    isPrismaConnected = false;
    console.warn('ℹ️ Neon DB / PostgreSQL connection deferred; operating in resilient high-fidelity local mode.');
    return false;
  }
}

module.exports = {
  prisma,
  fallbackStore,
  getIsPrismaConnected: () => isPrismaConnected,
  checkDatabaseConnection,
  recordAdminActivity,
  getAdminActivities,
  getAdminInfoFromReq,
};

