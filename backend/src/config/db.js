const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

let pool = null;
let isDbConnected = false;

// Initialize Native PostgreSQL Connection Pool
if (process.env.DATABASE_URL) {
  try {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.DATABASE_URL.includes('localhost') ? false : { rejectUnauthorized: false },
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
    });
  } catch (e) {
    console.warn('⚠️ Warning: Native pg Pool initialization deferred:', e.message);
  }
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
      phone: '+91 98401 22334',
      profile_photo_url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
      status: 'pending',
      created_at: new Date('2026-03-10'),
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
      fee_amount: 1800,
      created_at: new Date('2024-01-01'),
    },
    {
      id: 'batch-02',
      name: 'Madhyama (Intermediate Jatiswaram & Shabdam)',
      level: 'Intermediate',
      instructor_name: 'Smt. Priyadarshini M.',
      schedule_days: 'Tue, Thu, Sat',
      schedule_time: '05:30 PM - 07:00 PM',
      fee_amount: 2400,
      created_at: new Date('2024-01-01'),
    },
    {
      id: 'batch-03',
      name: 'Visharada (Advanced Varnam & Padam)',
      level: 'Advanced',
      instructor_name: 'Guru Nattiyakalaimani R. Sridevi',
      schedule_days: 'Saturday, Sunday',
      schedule_time: '08:00 AM - 10:30 AM',
      fee_amount: 3200,
      created_at: new Date('2024-01-01'),
    },
    {
      id: 'batch-04',
      name: 'Arangetram Margam Intensive',
      level: 'Arangetram Prep',
      instructor_name: 'Guru Nattiyakalaimani R. Sridevi',
      schedule_days: 'Saturday, Sunday',
      schedule_time: '04:00 PM - 07:00 PM',
      fee_amount: 4500,
      created_at: new Date('2024-01-01'),
    },
  ],
  enrollments: [
    { id: 'enr-01', student_id: 'usr-stu-01', batch_id: 'batch-02', status: 'active', enrolled_at: new Date('2025-01-15') },
    { id: 'enr-02', student_id: 'usr-stu-02', batch_id: 'batch-03', status: 'active', enrolled_at: new Date('2024-06-10') },
    { id: 'enr-03', student_id: 'usr-stu-03', batch_id: 'batch-01', status: 'active', enrolled_at: new Date('2025-08-01') },
    { id: 'enr-04', student_id: 'usr-stu-04', batch_id: 'batch-04', status: 'active', enrolled_at: new Date('2024-01-10') },
    { id: 'enr-05', student_id: 'usr-stu-05', batch_id: 'batch-02', status: 'active', enrolled_at: new Date('2025-03-20') },
  ],
  attendance: [
    { id: 'att-01', batch_id: 'batch-02', student_id: 'usr-stu-01', date: new Date('2026-03-01'), status: 'present', remarks: 'Good posture' },
    { id: 'att-02', batch_id: 'batch-02', student_id: 'usr-stu-05', date: new Date('2026-03-01'), status: 'present', remarks: null },
    { id: 'att-03', batch_id: 'batch-03', student_id: 'usr-stu-02', date: new Date('2026-03-01'), status: 'present', remarks: 'Nattuvangam practice' },
    { id: 'att-04', batch_id: 'batch-01', student_id: 'usr-stu-03', date: new Date('2026-03-01'), status: 'present', remarks: 'Thattadavu test passed' },
    { id: 'att-05', batch_id: 'batch-04', student_id: 'usr-stu-04', date: new Date('2026-03-01'), status: 'present', remarks: 'Full Margam run' },
  ],
  fees: [
    { id: 'fee-01', student_id: 'usr-stu-01', batch_id: 'batch-02', amount: 2400, due_date: new Date('2026-04-05'), paid_date: new Date('2026-03-25'), status: 'paid', invoice_number: 'SR-2026-001' },
    { id: 'fee-02', student_id: 'usr-stu-02', batch_id: 'batch-03', amount: 3200, due_date: new Date('2026-04-05'), paid_date: new Date('2026-03-26'), status: 'paid', invoice_number: 'SR-2026-002' },
    { id: 'fee-03', student_id: 'usr-stu-03', batch_id: 'batch-01', amount: 1800, due_date: new Date('2026-04-05'), paid_date: null, status: 'pending', invoice_number: 'SR-2026-003' },
    { id: 'fee-04', student_id: 'usr-stu-04', batch_id: 'batch-04', amount: 4500, due_date: new Date('2026-04-05'), paid_date: new Date('2026-03-20'), status: 'paid', invoice_number: 'SR-2026-004' },
    { id: 'fee-05', student_id: 'usr-stu-05', batch_id: 'batch-02', amount: 2400, due_date: new Date('2026-03-05'), paid_date: null, status: 'overdue', invoice_number: 'SR-2026-005' },
  ],
  events: [
    {
      id: 'ev-01',
      title: 'Mahashivratri Natyanjali Utsav 2026',
      description: 'Grand disciples offering to Lord Nataraja featuring all batch levels in traditional temple costumes.',
      date: new Date('2026-02-15'),
      location: 'Sivakasi Town Hall Auditorium',
      image_url: '/BG1.png',
      created_at: new Date('2026-01-10'),
    },
    {
      id: 'ev-02',
      title: 'Salangai Pooja Samarpanam',
      description: 'Holy blessing ceremony for beginner disciples receiving their first bronze bells (ghungroos).',
      date: new Date('2026-05-10'),
      location: 'Sri Ruthraalayaa Central Mandapam, Thiruthangal',
      image_url: '/BG.2.png',
      created_at: new Date('2026-02-01'),
    },
    {
      id: 'ev-03',
      title: 'Solo Arangetram Debut - Meera Natarajan',
      description: 'Debut solo recital presenting the complete Margam accompanied by live Carnatic orchestra.',
      date: new Date('2026-07-20'),
      location: 'Kamarajar Kalai Arangam, Virudhunagar',
      image_url: '/BG1.png',
      created_at: new Date('2026-02-20'),
    },
  ],
  notices: [
    {
      id: 'not-01',
      title: 'Costume & Jewellery Measurements for Annual Fest',
      message: 'All students participating in the upcoming festival must submit their tailoring measurements by Friday.',
      target: 'all',
      batch_id: null,
      created_at: new Date('2026-03-15'),
    },
    {
      id: 'not-02',
      title: 'Special Adavu Workshop with Guru Sridevi',
      message: 'Intensive footwork and Nattuvangam masterclass for Intermediate and Advanced students.',
      target: 'all',
      batch_id: null,
      created_at: new Date('2026-03-20'),
    },
  ],
  gallery: [
    {
      id: 'gal-01',
      title: 'Mahashivratri Natyanjali 2026 Performance',
      category: 'performances',
      media_url: '/BG1.png',
      media_type: 'image',
      uploaded_at: new Date('2026-02-20'),
    },
    {
      id: 'gal-02',
      title: 'Salangai Pooja Blessing Ceremony',
      category: 'salangai-pooja',
      media_url: '/BG.2.png',
      media_type: 'image',
      uploaded_at: new Date('2026-01-15'),
    },
    {
      id: 'gal-03',
      title: 'Arangetram Margam Solo Recital',
      category: 'arangetram',
      media_url: '/BG1.png',
      media_type: 'image',
      uploaded_at: new Date('2025-11-10'),
    },
    {
      id: 'gal-04',
      title: 'Daily Sadhana & Footwork Practice',
      category: 'classroom',
      media_url: '/BG.2.png',
      media_type: 'image',
      uploaded_at: new Date('2026-03-01'),
    },
  ],
  adminActivities: [
    {
      id: 'act-01',
      action: 'LOGIN',
      entity_type: 'auth',
      entity_id: 'usr-admin-01',
      title: 'Admin Session Authenticated',
      details: 'Guru Nattiyakalaimani R. Sridevi logged into executive dashboard',
      admin_id: 'usr-admin-01',
      admin_name: 'Guru Nattiyakalaimani R. Sridevi',
      created_at: new Date('2026-03-26T10:00:00Z'),
    },
    {
      id: 'act-02',
      action: 'FEE_RECEIVED',
      entity_type: 'fee',
      entity_id: 'fee-01',
      title: 'Tuition Fee Collected',
      details: 'Recorded ₹2,400 monthly payment for Ananya Ramachandran (Invoice #SR-2026-001)',
      admin_id: 'usr-admin-01',
      admin_name: 'Guru Nattiyakalaimani R. Sridevi',
      created_at: new Date('2026-03-25T14:30:00Z'),
    },
    {
      id: 'act-03',
      action: 'BATCH_REASSIGNED',
      entity_type: 'batch',
      entity_id: 'batch-02',
      title: 'Disciple Promoted to Intermediate Batch',
      details: 'Swetha Balaji promoted to Madhyama Batch upon mastering 30 primary Adavus',
      admin_id: 'usr-admin-01',
      admin_name: 'Guru Nattiyakalaimani R. Sridevi',
      created_at: new Date('2026-03-20T11:15:00Z'),
    },
    {
      id: 'act-04',
      action: 'STUDENT_APPROVAL',
      entity_type: 'student',
      entity_id: 'usr-stu-03',
      title: 'Disciple Application Verified',
      details: 'Approved admission for Kavya Krishnan in Bala Natya batch',
      admin_id: 'usr-admin-01',
      admin_name: 'Guru Nattiyakalaimani R. Sridevi',
      created_at: new Date('2026-03-18T09:45:00Z'),
    },
  ],
  chatbotLogs: [],
};

