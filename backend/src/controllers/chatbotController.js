const { prisma, fallbackStore, getIsPrismaConnected } = require('../config/db');

/**
 * Intelligent Academy Bharatanatyam Knowledge Engine & Data Resolver
 * Formulates detailed response if LLM API Key is not set or network fails
 */
function generateLocalAcademyResponse(message, studentData, academyData) {
  const q = message.toLowerCase().trim();

  // 1. Personalized student queries
  if (studentData) {
    const { name, batch, attendancePct, totalClasses, presentClasses, latestFee } = studentData;

    if (q.includes('attendance') || q.includes('present') || q.includes('absent')) {
      return `Namaskaram ${name}! 🙏 Your overall attendance is currently **${attendancePct}%** (${presentClasses} attended out of ${totalClasses} conducted sessions). Regular sadhana (practice) is the key to mastering abhinaya and rhythm!`;
    }

    if (q.includes('fee') || q.includes('due') || q.includes('payment') || q.includes('paid') || q.includes('receipt')) {
      if (latestFee) {
        if (latestFee.status === 'paid') {
          return `Namaskaram ${name}. Your tuition fee for **${latestFee.month || 'Current Term'}** of ₹${latestFee.amount} is **PAID IN FULL** (Ref: ${latestFee.payment_ref || 'Online/Cash'}). You can download your official PDF receipt anytime in the Fees tab!`;
        } else {
          return `Namaskaram ${name}. You have a pending fee of **₹${latestFee.amount}** for **${latestFee.month || 'Current Month'}** due on **${new Date(latestFee.due_date).toLocaleDateString('en-IN')}**. You can complete payment online through the student portal.`;
        }
      }
      return `Namaskaram ${name}! Your fee status is up to date. You can check individual receipts in your Fee records.`;
    }

    if (q.includes('class') || q.includes('next') || q.includes('timing') || q.includes('schedule') || q.includes('when')) {
      if (batch) {
        return `Namaskaram ${name}! You are enrolled in **${batch.name}** under **${batch.instructor_name}**. Your classes are scheduled on **${batch.schedule_days}** at **${batch.schedule_time}**. Please arrive 10 minutes prior for warm-up and Aramandi practice.`;
      }
      return `Namaskaram ${name}! You are currently being assigned to your class batch. Please consult Guru Sridevi for your updated schedule.`;
    }

    if (q.includes('my guru') || q.includes('instructor') || q.includes('teacher')) {
      return `Your training is guided by **${batch?.instructor_name || 'Guru Nattiyakalaimani R. Sridevi'}**. With over 18 years of pedagogical lineage in Thiruthangal, each disciple receives personalized nattuvangam and stylistic corrections.`;
    }

    if (q.includes('exam') || q.includes('grade') || q.includes('certificate')) {
      return `Namaskaram ${name}. Sri Ruthralaya prepares disciples for Tamil Nadu Music and Fine Arts University grade examinations (Grades 1 through 7, leading to BFA/Diploma credentials). Check the Notices section for hall tickets and practical exam schedules.`;
    }
  }

  // 2. Public / General Academy FAQs
  if (q.includes('timing') || q.includes('batches') || q.includes('schedule') || q.includes('classes')) {
    const batchList = academyData.batches.map(b => `• **${b.name}** (${b.level}): ${b.schedule_days} from ${b.schedule_time}`).join('\n');
    return `Sri Ruthralaya offers dedicated batches tailored by experience level:\n\n${batchList}\n\nClasses are held at our dedicated temple-architecture hall in Thiruthangal near Sivakasi.`;
  }

  if (q.includes('fee') || q.includes('cost') || q.includes('price') || q.includes('tuition')) {
    const feeList = academyData.batches.map(b => `• **${b.name}**: ₹${b.fee_amount}/month`).join('\n');
    return `Here is our transparent monthly fee structure:\n\n${feeList}\n\nAdmission includes initial study syllabus notes and audio practice resources.`;
  }

  if (q.includes('where') || q.includes('location') || q.includes('address') || q.includes('contact') || q.includes('phone')) {
    return `📍 **Sri Ruthralaya Dance Academy** is located in **Thiruthangal near Sivakasi**, Virudhunagar District, Tamil Nadu (PIN: 626130).\n\n📞 Phone: **+91 98421 23456**\n✉️ Email: **info@sriruthralaya.com**\nVisiting hours: Monday to Saturday, 04:00 PM – 07:30 PM.`;
  }

  if (q.includes('guru') || q.includes('founder') || q.includes('sridevi') || q.includes('qualification')) {
    return `Guru **Nattiyakalaimani R. Sridevi** is the Founder and Artistic Director of Sri Ruthraalayaa. Holding a Diploma in Dance, the revered title of *Nattiyakalaimani*, and BFA in Dance, she has spent over 18 years nurturing more than 100+ students, conducting sacred Salangai Poojas, Arangetrams, and university grade accreditations.`;
  }

  if (q.includes('admission') || q.includes('enroll') || q.includes('register') || q.includes('join')) {
    return `Admissions are open for students aged 5 and above! You can register online through our **Register** page. Once submitted, your registration undergoes review and batch assignment by Guru Sridevi. You are also welcome to visit for a trial observation class.`;
  }

  if (q.includes('arangetram') || q.includes('salangai') || q.includes('pooja')) {
    return `Sri Ruthralaya maintains the highest traditional standards for **Salangai Pooja** (the holy bell blessing ceremony marking readiness for rhythm) and **Arangetram** (the formal solo stage debut with full live orchestral accompaniment: Nattuvangam, Mridangam, Violin, and Carnatic Vocal). We provide complete bespoke guidance on margam choreography and traditional aharya (costuming).`;
  }

  if (q.includes('adavu') || q.includes('margam') || q.includes('mudra') || q.includes('bharatanatyam') || q.includes('history')) {
    return `Bharatanatyam is one of the oldest classical dance traditions of India, rooted in the Natyashastra. Training at Sri Ruthralaya begins with foundational Adavus (Tatta, Natta, Kuditta Metta, Teermanam), Asamyuta/Samyuta Hastas (hand mudras), Navarasas (facial abhinaya), and progresses through the classical Margam: Alarippu, Jatiswaram, Shabdam, Varnam, Padam, and Thillana.`;
  }

  if (q.includes('event') || q.includes('upcoming') || q.includes('programme') || q.includes('annual')) {
    const evList = academyData.events.map(e => `• **${e.title}**: ${new Date(e.date).toLocaleDateString('en-IN')} at ${e.location}`).join('\n');
    return `Here are our upcoming temple and auditorium events:\n\n${evList || '• Annual Natyanjali Utsav 2026 (Coming up next month!)'}\n\nStudents and patrons are warmly welcome to participate.`;
  }

  return `Namaskaram! Welcome to Sri Ruthralaya Bharathanatyam Academy. How may I assist you today? You can ask about our **class batches & timings**, **fee structure**, **Guru Sridevi's 18-year legacy**, **Salangai Pooja / Arangetram preparation**, or **enrollment for beginners and advanced dancers**.`;
}

