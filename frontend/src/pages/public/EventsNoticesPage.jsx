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
    <div className="bg-temple-cream min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="font-cinzel text-xs font-semibold uppercase tracking-widest text-temple-gold px-3 py-1 rounded-full bg-temple-maroon/10 border border-temple-gold/40">
            Academy Calendar
          </span>
          <h1 className="font-cinzel text-3xl sm:text-5xl font-bold text-temple-maroon mt-3">
            Events &amp; Notice Board
          </h1>
          <p className="font-cormorant italic text-lg sm:text-xl text-stone-600 mt-2">
            Stay informed on upcoming Natyanjalis, workshops, exam deadlines, and circulars
          </p>
        </div>

        <TempleBorder />

        {/* Tab Switcher */}
        <div className="flex justify-center my-8">
          <div className="p-1 rounded-xl bg-white border border-temple-gold/40 shadow-sm flex gap-2">
            <button
              onClick={() => setActiveTab('events')}
              className={`px-6 py-2.5 rounded-lg text-xs font-cinzel font-bold tracking-wider transition-all flex items-center gap-2 ${
                activeTab === 'events'
                  ? 'bg-temple-maroon text-temple-gold shadow'
                  : 'text-stone-600 hover:text-temple-maroon'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Upcoming Events ({events.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('notices')}
              className={`px-6 py-2.5 rounded-lg text-xs font-cinzel font-bold tracking-wider transition-all flex items-center gap-2 ${
                activeTab === 'notices'
                  ? 'bg-temple-maroon text-temple-gold shadow'
                  : 'text-stone-600 hover:text-temple-maroon'
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
                className="bg-white rounded-2xl border-2 border-temple-gold/40 shadow-temple overflow-hidden flex flex-col justify-between hover:shadow-temple-lg transition-all"
              >
                <div>
                  <div className="h-48 overflow-hidden bg-temple-maroon relative">
                    <img
                      src={ev.image_url || 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80'}
                      alt={ev.title}
                      className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 px-3 py-1 rounded bg-temple-maroon text-temple-gold border border-temple-gold/40 text-xs font-cinzel font-bold">
                      {new Date(ev.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="font-cinzel font-bold text-lg text-temple-maroon leading-snug">
                      {ev.title}
                    </h3>
                    <p className="mt-2 text-xs text-stone-600 font-outfit line-clamp-4 leading-relaxed">
                      {ev.description}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500 font-outfit">
                  <span className="flex items-center gap-1.5 text-stone-600">
                    <MapPin className="w-3.5 h-3.5 text-temple-gold" />
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
                className="p-6 bg-white rounded-2xl border border-temple-gold/40 shadow-temple flex items-start gap-4 hover:border-temple-gold transition-colors"
              >
                <div className="p-3 rounded-xl bg-temple-maroon/10 text-temple-maroon flex-shrink-0 mt-1">
                  <Bell className="w-5 h-5 text-temple-maroon" />
                </div>

                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                    <h3 className="font-cinzel font-bold text-base text-temple-maroon">
                      {n.title}
                    </h3>
                    <span className="text-[11px] text-stone-400 font-outfit">
                      {new Date(n.created_at).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-stone-600 font-outfit leading-relaxed">
                    {n.message}
                  </p>

                  <div className="mt-3 flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-cinzel uppercase bg-amber-100 text-amber-800">
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