// -------------------------------------------------------------
// Native PostgreSQL Database Query Helpers (Replaces Prisma ORM)
// -------------------------------------------------------------

async function queryPg(text, params) {
  if (!pool) throw new Error('PostgreSQL pool not available');
  return await pool.query(text, params);
}

// User Model Helpers
const userModel = {
  findUnique: async ({ where }) => {
    if (where.email) {
      const res = await queryPg('SELECT * FROM users WHERE LOWER(email) = LOWER($1) LIMIT 1', [where.email]);
      return res.rows[0] || null;
    }
    if (where.id) {
      const res = await queryPg('SELECT * FROM users WHERE id = $1 LIMIT 1', [where.id]);
      return res.rows[0] || null;
    }
    return null;
  },
  findFirst: async ({ where }) => {
    return await userModel.findUnique({ where });
  },
  findMany: async ({ where = {}, orderBy, take } = {}) => {
    let sql = 'SELECT * FROM users WHERE 1=1';
    const params = [];
    if (where.role) {
      params.push(where.role);
      sql += ` AND role = $${params.length}`;
    }
    if (where.status) {
      params.push(where.status);
      sql += ` AND status = $${params.length}`;
    }
    if (where.OR && Array.isArray(where.OR)) {
      const orClauses = where.OR.map(o => {
        const key = Object.keys(o)[0];
        const val = o[key]?.contains || '';
        params.push(`%${val}%`);
        return `${key} ILIKE $${params.length}`;
      });
      if (orClauses.length > 0) {
        sql += ` AND (${orClauses.join(' OR ')})`;
      }
    }
    sql += ' ORDER BY created_at DESC';
    if (take) {
      params.push(take);
      sql += ` LIMIT $${params.length}`;
    }
    const res = await queryPg(sql, params);
    const users = res.rows;

    // Attach relational enrollments, fees, attendance if requested
    for (const u of users) {
      const enrRes = await queryPg(
        `SELECT e.*, b.name as batch_name, b.level as batch_level, b.fee_amount, b.schedule_days, b.schedule_time 
         FROM enrollments e 
         LEFT JOIN batches b ON e.batch_id = b.id 
         WHERE e.student_id = $1`,
        [u.id]
      );
      u.enrollments = enrRes.rows.map(r => ({
        id: r.id,
        batch_id: r.batch_id,
        student_id: r.student_id,
        status: r.status,
        batch: {
          id: r.batch_id,
          name: r.batch_name,
          level: r.batch_level,
          fee_amount: Number(r.fee_amount || 0),
          schedule_days: r.schedule_days,
          schedule_time: r.schedule_time,
        }
      }));

      const feeRes = await queryPg('SELECT * FROM fees WHERE student_id = $1 ORDER BY due_date DESC LIMIT 5', [u.id]);
      u.fees = feeRes.rows.map(f => ({ ...f, amount: Number(f.amount) }));

      const attRes = await queryPg('SELECT * FROM attendance WHERE student_id = $1 ORDER BY date DESC LIMIT 30', [u.id]);
      u.attendances = attRes.rows;
    }
    return users;
  },
  create: async ({ data }) => {
    const id = data.id || `usr-${crypto.randomUUID()}`;
    const res = await queryPg(
      `INSERT INTO users (id, name, email, password_hash, phone, role, status, profile_photo_url, created_at, updated_at) 
       VALUES ($1, $2, LOWER($3), $4, $5, $6, $7, $8, NOW(), NOW()) RETURNING *`,
      [id, data.name, data.email, data.password_hash, data.phone || null, data.role || 'student', data.status || 'active', data.profile_photo_url || null]
    );
    return res.rows[0];
  },
  update: async ({ where, data }) => {
    const fields = [];
    const params = [];
    for (const [key, val] of Object.entries(data)) {
      params.push(val);
      fields.push(`${key} = $${params.length}`);
    }
    params.push(where.id);
    const sql = `UPDATE users SET ${fields.join(', ')}, updated_at = NOW() WHERE id = $${params.length} RETURNING *`;
    const res = await queryPg(sql, params);
    return res.rows[0];
  },
  delete: async ({ where }) => {
    const res = await queryPg('DELETE FROM users WHERE id = $1 RETURNING *', [where.id]);
    return res.rows[0];
  }
};

