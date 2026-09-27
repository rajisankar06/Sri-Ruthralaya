const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const isProduction = process.env.NODE_ENV === 'production';
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

// In-memory fallback store initialized with academy data for local development only
const fallbackStore = {
  users: [
    {
      id: '374a6ea5-21cb-4f19-a436-aa8195e52d74',
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
      id: '8aa1cbb0-d89e-40f2-bccb-4a2169ce7c43',
      name: 'Smt. Priyadarshini M. (BFA Dance)',
      email: 'instructor@sriruthralaya.com',
      role: 'staff',
      phone: '+91 98422 67890',
      profile_photo_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      status: 'active',
      created_at: new Date('2024-03-01'),
    },
    {
      id: 'f6ad9824-b6c4-4e06-b786-f65ad703fd4e',
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
      id: '5388176f-27ed-4349-a8f7-42f3b4ceae18',
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
      id: '761add1a-7215-4ceb-bbde-374587cb174a',
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
      id: 'ce156693-c97b-4f68-ba46-79cd13341b15',
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
      id: '612dcc97-2a9f-483f-b7b0-69c4a73aec21',
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
      id: '28b57a56-b1ee-416b-9b3f-f7149d8d6edf',
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
      id: 'd979992a-24b4-41d2-bd34-1709097d3d43',
      name: 'Bala Natya (Beginner Adavus)',
      level: 'Beginner',
      instructor_name: 'Guru Nattiyakalaimani R. Sridevi',
      schedule_days: 'Mon, Wed, Fri',
      schedule_time: '04:30 PM - 05:30 PM',
      fee_amount: 1800,
      created_at: new Date('2024-01-01'),
    },
    {
      id: '60a372cb-6a05-48b8-8dec-808abee75659',
      name: 'Madhyama (Intermediate Jatiswaram & Shabdam)',
      level: 'Intermediate',
      instructor_name: 'Smt. Priyadarshini M.',
      schedule_days: 'Tue, Thu, Sat',
      schedule_time: '05:30 PM - 07:00 PM',
      fee_amount: 2400,
      created_at: new Date('2024-01-01'),
    },
    {
      id: '01797166-7685-4641-824c-d898c29786a4',
      name: 'Visharada (Advanced Varnam & Padam)',
      level: 'Advanced',
      instructor_name: 'Guru Nattiyakalaimani R. Sridevi',
      schedule_days: 'Saturday, Sunday',
      schedule_time: '08:00 AM - 10:30 AM',
      fee_amount: 3200,
      created_at: new Date('2024-01-01'),
    },
    {
      id: '22a16b97-4584-4865-84db-99fc59482bdd',
      name: 'Arangetram Margam Intensive',
      level: 'Arangetram Prep',
      instructor_name: 'Guru Nattiyakalaimani R. Sridevi',
      schedule_days: 'Saturday, Sunday',
      schedule_time: '04:00 PM - 07:00 PM',
      fee_amount: 4500,
      created_at: new Date('2024-01-01'),
    },
  ],
  enrollments: [],
  attendances: [],
  fees: [],
  events: [],
  notices: [],
  gallery: [],
  adminActivities: [],
  chatbotLogs: [],
  passwordResets: [],
};

// -------------------------------------------------------------
// Native PostgreSQL Database Query Functions
// -------------------------------------------------------------

async function queryPg(text, params) {
  if (!pool) {
    if (isProduction) {
      const err = new Error('Database service is unavailable. Connection pool is not initialized.');
      err.statusCode = 503;
      throw err;
    }
    throw new Error('PostgreSQL pool not available');
  }
  try {
    return await pool.query(text, params);
  } catch (err) {
    if (isProduction) {
      console.error('❌ PostgreSQL Query Error in production:', err.message, text);
    }
    throw err;
  }
}

// -------------------------------------------------------------
// Native PostgreSQL Model Implementations
// -------------------------------------------------------------

