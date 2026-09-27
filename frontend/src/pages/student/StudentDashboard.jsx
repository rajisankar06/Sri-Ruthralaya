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
          attendance: attRes.data?.data || { stats: { attendancePercentage: 92, total: 15, present: 14 } },
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

  const attPct = studentData?.attendance?.stats?.attendancePercentage || 93;
  const latestFee = studentData?.fees?.[0] || {
    status: 'paid',
    amount: 2400,
    month: 'Current Term',
    id: 'mock-1',
  };

  return (
    <div className="space-y-8 font-outfit">
      
      {/* Top Welcome Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-temple-maroon via-temple-maroon-dark to-temple-maroon text-white border-2 border-temple-gold shadow-temple-lg relative overflow-hidden">
        {/* Background Nataraja BG1.png */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity pointer-events-none"
          style={{ backgroundImage: `url('/BG1.png')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-temple-maroon-deep/90 via-temple-maroon/80 to-temple-maroon-deep/90 pointer-events-none" />
        <div className="absolute inset-0 opacity-10 bg-kolam-pattern pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-temple-gold/20 border border-temple-gold text-temple-gold-light text-xs font-cinzel tracking-wider">
              <img src="/logo.png" alt="Sri Ruthralaya" className="w-4 h-4 object-contain" />
              <span>Sadhana Portal • Sri Ruthraalayaa</span>
            </div>

            <h1 className="font-cinzel text-2xl sm:text-4xl font-bold text-white tracking-wide">
              Namaskaram, {user?.name}! 🙏
            </h1>
            <p className="font-cormorant italic text-base sm:text-lg text-amber-100/90 max-w-xl">
              "Regularity in rhythm is the doorway to celestial grace." Welcome back to your sadhana records.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/student/attendance"
              className="px-5 py-2.5 rounded-xl bg-temple-gold text-temple-maroon-deep font-cinzel font-bold text-xs uppercase tracking-wider shadow hover:brightness-110 transition-all"
            >
              Mark View
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Card 1: Attendance % */}
        <div className="p-6 rounded-2xl bg-white border-2 border-temple-gold/40 shadow-temple flex items-center justify-between">
          <div>
            <span className="text-xs font-cinzel text-stone-500 uppercase tracking-wider block">
              Attendance Record
            </span>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="font-cinzel font-bold text-3xl text-temple-maroon">
                {attPct}%
              </span>
              <span className="text-xs text-emerald-600 font-semibold">
                (Punctual)
              </span>
            </div>
            <p className="text-[11px] text-stone-400 mt-1">Target: &gt; 85% for exams</p>
          </div>
          <div className="p-3 rounded-2xl bg-amber-50 text-temple-maroon border border-temple-gold/30">
            <CalendarCheck className="w-6 h-6 text-temple-maroon" />
          </div>
        </div>

        {/* Card 2: Next Scheduled Session */}
        <div className="p-6 rounded-2xl bg-white border-2 border-temple-gold/40 shadow-temple flex items-center justify-between">
          <div>
            <span className="text-xs font-cinzel text-stone-500 uppercase tracking-wider block">
              Upcoming Class
            </span>
            <div className="mt-1 font-cinzel font-bold text-base text-temple-maroon line-clamp-1">
              {activeBatch.schedule_days}
            </div>
            <p className="text-xs text-stone-600 mt-0.5">{activeBatch.schedule_time}</p>
            <p className="text-[11px] text-temple-gold-dark font-semibold mt-1">Temple Main Studio</p>
          </div>
          <div className="p-3 rounded-2xl bg-amber-50 text-temple-maroon border border-temple-gold/30">
            <Clock className="w-6 h-6 text-temple-maroon" />
          </div>
        </div>

        {/* Card 3: Fee Status */}
        <div className="p-6 rounded-2xl bg-white border-2 border-temple-gold/40 shadow-temple flex items-center justify-between">
          <div>
            <span className="text-xs font-cinzel text-stone-500 uppercase tracking-wider block">
              Term Fee Status
            </span>
            <div className="mt-1 flex items-center gap-2">
              <span className="font-cinzel font-bold text-xl text-temple-maroon">
                ₹{latestFee.amount}
              </span>
              <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                latestFee.status === 'paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
              }`}>
                {latestFee.status}
              </span>
            </div>
            <p className="text-[11px] text-stone-400 mt-1">{latestFee.month || 'Current Month'}</p>
          </div>
          <div className="p-3 rounded-2xl bg-amber-50 text-temple-maroon border border-temple-gold/30">
            <CreditCard className="w-6 h-6 text-temple-maroon" />
          </div>
        </div>

        {/* Card 4: Learning Milestone */}
        <div className="p-6 rounded-2xl bg-white border-2 border-temple-gold/40 shadow-temple flex items-center justify-between">
          <div>
            <span className="text-xs font-cinzel text-stone-500 uppercase tracking-wider block">
              Current Repertoire
            </span>
            <div className="mt-1 font-cinzel font-bold text-base text-temple-maroon">
              Jatiswaram &amp; Shabdam
            </div>
            <p className="text-xs text-stone-600 mt-0.5">Ragam Kalyani • Adi Talam</p>
            <p className="text-[11px] text-emerald-600 font-semibold mt-1">Grade 2 Exam Prep</p>
          </div>
          <div className="p-3 rounded-2xl bg-amber-50 text-temple-maroon border border-temple-gold/30">
            <Award className="w-6 h-6 text-temple-maroon" />
          </div>
        </div>

      </div>

      {/* Grid: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Col (8): Class Details & Adavu Tracker Preview */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Active Training Batch Card */}
          <div className="p-6 rounded-3xl bg-white border border-temple-gold/40 shadow-temple">
            <div className="flex items-center justify-between border-b border-stone-100 pb-4 mb-4">
              <div>
                <span className="text-[10px] font-cinzel uppercase text-temple-gold tracking-widest font-bold">
                  Enrolled Course
                </span>
                <h3 className="font-cinzel text-lg font-bold text-temple-maroon">
                  {activeBatch.name}
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-cinzel bg-temple-maroon text-temple-gold font-semibold">
                Active Disciple
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-stone-600">
              <div className="p-3 rounded-xl bg-temple-cream">
                <span className="text-stone-400 block mb-1">Guiding Guru</span>
                <span className="font-semibold text-stone-800">{activeBatch.instructor_name}</span>
              </div>
              <div className="p-3 rounded-xl bg-temple-cream">
                <span className="text-stone-400 block mb-1">Weekly Days</span>
                <span className="font-semibold text-stone-800">{activeBatch.schedule_days}</span>
              </div>
              <div className="p-3 rounded-xl bg-temple-cream">
                <span className="text-stone-400 block mb-1">Class Timings</span>
                <span className="font-semibold text-stone-800">{activeBatch.schedule_time}</span>
              </div>
            </div>

            {/* Adavu Progress Bar */}
            <div className="mt-6 pt-4 border-t border-stone-100">
              <div className="flex justify-between items-center text-xs mb-2">
                <span className="font-cinzel font-bold text-stone-700">
                  Adavu Curriculum Completion
                </span>
                <span className="font-bold text-temple-maroon">78% Complete</span>
              </div>
              <div className="w-full h-3 rounded-full bg-stone-100 overflow-hidden border border-amber-200">
                <div className="h-full bg-gradient-to-r from-temple-maroon to-temple-gold rounded-full w-[78%]"></div>
              </div>
              <p className="text-[11px] text-stone-500 mt-2">
                Completed: Tatta (8/8), Natta (8/8), Kuditta Metta (4/4), Teermanam (3/4). Next: Mandi Adavu.
              </p>
            </div>
          </div>

          {/* Quick AI Query Assistant Box */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-50 to-white border-2 border-temple-gold/60 shadow-temple flex items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-temple-maroon text-temple-gold flex items-center justify-center flex-shrink-0 shadow-md">
                <Sparkles className="w-5 h-5 text-temple-gold" />
              </div>
              <div>
                <h4 className="font-cinzel text-sm font-bold text-temple-maroon">
                  Have Questions on Attendance or Exam Syllabi?
                </h4>
                <p className="text-xs text-stone-600 mt-0.5">
                  Our Sri Ruthralaya AI Assistant knows your attendance records, next batch timings, and fee receipts.
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                const chatBtn = document.querySelector('button[aria-label="Open Academy AI Chatbot"]');
                if (chatBtn) chatBtn.click();
              }}
              className="px-4 py-2 rounded-xl bg-temple-maroon text-temple-gold hover:bg-temple-maroon-dark text-xs font-cinzel font-semibold whitespace-nowrap shadow"
            >
              Ask AI Now
            </button>
          </div>

        </div>

        {/* Right Col (4): Notices & Quick Downloads */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Recent Circulars Card */}
          <div className="p-6 rounded-3xl bg-white border border-temple-gold/40 shadow-temple">
            <h3 className="font-cinzel text-base font-bold text-temple-maroon mb-4 flex items-center gap-2">
              <Bell className="w-4 h-4 text-temple-gold" />
              Academy Announcements
            </h3>

            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-temple-cream/70 border border-amber-200">
                <h4 className="font-cinzel text-xs font-bold text-stone-800">
                  Costume Measurements for Natyanjali
                </h4>
                <p className="text-[11px] text-stone-600 mt-1 line-clamp-2">
                  Please submit your temple silk costume measurements by Friday evening.
                </p>
                <span className="text-[9px] text-stone-400 block mt-2">2 days ago</span>
              </div>

              <div className="p-3.5 rounded-xl bg-temple-cream/70 border border-amber-200">
                <h4 className="font-cinzel text-xs font-bold text-stone-800">
                  Practical Grade Exam Hall Tickets
                </h4>
                <p className="text-[11px] text-stone-600 mt-1 line-clamp-2">
                  Collect your Tamil Nadu Music &amp; Fine Arts University hall tickets at the office.
                </p>
                <span className="text-[9px] text-stone-400 block mt-2">5 days ago</span>
              </div>
            </div>

            <Link
              to="/student/notices"
              className="mt-4 text-center block text-xs font-cinzel font-bold text-temple-maroon hover:underline"
            >
              View All Circulars →
            </Link>
          </div>

          {/* Quick PDF Receipt */}
          {latestFee.status === 'paid' && (
            <div className="p-6 rounded-3xl bg-white border border-temple-gold/40 shadow-temple text-center">
              <CreditCard className="w-8 h-8 text-temple-gold mx-auto mb-2" />
              <h4 className="font-cinzel text-xs font-bold text-temple-maroon">
                Official Tuition Receipt
              </h4>
              <p className="text-[11px] text-stone-500 mt-0.5">
                Download your validated PDF receipt for {latestFee.month || 'Current Term'}
              </p>

              <a
                href={`/api/v1/fees/receipt/${latestFee.id}`}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-temple-maroon text-temple-gold text-xs font-cinzel font-bold shadow hover:bg-temple-maroon-dark transition-all"
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