// Batch Model Helpers
const batchModel = {
  findMany: async ({ where, orderBy } = {}) => {
    const res = await queryPg('SELECT * FROM batches ORDER BY name ASC');
    const batches = res.rows.map(b => ({ ...b, fee_amount: Number(b.fee_amount) }));
    
    // Attach active student enrollments
    for (const b of batches) {
      const enrRes = await queryPg(
        `SELECT e.*, u.name, u.email, u.phone, u.profile_photo_url 
         FROM enrollments e 
         JOIN users u ON e.student_id = u.id 
         WHERE e.batch_id = $1 AND e.status = 'active'`,
        [b.id]
      );
      b.enrollments = enrRes.rows.map(r => ({
        id: r.id,
        status: r.status,
        student: {
          id: r.student_id,
          name: r.name,
          email: r.email,
          phone: r.phone,
          profile_photo_url: r.profile_photo_url,
        }
      }));
    }
    return batches;
  },
  findUnique: async ({ where }) => {
    const res = await queryPg('SELECT * FROM batches WHERE id = $1 LIMIT 1', [where.id]);
    if (!res.rows[0]) return null;
    const b = { ...res.rows[0], fee_amount: Number(res.rows[0].fee_amount) };
    const enrRes = await queryPg(
      `SELECT e.*, u.name, u.email, u.phone, u.profile_photo_url 
       FROM enrollments e 
       JOIN users u ON e.student_id = u.id 
       WHERE e.batch_id = $1 AND e.status = 'active'`,
      [b.id]
    );
    b.enrollments = enrRes.rows.map(r => ({
      id: r.id,
      status: r.status,
      student: {
        id: r.student_id,
        name: r.name,
        email: r.email,
        phone: r.phone,
        profile_photo_url: r.profile_photo_url,
      }
    }));
    return b;
  },
  create: async ({ data }) => {
    const id = data.id || `batch-${crypto.randomUUID()}`;
    const res = await queryPg(
      `INSERT INTO batches (id, name, level, instructor_name, schedule_days, schedule_time, fee_amount, created_at) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, NOW()) RETURNING *`,
      [id, data.name, data.level, data.instructor_name, data.schedule_days, data.schedule_time, data.fee_amount]
    );
    return { ...res.rows[0], fee_amount: Number(res.rows[0].fee_amount) };
  },
  update: async ({ where, data }) => {
    const fields = [];
    const params = [];
    for (const [key, val] of Object.entries(data)) {
      params.push(val);
      fields.push(`${key} = $${params.length}`);
    }
    params.push(where.id);
    const sql = `UPDATE batches SET ${fields.join(', ')} WHERE id = $${params.length} RETURNING *`;
    const res = await queryPg(sql, params);
    return res.rows[0] ? { ...res.rows[0], fee_amount: Number(res.rows[0].fee_amount) } : null;
  },
  delete: async ({ where }) => {
    const res = await queryPg('DELETE FROM batches WHERE id = $1 RETURNING *', [where.id]);
    return res.rows[0];
  }
};