// User Model
const userModel = {
  count: async ({ where = {} } = {}) => {
    let sql = 'SELECT COUNT(*)::int as count FROM users WHERE 1=1';
    const params = [];
    if (where.role) {
      params.push(where.role);
      sql += ` AND role = $${params.length}`;
    }
    if (where.status) {
      params.push(where.status);
      sql += ` AND status = $${params.length}`;
    }
    const res = await queryPg(sql, params);
    return res.rows[0].count;
  },

  findUnique: async ({ where, include } = {}) => {
    if (!where) return null;
    let res;
    if (where.email) {
      res = await queryPg('SELECT * FROM users WHERE LOWER(email) = LOWER($1) LIMIT 1', [where.email]);
    } else if (where.id) {
      res = await queryPg('SELECT * FROM users WHERE id = $1 LIMIT 1', [where.id]);
    }
    if (!res || !res.rows[0]) return null;
    const user = res.rows[0];

    // If relations included or requested
    if (include && include.enrollments) {
      const enrRes = await queryPg(
        `SELECT e.*, b.name as batch_name, b.level as batch_level, b.schedule_days, b.schedule_time, b.fee_amount 
         FROM enrollments e 
         LEFT JOIN batches b ON e.batch_id = b.id 
         WHERE e.student_id = $1`,
        [user.id]
      );
      user.enrollments = enrRes.rows.map(r => ({
        id: r.id,
        student_id: r.student_id,
        batch_id: r.batch_id,
        status: r.status,
        joined_date: r.joined_date,
        batch: {
          id: r.batch_id,
          name: r.batch_name,
          level: r.batch_level,
          schedule_days: r.schedule_days,
          schedule_time: r.schedule_time,
          fee_amount: Number(r.fee_amount || 0),
        },
      }));
    }

    return user;
  },

  findFirst: async ({ where, include } = {}) => {
    return await userModel.findUnique({ where, include });
  },

  findMany: async ({ where = {}, include, orderBy, take } = {}) => {
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

    if (include) {
      for (const u of users) {
        if (include.enrollments) {
          const enrRes = await queryPg(
            `SELECT e.*, b.name as batch_name, b.level as batch_level, b.schedule_days, b.schedule_time, b.fee_amount 
             FROM enrollments e 
             LEFT JOIN batches b ON e.batch_id = b.id 
             WHERE e.student_id = $1`,
            [u.id]
          );
          u.enrollments = enrRes.rows.map(r => ({
            id: r.id,
            student_id: r.student_id,
            batch_id: r.batch_id,
            status: r.status,
            joined_date: r.joined_date,
            batch: {
              id: r.batch_id,
              name: r.batch_name,
              level: r.batch_level,
              schedule_days: r.schedule_days,
              schedule_time: r.schedule_time,
              fee_amount: Number(r.fee_amount || 0),
            },
          }));
        }

        if (include.fees) {
          const feeRes = await queryPg('SELECT * FROM fees WHERE student_id = $1 ORDER BY due_date DESC LIMIT 5', [u.id]);
          u.fees = feeRes.rows.map(f => ({ ...f, amount: Number(f.amount) }));
        }

        if (include.attendances) {
          const attRes = await queryPg('SELECT * FROM attendances WHERE student_id = $1 ORDER BY date DESC LIMIT 30', [u.id]);
          u.attendances = attRes.rows;
        }
      }
    }

    return users;
  },

  create: async ({ data }) => {
    const id = data.id || crypto.randomUUID();
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
    params.push(where.id || where.email);
    const identifier = where.id ? 'id' : 'LOWER(email) = LOWER';
    const sql = `UPDATE users SET ${fields.join(', ')}, updated_at = NOW() WHERE ${identifier === 'id' ? `id = $${params.length}` : `${identifier}($${params.length})`} RETURNING *`;
    const res = await queryPg(sql, params);
    return res.rows[0];
  },

  delete: async ({ where }) => {
    const res = await queryPg('DELETE FROM users WHERE id = $1 RETURNING *', [where.id]);
    return res.rows[0];
  }
};

