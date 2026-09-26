import React, { useState, useEffect } from 'react';
import { MessageSquare, Search, User, Bot, Clock, Sparkles } from 'lucide-react';
import api from '../../services/api';

export default function AdminChatbotLogs() {
  const [logs, setLogs] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLogs();
  }, []);

  async function loadLogs() {
    try {
      const res = await api.get('/chatbot/logs');
      if (res.data.success) {
        setLogs(res.data.data);
      }
    } catch (err) {
      console.error('Error loading chatbot logs:', err);
    } finally {
      setLoading(false);
    }
  }

  const filtered = logs.filter((log) => {
    const q = search.toLowerCase();
    const msg = log.message?.toLowerCase() || '';
    const res = log.response?.toLowerCase() || '';
    const user = log.user?.name?.toLowerCase() || 'guest';
    return msg.includes(q) || res.includes(q) || user.includes(q);
  });

  return (
    <div className="space-y-8 font-outfit">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-cinzel text-2xl sm:text-3xl font-bold text-temple-maroon">
            AI Assistant Conversation Logs
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Review queries asked by website visitors and authenticated disciples to understand common questions and admission inquiries.
          </p>
        </div>

        <span className="self-start sm:self-auto px-4 py-2 rounded-xl bg-amber-100 text-amber-900 border border-amber-300 text-xs font-cinzel font-semibold">
          Total Logs Recorded: {logs.length}
        </span>
      </div>

      {/* Search */}
      <div className="p-4 rounded-2xl bg-white border border-temple-gold/40 shadow-sm">
        <div className="relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search conversation questions or responses..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-stone-200 text-xs sm:text-sm focus:outline-none focus:border-temple-gold bg-stone-50/50"
          />
        </div>
      </div>

      {/* Logs List */}
      <div className="space-y-4">
        {filtered.map((log) => (
          <div
            key={log.id}
            className="p-6 bg-white rounded-3xl border-2 border-temple-gold/40 shadow-temple space-y-4 hover:border-temple-gold transition-colors"
          >
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-cinzel font-bold uppercase ${
                  log.user ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-100 text-stone-600'
                }`}>
                  {log.user ? `Student: ${log.user.name}` : 'Public Guest'}
                </span>
                {log.user?.email && (
                  <span className="text-xs text-stone-400">({log.user.email})</span>
                )}
              </div>

              <span className="text-xs text-stone-400 flex items-center gap-1 font-outfit">
                <Clock className="w-3.5 h-3.5" />
                {new Date(log.created_at).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
              </span>
            </div>

            {/* User message */}
            <div className="flex items-start gap-3 bg-amber-50/60 p-3.5 rounded-2xl border border-amber-200/60">
              <div className="w-7 h-7 rounded-full bg-temple-maroon text-temple-gold flex items-center justify-center flex-shrink-0 mt-0.5">
                <User className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-cinzel font-bold text-temple-maroon uppercase block">
                  Question
                </span>
                <p className="text-xs sm:text-sm text-stone-800 font-medium mt-0.5">
                  "{log.message}"
                </p>
              </div>
            </div>

            {/* Bot response */}
            <div className="flex items-start gap-3 bg-temple-cream/60 p-3.5 rounded-2xl border border-temple-gold/30">
              <div className="w-7 h-7 rounded-full bg-temple-gold text-temple-maroon-deep flex items-center justify-center flex-shrink-0 mt-0.5">
                <Sparkles className="w-4 h-4 text-temple-maroon" />
              </div>
              <div className="flex-1">
                <span className="text-[10px] font-cinzel font-bold text-temple-maroon uppercase block">
                  AI Response Provided
                </span>
                <p className="text-xs sm:text-sm text-stone-700 mt-0.5 leading-relaxed">
                  {log.response}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