// Enrollment Model Helpers
const enrollmentModel = {
  findMany: async ({ where = {} } = {}) => {
    let sql = 'SELECT * FROM enrollments WHERE 1=1';
    const params = [];
    if (where.student_id) {
      params.push(where.student_id);
      sql += ` AND student_id = $${params.length}`;
    }
    if (where.batch_id) {
      params.push(where.batch_id);
      sql += ` AND batch_id = $${params.length}`;
    }
    if (where.status) {
      params.push(where.status);
      sql += ` AND status = $${params.length}`;
    }
    const res = await queryPg(sql, params);
    return res.rows;
  },
  findFirst: async ({ where }) => {
    const rows = await enrollmentModel.findMany({ where });
    return rows[0] || null;
  },
  create: async ({ data }) => {
    const id = data.id || `enr-${crypto.randomUUID()}`;
    const res = await queryPg(
      `INSERT INTO enrollments (id, student_id, batch_id, status, enrolled_at) 
       VALUES ($1, $2, $3, $4, NOW()) RETURNING *`,
      [id, data.student_id, data.batch_id, data.status || 'active']
    );
    return res.rows[0];
  },
  update: async ({ where, data }) => {
    const res = await queryPg('UPDATE enrollments SET batch_id = $1, status = $2 WHERE id = $3 RETURNING *', [
      data.batch_id,
      data.status || 'active',
      where.id,
    ]);
    return res.rows[0];
  },
  upsert: async ({ where, update, create }) => {
    const existing = await enrollmentModel.findFirst({ where: { student_id: create.student_id } });
    if (existing) {
      return await enrollmentModel.update({ where: { id: existing.id }, data: update });
    }
    return await enrollmentModel.create({ data: create });
  },
  delete: async ({ where }) => {
    const res = await queryPg('DELETE FROM enrollments WHERE id = $1 RETURNING *', [where.id]);
    return res.rows[0];
  },
  deleteMany: async ({ where }) => {
    let sql = 'DELETE FROM enrollments WHERE 1=1';
    const params = [];
    if (where.student_id) {
      params.push(where.student_id);
      sql += ` AND student_id = $${params.length}`;
    }
    return await queryPg(sql, params);
  }
};