// Batch Model
const batchModel = {
  findMany: async ({ where, include, orderBy } = {}) => {
    const res = await queryPg('SELECT * FROM batches ORDER BY name ASC');
    const batches = res.rows.map(b => ({ ...b, fee_amount: Number(b.fee_amount) }));

    if (include && include.enrollments) {
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
          joined_date: r.joined_date,
          student: {
            id: r.student_id,
            name: r.name,
            email: r.email,
            phone: r.phone,
            profile_photo_url: r.profile_photo_url,
          }
        }));
      }
    }
    return batches;
  },

  findUnique: async ({ where, include }) => {
    const res = await queryPg('SELECT * FROM batches WHERE id = $1 LIMIT 1', [where.id]);
    if (!res.rows[0]) return null;
    const b = { ...res.rows[0], fee_amount: Number(res.rows[0].fee_amount) };

    if (include && include.enrollments) {
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
        joined_date: r.joined_date,
        student: {
          id: r.student_id,
          name: r.name,
          email: r.email,
          phone: r.phone,
          profile_photo_url: r.profile_photo_url,
        }
      }));
    }
    return b;
  },

  create: async ({ data }) => {
    const id = data.id || crypto.randomUUID();
    const res = await queryPg(
      `INSERT INTO batches (id, name, level, instructor_name, schedule_days, schedule_time, fee_amount, created_at, updated_at) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW()) RETURNING *`,
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
    const sql = `UPDATE batches SET ${fields.join(', ')}, updated_at = NOW() WHERE id = $${params.length} RETURNING *`;
    const res = await queryPg(sql, params);
    return res.rows[0] ? { ...res.rows[0], fee_amount: Number(res.rows[0].fee_amount) } : null;
  },

  delete: async ({ where }) => {
    const res = await queryPg('DELETE FROM batches WHERE id = $1 RETURNING *', [where.id]);
    return res.rows[0];
  }
};

