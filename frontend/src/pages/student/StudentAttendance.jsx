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
    <div className="space-y-8 font-outfit">
      
      {/* Header */}
      <div>
        <h1 className="font-cinzel text-2xl sm:text-3xl font-bold text-temple-maroon">
          Attendance Record &amp; Sadhana Calendar
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 mt-1">
          Review your attendance consistency. Disciples require a minimum 85% attendance for University Grade exam eligibility.
        </p>
      </div>

      {/* Stats Counter Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-temple-gold/40 shadow-temple">
          <span className="text-xs font-cinzel text-stone-500 uppercase tracking-wider block">
            Overall Attendance
          </span>
          <span className="font-cinzel font-bold text-3xl text-temple-maroon mt-1 block">
            {stats.attendancePercentage}%
          </span>
          <span className="text-[11px] text-emerald-600 font-semibold">Eligible for Exams</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-temple-gold/40 shadow-temple">
          <span className="text-xs font-cinzel text-stone-500 uppercase tracking-wider block">
            Classes Present
          </span>
          <span className="font-cinzel font-bold text-3xl text-emerald-700 mt-1 block">
            {stats.present}
          </span>
          <span className="text-[11px] text-stone-400">Punctual Sadhana</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-temple-gold/40 shadow-temple">
          <span className="text-xs font-cinzel text-stone-500 uppercase tracking-wider block">
            Classes Absent
          </span>
          <span className="font-cinzel font-bold text-3xl text-amber-700 mt-1 block">
            {stats.absent}
          </span>
          <span className="text-[11px] text-stone-400">Informed Leaves</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-temple-gold/40 shadow-temple">
          <span className="text-xs font-cinzel text-stone-500 uppercase tracking-wider block">
            Total Sessions
          </span>
          <span className="font-cinzel font-bold text-3xl text-stone-800 mt-1 block">
            {stats.total}
          </span>
          <span className="text-[11px] text-stone-400">Academy Term Total</span>
        </div>
      </div>

      {/* Calendar View */}
      <div className="bg-white rounded-3xl border-2 border-temple-gold/40 shadow-temple p-6 sm:p-8">
        
        {/* Month Navigation */}
        <div className="flex items-center justify-between pb-6 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <CalIcon className="w-5 h-5 text-temple-gold" />
            <h2 className="font-cinzel font-bold text-lg sm:text-xl text-temple-maroon">
              {monthNames[currentMonth]} {currentYear}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevMonth}
              className="p-2 rounded-lg border border-stone-200 hover:bg-stone-50 text-stone-700"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextMonth}
              className="p-2 rounded-lg border border-stone-200 hover:bg-stone-50 text-stone-700"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Days of week header */}
        <div className="grid grid-cols-7 gap-2 text-center text-xs font-cinzel font-bold text-stone-500 py-4">
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
            <div key={`empty-${i}`} className="h-16 sm:h-20 rounded-xl bg-stone-50/50"></div>
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
                    ? 'bg-emerald-50 border-emerald-300'
                    : status === 'absent'
                    ? 'bg-rose-50 border-rose-300'
                    : 'bg-white border-stone-200'
                }`}
              >
                <span className="font-cinzel text-xs font-semibold text-stone-700">{dayNum}</span>

                {status === 'present' && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span className="hidden sm:inline">Present</span>
                  </span>
                )}

                {status === 'absent' && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-rose-800 bg-rose-100 px-1.5 py-0.5 rounded">
                    <XCircle className="w-3 h-3 text-rose-600" />
                    <span className="hidden sm:inline">Absent</span>
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-8 pt-4 border-t border-stone-100 flex flex-wrap items-center gap-6 text-xs text-stone-600">
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded bg-emerald-500"></span>
            <span>Present in Class</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded bg-rose-500"></span>
            <span>Informed Leave / Absent</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded bg-white border border-stone-300"></span>
            <span>Non-Class Day</span>
          </div>
        </div>

      </div>

    </div>
  );
}
