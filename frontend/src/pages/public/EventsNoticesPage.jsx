import React, { useState, useEffect } from 'react';
import { Calendar, Bell, MapPin, Clock, ArrowRight } from 'lucide-react';
import api from '../../services/api';
import TempleBorder from '../../components/common/TempleBorder';
import KolamDivider from '../../components/common/KolamDivider';

export default function EventsNoticesPage() {
  const [events, setEvents] = useState([]);
  const [notices, setNotices] = useState([]);
  const [activeTab, setActiveTab] = useState('events');

  useEffect(() => {
    async function loadData() {
      try {
        const [evRes, notRes] = await Promise.all([
          api.get('/events'),
          api.get('/notices'),
        ]);
        if (evRes.data.success) setEvents(evRes.data.data);
        if (notRes.data.success) setNotices(notRes.data.data);
      } catch (err) {
        console.error('Failed to load events or notices:', err);
      }
    }
    loadData();
  }, []);

  return (
    <div className="bg-[#0f0f0f] text-white min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="font-cinzel text-xs font-semibold uppercase tracking-widest text-[#d4af37] px-3 py-1 rounded-full bg-[#111111] border border-[#333333]">
            Academy Calendar
          </span>
          <h1 className="font-cinzel text-3xl sm:text-5xl font-bold text-white mt-3">
            Events &amp; <span className="text-[#d4af37]">Notice Board</span>
          </h1>
          <p className="font-cormorant italic text-lg sm:text-xl text-[#bdbdbd] mt-2">
            Stay informed on upcoming Natyanjalis, workshops, exam deadlines, and circulars
          </p>
        </div>

        <TempleBorder />

        {/* Tab Switcher */}
        <div className="flex justify-center my-8">
          <div className="p-1 rounded-xl bg-[#111111] border border-[#333333] shadow-lg flex gap-2">
            <button
              onClick={() => setActiveTab('events')}
              className={`px-6 py-2.5 rounded-lg text-xs font-cinzel font-bold tracking-wider transition-all flex items-center gap-2 ${
                activeTab === 'events'
                  ? 'bg-[#d4af37] text-[#111111] shadow'
                  : 'text-[#bdbdbd] hover:text-[#d4af37]'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Upcoming Events ({events.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('notices')}
              className={`px-6 py-2.5 rounded-lg text-xs font-cinzel font-bold tracking-wider transition-all flex items-center gap-2 ${
                activeTab === 'notices'
                  ? 'bg-[#d4af37] text-[#111111] shadow'
                  : 'text-[#bdbdbd] hover:text-[#d4af37]'
              }`}
            >
              <Bell className="w-4 h-4" />
              <span>Notices &amp; Circulars ({notices.length})</span>
            </button>
          </div>
        </div>

        {/* Events Content */}
        {activeTab === 'events' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((ev) => (
              <div
                key={ev.id}
                className="bg-[#111111] rounded-2xl border border-[#333333] shadow-lg overflow-hidden flex flex-col justify-between hover:border-[#d4af37]/60 transition-all"
              >
                <div>
                  <div className="h-48 overflow-hidden bg-[#0f0f0f] relative">
                    <img
                      src={ev.image_url || 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80'}
                      alt={ev.title}
                      className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 px-3 py-1 rounded bg-[#0f0f0f]/90 text-[#d4af37] border border-[#333333] text-xs font-cinzel font-bold">
                      {new Date(ev.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="font-cinzel font-bold text-lg text-[#d4af37] leading-snug">
                      {ev.title}
                    </h3>
                    <p className="mt-2 text-xs text-[#bdbdbd] font-outfit line-clamp-4 leading-relaxed">
                      {ev.description}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-[#222222] flex items-center justify-between text-xs text-[#999999] font-outfit">
                  <span className="flex items-center gap-1.5 text-[#bdbdbd]">
                    <MapPin className="w-3.5 h-3.5 text-[#d4af37]" />
                    {ev.location || 'Thiruthangal Sivakasi'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Notices Content */}
        {activeTab === 'notices' && (
          <div className="max-w-4xl mx-auto space-y-4">
            {notices.map((n) => (
              <div
                key={n.id}
                className="p-6 bg-[#111111] rounded-2xl border border-[#333333] shadow-md flex items-start gap-4 hover:border-[#d4af37]/60 transition-colors"
              >
                <div className="p-3 rounded-xl bg-[#0f0f0f] border border-[#333333] text-[#d4af37] flex-shrink-0 mt-1">
                  <Bell className="w-5 h-5 text-[#d4af37]" />
                </div>

                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                    <h3 className="font-cinzel font-bold text-base text-white">
                      {n.title}
                    </h3>
                    <span className="text-[11px] text-[#777777] font-outfit">
                      {new Date(n.created_at).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#bdbdbd] font-outfit leading-relaxed">
                    {n.message}
                  </p>

                  <div className="mt-3 flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-cinzel uppercase bg-[#0f0f0f] border border-[#333333] text-[#d4af37]">
                      Target: {n.target}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
