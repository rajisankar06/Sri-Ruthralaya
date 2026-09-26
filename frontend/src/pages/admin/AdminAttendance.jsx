import React, { useState, useEffect } from 'react';
import { CalendarCheck, Upload, CheckCircle2, XCircle, Clock, Save, FileSpreadsheet, Download, Check } from 'lucide-react';
import api from '../../services/api';

export default function AdminAttendance() {
  const [batches, setBatches] = useState([]);
  const [selectedBatchId, setSelectedBatchId] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [students, setStudents] = useState([]);
  const [attendanceMap, setAttendanceMap] = useState({}); // { student_id: 'present'|'absent'|'late' }
  const [remarksMap, setRemarksMap] = useState({});
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [csvModalOpen, setCsvModalOpen] = useState(false);
  const [csvText, setCsvText] = useState('');
  const [csvResult, setCsvResult] = useState('');

  useEffect(() => {
    loadBatches();
  }, []);

  useEffect(() => {
    if (selectedBatchId) {
      loadBatchStudentsAndAttendance();
    }
  }, [selectedBatchId, selectedDate]);

  async function loadBatches() {
    try {
      const res = await api.get('/batches');
      if (res.data.success && res.data.data.length > 0) {
        setBatches(res.data.data);
        setSelectedBatchId(res.data.data[0].id);
      }
    } catch (err) {
      console.error('Error loading batches:', err);
    }
  }

  async function loadBatchStudentsAndAttendance() {
    setSavedSuccess(false);
    try {
      const [stuRes, attRes] = await Promise.all([
        api.get(`/students?batch_id=${selectedBatchId}`),
        api.get(`/attendance/batch?batch_id=${selectedBatchId}&date=${selectedDate}`),
      ]);

      if (stuRes.data.success) {
        setStudents(stuRes.data.data);
        
        // Map existing attendance
        const map = {};
        const remarks = {};
        stuRes.data.data.forEach((s) => {
          map[s.id] = 'present'; // default
        });

        if (attRes.data.success && attRes.data.data.length > 0) {
          attRes.data.data.forEach((record) => {
            map[record.student_id] = record.status;
            if (record.remarks) remarks[record.student_id] = record.remarks;
          });
        }

        setAttendanceMap(map);
        setRemarksMap(remarks);
      }
    } catch (err) {
      console.error('Error loading attendance list:', err);
    }
  }

  const markAll = (status) => {
    const updated = {};
    students.forEach((s) => {
      updated[s.id] = status;
    });
    setAttendanceMap(updated);
  };

  const handleSaveAttendance = async () => {
    try {
      const records = students.map((s) => ({
        student_id: s.id,
        status: attendanceMap[s.id] || 'present',
        remarks: remarksMap[s.id] || '',
      }));

      const res = await api.post('/attendance/mark', {
        batch_id: selectedBatchId,
        date: selectedDate,
        records,
      });

      if (res.data.success) {
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 3000);
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save attendance.');
    }
  };

  const handleCsvUpload = async () => {
    try {
      const res = await api.post('/attendance/bulk-csv', {
        csvData: csvText,
      });
      if (res.data.success) {
        setCsvResult(res.data.message);
        setTimeout(() => {
          setCsvModalOpen(false);
          setCsvResult('');
          setCsvText('');
          loadBatchStudentsAndAttendance();
        }, 1500);
      }
    } catch (err) {
      setCsvResult(`Error: ${err.response?.data?.message || 'CSV parse failed.'}`);
    }
  };

  return (
    <div className="space-y-8 font-outfit">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-cinzel text-2xl sm:text-3xl font-bold text-temple-maroon">
            Attendance Register &amp; CSV Bulk Upload
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Mark daily presence for batches, manage excused leaves, and import bulk logs via spreadsheet CSV.
          </p>
        </div>

        <button
          onClick={() => setCsvModalOpen(true)}
          className="self-start sm:self-auto px-4 py-2.5 rounded-xl bg-white border border-temple-gold text-temple-maroon hover:bg-temple-maroon hover:text-white text-xs font-cinzel font-bold shadow flex items-center gap-2 transition-all"
        >
          <FileSpreadsheet className="w-4 h-4" />
          <span>Bulk Upload via CSV</span>
        </button>
      </div>

      {/* Control Bar: Batch and Date selector */}
      <div className="p-6 rounded-3xl bg-white border-2 border-temple-gold/40 shadow-temple flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
          <div>
            <label className="block text-[11px] font-cinzel font-bold text-stone-600 mb-1">
              Select Batch:
            </label>
            <select
              value={selectedBatchId}
              onChange={(e) => setSelectedBatchId(e.target.value)}
              className="px-3.5 py-2 rounded-xl border border-stone-200 text-xs sm:text-sm focus:outline-none focus:border-temple-gold bg-stone-50 text-stone-800 font-cinzel font-medium"
            >
              {batches.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name} ({b.level})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-cinzel font-bold text-stone-600 mb-1">
              Session Date:
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3.5 py-2 rounded-xl border border-stone-200 text-xs sm:text-sm focus:outline-none focus:border-temple-gold bg-stone-50 text-stone-800 font-outfit"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <button
            onClick={() => markAll('present')}
            className="px-3.5 py-2 rounded-xl border border-emerald-300 bg-emerald-50 text-emerald-800 text-xs font-cinzel font-bold hover:bg-emerald-100 transition-colors"
          >
            Mark All Present
          </button>
          <button
            onClick={() => markAll('absent')}
            className="px-3.5 py-2 rounded-xl border border-rose-300 bg-rose-50 text-rose-800 text-xs font-cinzel font-bold hover:bg-rose-100 transition-colors"
          >
            Mark All Absent
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <span>Attendance records saved successfully for {selectedDate}!</span>
        </div>
      )}

      {/* Roster Table */}
      <div className="bg-white rounded-3xl border-2 border-temple-gold/40 shadow-temple overflow-hidden">
        <div className="p-6 border-b border-stone-100 flex items-center justify-between">
          <h2 className="font-cinzel font-bold text-base text-temple-maroon">
            Roster ({students.length} Registered Disciples)
          </h2>
          <span className="text-xs text-stone-500 font-outfit">
            Date: {new Date(selectedDate).toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
        </div>

        {students.length === 0 ? (
          <div className="p-12 text-center text-xs text-stone-400">
            No students currently enrolled in this batch.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-temple-cream border-b border-amber-200 font-cinzel font-bold text-stone-700">
                  <th className="p-4">Disciple Name</th>
                  <th className="p-4 text-center">Status (Present / Absent / Late)</th>
                  <th className="p-4">Remarks / Leave Reason</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {students.map((student) => {
                  const currentStatus = attendanceMap[student.id] || 'present';

                  return (
                    <tr key={student.id} className="hover:bg-amber-50/40 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={student.profile_photo_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
                            alt={student.name}
                            className="w-9 h-9 rounded-full object-cover border border-temple-gold flex-shrink-0"
                          />
                          <div>
                            <span className="font-bold text-stone-800 font-cinzel block">{student.name}</span>
                            <span className="text-[11px] text-stone-400">{student.email}</span>
                          </div>
                        </div>
                      </td>

                      <td className="p-4 text-center">
                        <div className="inline-flex rounded-xl p-1 bg-stone-100 border border-stone-200 gap-1">
                          <button
                            type="button"
                            onClick={() => setAttendanceMap({ ...attendanceMap, [student.id]: 'present' })}
                            className={`px-3 py-1 rounded-lg text-xs font-cinzel font-semibold transition-all ${
                              currentStatus === 'present'
                                ? 'bg-emerald-600 text-white shadow'
                                : 'text-stone-600 hover:text-emerald-700'
                            }`}
                          >
                            Present
                          </button>

                          <button
                            type="button"
                            onClick={() => setAttendanceMap({ ...attendanceMap, [student.id]: 'absent' })}
                            className={`px-3 py-1 rounded-lg text-xs font-cinzel font-semibold transition-all ${
                              currentStatus === 'absent'
                                ? 'bg-rose-600 text-white shadow'
                                : 'text-stone-600 hover:text-rose-700'
                            }`}
                          >
                            Absent
                          </button>

                          <button
                            type="button"
                            onClick={() => setAttendanceMap({ ...attendanceMap, [student.id]: 'late' })}
                            className={`px-3 py-1 rounded-lg text-xs font-cinzel font-semibold transition-all ${
                              currentStatus === 'late'
                                ? 'bg-amber-500 text-white shadow'
                                : 'text-stone-600 hover:text-amber-700'
                            }`}
                          >
                            Late
                          </button>
                        </div>
                      </td>

                      <td className="p-4">
                        <input
                          type="text"
                          value={remarksMap[student.id] || ''}
                          onChange={(e) => setRemarksMap({ ...remarksMap, [student.id]: e.target.value })}
                          placeholder="e.g. In Aramandi speed 2, school exam leave..."
                          className="w-full px-3 py-1.5 rounded-lg border border-stone-200 text-xs focus:outline-none focus:border-temple-gold bg-stone-50/50"
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        <div className="p-4 bg-temple-cream/50 border-t border-amber-200/50 flex justify-end">
          <button
            onClick={handleSaveAttendance}
            className="px-6 py-2.5 rounded-xl bg-temple-maroon text-temple-gold hover:bg-temple-maroon-dark text-xs font-cinzel font-bold shadow flex items-center gap-2 transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Save Batch Attendance</span>
          </button>
        </div>
      </div>

      {/* CSV Bulk Upload Modal */}
      {csvModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border-2 border-temple-gold max-w-xl w-full p-6 sm:p-8 shadow-2xl relative">
            <h3 className="font-cinzel font-bold text-xl text-temple-maroon mb-2">
              Bulk Attendance CSV Upload
            </h3>
            <p className="text-xs text-stone-500 mb-4">
              Paste attendance rows or CSV content formatted with columns: <br />
              <code className="bg-stone-100 px-1 py-0.5 rounded text-temple-maroon font-bold">
                student_email,date,status,remarks
              </code>
            </p>

            <textarea
              rows={6}
              value={csvText}
              onChange={(e) => setCsvText(e.target.value)}
              placeholder="student_email,date,status,remarks&#10;ananya.r@gmail.com,2026-10-02,present,Punctual&#10;diya.s@gmail.com,2026-10-02,present,Varnam cleared"
              className="w-full p-3 font-mono text-xs rounded-xl border border-stone-300 focus:outline-none focus:border-temple-gold bg-stone-50 mb-3"
            ></textarea>

            {csvResult && (
              <p className="text-xs font-semibold text-temple-maroon mb-3">
                {csvResult}
              </p>
            )}

            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  setCsvText("student_email,date,status,remarks\nananya.r@gmail.com,2026-10-02,present,Aramandi practice\nkavya.k@gmail.com,2026-10-02,present,Tatta Adavu cleared");
                }}
                className="text-xs text-temple-maroon hover:underline font-cinzel"
              >
                Insert Sample Data
              </button>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setCsvModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-stone-200 text-xs text-stone-600 hover:bg-stone-50"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={handleCsvUpload}
                  className="px-5 py-2 rounded-xl bg-temple-maroon text-temple-gold text-xs font-cinzel font-bold shadow hover:bg-temple-maroon-dark"
                >
                  Import Attendance
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