// Attendance Model Helpers
const attendanceModel = {
  findMany: async ({ where = {}, orderBy, take } = {}) => {
    let sql = 'SELECT * FROM attendance WHERE 1=1';
    const params = [];
    if (where.batch_id) {
      params.push(where.batch_id);
      sql += ` AND batch_id = $${params.length}`;
    }
    if (where.student_id) {
      params.push(where.student_id);
      sql += ` AND student_id = $${params.length}`;
    }
    if (where.date) {
      params.push(where.date);
      sql += ` AND date = $${params.length}`;
    }
    sql += ' ORDER BY date DESC';
    if (take) {
      params.push(take);
      sql += ` LIMIT $${params.length}`;
    }
    const res = await queryPg(sql, params);
    return res.rows;
  },
  create: async ({ data }) => {
    const id = data.id || `att-${crypto.randomUUID()}`;
    const res = await queryPg(
      `INSERT INTO attendance (id, batch_id, student_id, date, status, remarks, created_at) 
       VALUES ($1, $2, $3, $4, $5, $6, NOW()) RETURNING *`,
      [id, data.batch_id, data.student_id, data.date, data.status, data.remarks || null]
    );
    return res.rows[0];
  },
  upsert: async ({ where, update, create }) => {
    const check = await queryPg(
      'SELECT id FROM attendance WHERE student_id = $1 AND batch_id = $2 AND date = $3 LIMIT 1',
      [create.student_id, create.batch_id, create.date]
    );
    if (check.rows.length > 0) {
      const res = await queryPg(
        'UPDATE attendance SET status = $1, remarks = $2 WHERE id = $3 RETURNING *',
        [update.status, update.remarks || null, check.rows[0].id]
      );
      return res.rows[0];
    }
    return await attendanceModel.create({ data: create });
  }
};

