import React, { useState, useEffect } from 'react';
import { Calendar, Bell, Plus, Trash2, Edit2, X, MapPin } from 'lucide-react';
import api from '../../services/api';

export default function AdminEventsNotices() {
  const [events, setEvents] = useState([]);
  const [notices, setNotices] = useState([]);
  const [batches, setBatches] = useState([]);
  const [activeTab, setActiveTab] = useState('events');

  // Modals
  const [eventModalOpen, setEventModalOpen] = useState(false);
  const [noticeModalOpen, setNoticeModalOpen] = useState(false);

  const [eventForm, setEventForm] = useState({
    title: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    location: 'Sivakasi Town Hall Auditorium',
    image_url: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80',
  });

  const [noticeForm, setNoticeForm] = useState({
    title: '',
    message: '',
    target: 'all',
    batch_id: '',
  });

  useEffect(() => {
    loadAll();
  }, []);

  async function loadAll() {
    try {
      const [evRes, notRes, bRes] = await Promise.all([
        api.get('/events'),
        api.get('/notices'),
        api.get('/batches'),
      ]);
      if (evRes.data.success) setEvents(evRes.data.data);
      if (notRes.data.success) setNotices(notRes.data.data);
      if (bRes.data.success) setBatches(bRes.data.data);
    } catch (err) {
      console.error('Error loading events & notices:', err);
    }
  }

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/events', eventForm);
      if (res.data.success) {
        setEventModalOpen(false);
        setEventForm({
          title: '',
          description: '',
          date: new Date().toISOString().split('T')[0],
          location: 'Sivakasi Town Hall Auditorium',
          image_url: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80',
        });
        await loadAll();
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create event.');
    }
  };

  const handleDeleteEvent = async (id) => {
    if (!window.confirm('Delete this event?')) return;
    try {
      await api.delete(`/events/${id}`);
      await loadAll();
    } catch (err) {
      alert('Failed to delete event.');
    }
  };

  const handleCreateNotice = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/notices', noticeForm);
      if (res.data.success) {
        setNoticeModalOpen(false);
        setNoticeForm({ title: '', message: '', target: 'all', batch_id: '' });
        await loadAll();
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to publish notice.');
    }
  };

  const handleDeleteNotice = async (id) => {
    if (!window.confirm('Delete this notice?')) return;
    try {
      await api.delete(`/notices/${id}`);
      await loadAll();
    } catch (err) {
      alert('Failed to delete notice.');
    }
  };

  return (
    <div className="space-y-8 font-outfit">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-cinzel text-2xl sm:text-3xl font-bold text-temple-maroon">
            Events &amp; Broadcast Notice Board
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Publish upcoming Natyanjalis, Salangai Poojas, and circular announcements directly to student portals.
          </p>
        </div>

        <div className="flex gap-2">
          {activeTab === 'events' ? (
            <button
              onClick={() => setEventModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-temple-maroon text-temple-gold text-xs font-cinzel font-bold shadow flex items-center gap-2 hover:bg-temple-maroon-dark transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Create Event</span>
            </button>
          ) : (
            <button
              onClick={() => setNoticeModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-temple-maroon text-temple-gold text-xs font-cinzel font-bold shadow flex items-center gap-2 hover:bg-temple-maroon-dark transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Publish Notice</span>
            </button>
          )}
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="flex gap-2 border-b border-stone-200">
        <button
          onClick={() => setActiveTab('events')}
          className={`pb-3 px-4 text-xs sm:text-sm font-cinzel font-bold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'events'
              ? 'border-temple-maroon text-temple-maroon'
              : 'border-transparent text-stone-400 hover:text-stone-700'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Stage Events ({events.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('notices')}
          className={`pb-3 px-4 text-xs sm:text-sm font-cinzel font-bold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'notices'
              ? 'border-temple-maroon text-temple-maroon'
              : 'border-transparent text-stone-400 hover:text-stone-700'
          }`}
        >
          <Bell className="w-4 h-4" />
          <span>Broadcast Notices ({notices.length})</span>
        </button>
      </div>

      {/* Events View */}
      {activeTab === 'events' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((ev) => (
            <div
              key={ev.id}
              className="bg-white rounded-3xl border-2 border-temple-gold/40 shadow-temple overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="h-44 bg-temple-maroon relative overflow-hidden">
                  <img
                    src={ev.image_url || 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=600&q=80'}
                    alt={ev.title}
                    className="w-full h-full object-cover object-top"
                  />
                  <button
                    onClick={() => handleDeleteEvent(ev.id)}
                    className="absolute top-3 right-3 p-1.5 rounded-full bg-red-600/90 text-white hover:bg-red-700 transition-colors"
                    title="Delete Event"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-6">
                  <h3 className="font-cinzel font-bold text-base text-temple-maroon">
                    {ev.title}
                  </h3>
                  <p className="text-xs text-stone-600 mt-2 font-outfit line-clamp-3">
                    {ev.description}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500 font-outfit">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-temple-gold" />
                  {ev.location}
                </span>
                <span>{new Date(ev.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Notices View */}
      {activeTab === 'notices' && (
        <div className="space-y-4">
          {notices.map((n) => (
            <div
              key={n.id}
              className="p-6 bg-white rounded-3xl border-2 border-temple-gold/40 shadow-temple flex items-start justify-between gap-4"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-amber-50 text-temple-maroon border border-temple-gold/30 flex-shrink-0 mt-1">
                  <Bell className="w-5 h-5 text-temple-maroon" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-cinzel font-bold text-base text-temple-maroon">
                      {n.title}
                    </h3>
                    <span className="px-2 py-0.5 rounded text-[10px] font-cinzel uppercase bg-amber-100 text-amber-800 font-bold">
                      Target: {n.target}
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed max-w-3xl">
                    {n.message}
                  </p>
                  <span className="text-[10px] text-stone-400 mt-2 block font-outfit">
                    Published on {new Date(n.created_at).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleDeleteNotice(n.id)}
                className="p-2 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                title="Delete Notice"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Create Event Modal */}
      {eventModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border-2 border-temple-gold max-w-md w-full p-6 sm:p-8 shadow-2xl relative">
            <button onClick={() => setEventModalOpen(false)} className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-stone-100 text-stone-500">
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-cinzel font-bold text-xl text-temple-maroon mb-4">Create Academy Event</h3>
            <form onSubmit={handleCreateEvent} className="space-y-4 font-outfit">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1 font-cinzel">Title *</label>
                <input
                  type="text"
                  required
                  value={eventForm.title}
                  onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                  placeholder="e.g. Annual Natyanjali Utsav 2026"
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-none focus:border-temple-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1 font-cinzel">Event Date *</label>
                <input
                  type="date"
                  required
                  value={eventForm.date}
                  onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-none focus:border-temple-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1 font-cinzel">Location *</label>
                <input
                  type="text"
                  required
                  value={eventForm.location}
                  onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                  placeholder="Sivakasi Town Hall Auditorium"
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-none focus:border-temple-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1 font-cinzel">Description *</label>
                <textarea
                  rows={3}
                  required
                  value={eventForm.description}
                  onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                  placeholder="Brief synopsis of performance or workshop..."
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-none focus:border-temple-gold"
                ></textarea>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button type="button" onClick={() => setEventModalOpen(false)} className="px-4 py-2 rounded-xl border text-xs text-stone-600">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-temple-maroon text-temple-gold text-xs font-cinzel font-bold">Publish Event</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create Notice Modal */}
      {noticeModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border-2 border-temple-gold max-w-md w-full p-6 sm:p-8 shadow-2xl relative">
            <button onClick={() => setNoticeModalOpen(false)} className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-stone-100 text-stone-500">
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-cinzel font-bold text-xl text-temple-maroon mb-4">Broadcast New Notice</h3>
            <form onSubmit={handleCreateNotice} className="space-y-4 font-outfit">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1 font-cinzel">Notice Title *</label>
                <input
                  type="text"
                  required
                  value={noticeForm.title}
                  onChange={(e) => setNoticeForm({ ...noticeForm, title: e.target.value })}
                  placeholder="e.g. Costume Measurements Notice"
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-none focus:border-temple-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1 font-cinzel">Audience Target</label>
                <select
                  value={noticeForm.target}
                  onChange={(e) => setNoticeForm({ ...noticeForm, target: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-none focus:border-temple-gold text-stone-700"
                >
                  <option value="all">All Academy Students</option>
                  <option value="batch">Specific Batch Only</option>
                </select>
              </div>

              {noticeForm.target === 'batch' && (
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1 font-cinzel">Select Batch</label>
                  <select
                    value={noticeForm.batch_id}
                    onChange={(e) => setNoticeForm({ ...noticeForm, batch_id: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-none focus:border-temple-gold text-stone-700"
                  >
                    <option value="">Select target batch...</option>
                    {batches.map((b) => (
                      <option key={b.id} value={b.id}>{b.name}</option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1 font-cinzel">Message Content *</label>
                <textarea
                  rows={4}
                  required
                  value={noticeForm.message}
                  onChange={(e) => setNoticeForm({ ...noticeForm, message: e.target.value })}
                  placeholder="Detail circular instructions..."
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-none focus:border-temple-gold"
                ></textarea>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button type="button" onClick={() => setNoticeModalOpen(false)} className="px-4 py-2 rounded-xl border text-xs text-stone-600">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-temple-maroon text-temple-gold text-xs font-cinzel font-bold">Broadcast Notice</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
