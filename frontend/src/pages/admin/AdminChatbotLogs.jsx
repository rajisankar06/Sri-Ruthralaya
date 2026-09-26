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
    <div className="space-y-6 font-outfit text-white">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-[#111111] border border-[#333333] shadow-xl">
        <div>
          <h1 className="font-cinzel text-2xl sm:text-3xl font-bold text-white">
            AI Assistant <span className="text-[#d4af37]">Conversation Logs</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#bdbdbd] mt-1">
            Review queries asked by website visitors and authenticated disciples to understand common questions and admission inquiries.
          </p>
        </div>

        <span className="self-start sm:self-auto px-4 py-2 rounded-xl bg-[#0f0f0f] border border-[#333333] text-[#d4af37] text-xs font-cinzel font-semibold shadow">
          Total Logs Recorded: {logs.length}
        </span>
      </div>

      {/* Search */}
      <div className="p-4 rounded-2xl bg-[#111111] border border-[#333333] shadow-md">
        <div className="relative">
          <Search className="w-4 h-4 text-[#888888] absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search conversation questions or responses..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-[#333333] text-xs sm:text-sm focus:outline-none focus:border-[#d4af37] bg-[#0f0f0f] text-white placeholder-[#666666]"
          />
        </div>
      </div>

      {/* Logs List */}
      <div className="space-y-4">
        {filtered.map((log) => (
          <div
            key={log.id}
            className="p-6 bg-[#111111] rounded-3xl border border-[#333333] shadow-xl space-y-4 hover:border-[#d4af37]/60 transition-colors"
          >
            <div className="flex items-center justify-between border-b border-[#222222] pb-3">
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-cinzel font-bold uppercase ${
                  log.user ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-[#1a1a1a] text-[#888888] border border-[#333333]'
                }`}>
                  {log.user ? `Student: ${log.user.name}` : 'Public Guest'}
                </span>
                {log.user?.email && (
                  <span className="text-xs text-[#777777]">({log.user.email})</span>
                )}
              </div>

              <span className="text-xs text-[#777777] flex items-center gap-1 font-outfit">
                <Clock className="w-3.5 h-3.5" />
                {new Date(log.created_at).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
              </span>
            </div>

            {/* User message */}
            <div className="flex items-start gap-3 bg-[#0a0a0a] p-3.5 rounded-2xl border border-[#222222]">
              <div className="w-7 h-7 rounded-full bg-[#1a1a1a] text-[#d4af37] border border-[#333333] flex items-center justify-center flex-shrink-0 mt-0.5">
                <User className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-cinzel font-bold text-[#d4af37] uppercase block">
                  Question
                </span>
                <p className="text-xs sm:text-sm text-white font-medium mt-0.5">
                  "{log.message}"
                </p>
              </div>
            </div>

            {/* Bot response */}
            <div className="flex items-start gap-3 bg-[#0f0f0f] p-3.5 rounded-2xl border border-[#2a2a2a]">
              <div className="w-7 h-7 rounded-full bg-[#d4af37] text-[#111111] flex items-center justify-center flex-shrink-0 mt-0.5 shadow">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <span className="text-[10px] font-cinzel font-bold text-white uppercase block">
                  AI Response Provided
                </span>
                <p className="text-xs sm:text-sm text-[#bdbdbd] mt-0.5 leading-relaxed">
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