// Fee Model Helpers
const feeModel = {
  findMany: async ({ where = {}, orderBy, take } = {}) => {
    let sql = `
      SELECT f.*, u.name as student_name, u.email as student_email, b.name as batch_name 
      FROM fees f 
      LEFT JOIN users u ON f.student_id = u.id 
      LEFT JOIN batches b ON f.batch_id = b.id 
      WHERE 1=1
    `;
    const params = [];
    if (where.student_id) {
      params.push(where.student_id);
      sql += ` AND f.student_id = $${params.length}`;
    }
    if (where.status) {
      params.push(where.status);
      sql += ` AND f.status = $${params.length}`;
    }
    sql += ' ORDER BY f.due_date DESC';
    if (take) {
      params.push(take);
      sql += ` LIMIT $${params.length}`;
    }
    const res = await queryPg(sql, params);
    return res.rows.map(f => ({
      ...f,
      amount: Number(f.amount),
      student: { name: f.student_name, email: f.student_email },
      batch: { name: f.batch_name },
    }));
  },
  findUnique: async ({ where }) => {
    const res = await queryPg(
      `SELECT f.*, u.name as student_name, u.email as student_email, b.name as batch_name 
       FROM fees f 
       LEFT JOIN users u ON f.student_id = u.id 
       LEFT JOIN batches b ON f.batch_id = b.id 
       WHERE f.id = $1 LIMIT 1`,
      [where.id]
    );
    if (!res.rows[0]) return null;
    const f = res.rows[0];
    return {
      ...f,
      amount: Number(f.amount),
      student: { name: f.student_name, email: f.student_email },
      batch: { name: f.batch_name },
    };
  },
  create: async ({ data }) => {
    const id = data.id || `fee-${crypto.randomUUID()}`;
    const invoice = data.invoice_number || `SR-${Date.now().toString().slice(-6)}`;
    const res = await queryPg(
      `INSERT INTO fees (id, student_id, batch_id, amount, due_date, paid_date, status, invoice_number, remarks, created_at) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW()) RETURNING *`,
      [id, data.student_id, data.batch_id, data.amount, data.due_date, data.paid_date || null, data.status || 'pending', invoice, data.remarks || null]
    );
    return { ...res.rows[0], amount: Number(res.rows[0].amount) };
  },
  update: async ({ where, data }) => {
    const fields = [];
    const params = [];
    for (const [key, val] of Object.entries(data)) {
      params.push(val);
      fields.push(`${key} = $${params.length}`);
    }
    params.push(where.id);
    const sql = `UPDATE fees SET ${fields.join(', ')} WHERE id = $${params.length} RETURNING *`;
    const res = await queryPg(sql, params);
    return res.rows[0] ? { ...res.rows[0], amount: Number(res.rows[0].amount) } : null;
  },
  delete: async ({ where }) => {
    const res = await queryPg('DELETE FROM fees WHERE id = $1 RETURNING *', [where.id]);
    return res.rows[0];
  }
};

// Event Model Helpers
const eventModel = {
  findMany: async ({ where = {}, orderBy, take } = {}) => {
    let sql = 'SELECT * FROM events ORDER BY date ASC';
    const params = [];
    if (take) {
      params.push(take);
      sql += ` LIMIT $${params.length}`;
    }
    const res = await queryPg(sql, params);
    return res.rows;
  },
  findUnique: async ({ where }) => {
    const res = await queryPg('SELECT * FROM events WHERE id = $1 LIMIT 1', [where.id]);
    return res.rows[0] || null;
  },
  create: async ({ data }) => {
    const id = data.id || `ev-${crypto.randomUUID()}`;
    const res = await queryPg(
      `INSERT INTO events (id, title, description, date, location, image_url, created_at) 
       VALUES ($1, $2, $3, $4, $5, $6, NOW()) RETURNING *`,
      [id, data.title, data.description || '', data.date, data.location, data.image_url || '/BG1.png']
    );
    return res.rows[0];
  },
  update: async ({ where, data }) => {
    const fields = [];
    const params = [];
    for (const [key, val] of Object.entries(data)) {
      params.push(val);
      fields.push(`${key} = $${params.length}`);
    }
    params.push(where.id);
    const sql = `UPDATE events SET ${fields.join(', ')} WHERE id = $${params.length} RETURNING *`;
    const res = await queryPg(sql, params);
    return res.rows[0];
  },
  delete: async ({ where }) => {
    const res = await queryPg('DELETE FROM events WHERE id = $1 RETURNING *', [where.id]);
    return res.rows[0];
  }
};

