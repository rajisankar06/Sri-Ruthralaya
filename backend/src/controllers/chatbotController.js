const { db, fallbackStore, getIsDbConnected, isProduction } = require('../config/db');

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
      return `Namaskaram ${name}! You are currently being assigned to your class batch. Please consult Guru V. Suriya Sathian for your updated schedule.`;
    }

    if (q.includes('my guru') || q.includes('instructor') || q.includes('teacher')) {
      return `Your training is guided by **${batch?.instructor_name || 'Guru Nattiyakalaimani V. Suriya Sathian'}**. With over 18 years of pedagogical lineage in Thiruthangal, each disciple receives personalized nattuvangam and stylistic corrections.`;
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

  if (q.includes('guru') || q.includes('founder') || q.includes('suriya') || q.includes('sathian') || q.includes('qualification')) {
    return `Our revered founder and artistic director is **Guru Nattiyakalaimani V. Suriya Sathian**. He holds a prestigious **Diploma in Dance**, the honoured title of ***Nattiyakalaimani***, and is **now doing BFA in Dance**. He has dedicated over 18 years to training hundreds of disciples in Thiruthangal and Sivakasi.`;
  }

  if (q.includes('arangetram') || q.includes('debut') || q.includes('solo')) {
    return `An **Arangetram** ('ascending the stage') is the sacred graduation solo recital of a Bharatanatyam disciple, presenting a complete 2.5-hour Margam with live Carnatic orchestra. Guru V. Suriya Sathian personally guides senior disciples through intensive 1-on-1 Margam rehearsals.`;
  }

  if (q.includes('salangai') || q.includes('bells') || q.includes('pooja') || q.includes('ghungroo')) {
    return `The **Salangai Pooja** is an auspicious milestone ceremony where disciples receive their consecrated bronze dancing bells with Guru's blessings, marking their transition from basic Adavu practice to full choreography items.`;
  }

  if (q.includes('admission') || q.includes('join') || q.includes('register') || q.includes('enroll') || q.includes('age')) {
    return `Admissions are open for learners aged 5 and above! Beginners are placed in the **Bala Natya** batch. You can register online directly on this portal by clicking **Join Academy** in the top navigation.`;
  }

  return `Namaskaram! Welcome to Sri Ruthralaya Bharathanatyam Academy, Thiruthangal. I can assist you with batch schedules, fee structure, Guru V. Suriya Sathian's credentials, university examinations, or enrollment guidelines. If you are an enrolled student, please sign in to check your attendance and fee records!`;
}

/**
 * Handle incoming Chatbot Message
 * POST /api/v1/chatbot/message
 */
async function handleChatbotMessage(req, res, next) {
  try {
    const { message } = req.body;
    if (!message || message.trim() === '') {
      return res.status(400).json({ success: false, data: null, message: 'Message text is required.' });
    }

    const isDb = getIsDbConnected();
    const user = req.user; // If student is logged in, populated by optionalAuth middleware
    let studentData = null;
    let academyData = { batches: [], events: [] };

    // 1. Fetch Academy Context
    if (isDb) {
      academyData.batches = await db.batch.findMany();
      academyData.events = await db.event.findMany({ take: 3, orderBy: { date: 'asc' } });

      if (user && user.role === 'student') {
        const student = await db.user.findUnique({
          where: { id: user.id },
          include: {
            enrollments: true,
            attendances: true,
            fees: true,
          },
        });

        if (student) {
          const attendances = student.attendances || [];
          const totalAtt = attendances.length;
          const presentCount = attendances.filter(a => a.status === 'present').length;
          studentData = {
            name: student.name,
            batch: (student.enrollments && student.enrollments[0]?.batch) || null,
            attendancePct: totalAtt > 0 ? Math.round((presentCount / totalAtt) * 100) : 100,
            totalClasses: totalAtt,
            presentClasses: presentCount,
            latestFee: (student.fees && student.fees[0]) || null,
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

    const { generateGeminiContent } = require('../utils/gemini');

    const systemPrompt = `You are the knowledgeable, polite AI Assistant for "Sri Ruthralaya Bharathanatyam Academy" (Sri Ruthraalayaa) in Thiruthangal near Sivakasi, Tamil Nadu, founded by Guru Nattiyakalaimani V. Suriya Sathian (Diploma in Dance, Title of Nattiyakalaimani and now doing BFA in Dance).
Academy Context:
- Batches: ${JSON.stringify(academyData.batches)}
- Upcoming Events: ${JSON.stringify(academyData.events)}
${studentData ? `- Authenticated Student Information: Name: ${studentData.name}, Batch: ${studentData.batch?.name}, Attendance: ${studentData.attendancePct}%, Latest Fee: ${JSON.stringify(studentData.latestFee)}` : '- Visitor is browsing public website (not authenticated)'}

Answer questions with warmth, cultural reverence, and precision. If answering student questions about attendance or fees, use the exact numbers provided in their context. Keep replies concise and formatted in markdown.`;

    // 1. Try Google Gemini API (Primary)
    try {
      const geminiReply = await generateGeminiContent({
        systemPrompt,
        userMessage: message,
        maxTokens: 350,
        temperature: 0.7,
      });
      if (geminiReply) {
        botResponse = geminiReply;
      }
    } catch (err) {
      console.warn('Gemini API call error:', err.message);
    }

    // 2. Try OpenAI if Gemini didn't answer and key is provided
    if (!botResponse) {
      const openAiApiKey = process.env.OPENAI_API_KEY;
      if (openAiApiKey && openAiApiKey.trim() !== '') {
        try {
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
      }
    }

    // 3. Try Anthropic Claude if still no response
    if (!botResponse) {
      const anthropicApiKey = process.env.ANTHROPIC_API_KEY;
      if (anthropicApiKey && anthropicApiKey.trim() !== '') {
        try {
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
    }

    // If no LLM responded or keys were not set, use local Bharatanatyam knowledge engine
    if (!botResponse) {
      botResponse = generateLocalAcademyResponse(message, studentData, academyData);
    }

    // 3. Log conversation to database (user_id nullable)
    const userId = user?.id || null;
    if (isDb) {
      await db.chatbotLog.create({
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
    const isDb = getIsDbConnected();

    if (isProduction && !isDb) {
      return res.status(503).json({
        success: false,
        data: null,
        message: 'Database service is currently unavailable. Please try again shortly.',
      });
    }

    if (isDb) {
      const logs = await db.chatbotLog.findMany({
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
