const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting Sri Ruthralaya database seeding...');

  // Hash password with 12 rounds
  const salt = await bcrypt.genSalt(12);
  const adminPasswordHash = await bcrypt.hash('Admin@123', salt);
  const studentPasswordHash = await bcrypt.hash('Student@123', salt);
  const staffPasswordHash = await bcrypt.hash('Staff@123', salt);

  // 1. Create Superadmin
  const admin = await prisma.user.upsert({
    where: { email: 'admin@sriruthralaya.com' },
    update: {},
    create: {
      name: 'Guru Nattiyakalaimani R. Sridevi',
      email: 'admin@sriruthralaya.com',
      password_hash: adminPasswordHash,
      role: 'admin',
      phone: '+91 98421 23456',
      profile_photo_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
      status: 'active',
    },
  });
  console.log(`✅ Admin user seeded: ${admin.email}`);

  // 2. Create Staff / Associate Guru
  const staff = await prisma.user.upsert({
    where: { email: 'instructor@sriruthralaya.com' },
    update: {},
    create: {
      name: 'Smt. Priyadarshini M. (BFA Dance)',
      email: 'instructor@sriruthralaya.com',
      password_hash: staffPasswordHash,
      role: 'staff',
      phone: '+91 98422 67890',
      profile_photo_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      status: 'active',
    },
  });
  console.log(`✅ Staff user seeded: ${staff.email}`);

  // 3. Batches
  const batchesData = [
    {
      name: 'Bala Natya (Beginner Adavus)',
      level: 'Beginner',
      instructor_name: 'Guru Nattiyakalaimani R. Sridevi',
      schedule_days: 'Mon, Wed, Fri',
      schedule_time: '04:30 PM - 05:30 PM',
      fee_amount: 1800.00,
    },
    {
      name: 'Madhyama (Intermediate Jatiswaram & Shabdam)',
      level: 'Intermediate',
      instructor_name: 'Smt. Priyadarshini M.',
      schedule_days: 'Tue, Thu, Sat',
      schedule_time: '05:30 PM - 07:00 PM',
      fee_amount: 2400.00,
    },
    {
      name: 'Visharada (Advanced Varnam & Padam)',
      level: 'Advanced',
      instructor_name: 'Guru Nattiyakalaimani R. Sridevi',
      schedule_days: 'Saturday, Sunday',
      schedule_time: '08:00 AM - 10:30 AM',
      fee_amount: 3200.00,
    },
    {
      name: 'Arangetram Margam Intensive',
      level: 'Arangetram Prep',
      instructor_name: 'Guru Nattiyakalaimani R. Sridevi',
      schedule_days: 'Saturday, Sunday',
      schedule_time: '04:00 PM - 07:00 PM',
      fee_amount: 4500.00,
    },
  ];

  const batches = [];
  for (const b of batchesData) {
    const batch = await prisma.batch.create({
      data: b,
    });
    batches.push(batch);
  }
  console.log(`✅ ${batches.length} Batches created.`);

  // 4. Students
  const studentsData = [
    {
      name: 'Ananya Ramachandran',
      email: 'ananya.r@gmail.com',
      phone: '+91 94431 88201',
      status: 'active',
      batchIndex: 1, // Intermediate
      profile_photo_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'Diya Soundararajan',
      email: 'diya.s@gmail.com',
      phone: '+91 97890 12345',
      status: 'active',
      batchIndex: 2, // Advanced
      profile_photo_url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'Kavya Krishnan',
      email: 'kavya.k@gmail.com',
      phone: '+91 98940 55667',
      status: 'active',
      batchIndex: 0, // Beginner
      profile_photo_url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'Meera Natarajan',
      email: 'meera.n@gmail.com',
      phone: '+91 94860 99887',
      status: 'active',
      batchIndex: 3, // Arangetram Prep
      profile_photo_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'Swetha Balaji',
      email: 'swetha.b@gmail.com',
      phone: '+91 97900 44332',
      status: 'active',
      batchIndex: 1, // Intermediate
      profile_photo_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'Priya Vasanth',
      email: 'priya.new@gmail.com',
      phone: '+91 96290 77112',
      status: 'pending', // Pending Admin Approval
      batchIndex: 0,
      profile_photo_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80',
    },
  ];

  const students = [];
  for (const s of studentsData) {
    const user = await prisma.user.upsert({
      where: { email: s.email },
      update: {},
      create: {
        name: s.name,
        email: s.email,
        password_hash: studentPasswordHash,
        role: 'student',
        phone: s.phone,
        status: s.status,
        profile_photo_url: s.profile_photo_url,
      },
    });

    if (s.status === 'active') {
      await prisma.enrollment.create({
        data: {
          student_id: user.id,
          batch_id: batches[s.batchIndex].id,
          status: 'active',
        },
      });
    }

    students.push(user);
  }
  console.log(`✅ ${students.length} Students seeded.`);

  // 5. Attendance for the active students over the last 15 days
  const today = new Date();
  for (const student of students.filter(s => s.status === 'active')) {
    const studentEnrollment = await prisma.enrollment.findFirst({
      where: { student_id: student.id },
    });
    if (!studentEnrollment) continue;

    for (let i = 0; i < 15; i++) {
      const attDate = new Date();
      attDate.setDate(today.getDate() - i);
      const isAbsent = (i % 7 === 0); // ~85% attendance
      await prisma.attendance.create({
        data: {
          student_id: student.id,
          batch_id: studentEnrollment.batch_id,
          date: attDate,
          status: isAbsent ? 'absent' : 'present',
          remarks: isAbsent ? 'Informed leave for school exam' : 'Punctual with practice',
        },
      });
    }
  }
  console.log(`✅ Attendance records created.`);

  // 6. Fees
  for (const student of students.filter(s => s.status === 'active')) {
    // Current month fee (Paid)
    await prisma.fee.create({
      data: {
        student_id: student.id,
        amount: 2400.00,
        due_date: new Date(today.getFullYear(), today.getMonth(), 5),
        paid_date: new Date(today.getFullYear(), today.getMonth(), 4),
        status: 'paid',
        payment_ref: `UPI-SR-${Math.floor(100000 + Math.random() * 900000)}`,
        receipt_url: `/api/v1/fees/receipt/mock-receipt-${student.id}`,
        month: 'September 2026',
      },
    });

    // Upcoming month fee
    await prisma.fee.create({
      data: {
        student_id: student.id,
        amount: 2400.00,
        due_date: new Date(today.getFullYear(), today.getMonth() + 1, 5),
        status: student.email === 'ananya.r@gmail.com' ? 'paid' : 'pending',
        month: 'October 2026',
      },
    });
  }
  console.log(`✅ Fee records created.`);

  // 7. Events
  const eventsData = [
    {
      title: 'Annual Natyanjali Utsav 2026',
      description: 'Grand classical showcase featuring 80+ disciples performing Varnams, Thillanas, and thematic dance drama at Sivakasi Town Hall.',
      date: new Date(today.getFullYear(), today.getMonth() + 1, 15, 17, 30),
      image_url: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80',
      location: 'Sivakasi Town Hall Auditorium',
      created_by: admin.id,
    },
    {
      title: 'Salangai Pooja Ceremony',
      description: 'Sacred bell blessing ceremony for junior disciples stepping into intermediate training under Guru Sridevi.',
      date: new Date(today.getFullYear(), today.getMonth() + 1, 28, 9, 0),
      image_url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
      location: 'Sri Ruthralaya Temple Hall, Thiruthangal',
      created_by: admin.id,
    },
    {
      title: 'Bharatanatyam Grade Exam Workshop',
      description: 'Intensive theoretical and practical coaching for Tamil Nadu Music and Fine Arts University grade examination.',
      date: new Date(today.getFullYear(), today.getMonth() + 2, 5, 10, 0),
      image_url: 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=800&q=80',
      location: 'Academy Main Studio',
      created_by: admin.id,
    },
  ];

  for (const ev of eventsData) {
    await prisma.event.create({ data: ev });
  }
  console.log(`✅ Events seeded.`);

  // 8. Notices
  const noticesData = [
    {
      title: 'Costume & Jewellery Measurements for Annual Day',
      message: 'All intermediate and advanced students are requested to submit their tailor measurements by this Friday for custom traditional temple costume stitching.',
      target: 'all',
    },
    {
      title: 'Bala Natya Extra Class This Saturday',
      message: 'Beginner batch will have an extra 45-minute posture session on Saturday morning at 9:00 AM focusing on Aramandi and Natyarambha.',
      target: 'batch',
      batch_id: batches[0].id,
    },
    {
      title: 'Grade Examination Hall Tickets Available',
      message: 'Please collect your practical exam hall tickets from the academy office during weekday evening hours.',
      target: 'all',
    },
  ];

  for (const n of noticesData) {
    await prisma.notice.create({ data: n });
  }
  console.log(`✅ Notices seeded.`);

  // 9. Gallery
  const galleryData = [
    {
      title: 'Varnam Performance - Navarasa Expression',
      category: 'performances',
      media_url: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1000&q=80',
      media_type: 'image',
    },
    {
      title: 'Salangai Pooja Holy Bell Dedication',
      category: 'salangai-pooja',
      media_url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1000&q=80',
      media_type: 'image',
    },
    {
      title: 'Arangetram Debut - Margam Presentation',
      category: 'arangetram',
      media_url: 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=1000&q=80',
      media_type: 'image',
    },
    {
      title: 'Morning Practice - Adavu Drills in Aramandi',
      category: 'classroom',
      media_url: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&w=1000&q=80',
      media_type: 'image',
    },
    {
      title: 'Thillana Finale at Chidambaram Natyanjali',
      category: 'performances',
      media_url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1000&q=80',
      media_type: 'image',
    },
    {
      title: 'Guru Shishya Parampara Blessing Moment',
      category: 'classroom',
      media_url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1000&q=80',
      media_type: 'image',
    },
  ];

  for (const g of galleryData) {
    await prisma.gallery.create({ data: g });
  }
  console.log(`✅ Gallery media seeded.`);

  console.log('🎉 Seeding successfully completed!');
}

main()
  .catch((e) => {
    console.error('❌ Error in seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