// Notice Model Helpers
const noticeModel = {
  findMany: async ({ where = {}, orderBy } = {}) => {
    let sql = 'SELECT * FROM notices WHERE 1=1';
    const params = [];
    if (where.target) {
      params.push(where.target);
      sql += ` AND (target = $${params.length} OR target = 'all')`;
    }
    sql += ' ORDER BY created_at DESC';
    const res = await queryPg(sql, params);
    return res.rows;
  },
  findUnique: async ({ where }) => {
    const res = await queryPg('SELECT * FROM notices WHERE id = $1 LIMIT 1', [where.id]);
    return res.rows[0] || null;
  },
  create: async ({ data }) => {
    const id = data.id || `not-${crypto.randomUUID()}`;
    const res = await queryPg(
      `INSERT INTO notices (id, title, message, target, batch_id, created_at) 
       VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING *`,
      [id, data.title, data.message, data.target || 'all', data.batch_id || null]
    );
    return res.rows[0];
  },
  delete: async ({ where }) => {
    const res = await queryPg('DELETE FROM notices WHERE id = $1 RETURNING *', [where.id]);
    return res.rows[0];
  }
};

// Gallery Model Helpers
const galleryModel = {
  findMany: async ({ where = {}, orderBy } = {}) => {
    let sql = 'SELECT * FROM gallery_media WHERE 1=1';
    const params = [];
    if (where.category && where.category !== 'all') {
      params.push(where.category);
      sql += ` AND category = $${params.length}`;
    }
    if (where.media_type && where.media_type !== 'all') {
      params.push(where.media_type);
      sql += ` AND media_type = $${params.length}`;
    }
    sql += ' ORDER BY created_at DESC';
    const res = await queryPg(sql, params);
    return res.rows.map(g => ({ ...g, uploaded_at: g.created_at }));
  },
  findUnique: async ({ where }) => {
    const res = await queryPg('SELECT * FROM gallery_media WHERE id = $1 LIMIT 1', [where.id]);
    return res.rows[0] ? { ...res.rows[0], uploaded_at: res.rows[0].created_at } : null;
  },
  create: async ({ data }) => {
    const id = data.id || `gal-${crypto.randomUUID()}`;
    const res = await queryPg(
      `INSERT INTO gallery_media (id, title, category, media_url, media_type, created_at) 
       VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING *`,
      [id, data.title, data.category, data.media_url, data.media_type || 'image']
    );
    return { ...res.rows[0], uploaded_at: res.rows[0].created_at };
  },
  update: async ({ where, data }) => {
    const fields = [];
    const params = [];
    for (const [key, val] of Object.entries(data)) {
      params.push(val);
      fields.push(`${key} = $${params.length}`);
    }
    params.push(where.id);
    const sql = `UPDATE gallery_media SET ${fields.join(', ')} WHERE id = $${params.length} RETURNING *`;
    const res = await queryPg(sql, params);
    return res.rows[0] ? { ...res.rows[0], uploaded_at: res.rows[0].created_at } : null;
  },
  delete: async ({ where }) => {
    const res = await queryPg('DELETE FROM gallery_media WHERE id = $1 RETURNING *', [where.id]);
    return res.rows[0];
  }
};

// Admin Activity Model Helpers
const adminActivityModel = {
  findMany: async ({ where = {}, orderBy, take } = {}) => {
    let sql = 'SELECT * FROM admin_activities WHERE 1=1';
    const params = [];
    if (where.action) {
      params.push(where.action);
      sql += ` AND action = $${params.length}`;
    }
    if (where.entity_type) {
      params.push(where.entity_type);
      sql += ` AND entity_type = $${params.length}`;
    }
    sql += ' ORDER BY created_at DESC';
    if (take) {
      params.push(take);
      sql += ` LIMIT $${params.length}`;
    }
    const res = await queryPg(sql, params);
    return res.rows;
  },
  create: async ({ data }) => {
    const id = data.id || `act-${crypto.randomUUID()}`;
    const res = await queryPg(
      `INSERT INTO admin_activities (id, action, entity_type, entity_id, title, details, admin_id, admin_name, ip_address, user_agent, created_at) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW()) RETURNING *`,
      [id, data.action, data.entity_type, data.entity_id || null, data.title, data.details || null, data.admin_id || null, data.admin_name || null, data.ip_address || null, data.user_agent || null]
    );
    return res.rows[0];
  },
  count: async () => {
    const res = await queryPg('SELECT COUNT(*) FROM admin_activities');
    return parseInt(res.rows[0].count, 10);
  }
};

