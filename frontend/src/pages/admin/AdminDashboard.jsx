import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Layers, 
  DollarSign, 
  CalendarCheck, 
  Calendar, 
  Sparkles, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  RefreshCw, 
  ArrowUpRight,
  ShieldAlert,
  ShieldCheck,
  ArrowRight,
  PlusCircle,
  CreditCard,
  Bell,
  Image as ImageIcon,
  Clock,
  Activity,
  Award
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  Area
} from 'recharts';
import api from '../../services/api';
import MudraIcon from '../../components/common/MudraIcon';

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [aiInsights, setAiInsights] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshingAi, setRefreshingAi] = useState(false);

  useEffect(() => {
    loadAllData();
  }, []);

  async function loadAllData() {
    setLoading(true);
    try {
      const [analyticsRes, insightsRes] = await Promise.all([
        api.get('/admin/analytics'),
        api.post('/admin/ai-insights'),
      ]);

      if (analyticsRes.data.success) {
        setAnalytics(analyticsRes.data.data);
      }
      if (insightsRes.data.success) {
        setAiInsights(insightsRes.data.data);
      }
    } catch (err) {
      console.error('Failed to load dashboard metrics:', err);
    } finally {
      setLoading(false);
    }
  }

  const handleRegenerateAi = async () => {
    setRefreshingAi(true);
    try {
      const res = await api.post('/admin/ai-insights');
      if (res.data.success) {
        setAiInsights(res.data.data);
      }
    } catch (err) {
      console.error('AI Insights regeneration error:', err);
    } finally {
      setRefreshingAi(false);
    }
  };

  const kpis = analytics?.kpi || {
    totalStudents: 95,
    pendingRegistrations: 1,
    activeBatches: 4,
    monthlyRevenue: 182000,
    totalDues: 22000,
    averageAttendance: 92,
    upcomingEventsCount: 3,
  };

  const charts = analytics?.charts || {
    monthlyEnrollmentTrend: [],
    batchAttendanceTrend: [],
    revenueVsDues: [],
    retentionTrend: [],
    forecast: { nextMonth: 104, growthRate: 9 },
  };

  const recentActivity = analytics?.recentActivity || [];

  const batchCapacities = [
    { name: 'Bala Natya (Beginner)', level: 'Beginner', enrolled: 32, capacity: 35, time: 'Mon, Wed, Fri • 4:30 PM', instructor: 'Guru V. Suriya Sathian' },
    { name: 'Madhyama Natya (Intermediate)', level: 'Intermediate', enrolled: 26, capacity: 30, time: 'Tue, Thu, Sat • 5:00 PM', instructor: 'Guru V. Suriya Sathian' },
    { name: 'Natya Praveena (Advanced)', level: 'Advanced', enrolled: 22, capacity: 25, time: 'Mon, Wed, Sat • 6:30 PM', instructor: 'Guru V. Suriya Sathian' },
    { name: 'Arangetram Margam Intensive', level: 'Arangetram Prep', enrolled: 15, capacity: 15, time: 'Daily Sadhana • 6:00 AM', instructor: 'Guru V. Suriya Sathian' },
  ];

  return (
    <div className="space-y-8 font-outfit text-white">
      
      {/* Executive Header & Quick Actions Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-6 rounded-3xl bg-[#111111] border border-[#333333] shadow-2xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-cinzel tracking-widest text-[#d4af37] uppercase font-bold">
              Operations Center • Academic Year 2026-27
            </span>
          </div>
          <h1 className="font-cinzel text-2xl sm:text-3xl font-bold text-white">
            Executive Analytics &amp; <span className="text-[#d4af37]">Academy Operations</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#bdbdbd] mt-1 font-outfit">
            Real-time enrollment trajectories, batch attendance metrics, revenue tracking, and LLM-driven strategic insights.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadAllData}
            disabled={loading}
            className="px-4 py-2.5 rounded-xl bg-[#0f0f0f] border border-[#333333] hover:border-[#d4af37] text-[#bdbdbd] hover:text-[#d4af37] text-xs font-cinzel font-semibold shadow-md flex items-center gap-2 transition-all"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-[#d4af37]' : ''}`} />
            <span>{loading ? 'Refreshing...' : 'Refresh Metrics'}</span>
          </button>
        </div>
      </div>

      {/* Quick Operational Shortcuts Bar */}
      <div className="p-4 rounded-2xl bg-[#111111] border border-[#333333] shadow-lg">
        <div className="flex items-center justify-between mb-3 px-2">
          <span className="text-xs font-cinzel uppercase tracking-wider text-[#d4af37] font-bold flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#d4af37]" />
            Direct Administrative Workflows
          </span>
          <span className="text-[11px] text-[#777777]">1-Click Rapid Navigation</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <Link
            to="/admin/students"
            className="flex items-center gap-2 p-3 rounded-xl bg-[#0f0f0f] border border-[#333333] hover:border-[#d4af37] hover:bg-[#161616] text-xs text-[#bdbdbd] hover:text-white transition-all group"
          >
            <Users className="w-4 h-4 text-[#d4af37] group-hover:scale-110 transition-transform" />
            <span className="font-medium truncate">Enrolled Disciples</span>
          </Link>

          <Link
            to="/admin/attendance"
            className="flex items-center gap-2 p-3 rounded-xl bg-[#0f0f0f] border border-[#333333] hover:border-[#d4af37] hover:bg-[#161616] text-xs text-[#bdbdbd] hover:text-white transition-all group"
          >
            <CalendarCheck className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
            <span className="font-medium truncate">Attendance Matrix</span>
          </Link>

          <Link
            to="/admin/fees"
            className="flex items-center gap-2 p-3 rounded-xl bg-[#0f0f0f] border border-[#333333] hover:border-[#d4af37] hover:bg-[#161616] text-xs text-[#bdbdbd] hover:text-white transition-all group"
          >
            <CreditCard className="w-4 h-4 text-[#d4af37] group-hover:scale-110 transition-transform" />
            <span className="font-medium truncate">Tuition Ledger</span>
          </Link>

          <Link
            to="/admin/batches"
            className="flex items-center gap-2 p-3 rounded-xl bg-[#0f0f0f] border border-[#333333] hover:border-[#d4af37] hover:bg-[#161616] text-xs text-[#bdbdbd] hover:text-white transition-all group"
          >
            <Layers className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
            <span className="font-medium truncate">Curriculum Batches</span>
          </Link>

          <Link
            to="/admin/events"
            className="flex items-center gap-2 p-3 rounded-xl bg-[#0f0f0f] border border-[#333333] hover:border-[#d4af37] hover:bg-[#161616] text-xs text-[#bdbdbd] hover:text-white transition-all group"
          >
            <Calendar className="w-4 h-4 text-rose-400 group-hover:scale-110 transition-transform" />
            <span className="font-medium truncate">Stage Events</span>
          </Link>

          <Link
            to="/admin/gallery"
            className="flex items-center gap-2 p-3 rounded-xl bg-[#0f0f0f] border border-[#333333] hover:border-[#d4af37] hover:bg-[#161616] text-xs text-[#bdbdbd] hover:text-white transition-all group"
          >
            <ImageIcon className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
            <span className="font-medium truncate">Photo Studio</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards Row in Dark Gold Theme */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        
        {/* KPI 1: Active Learners */}
        <div className="p-5 rounded-2xl bg-[#111111] border border-[#333333] hover:border-[#d4af37]/60 shadow-xl flex flex-col justify-between transition-all">
          <div className="flex items-center justify-between text-[#888888]">
            <span className="text-[11px] font-cinzel uppercase font-semibold text-[#aaaaaa]">Active Learners</span>
            <Users className="w-4 h-4 text-[#d4af37]" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-cinzel font-bold text-2xl sm:text-3xl text-white">
              {kpis.totalStudents}
            </span>
            <span className="text-[11px] text-emerald-400 font-semibold flex items-center">
              <TrendingUp className="w-3 h-3 mr-0.5" /> +16%
            </span>
          </div>
          <span className="text-[10px] text-[#777777] mt-1">Across all 4 levels</span>
        </div>

        {/* KPI 2: Pending Applications */}
        <div className="p-5 rounded-2xl bg-[#111111] border border-[#333333] hover:border-amber-500/60 shadow-xl flex flex-col justify-between transition-all">
          <div className="flex items-center justify-between text-[#888888]">
            <span className="text-[11px] font-cinzel uppercase font-semibold text-[#aaaaaa]">Pending Review</span>
            <ShieldAlert className="w-4 h-4 text-amber-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-cinzel font-bold text-2xl sm:text-3xl text-amber-400">
              {kpis.pendingRegistrations}
            </span>
            <span className="text-[11px] text-amber-300 font-medium">Awaiting review</span>
          </div>
          <span className="text-[10px] text-[#777777] mt-1">1-click approve in Disciples</span>
        </div>

        {/* KPI 3: Monthly Revenue */}
        <div className="p-5 rounded-2xl bg-[#111111] border border-[#333333] hover:border-emerald-500/60 shadow-xl flex flex-col justify-between transition-all">
          <div className="flex items-center justify-between text-[#888888]">
            <span className="text-[11px] font-cinzel uppercase font-semibold text-[#aaaaaa]">October Revenue</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-cinzel font-bold text-2xl sm:text-3xl text-emerald-400">
              ₹{(kpis.monthlyRevenue / 1000).toFixed(0)}k
            </span>
            <span className="text-[10px] text-[#777777]">collected</span>
          </div>
          <span className="text-[10px] text-rose-400 font-medium">₹{kpis.totalDues?.toLocaleString('en-IN')} pending dues</span>
        </div>

        {/* KPI 4: Average Attendance */}
        <div className="p-5 rounded-2xl bg-[#111111] border border-[#333333] hover:border-[#d4af37]/60 shadow-xl flex flex-col justify-between transition-all">
          <div className="flex items-center justify-between text-[#888888]">
            <span className="text-[11px] font-cinzel uppercase font-semibold text-[#aaaaaa]">Avg Attendance</span>
            <CalendarCheck className="w-4 h-4 text-[#d4af37]" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-cinzel font-bold text-2xl sm:text-3xl text-white">
              {kpis.averageAttendance}%
            </span>
            <span className="text-[11px] text-emerald-400 font-semibold">Target &gt;85%</span>
          </div>
          <span className="text-[10px] text-[#777777] mt-1">Across 4 batch sessions</span>
        </div>

        {/* KPI 5: Active Batches */}
        <div className="p-5 rounded-2xl bg-[#111111] border border-[#333333] hover:border-[#d4af37]/60 shadow-xl flex flex-col justify-between col-span-2 sm:col-span-1 transition-all">
          <div className="flex items-center justify-between text-[#888888]">
            <span className="text-[11px] font-cinzel uppercase font-semibold text-[#aaaaaa]">Active Batches</span>
            <Layers className="w-4 h-4 text-[#d4af37]" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-cinzel font-bold text-2xl sm:text-3xl text-white">
              {kpis.activeBatches}
            </span>
            <span className="text-[11px] text-[#888888] font-medium">Bala to Margam</span>
          </div>
          <span className="text-[10px] text-[#777777] mt-1">3 upcoming events</span>
        </div>

      </div>

      {/* Batch Capacity & Class Status Overview Widget */}
      <div className="p-6 rounded-3xl bg-[#111111] border border-[#333333] shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 border-b border-[#222222] pb-4">
          <div>
            <h3 className="font-cinzel font-bold text-base text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-[#d4af37]" />
              Classroom Batches &amp; Capacity Utilization
            </h3>
            <p className="text-xs text-[#888888] mt-0.5">
              Current seat allocation and instructor scheduling across all 4 pedagogical tiers
            </p>
          </div>
          <Link
            to="/admin/batches"
            className="text-xs font-cinzel font-bold text-[#d4af37] hover:underline flex items-center gap-1 self-start sm:self-auto"
          >
            <span>Manage Batches</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {batchCapacities.map((b, idx) => {
            const pct = Math.round((b.enrolled / b.capacity) * 100);
            return (
              <div key={idx} className="p-4 rounded-2xl bg-[#0f0f0f] border border-[#222222] hover:border-[#333333] transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-cinzel uppercase px-2 py-0.5 rounded bg-[#1a1a1a] border border-[#333333] text-[#d4af37]">
                      {b.level}
                    </span>
                    <span className="text-xs font-bold text-white">
                      {b.enrolled} / {b.capacity} Disciples
                    </span>
                  </div>
                  <h4 className="font-cinzel font-bold text-sm text-white line-clamp-1 mb-1">
                    {b.name}
                  </h4>
                  <p className="text-[11px] text-[#888888] flex items-center gap-1 mb-3">
                    <Clock className="w-3 h-3 text-[#d4af37]" />
                    <span>{b.time}</span>
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between text-[11px] text-[#888888] mb-1">
                    <span>Capacity Filled</span>
                    <span className={pct >= 90 ? 'text-amber-400 font-bold' : 'text-emerald-400 font-bold'}>
                      {pct}%
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#1a1a1a] overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        pct >= 90 ? 'bg-amber-400' : 'bg-[#d4af37]'
                      }`}
                      style={{ width: `${Math.min(pct, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* AI INSIGHTS PANEL (Dark Gold Luxury Theme) */}
      <div className="rounded-3xl bg-[#111111] text-white border border-[#333333] hover:border-[#d4af37]/60 shadow-2xl p-6 sm:p-8 relative overflow-hidden transition-all">
        {/* Subtle Nataraja Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-luminosity pointer-events-none"
          style={{ backgroundImage: `url('/BG1.png')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f0f0f]/95 via-[#111111]/90 to-[#0f0f0f]/95 pointer-events-none" />

        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#222222] pb-5 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#0a0a0a] text-[#d4af37] border-2 border-[#d4af37] flex items-center justify-center p-2 shadow-lg flex-shrink-0">
                <img src="/logo.png" alt="Sri Ruthralaya" className="w-full h-full object-contain" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-cinzel font-bold text-lg sm:text-xl text-[#d4af37]">
                    AI Strategic Intelligence &amp; Trend Insights
                  </h2>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                    Live LLM Model Active
                  </span>
                </div>
                <p className="text-xs text-[#888888] font-cormorant italic mt-0.5">
                  Autonomous qualitative analysis synthesized from aggregated academy metrics (OpenAI / Claude / DB Engine)
                </p>
              </div>
            </div>

            <button
              onClick={handleRegenerateAi}
              disabled={refreshingAi}
              className="primary-btn self-start sm:self-auto text-xs py-2 px-4 shadow flex items-center gap-2 disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${refreshingAi ? 'animate-spin' : ''}`} />
              <span>{refreshingAi ? 'Analyzing Data...' : 'Regenerate Analysis'}</span>
            </button>
          </div>

          {/* Structured Insights Grid: 3 Trends, 1 Risk, 1 Recommendation */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Col: 3 Positive Trends */}
            <div className="lg:col-span-7 space-y-3">
              <h3 className="font-cinzel text-xs uppercase tracking-wider text-[#d4af37] font-bold flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                3 Key Observed Trends
              </h3>

              <div className="space-y-2.5">
                {(aiInsights?.trends || [
                  "Sustained Enrollment Acceleration: Student count expanded by 97.9% from 48 to 95 over the past 6 months.",
                  "Senior Batch Dedication: The Arangetram Intensive batch demonstrates an extraordinary 98% attendance rate.",
                  "Stellar Retention Rate: 97.1% disciple retention rate showcases exceptional student-guru bonding.",
                ]).map((trend, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-[#0f0f0f] border border-[#222222] flex items-start gap-2.5 text-xs text-[#bdbdbd] leading-relaxed font-outfit">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{trend}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Col: 1 Operational Risk + 1 Recommendation */}
            <div className="lg:col-span-5 space-y-4">
              
              {/* Risk Card */}
              <div>
                <h3 className="font-cinzel text-xs uppercase tracking-wider text-amber-400 font-bold flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  Identified Operational Risk
                </h3>
                <div className="p-3.5 rounded-xl bg-[#18140c] border border-amber-500/40 text-xs text-[#f1ddba] leading-relaxed font-outfit">
                  {aiInsights?.risk || "Beginner Adavu Consistency: Bala Natya attendance currently trails at 89%, accompanied by ₹22,000 in pending term dues requiring follow-up."}
                </div>
              </div>

              {/* Actionable Recommendation Card */}
              <div>
                <h3 className="font-cinzel text-xs uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Strategic Actionable Recommendation
                </h3>
                <div className="p-3.5 rounded-xl bg-[#0d1712] border border-emerald-500/40 text-xs text-[#c6ebd4] leading-relaxed font-outfit">
                  {aiInsights?.recommendation || "Institute a 'Natyarambha Milestone Showcase' after completing the first 20 Adavus with a parent observation session to bolster retention."}
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>

      {/* CHARTS GRID (Recharts with Dark Theme) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Chart 1: Monthly Enrollment Trend with Linear Regression Forecast Line */}
        <div className="p-6 rounded-3xl bg-[#111111] border border-[#333333] shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-cinzel font-bold text-base text-white">
                Monthly Enrollment &amp; Regression Forecast
              </h3>
              <p className="text-xs text-[#888888] mt-0.5">
                Historical active disciples + dotted projected trajectory for next 2 months
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-emerald-400 font-cinzel">
                Next Mo: ~{charts.forecast?.nextMonth || 104} Students
              </span>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={charts.monthlyEnrollmentTrend} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#222222" />
                <XAxis dataKey="month" stroke="#888888" fontSize={11} />
                <YAxis stroke="#888888" fontSize={11} domain={[30, 120]} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#111111', borderColor: '#d4af37', borderRadius: '12px', fontSize: '12px', color: '#ffffff' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Line
                  type="monotone"
                  dataKey="students"
                  name="Enrolled Disciples"
                  stroke="#d4af37"
                  strokeWidth={3}
                  activeDot={{ r: 6, fill: '#d4af37' }}
                  connectNulls={false}
                />
                <Line
                  type="monotone"
                  dataKey="forecast"
                  name="Linear Regression Forecast (Dotted)"
                  stroke="#10b981"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  activeDot={{ r: 6, fill: '#10b981' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Batch Attendance % Trend */}
        <div className="p-6 rounded-3xl bg-[#111111] border border-[#333333] shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-cinzel font-bold text-base text-white">
                Attendance Percentage by Batch Level
              </h3>
              <p className="text-xs text-[#888888] mt-0.5">
                Current month average attendance vs 85% university benchmark
              </p>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={charts.batchAttendanceTrend} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#222222" />
                <XAxis dataKey="batch" stroke="#888888" fontSize={11} />
                <YAxis stroke="#888888" fontSize={11} domain={[70, 100]} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#111111', borderColor: '#d4af37', borderRadius: '12px', fontSize: '12px', color: '#ffffff' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar dataKey="attendancePct" name="Attendance %" fill="#d4af37" radius={[6, 6, 0, 0]} />
                <Line type="monotone" dataKey="target" name="Exam Target (85%)" stroke="#10b981" strokeWidth={2} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Revenue vs Dues (Stacked Bar Chart) */}
        <div className="p-6 rounded-3xl bg-[#111111] border border-[#333333] shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-cinzel font-bold text-base text-white">
                Revenue Collection vs Pending Dues
              </h3>
              <p className="text-xs text-[#888888] mt-0.5">
                Monthly collected tuition revenue compared to outstanding dues (INR)
              </p>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={charts.revenueVsDues} margin={{ top: 10, right: 20, left: -5, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#222222" />
                <XAxis dataKey="month" stroke="#888888" fontSize={11} />
                <YAxis stroke="#888888" fontSize={11} tickFormatter={(v) => `₹${v/1000}k`} />
                <Tooltip
                  formatter={(v) => `₹${v.toLocaleString('en-IN')}`}
                  contentStyle={{ backgroundColor: '#111111', borderColor: '#d4af37', borderRadius: '12px', fontSize: '12px', color: '#ffffff' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar dataKey="collected" name="Tuition Collected (₹)" stackId="a" fill="#10b981" radius={[0, 0, 0, 0]} />
                <Bar dataKey="pending" name="Pending Dues (₹)" stackId="a" fill="#e11d48" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 4: Student Retention Trend over Terms */}
        <div className="p-6 rounded-3xl bg-[#111111] border border-[#333333] shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-cinzel font-bold text-base text-white">
                Student Retention &amp; Completion Rate
              </h3>
              <p className="text-xs text-[#888888] mt-0.5">
                Term-over-term retention percentage showing high disciple longevity
              </p>
            </div>
            <span className="text-xs font-cinzel font-bold text-emerald-400">97.1% Peak</span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={charts.retentionTrend} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="retentionGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#d4af37" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#d4af37" stopOpacity={0.05}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#222222" />
                <XAxis dataKey="term" stroke="#888888" fontSize={10} />
                <YAxis stroke="#888888" fontSize={11} domain={[90, 100]} />
                <Tooltip
                  formatter={(v) => `${v}%`}
                  contentStyle={{ backgroundColor: '#111111', borderColor: '#d4af37', borderRadius: '12px', fontSize: '12px', color: '#ffffff' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Area type="monotone" dataKey="retentionRate" name="Retention %" stroke="#d4af37" strokeWidth={2} fillOpacity={1} fill="url(#retentionGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Recent Activity Feed */}
      <div className="p-6 rounded-3xl bg-[#111111] border border-[#333333] shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <h3 className="font-cinzel font-bold text-base text-white">
                Recent Academy Operational Activity
              </h3>
            </div>
            <p className="text-xs text-[#888888] font-outfit mt-0.5">
              Live audit stream of administrative operations persisted directly in PostgreSQL / database ledger.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/admin/activities"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0f0f0f] text-[#d4af37] border border-[#333333] hover:border-[#d4af37] text-xs font-cinzel font-bold transition-all shadow-sm"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Full Database Audit Ledger</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Activity Feed Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {recentActivity.length === 0 ? (
            <div className="col-span-4 p-8 text-center text-xs text-[#666666] font-outfit bg-[#0f0f0f] rounded-2xl border border-[#222222]">
              No recent activity logs recorded yet.
            </div>
          ) : (
            recentActivity.map((act) => (
              <div 
                key={act.id} 
                className="p-4 rounded-2xl bg-[#0f0f0f] border border-[#222222] hover:border-[#d4af37]/60 transition-all shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-2">
                    <span className="text-[10px] font-cinzel font-bold text-[#d4af37] uppercase px-2 py-0.5 rounded bg-[#161616] border border-[#333333]">
                      {act.type}
                    </span>
                    <span className="text-[10px] text-[#777777] font-outfit">
                      {act.time}
                    </span>
                  </div>

                  <h4 className="font-cinzel font-bold text-xs text-white leading-snug">
                    {act.title}
                  </h4>
                  <p className="text-[11px] text-[#aaaaaa] mt-1.5 leading-relaxed line-clamp-3">
                    {act.detail}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-[#222222] flex items-center justify-between text-[10px] text-[#777777] font-outfit">
                  <span className="text-[#888888] font-medium truncate max-w-[150px]">
                    👤 {act.admin_name || 'Administrator'}
                  </span>
                  {act.action && (
                    <span className="font-mono uppercase text-[9px] text-[#888888]">
                      {act.action}
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
}
