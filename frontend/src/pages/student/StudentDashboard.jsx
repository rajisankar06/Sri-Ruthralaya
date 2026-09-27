import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  CalendarCheck, 
  Clock, 
  CreditCard, 
  Award, 
  Bell, 
  ArrowRight, 
  CheckCircle, 
  Sparkles, 
  Download,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import MudraIcon from '../../components/common/MudraIcon';

export default function StudentDashboard() {
  const { user } = useAuth();
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      if (!user) return;
      try {
        const [profileRes, feeRes, attRes] = await Promise.all([
          api.get(`/students/${user.id}`),
          api.get('/fees/my-fees'),
          api.get('/attendance/student'),
        ]);

        setStudentData({
          profile: profileRes.data?.data || user,
          fees: feeRes.data?.data || [],
          attendance: attRes.data?.data || { stats: { attendancePercentage: 100, total: 0, present: 0, absent: 0 } },
        });
      } catch (err) {
        console.warn('Student dashboard data fallback:', err.message);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [user]);

  const activeBatch = studentData?.profile?.activeBatch || user?.enrollments?.[0]?.batch || {
    name: 'Madhyama (Intermediate Jatiswaram & Shabdam)',
    instructor_name: 'Guru Nattiyakalaimani V. Suriya Sathian',
    schedule_days: 'Tue, Thu, Sat',
    schedule_time: '05:30 PM - 07:00 PM',
  };

  const attStats = studentData?.attendance?.stats;
  const attTotal = attStats?.total ?? 0;
  const attPresent = attStats?.present ?? 0;
  const attPct = attStats?.attendancePercentage ?? 100;
  const latestFee = studentData?.fees?.[0] || {
    status: 'paid',
    amount: 2400,
    month: 'Current Term',
    id: 'mock-1',
  };

  return (
    <div className="space-y-8 font-outfit text-[#bdbdbd]">
      
      {/* Top Welcome Banner in Dark Gold Theme */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-[#181818] via-[#121212] to-[#0a0a0a] text-white border-2 border-[#d4af37] shadow-[0_0_30px_rgba(212,175,55,0.2)] relative overflow-hidden">
        {/* Background Nataraja BG1.png */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-luminosity pointer-events-none"
          style={{ backgroundImage: `url('/BG1.png')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/90 via-[#121212]/85 to-[#080808]/90 pointer-events-none" />
        <div className="absolute inset-0 opacity-10 bg-kolam-pattern pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40 text-[#d4af37] text-xs font-cinzel tracking-wider">
              <img src="/logo.png" alt="Sri Ruthralaya" className="w-4 h-4 object-contain" />
              <span>Sadhana Portal • Sri Ruthraalayaa</span>
            </div>

            <h1 className="font-cinzel text-2xl sm:text-4xl font-bold text-white tracking-wide">
              Namaskaram, {user?.name}! 🙏
            </h1>
            <p className="font-cormorant italic text-base sm:text-lg text-[#ffd700]/90 max-w-xl">
              "Regularity in rhythm is the doorway to celestial grace." Welcome back to your sadhana records.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/student/attendance"
              className="px-5 py-2.5 rounded-xl bg-[#d4af37] text-[#111111] font-cinzel font-bold text-xs uppercase tracking-wider shadow hover:bg-[#ffd700] hover:scale-105 transition-all flex items-center gap-2"
            >
              <CalendarCheck className="w-4 h-4 text-[#111111]" />
              <span>Live Sadhana Records</span>
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Card 1: Attendance % */}
        <div className="p-6 rounded-2xl bg-[#111111] border border-[#333333] hover:border-[#d4af37]/60 shadow-xl flex items-center justify-between transition-all group">
          <div>
            <span className="text-xs font-cinzel text-[#888888] uppercase tracking-wider block">
              Attendance Record
            </span>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="font-cinzel font-bold text-3xl text-white">
                {attPct}%
              </span>
              <span className={`text-xs font-semibold ${attPct >= 85 ? 'text-emerald-400' : 'text-amber-400'}`}>
                {attTotal === 0 ? '(Enrolled)' : attPct >= 85 ? '(Punctual)' : '(Action Needed)'}
              </span>
            </div>
            <p className="text-[11px] text-[#888888] mt-1">
              {attTotal > 0 ? `${attPresent} of ${attTotal} sessions attended` : 'Target: > 85% for exams'}
            </p>
          </div>
          <div className="p-3.5 rounded-2xl bg-[#1a1a1a] text-[#d4af37] border border-[#333333] group-hover:border-[#d4af37]/60 group-hover:scale-105 transition-all">
            <CalendarCheck className="w-6 h-6 text-[#d4af37]" />
          </div>
        </div>

        {/* Card 2: Next Scheduled Session */}
        <div className="p-6 rounded-2xl bg-[#111111] border border-[#333333] hover:border-[#d4af37]/60 shadow-xl flex items-center justify-between transition-all group">
          <div>
            <span className="text-xs font-cinzel text-[#888888] uppercase tracking-wider block">
              Upcoming Class
            </span>
            <div className="mt-1 font-cinzel font-bold text-base text-white line-clamp-1">
              {activeBatch.schedule_days}
            </div>
            <p className="text-xs text-[#aaaaaa] mt-0.5">{activeBatch.schedule_time}</p>
            <p className="text-[11px] text-[#d4af37] font-semibold mt-1">Temple Main Studio</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-[#1a1a1a] text-[#d4af37] border border-[#333333] group-hover:border-[#d4af37]/60 group-hover:scale-105 transition-all">
            <Clock className="w-6 h-6 text-[#d4af37]" />
          </div>
        </div>

        {/* Card 3: Fee Status */}
        <div className="p-6 rounded-2xl bg-[#111111] border border-[#333333] hover:border-[#d4af37]/60 shadow-xl flex items-center justify-between transition-all group">
          <div>
            <span className="text-xs font-cinzel text-[#888888] uppercase tracking-wider block">
              Term Fee Status
            </span>
            <div className="mt-1 flex items-center gap-2">
              <span className="font-cinzel font-bold text-xl text-white">
                ₹{latestFee.amount}
              </span>
              <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                latestFee.status === 'paid' ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800' : 'bg-amber-950/80 text-amber-400 border border-amber-800'
              }`}>
                {latestFee.status}
              </span>
            </div>
            <p className="text-[11px] text-[#666666] mt-1">{latestFee.month || 'Current Month'}</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-[#1a1a1a] text-[#d4af37] border border-[#333333] group-hover:border-[#d4af37]/60 group-hover:scale-105 transition-all">
            <CreditCard className="w-6 h-6 text-[#d4af37]" />
          </div>
        </div>

        {/* Card 4: Learning Milestone */}
        <div className="p-6 rounded-2xl bg-[#111111] border border-[#333333] hover:border-[#d4af37]/60 shadow-xl flex items-center justify-between transition-all group">
          <div>
            <span className="text-xs font-cinzel text-[#888888] uppercase tracking-wider block">
              Current Repertoire
            </span>
            <div className="mt-1 font-cinzel font-bold text-base text-white">
              Jatiswaram &amp; Shabdam
            </div>
            <p className="text-xs text-[#aaaaaa] mt-0.5">Ragam Kalyani • Adi Talam</p>
            <p className="text-[11px] text-emerald-400 font-semibold mt-1">Grade 2 Exam Prep</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-[#1a1a1a] text-[#d4af37] border border-[#333333] group-hover:border-[#d4af37]/60 group-hover:scale-105 transition-all">
            <Award className="w-6 h-6 text-[#d4af37]" />
          </div>
        </div>

      </div>

      {/* Grid: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Col (8): Class Details & Adavu Tracker Preview */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Active Training Batch Card */}
          <div className="p-6 rounded-3xl bg-[#111111] border border-[#333333] shadow-xl">
            <div className="flex items-center justify-between border-b border-[#222222] pb-4 mb-4">
              <div>
                <span className="text-[10px] font-cinzel uppercase text-[#d4af37] tracking-widest font-bold">
                  Enrolled Course
                </span>
                <h3 className="font-cinzel text-lg font-bold text-white">
                  {activeBatch.name}
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-cinzel bg-[#1a1a1a] text-[#d4af37] border border-[#d4af37]/40 font-semibold shadow">
                Active Disciple
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-[#161616] border border-[#262626]">
                <span className="text-[#888888] block mb-1">Guiding Guru</span>
                <span className="font-semibold text-white">{activeBatch.instructor_name}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#161616] border border-[#262626]">
                <span className="text-[#888888] block mb-1">Weekly Days</span>
                <span className="font-semibold text-white">{activeBatch.schedule_days}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#161616] border border-[#262626]">
                <span className="text-[#888888] block mb-1">Class Timings</span>
                <span className="font-semibold text-white">{activeBatch.schedule_time}</span>
              </div>
            </div>

            {/* Adavu Progress Bar */}
            <div className="mt-6 pt-4 border-t border-[#222222]">
              <div className="flex justify-between items-center text-xs mb-2">
                <span className="font-cinzel font-bold text-white">
                  Adavu Curriculum Completion
                </span>
                <span className="font-bold text-[#d4af37]">78% Complete</span>
              </div>
              <div className="w-full h-3 rounded-full bg-[#1c1c1c] overflow-hidden border border-[#333333]">
                <div className="h-full bg-gradient-to-r from-[#b89025] to-[#ffd700] rounded-full w-[78%]"></div>
              </div>
              <p className="text-[11px] text-[#888888] mt-2">
                Completed: Tatta (8/8), Natta (8/8), Kuditta Metta (4/4), Teermanam (3/4). Next: Mandi Adavu.
              </p>
            </div>
          </div>

          {/* Quick AI Query Assistant Box */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-[#161616] via-[#121212] to-[#0d0d0d] border border-[#d4af37]/60 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-[#0a0a0a] border border-[#d4af37] text-[#d4af37] flex items-center justify-center flex-shrink-0 shadow">
                <Sparkles className="w-5 h-5 text-[#d4af37]" />
              </div>
              <div>
                <h4 className="font-cinzel text-sm font-bold text-white">
                  Have Questions on Attendance or Exam Syllabi?
                </h4>
                <p className="text-xs text-[#aaaaaa] mt-0.5">
                  Our Sri Ruthralaya AI Assistant knows your attendance records, next batch timings, and fee receipts.
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                const chatBtn = document.querySelector('button[aria-label="Open Academy AI Chatbot"]');
                if (chatBtn) chatBtn.click();
              }}
              className="px-4 py-2.5 rounded-xl bg-[#d4af37] text-[#111111] hover:bg-[#ffd700] text-xs font-cinzel font-bold whitespace-nowrap shadow transition-all self-start sm:self-auto"
            >
              Ask AI Now
            </button>
          </div>

        </div>

        {/* Right Col (4): Notices & Quick Downloads */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Recent Circulars Card */}
          <div className="p-6 rounded-3xl bg-[#111111] border border-[#333333] shadow-xl">
            <h3 className="font-cinzel text-base font-bold text-white mb-4 flex items-center gap-2">
              <Bell className="w-4 h-4 text-[#d4af37]" />
              Academy Announcements
            </h3>

            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-[#161616] border border-[#262626]">
                <h4 className="font-cinzel text-xs font-bold text-[#e0e0e0]">
                  Costume Measurements for Natyanjali
                </h4>
                <p className="text-[11px] text-[#aaaaaa] mt-1 line-clamp-2">
                  Please submit your temple silk costume measurements by Friday evening.
                </p>
                <span className="text-[9px] text-[#666666] block mt-2">2 days ago</span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#161616] border border-[#262626]">
                <h4 className="font-cinzel text-xs font-bold text-[#e0e0e0]">
                  Practical Grade Exam Hall Tickets
                </h4>
                <p className="text-[11px] text-[#aaaaaa] mt-1 line-clamp-2">
                  Collect your Tamil Nadu Music &amp; Fine Arts University hall tickets at the office.
                </p>
                <span className="text-[9px] text-[#666666] block mt-2">5 days ago</span>
              </div>
            </div>

            <Link
              to="/student/notices"
              className="mt-4 text-center block text-xs font-cinzel font-bold text-[#d4af37] hover:text-[#ffd700] hover:underline transition-colors"
            >
              View All Circulars →
            </Link>
          </div>

          {/* Quick PDF Receipt */}
          {latestFee.status === 'paid' && (
            <div className="p-6 rounded-3xl bg-[#111111] border border-[#333333] shadow-xl text-center">
              <CreditCard className="w-8 h-8 text-[#d4af37] mx-auto mb-2" />
              <h4 className="font-cinzel text-xs font-bold text-white">
                Official Tuition Receipt
              </h4>
              <p className="text-[11px] text-[#888888] mt-0.5">
                Download your validated PDF receipt for {latestFee.month || 'Current Term'}
              </p>

              <a
                href={`/api/v1/fees/receipt/${latestFee.id}`}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0f0f0f] border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-[#111111] text-xs font-cinzel font-bold shadow transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </a>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