// Chatbot Log Helpers
const chatbotLogModel = {
  findMany: async ({ where = {}, orderBy, take } = {}) => {
    let sql = 'SELECT * FROM chatbot_logs ORDER BY created_at DESC';
    const params = [];
    if (take) {
      params.push(take);
      sql += ` LIMIT $${params.length}`;
    }
    const res = await queryPg(sql, params);
    return res.rows;
  },
  create: async ({ data }) => {
    const id = data.id || `chat-${crypto.randomUUID()}`;
    const res = await queryPg(
      `INSERT INTO chatbot_logs (id, user_message, bot_response, category, session_id, created_at) 
       VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING *`,
      [id, data.user_message, data.bot_response, data.category || 'general', data.session_id || null]
    );
    return res.rows[0];
  }
};

// Consolidated Native PG Adapter
// Exported as 'db' and aliased to 'prisma' for 100% backward-compatibility across all existing controllers
const nativePgDb = {
  user: userModel,
  batch: batchModel,
  enrollment: enrollmentModel,
  attendance: attendanceModel,
  fee: feeModel,
  event: eventModel,
  notice: noticeModel,
  gallery: galleryModel,
  galleryMedia: galleryModel,
  adminActivity: adminActivityModel,
  chatbotLog: chatbotLogModel,
  $queryRaw: queryPg,
};

// Activity logging helper
async function recordAdminActivity(params) {
  try {
    if (isDbConnected && pool) {
      return await adminActivityModel.create({ data: params });
    }
  } catch (err) {
    console.warn('DB activity logging fallback:', err.message);
  }
  // Memory fallback
  const fallbackRecord = {
    id: `act-${Date.now()}`,
    ...params,
    created_at: new Date(),
  };
  fallbackStore.adminActivities.unshift(fallbackRecord);
  if (fallbackStore.adminActivities.length > 500) {
    fallbackStore.adminActivities.pop();
  }
  return fallbackRecord;
}

function getAdminInfoFromReq(req) {
  return {
    admin_id: req.user?.id || 'admin-system',
    admin_name: req.user?.name || 'Administrator',
    ip_address: req.ip || req.headers['x-forwarded-for'] || '127.0.0.1',
    user_agent: req.headers['user-agent'] || 'Academy-Portal',
  };
}

async function getAdminActivities({ limit = 50, entity_type, action, search } = {}) {
  try {
    if (isDbConnected && pool) {
      return await adminActivityModel.findMany({
        where: {
          ...(entity_type && entity_type !== 'all' ? { entity_type } : {}),
          ...(action && action !== 'all' ? { action } : {}),
        },
        take: limit,
      });
    }
  } catch (e) {
    console.warn('Native pg activity query fallback:', e.message);
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
      (a.details && a.details.toLowerCase().includes(q)) ||
      (a.admin_name && a.admin_name.toLowerCase().includes(q))
    );
  }
  return list.slice(0, limit);
}

async function checkDatabaseConnection() {
  if (!pool) return false;
  try {
    const connectPromise = pool.query('SELECT NOW()');
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Connection timed out')), 4000)
    );
    await Promise.race([connectPromise, timeoutPromise]);
    isDbConnected = true;
    console.log('✅ PostgreSQL / Neon DB connected successfully via native pg driver (No Prisma required)');
    return true;
  } catch (err) {
    isDbConnected = false;
    console.warn('ℹ️ PostgreSQL connection deferred; operating in resilient fallback mode:', err.message);
    return false;
  }
}

module.exports = {
  db: nativePgDb,
  prisma: nativePgDb, // Aliased for seamless compatibility across existing controllers
  pool,
  fallbackStore,
  getIsPrismaConnected: () => isDbConnected,
  getIsDbConnected: () => isDbConnected,
  checkDatabaseConnection,
  recordAdminActivity,
  getAdminActivities,
  getAdminInfoFromReq,
};
