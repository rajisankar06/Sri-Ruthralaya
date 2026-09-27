import React, { useState, useEffect } from 'react';
import { CalendarCheck, CheckCircle2, XCircle, Clock, Calendar as CalIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import api from '../../services/api';

export default function StudentAttendance() {
  const [attendanceData, setAttendanceData] = useState({ records: [], stats: {} });
  const [loading, setLoading] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    async function loadAttendance() {
      try {
        const res = await api.get('/attendance/student');
        if (res.data.success) {
          setAttendanceData(res.data.data);
        }
      } catch (err) {
        console.error('Failed to load attendance:', err);
      } finally {
        setLoading(false);
      }
    }
    loadAttendance();
  }, []);

  const stats = attendanceData.stats || {
    attendancePercentage: 92,
    total: 15,
    present: 14,
    late: 0,
    absent: 1,
  };

  const records = attendanceData.records || [];

  // Generate days in month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay(); // 0 is Sunday

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Map dates to attendance status
  const getStatusForDay = (day) => {
    const formattedDay = day < 10 ? `0${day}` : `${day}`;
    const formattedMonth = (currentMonth + 1) < 10 ? `0${currentMonth + 1}` : `${currentMonth + 1}`;
    const targetDateStr = `${currentYear}-${formattedMonth}-${formattedDay}`;

    const rec = records.find(r => r.date.startsWith(targetDateStr));
    return rec ? rec.status : null;
  };

  return (
    <div className="space-y-8 font-outfit text-[#bdbdbd]">
      
      {/* Header */}
      <div>
        <h1 className="font-cinzel text-2xl sm:text-3xl font-bold text-white">
          Attendance Record &amp; Sadhana Calendar
        </h1>
        <p className="text-xs sm:text-sm text-[#aaaaaa] mt-1">
          Review your attendance consistency. Disciples require a minimum 85% attendance for University Grade exam eligibility.
        </p>
      </div>

      {/* Stats Counter Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#111111] border border-[#333333] hover:border-[#d4af37]/60 shadow-xl transition-all">
          <span className="text-xs font-cinzel text-[#888888] uppercase tracking-wider block">
            Overall Attendance
          </span>
          <span className="font-cinzel font-bold text-3xl text-white mt-1 block">
            {stats.attendancePercentage}%
          </span>
          <span className="text-[11px] text-emerald-400 font-semibold">Eligible for Exams</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#111111] border border-[#333333] hover:border-[#d4af37]/60 shadow-xl transition-all">
          <span className="text-xs font-cinzel text-[#888888] uppercase tracking-wider block">
            Classes Present
          </span>
          <span className="font-cinzel font-bold text-3xl text-emerald-400 mt-1 block">
            {stats.present}
          </span>
          <span className="text-[11px] text-[#666666]">Punctual Sadhana</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#111111] border border-[#333333] hover:border-[#d4af37]/60 shadow-xl transition-all">
          <span className="text-xs font-cinzel text-[#888888] uppercase tracking-wider block">
            Classes Absent
          </span>
          <span className="font-cinzel font-bold text-3xl text-rose-400 mt-1 block">
            {stats.absent}
          </span>
          <span className="text-[11px] text-[#666666]">Informed Leaves</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#111111] border border-[#333333] hover:border-[#d4af37]/60 shadow-xl transition-all">
          <span className="text-xs font-cinzel text-[#888888] uppercase tracking-wider block">
            Total Sessions
          </span>
          <span className="font-cinzel font-bold text-3xl text-white mt-1 block">
            {stats.total}
          </span>
          <span className="text-[11px] text-[#666666]">Academy Term Total</span>
        </div>
      </div>

      {/* Calendar View */}
      <div className="bg-[#111111] rounded-3xl border border-[#333333] shadow-xl p-6 sm:p-8">
        
        {/* Month Navigation */}
        <div className="flex items-center justify-between pb-6 border-b border-[#222222]">
          <div className="flex items-center gap-2">
            <CalIcon className="w-5 h-5 text-[#d4af37]" />
            <h2 className="font-cinzel font-bold text-lg sm:text-xl text-white">
              {monthNames[currentMonth]} {currentYear}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevMonth}
              className="p-2 rounded-xl border border-[#333333] hover:border-[#d4af37] bg-[#161616] text-[#d4af37] hover:bg-[#1a1a1a] transition-all"
              title="Previous Month"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextMonth}
              className="p-2 rounded-xl border border-[#333333] hover:border-[#d4af37] bg-[#161616] text-[#d4af37] hover:bg-[#1a1a1a] transition-all"
              title="Next Month"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Days of week header */}
        <div className="grid grid-cols-7 gap-2 text-center text-xs font-cinzel font-bold text-[#888888] py-4">
          <span>Sun</span>
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
        </div>

        {/* Days grid */}
        <div className="grid grid-cols-7 gap-2">
          {/* Empty cells before month starts */}
          {[...Array(firstDayOfWeek)].map((_, i) => (
            <div key={`empty-${i}`} className="h-16 sm:h-20 rounded-xl bg-[#141414]/50 border border-[#1f1f1f]"></div>
          ))}

          {/* Actual days */}
          {[...Array(daysInMonth)].map((_, i) => {
            const dayNum = i + 1;
            const status = getStatusForDay(dayNum);

            return (
              <div
                key={dayNum}
                className={`h-16 sm:h-20 p-2 rounded-xl border flex flex-col justify-between transition-all ${
                  status === 'present'
                    ? 'bg-emerald-950/60 border-emerald-700/80 shadow-[0_0_10px_rgba(16,185,129,0.15)]'
                    : status === 'absent'
                    ? 'bg-rose-950/60 border-rose-700/80 shadow-[0_0_10px_rgba(244,63,94,0.15)]'
                    : 'bg-[#161616] border-[#262626] hover:border-[#333333]'
                }`}
              >
                <span className="font-cinzel text-xs font-semibold text-white">{dayNum}</span>

                {status === 'present' && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-300 bg-emerald-900/60 px-1.5 py-0.5 rounded border border-emerald-700/50">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span className="hidden sm:inline">Present</span>
                  </span>
                )}

                {status === 'absent' && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-rose-300 bg-rose-900/60 px-1.5 py-0.5 rounded border border-rose-700/50">
                    <XCircle className="w-3 h-3 text-rose-400" />
                    <span className="hidden sm:inline">Absent</span>
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-8 pt-4 border-t border-[#222222] flex flex-wrap items-center gap-6 text-xs text-[#aaaaaa]">
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded bg-emerald-500"></span>
            <span>Present in Class</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded bg-rose-500"></span>
            <span>Informed Leave / Absent</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded bg-[#161616] border border-[#333333]"></span>
            <span>Non-Class Day</span>
          </div>
        </div>

      </div>

    </div>
  );
}