// Enrollment Model
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
    const id = data.id || crypto.randomUUID();
    const res = await queryPg(
      `INSERT INTO enrollments (id, student_id, batch_id, status, joined_date) 
       VALUES ($1, $2, $3, $4, NOW()) RETURNING *`,
      [id, data.student_id, data.batch_id, data.status || 'active']
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
    const sql = `UPDATE enrollments SET ${fields.join(', ')} WHERE id = $${params.length} RETURNING *`;
    const res = await queryPg(sql, params);
    return res.rows[0];
  },

  upsert: async ({ where, update, create }) => {
    const studentId = create?.student_id || update?.student_id || where?.student_id;
    const existing = await enrollmentModel.findFirst({ where: { student_id: studentId } });
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

// Attendance Model (Table name is 'attendances')
const attendanceModel = {
  findMany: async ({ where = {}, orderBy, take } = {}) => {
    let sql = 'SELECT * FROM attendances WHERE 1=1';
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
    const id = data.id || crypto.randomUUID();
    const res = await queryPg(
      `INSERT INTO attendances (id, batch_id, student_id, date, status, remarks, created_at) 
       VALUES ($1, $2, $3, $4, $5, $6, NOW()) RETURNING *`,
      [id, data.batch_id, data.student_id, data.date, data.status, data.remarks || null]
    );
    return res.rows[0];
  },

  upsert: async ({ where, update, create }) => {
    const check = await queryPg(
      'SELECT id FROM attendances WHERE student_id = $1 AND batch_id = $2 AND date = $3 LIMIT 1',
      [create.student_id, create.batch_id, create.date]
    );
    if (check.rows.length > 0) {
      const res = await queryPg(
        'UPDATE attendances SET status = $1, remarks = $2 WHERE id = $3 RETURNING *',
        [update.status, update.remarks || null, check.rows[0].id]
      );
      return res.rows[0];
    }
    return await attendanceModel.create({ data: create });
  }
};

// Fee Model (Table 'fees', joined with users and enrollments for batch name)
const feeModel = {
  findMany: async ({ where = {}, orderBy, take } = {}) => {
    let sql = `
      SELECT f.*, u.name as student_name, u.email as student_email, b.name as batch_name 
      FROM fees f 
      LEFT JOIN users u ON f.student_id = u.id 
      LEFT JOIN enrollments e ON u.id = e.student_id 
      LEFT JOIN batches b ON e.batch_id = b.id 
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
       LEFT JOIN enrollments e ON u.id = e.student_id 
       LEFT JOIN batches b ON e.batch_id = b.id 
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
    const id = data.id || crypto.randomUUID();
    const res = await queryPg(
      `INSERT INTO fees (id, student_id, amount, due_date, paid_date, status, receipt_url, payment_ref, month, created_at, updated_at) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), NOW()) RETURNING *`,
      [
        id,
        data.student_id,
        data.amount,
        data.due_date,
        data.paid_date || null,
        data.status || 'pending',
        data.receipt_url || null,
        data.payment_ref || null,
        data.month || 'Current Month',
      ]
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
    const sql = `UPDATE fees SET ${fields.join(', ')}, updated_at = NOW() WHERE id = $${params.length} RETURNING *`;
    const res = await queryPg(sql, params);
    return res.rows[0] ? { ...res.rows[0], amount: Number(res.rows[0].amount) } : null;
  },

  delete: async ({ where }) => {
    const res = await queryPg('DELETE FROM fees WHERE id = $1 RETURNING *', [where.id]);
    return res.rows[0];
  }
};

// Event Model (Table 'events', created_by is required)
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
    const id = data.id || crypto.randomUUID();
    const createdBy = data.created_by || '374a6ea5-21cb-4f19-a436-aa8195e52d74';
    const res = await queryPg(
      `INSERT INTO events (id, title, description, date, image_url, location, created_by, created_at, updated_at) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW()) RETURNING *`,
      [id, data.title, data.description || '', data.date, data.image_url || '/BG1.png', data.location || 'Academy Hall', createdBy]
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
    const sql = `UPDATE events SET ${fields.join(', ')}, updated_at = NOW() WHERE id = $${params.length} RETURNING *`;
    const res = await queryPg(sql, params);
    return res.rows[0];
  },

  delete: async ({ where }) => {
    const res = await queryPg('DELETE FROM events WHERE id = $1 RETURNING *', [where.id]);
    return res.rows[0];
  }
};

// Notice Model (Table 'notices')
const noticeModel = {
  findMany: async ({ where = {}, include, orderBy } = {}) => {
    let sql = `
      SELECT n.*, b.name as batch_name, u.name as student_name, u.email as student_email 
      FROM notices n 
      LEFT JOIN batches b ON n.batch_id = b.id 
      LEFT JOIN users u ON n.student_id = u.id 
      WHERE 1=1
    `;
    const params = [];
    if (where.target) {
      params.push(where.target);
      sql += ` AND (n.target = $${params.length} OR n.target = 'all')`;
    }
    sql += ' ORDER BY n.created_at DESC';
    const res = await queryPg(sql, params);
    return res.rows.map(r => ({
      id: r.id,
      title: r.title,
      message: r.message,
      target: r.target,
      batch_id: r.batch_id,
      student_id: r.student_id,
      created_at: r.created_at,
      batch: r.batch_id ? { id: r.batch_id, name: r.batch_name } : null,
      student: r.student_id ? { id: r.student_id, name: r.student_name, email: r.student_email } : null,
    }));
  },

  findUnique: async ({ where }) => {
    const res = await queryPg('SELECT * FROM notices WHERE id = $1 LIMIT 1', [where.id]);
    return res.rows[0] || null;
  },

  create: async ({ data }) => {
    const id = data.id || crypto.randomUUID();
    const res = await queryPg(
      `INSERT INTO notices (id, title, message, target, batch_id, student_id, created_at) 
       VALUES ($1, $2, $3, $4, $5, $6, NOW()) RETURNING *`,
      [id, data.title, data.message, data.target || 'all', data.batch_id || null, data.student_id || null]
    );
    return res.rows[0];
  },

  delete: async ({ where }) => {
    const res = await queryPg('DELETE FROM notices WHERE id = $1 RETURNING *', [where.id]);
    return res.rows[0];
  }
};

// Gallery Model (Table 'gallery', column 'uploaded_at')
const galleryModel = {
  findMany: async ({ where = {}, orderBy } = {}) => {
    let sql = 'SELECT * FROM gallery WHERE 1=1';
    const params = [];
    if (where.category && where.category !== 'all') {
      params.push(where.category);
      sql += ` AND category = $${params.length}`;
    }
    if (where.media_type && where.media_type !== 'all') {
      params.push(where.media_type);
      sql += ` AND media_type = $${params.length}`;
    }
    sql += ' ORDER BY uploaded_at DESC';
    const res = await queryPg(sql, params);
    return res.rows.map(g => ({ ...g, created_at: g.uploaded_at }));
  },

  findUnique: async ({ where }) => {
    const res = await queryPg('SELECT * FROM gallery WHERE id = $1 LIMIT 1', [where.id]);
    return res.rows[0] ? { ...res.rows[0], created_at: res.rows[0].uploaded_at } : null;
  },

  create: async ({ data }) => {
    const id = data.id || crypto.randomUUID();
    const res = await queryPg(
      `INSERT INTO gallery (id, title, category, media_url, media_type, uploaded_at) 
       VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING *`,
      [id, data.title, data.category || 'performances', data.media_url, data.media_type || 'image']
    );
    return { ...res.rows[0], created_at: res.rows[0].uploaded_at };
  },

  update: async ({ where, data }) => {
    const fields = [];
    const params = [];
    for (const [key, val] of Object.entries(data)) {
      params.push(val);
      fields.push(`${key} = $${params.length}`);
    }
    params.push(where.id);
    const sql = `UPDATE gallery SET ${fields.join(', ')} WHERE id = $${params.length} RETURNING *`;
    const res = await queryPg(sql, params);
    return res.rows[0] ? { ...res.rows[0], created_at: res.rows[0].uploaded_at } : null;
  },

  delete: async ({ where }) => {
    const res = await queryPg('DELETE FROM gallery WHERE id = $1 RETURNING *', [where.id]);
    return res.rows[0];
  }
};

// Admin Activity Model (Table 'admin_activities')
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
    const id = data.id || crypto.randomUUID();
    const res = await queryPg(
      `INSERT INTO admin_activities (id, action, entity_type, entity_id, title, details, admin_id, admin_name, admin_email, ip_address, created_at) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW()) RETURNING *`,
      [
        id,
        data.action,
        data.entity_type || 'system',
        data.entity_id || null,
        data.title,
        data.details || data.title,
        data.admin_id || null,
        data.admin_name || 'Administrator',
        data.admin_email || 'admin@sriruthralaya.com',
        data.ip_address || null,
      ]
    );
    return res.rows[0];
  },

  count: async () => {
    const res = await queryPg('SELECT COUNT(*)::int as count FROM admin_activities');
    return res.rows[0].count;
  }
};

// Chatbot Log Model (Table 'chatbot_logs')
const chatbotLogModel = {
  findMany: async ({ where = {}, include, orderBy, take } = {}) => {
    let sql = `
      SELECT c.*, u.name as user_name, u.email as user_email, u.role as user_role 
      FROM chatbot_logs c 
      LEFT JOIN users u ON c.user_id = u.id 
      ORDER BY c.created_at DESC
    `;
    const params = [];
    if (take) {
      params.push(take);
      sql += ` LIMIT $${params.length}`;
    }
    const res = await queryPg(sql, params);
    return res.rows.map(r => ({
      id: r.id,
      user_id: r.user_id,
      message: r.message,
      response: r.response,
      created_at: r.created_at,
      user: r.user_id ? { id: r.user_id, name: r.user_name, email: r.user_email, role: r.user_role } : null,
    }));
  },

  create: async ({ data }) => {
    const id = data.id || crypto.randomUUID();
    const res = await queryPg(
      `INSERT INTO chatbot_logs (id, user_id, message, response, created_at) 
       VALUES ($1, $2, $3, $4, NOW()) RETURNING *`,
      [id, data.user_id || null, data.message, data.response]
    );
    return res.rows[0];
  }
};

// Password Reset Model (Table 'password_resets')
const passwordResetModel = {
  createReset: async ({ email, otpHash, expiresAt }) => {
    const id = crypto.randomUUID();
    if (isDbConnected && pool) {
      // Invalidate existing unused tokens for this email
      await queryPg('UPDATE password_resets SET used = true WHERE LOWER(email) = LOWER($1) AND used = false', [email]);
      const res = await queryPg(
        `INSERT INTO password_resets (id, email, otp_hash, expires_at, used, created_at) 
         VALUES ($1, LOWER($2), $3, $4, false, NOW()) RETURNING *`,
        [id, email, otpHash, expiresAt]
      );
      return res.rows[0];
    } else {
      fallbackStore.passwordResets = fallbackStore.passwordResets.filter(p => p.email.toLowerCase() !== email.toLowerCase());
      const rec = { id, email: email.toLowerCase(), otp_hash: otpHash, expires_at: expiresAt, used: false, created_at: new Date() };
      fallbackStore.passwordResets.push(rec);
      return rec;
    }
  },

  findValid: async ({ email }) => {
    if (isDbConnected && pool) {
      const res = await queryPg(
        `SELECT * FROM password_resets 
         WHERE LOWER(email) = LOWER($1) AND used = false AND expires_at > NOW() 
         ORDER BY created_at DESC LIMIT 1`,
        [email]
      );
      return res.rows[0] || null;
    } else {
      const now = new Date();
      return fallbackStore.passwordResets.find(
        p => p.email.toLowerCase() === email.toLowerCase() && !p.used && new Date(p.expires_at) > now
      ) || null;
    }
  },

  invalidate: async ({ id }) => {
    if (isDbConnected && pool) {
      await queryPg('UPDATE password_resets SET used = true WHERE id = $1', [id]);
    } else {
      const item = fallbackStore.passwordResets.find(p => p.id === id);
      if (item) item.used = true;
    }
  }
};

// Consolidated Native PostgreSQL Database Interface
const db = {
  user: userModel,
  batch: batchModel,
  enrollment: enrollmentModel,
  attendance: attendanceModel,
  fee: feeModel,
  event: eventModel,
  notice: noticeModel,
  gallery: galleryModel,
  adminActivity: adminActivityModel,
  chatbotLog: chatbotLogModel,
  passwordReset: passwordResetModel,
  $queryRaw: queryPg,
};

// Activity logging helper
async function recordAdminActivity(params) {
  try {
    if (isDbConnected && pool) {
      return await adminActivityModel.create({ data: params });
    }
  } catch (err) {
    if (isProduction) {
      console.warn('DB activity logging error:', err.message);
      return null;
    }
  }

  // Local development fallback only
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
    admin_id: req.user?.id || '374a6ea5-21cb-4f19-a436-aa8195e52d74',
    admin_name: req.user?.name || 'Guru Nattiyakalaimani R. Sridevi',
    admin_email: req.user?.email || 'admin@sriruthralaya.com',
    ip_address: req.ip || req.headers['x-forwarded-for'] || '127.0.0.1',
  };
}

async function getAdminActivities({ limit = 50, entity_type, action, search } = {}) {
  try {
    if (isDbConnected && pool) {
      let sql = 'SELECT * FROM admin_activities WHERE 1=1';
      const params = [];
      if (entity_type && entity_type !== 'all') {
        params.push(entity_type);
        sql += ` AND entity_type = $${params.length}`;
      }
      if (action && action !== 'all') {
        params.push(action);
        sql += ` AND action = $${params.length}`;
      }
      if (search) {
        params.push(`%${search.toLowerCase()}%`);
        sql += ` AND (LOWER(title) LIKE $${params.length} OR LOWER(details) LIKE $${params.length} OR LOWER(admin_name) LIKE $${params.length})`;
      }
      sql += ' ORDER BY created_at DESC';
      params.push(limit);
      sql += ` LIMIT $${params.length}`;
      const res = await queryPg(sql, params);
      return res.rows;
    }
  } catch (e) {
    if (isProduction) {
      throw e;
    }
    console.warn('Native pg activity query fallback:', e.message);
  }

  // Development fallback only
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

    // Ensure password_resets table exists for native password reset functionality
    await pool.query(`
      CREATE TABLE IF NOT EXISTS password_resets (
        id TEXT PRIMARY KEY,
        email TEXT NOT NULL,
        otp_hash TEXT NOT NULL,
        expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
        used BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
      CREATE INDEX IF NOT EXISTS idx_password_resets_email ON password_resets(LOWER(email));
    `);

    console.log('✅ PostgreSQL / Neon DB connected successfully via native pg driver (Native PostgreSQL active)');
    return true;
  } catch (err) {
    isDbConnected = false;
    if (isProduction) {
      console.error('❌ FATAL: PostgreSQL database connection failed in production mode:', err.message);
    } else {
      console.warn('ℹ️ PostgreSQL connection deferred; operating in development fallback mode:', err.message);
    }
    return false;
  }
}

module.exports = {
  db,
  pool,
  queryPg,
  fallbackStore,
  getIsDbConnected: () => isDbConnected,
  checkDatabaseConnection,
  recordAdminActivity,
  getAdminActivities,
  getAdminInfoFromReq,
  isProduction,
};
