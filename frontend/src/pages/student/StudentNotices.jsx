import React, { useState, useEffect } from 'react';
import { Bell, Clock, AlertCircle } from 'lucide-react';
import api from '../../services/api';

export default function StudentNotices() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadNotices() {
      try {
        const res = await api.get('/notices');
        if (res.data.success) {
          setNotices(res.data.data);
        }
      } catch (err) {
        console.error('Failed to load notices:', err);
      } finally {
        setLoading(false);
      }
    }
    loadNotices();
  }, []);

  return (
    <div className="space-y-8 font-outfit text-[#bdbdbd]">
      <div>
        <h1 className="font-cinzel text-2xl sm:text-3xl font-bold text-white">
          Announcements &amp; Batch Circulars
        </h1>
        <p className="text-xs sm:text-sm text-[#aaaaaa] mt-1">
          Targeted circulars for your enrolled batch, exam dates, costume fittings, and academy holidays.
        </p>
      </div>

      <div className="space-y-4">
        {notices.map((n) => (
          <div
            key={n.id}
            className="p-6 bg-[#111111] rounded-3xl border border-[#333333] shadow-xl flex items-start gap-4 hover:border-[#d4af37]/60 transition-colors"
          >
            <div className="p-3.5 rounded-2xl bg-[#1a1a1a] text-[#d4af37] border border-[#333333] flex-shrink-0 mt-1">
              <Bell className="w-5 h-5 text-[#d4af37]" />
            </div>

            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                <h3 className="font-cinzel font-bold text-base text-white">
                  {n.title}
                </h3>
                <span className="text-xs text-[#888888]">
                  {new Date(n.created_at).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#aaaaaa] leading-relaxed font-outfit">
                {n.message}
              </p>

              <div className="mt-3">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-cinzel uppercase bg-[#1a1a1a] text-[#d4af37] border border-[#d4af37]/40 font-semibold">
                  Audience: {n.target === 'all' ? 'All Academy Disciples' : n.target}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