/**
 * POST /api/v1/chatbot/message
 * Handles both public visitor FAQs and authenticated student queries
 */
async function handleChatbotMessage(req, res, next) {
  try {
    const { message } = req.body;
    if (!message || typeof message !== 'string') {
      return res.status(400).json({
        success: false,
        data: null,
        message: 'A message string is required.',
      });
    }

    const isDb = getIsPrismaConnected();
    const user = req.user; // If student is logged in, populated by optionalAuth middleware
    let studentData = null;
    let academyData = { batches: [], events: [] };

    // 1. Fetch Academy Context
    if (isDb && prisma) {
      academyData.batches = await prisma.batch.findMany();
      academyData.events = await prisma.event.findMany({ take: 3, orderBy: { date: 'asc' } });

      if (user && user.role === 'student') {
        const student = await prisma.user.findUnique({
          where: { id: user.id },
          include: {
            enrollments: { include: { batch: true } },
            attendances: { orderBy: { date: 'desc' }, take: 20 },
            fees: { orderBy: { due_date: 'desc' }, take: 2 },
          },
        });

        if (student) {
          const totalAtt = student.attendances.length;
          const presentCount = student.attendances.filter(a => a.status === 'present').length;
          studentData = {
            name: student.name,
            batch: student.enrollments[0]?.batch || null,
            attendancePct: totalAtt > 0 ? Math.round((presentCount / totalAtt) * 100) : 100,
            totalClasses: totalAtt,
            presentClasses: presentCount,
            latestFee: student.fees[0] || null,
          };
        }
      }
    } else {
      academyData.batches = fallbackStore.batches;
      academyData.events = fallbackStore.events;

      if (user && user.role === 'student') {
        const student = fallbackStore.users.find(u => u.id === user.id);
        if (student) {
          const enrs = fallbackStore.enrollments.filter(e => e.student_id === student.id);
          const batch = enrs.length > 0 ? fallbackStore.batches.find(b => b.id === enrs[0].batch_id) : null;
          const atts = fallbackStore.attendances.filter(a => a.student_id === student.id);
          const presentCount = atts.filter(a => a.status === 'present').length;
          const fees = fallbackStore.fees.filter(f => f.student_id === student.id);

          studentData = {
            name: student.name,
            batch,
            attendancePct: atts.length > 0 ? Math.round((presentCount / atts.length) * 100) : 92,
            totalClasses: atts.length,
            presentClasses: presentCount,
            latestFee: fees[fees.length - 1] || null,
          };
        }
      }
    }

    let botResponse = '';

    // =========================================================================
    // TODO: LLM API Integration (OpenAI / Anthropic Claude)
    // The environment variables OPENAI_API_KEY or ANTHROPIC_API_KEY can be provided.
    // =========================================================================
    const openAiApiKey = process.env.OPENAI_API_KEY;
    const anthropicApiKey = process.env.ANTHROPIC_API_KEY;

    if (openAiApiKey && openAiApiKey.trim() !== '') {
      try {
        const systemPrompt = `You are the knowledgeable, polite AI Assistant for "Sri Ruthralaya Bharathanatyam Academy" (Sri Ruthraalayaa) in Thiruthangal near Sivakasi, Tamil Nadu, founded by Guru Nattiyakalaimani R. Sridevi (Diploma in Dance, Title of Nattiyakalaimani, BFA in Dance).
Academy Context:
- Batches: ${JSON.stringify(academyData.batches)}
- Upcoming Events: ${JSON.stringify(academyData.events)}
${studentData ? `- Authenticated Student Information: Name: ${studentData.name}, Batch: ${studentData.batch?.name}, Attendance: ${studentData.attendancePct}%, Latest Fee: ${JSON.stringify(studentData.latestFee)}` : '- Visitor is browsing public website (not authenticated)'}

Answer questions with warmth, cultural reverence, and precision. If answering student questions about attendance or fees, use the exact numbers provided in their context. Keep replies concise and formatted in markdown.`;

        const openAiRes = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${openAiApiKey}`,
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: message },
            ],
            temperature: 0.7,
            max_tokens: 300,
          }),
        });

        if (openAiRes.ok) {
          const aiJson = await openAiRes.json();
          botResponse = aiJson.choices?.[0]?.message?.content || '';
        }
      } catch (err) {
        console.warn('OpenAI API call failed, falling back to local engine:', err.message);
      }
    } else if (anthropicApiKey && anthropicApiKey.trim() !== '') {
      try {
        const systemPrompt = `You are the AI Assistant for Sri Ruthralaya Bharathanatyam Academy in Thiruthangal, Tamil Nadu, led by Guru Nattiyakalaimani R. Sridevi.
Academy Context: ${JSON.stringify(academyData)}
Student Context: ${JSON.stringify(studentData)}`;

        const anthropicRes = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': anthropicApiKey,
            'anthropic-version': '2023-06-01',
          },
          body: JSON.stringify({
            model: 'claude-3-haiku-20240307',
            system: systemPrompt,
            messages: [{ role: 'user', content: message }],
            max_tokens: 300,
          }),
        });

        if (anthropicRes.ok) {
          const aiJson = await anthropicRes.json();
          botResponse = aiJson.content?.[0]?.text || '';
        }
      } catch (err) {
        console.warn('Anthropic API call failed, falling back to local engine:', err.message);
      }
    }

    // If no LLM responded or keys were not set, use our local Bharatanatyam knowledge engine
    if (!botResponse) {
      botResponse = generateLocalAcademyResponse(message, studentData, academyData);
    }

    // 3. Log conversation to database (user_id nullable)
    const userId = user?.id || null;
    if (isDb && prisma) {
      await prisma.chatbotLog.create({
        data: {
          user_id: userId,
          message,
          response: botResponse,
        },
      });
    } else {
      fallbackStore.chatbotLogs.unshift({
        id: `log-${Date.now()}`,
        user_id: userId,
        message,
        response: botResponse,
        created_at: new Date(),
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        response: botResponse,
        timestamp: new Date(),
        isStudentContext: !!studentData,
      },
      message: 'Chatbot response generated.',
    });
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/v1/chatbot/logs (Admin only)
 */
async function getChatbotLogs(req, res, next) {
  try {
    const isDb = getIsPrismaConnected();

    if (isDb && prisma) {
      const logs = await prisma.chatbotLog.findMany({
        include: {
          user: {
            select: { id: true, name: true, email: true, role: true },
          },
        },
        orderBy: { created_at: 'desc' },
        take: 100,
      });

      return res.status(200).json({ success: true, data: logs, message: 'Chatbot logs retrieved.' });
    } else {
      const logs = fallbackStore.chatbotLogs.map(log => ({
        ...log,
        user: log.user_id ? fallbackStore.users.find(u => u.id === log.user_id) : null,
      }));

      return res.status(200).json({ success: true, data: logs, message: 'Chatbot logs retrieved.' });
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  handleChatbotMessage,
  getChatbotLogs,
};
