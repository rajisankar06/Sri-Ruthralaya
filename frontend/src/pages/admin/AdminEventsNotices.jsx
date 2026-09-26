import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Bell, 
  Plus, 
  Trash2, 
  Edit2, 
  X, 
  MapPin, 
  Upload, 
  Image as ImageIcon,
  CheckCircle2,
  Clock,
  ExternalLink
} from 'lucide-react';
import api from '../../services/api';

export default function AdminEventsNotices() {
  const [events, setEvents] = useState([]);
  const [notices, setNotices] = useState([]);
  const [batches, setBatches] = useState([]);
  const [activeTab, setActiveTab] = useState('events');
  const [loading, setLoading] = useState(true);

  // Event modal state
  const [eventModalOpen, setEventModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [eventForm, setEventForm] = useState({
    title: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    location: 'Sivakasi Town Hall Auditorium',
    image_url: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80',
  });
  const [imagePreview, setImagePreview] = useState('');

  // Notice modal state
  const [noticeModalOpen, setNoticeModalOpen] = useState(false);
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
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  }

  // Open Create Event Modal
  const handleOpenCreateEvent = () => {
    setEditingEvent(null);
    setEventForm({
      title: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
      location: 'Sivakasi Town Hall Auditorium',
      image_url: '/BG1.png',
    });
    setImagePreview('/BG1.png');
    setEventModalOpen(true);
  };

  // Open Edit Event Modal
  const handleOpenEditEvent = (ev) => {
    setEditingEvent(ev);
    const dateStr = ev.date ? new Date(ev.date).toISOString().split('T')[0] : '';
    setEventForm({
      title: ev.title || '',
      description: ev.description || '',
      date: dateStr,
      location: ev.location || 'Sivakasi Town Hall Auditorium',
      image_url: ev.image_url || '/BG1.png',
    });
    setImagePreview(ev.image_url || '/BG1.png');
    setEventModalOpen(true);
  };

  // Handle Event Submit (Create or Edit)
  const handleSubmitEvent = async (e) => {
    e.preventDefault();
    try {
      if (editingEvent) {
        // Edit existing event
        const res = await api.put(`/events/${editingEvent.id}`, eventForm);
        if (res.data.success) {
          setEventModalOpen(false);
          await loadAll();
        }
      } else {
        // Create new event
        const res = await api.post('/events', eventForm);
        if (res.data.success) {
          setEventModalOpen(false);
          await loadAll();
        }
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save event.');
    }
  };

  // Handle Delete Event
  const handleDeleteEvent = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title || 'this event'}"?`)) return;
    try {
      await api.delete(`/events/${id}`);
      await loadAll();
    } catch (err) {
      alert('Failed to delete event.');
    }
  };

  // Handle File Upload to DataURL
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('Image size exceeds 5MB limit. Please choose a smaller photo.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setEventForm((prev) => ({ ...prev, image_url: reader.result }));
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Notice Handlers
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
    <div className="space-y-6 font-outfit text-white">
      
      {/* Header with Title & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-[#111111] border border-[#333333] shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-cinzel text-2xl sm:text-3xl font-bold text-white">
              Stage Events &amp; <span className="text-[#d4af37]">Broadcast Notices</span>
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-cinzel font-bold bg-[#0f0f0f] text-[#d4af37] border border-[#333333]">
              Academy Bulletin
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#bdbdbd] mt-1">
            Create, edit, and schedule stage events (Natyanjalis, Salangai Poojas, Arangetrams) and broadcast student circulars.
          </p>
        </div>

        <div className="flex gap-2.5">
          {activeTab === 'events' ? (
            <button
              onClick={handleOpenCreateEvent}
              className="px-4 py-2.5 rounded-xl bg-[#d4af37] text-[#111111] text-xs font-cinzel font-bold shadow-md flex items-center gap-2 hover:bg-[#c29d2f] transition-all transform hover:-translate-y-0.5"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Event</span>
            </button>
          ) : (
            <button
              onClick={() => setNoticeModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-[#d4af37] text-[#111111] text-xs font-cinzel font-bold shadow-md flex items-center gap-2 hover:bg-[#c29d2f] transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Publish Notice</span>
            </button>
          )}
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="flex gap-3 border-b border-[#222222] pb-1">
        <button
          onClick={() => setActiveTab('events')}
          className={`pb-3 px-4 text-xs sm:text-sm font-cinzel font-bold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'events'
              ? 'border-[#d4af37] text-[#d4af37]'
              : 'border-transparent text-[#888888] hover:text-[#bdbdbd]'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Stage Events ({events.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('notices')}
          className={`pb-3 px-4 text-xs sm:text-sm font-cinzel font-bold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'notices'
              ? 'border-[#d4af37] text-[#d4af37]'
              : 'border-transparent text-[#888888] hover:text-[#bdbdbd]'
          }`}
        >
          <Bell className="w-4 h-4" />
          <span>Broadcast Notices ({notices.length})</span>
        </button>
      </div>

      {/* Events View with Edit & Delete */}
      {activeTab === 'events' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((ev) => (
            <div
              key={ev.id}
              className="bg-[#111111] rounded-3xl border border-[#333333] shadow-xl overflow-hidden flex flex-col justify-between group hover:border-[#d4af37]/60 transition-all"
            >
              <div>
                <div className="h-48 bg-[#0f0f0f] relative overflow-hidden">
                  <img
                    src={ev.image_url || '/BG1.png'}
                    alt={ev.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                  {/* Top Action Buttons (Edit + Delete) */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5">
                    <button
                      onClick={() => handleOpenEditEvent(ev)}
                      className="p-2 rounded-xl bg-[#0f0f0f]/90 text-[#d4af37] hover:bg-[#d4af37] hover:text-[#111111] border border-[#333333] transition-all shadow-md backdrop-blur-xs"
                      title="Edit Event"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteEvent(ev.id, ev.title)}
                      className="p-2 rounded-xl bg-red-950/80 text-red-300 hover:bg-red-900 border border-red-900/40 transition-all shadow-md backdrop-blur-xs"
                      title="Delete Event"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <span className="absolute bottom-3 left-3 px-3 py-1 rounded-lg bg-[#0f0f0f]/90 text-[#d4af37] border border-[#333333] text-xs font-cinzel font-bold shadow">
                    {new Date(ev.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="font-cinzel font-bold text-base text-white leading-snug group-hover:text-[#d4af37] transition-colors">
                    {ev.title}
                  </h3>
                  <p className="text-xs text-[#bdbdbd] mt-2 font-outfit line-clamp-3 leading-relaxed">
                    {ev.description}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-[#222222] flex items-center justify-between text-xs text-[#888888] font-outfit mt-4">
                <span className="flex items-center gap-1.5 text-[#bdbdbd] font-medium truncate max-w-[200px]">
                  <MapPin className="w-3.5 h-3.5 text-[#d4af37] flex-shrink-0" />
                  <span className="truncate">{ev.location}</span>
                </span>
                
                <button
                  onClick={() => handleOpenEditEvent(ev)}
                  className="text-xs font-cinzel font-bold text-[#d4af37] hover:text-[#c29d2f] flex items-center gap-1"
                >
                  <Edit2 className="w-3 h-3" />
                  <span>Edit</span>
                </button>
              </div>
            </div>
          ))}

          {events.length === 0 && !loading && (
            <div className="col-span-full p-12 bg-[#111111] rounded-3xl border border-dashed border-[#333333] text-center space-y-3">
              <Calendar className="w-12 h-12 text-[#444444] mx-auto" />
              <h3 className="font-cinzel font-bold text-lg text-white">No Stage Events Published</h3>
              <p className="text-xs text-[#bdbdbd]">Click "Create New Event" above to schedule your first classical performance.</p>
            </div>
          )}
        </div>
      )}

      {/* Notices View */}
      {activeTab === 'notices' && (
        <div className="space-y-4">
          {notices.map((n) => (
            <div
              key={n.id}
              className="p-6 bg-[#111111] rounded-3xl border border-[#333333] shadow-xl flex items-start justify-between gap-4 hover:border-[#d4af37]/40 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-[#0f0f0f] text-[#d4af37] border border-[#333333] flex-shrink-0 mt-1">
                  <Bell className="w-5 h-5 text-[#d4af37]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-cinzel font-bold text-base text-white">
                      {n.title}
                    </h3>
                    <span className="px-2 py-0.5 rounded text-[10px] font-cinzel uppercase bg-[#0f0f0f] text-[#d4af37] border border-[#333333] font-bold">
                      Target: {n.target}
                    </span>
                  </div>
                  <p className="text-xs text-[#bdbdbd] mt-1.5 leading-relaxed max-w-3xl">
                    {n.message}
                  </p>
                  <span className="text-[10px] text-[#777777] mt-2 block font-outfit">
                    Published on {new Date(n.created_at).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleDeleteNotice(n.id)}
                className="p-2 rounded-lg text-[#888888] hover:text-red-400 hover:bg-red-950/40 transition-colors"
                title="Delete Notice"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}

          {notices.length === 0 && !loading && (
            <div className="p-12 bg-[#111111] rounded-3xl border border-dashed border-[#333333] text-center space-y-3">
              <Bell className="w-12 h-12 text-[#444444] mx-auto" />
              <h3 className="font-cinzel font-bold text-lg text-white">No Notices Published</h3>
              <p className="text-xs text-[#bdbdbd]">Broadcast notices to all students or specific batches with the button above.</p>
            </div>
          )}
        </div>
      )}

      {/* Create / Edit Event Modal */}
      {eventModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#111111] rounded-3xl border border-[#333333] max-w-lg w-full p-6 sm:p-8 shadow-2xl relative my-8 text-white">
            <button
              onClick={() => setEventModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-[#222222] text-[#888888] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-cinzel font-bold text-xl text-white mb-1">
              {editingEvent ? 'Edit Academy Event' : 'Create New Academy Event'}
            </h3>
            <p className="text-xs text-[#bdbdbd] font-outfit mb-5">
              {editingEvent 
                ? 'Update event details, timing, venue, and poster photography.' 
                : 'Publish upcoming Natyanjali performances, Salangai Poojas, and solo Arangetrams.'}
            </p>

            <form onSubmit={handleSubmitEvent} className="space-y-4 font-outfit">
              <div>
                <label className="block text-xs font-semibold text-[#d4af37] mb-1 font-cinzel">
                  Event Title *
                </label>
                <input
                  type="text"
                  required
                  value={eventForm.title}
                  onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                  placeholder="e.g. Mahashivratri Natyanjali Utsav 2026"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0f0f0f] border border-[#333333] text-white text-xs sm:text-sm focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#d4af37] mb-1 font-cinzel">
                    Event Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={eventForm.date}
                    onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0f0f0f] border border-[#333333] text-white text-xs sm:text-sm focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#d4af37] mb-1 font-cinzel">
                    Venue / Location *
                  </label>
                  <input
                    type="text"
                    required
                    value={eventForm.location}
                    onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                    placeholder="Sivakasi Town Hall Auditorium"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0f0f0f] border border-[#333333] text-white text-xs sm:text-sm focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#d4af37] mb-1 font-cinzel">
                  Event Poster / Image URL or Device Upload
                </label>
                
                {/* Upload or URL input */}
                <div className="space-y-2">
                  <div className="flex gap-2 items-center">
                    <input
                      type="text"
                      value={eventForm.image_url}
                      onChange={(e) => {
                        setEventForm({ ...eventForm, image_url: e.target.value });
                        setImagePreview(e.target.value);
                      }}
                      placeholder="https://... or choose file below"
                      className="flex-grow px-3.5 py-2.5 rounded-xl bg-[#0f0f0f] border border-[#333333] text-white text-xs focus:outline-none focus:border-[#d4af37]"
                    />

                    <label className="cursor-pointer px-3.5 py-2.5 rounded-xl bg-[#0f0f0f] hover:bg-[#1a1a1a] border border-[#333333] text-[#d4af37] text-xs font-semibold flex items-center gap-1.5 flex-shrink-0">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {/* Preset quick buttons */}
                  <div className="flex gap-1.5 flex-wrap">
                    <span className="text-[10px] text-[#888888] self-center">Brand Presets:</span>
                    <button
                      type="button"
                      onClick={() => {
                        setEventForm({ ...eventForm, image_url: '/BG1.png' });
                        setImagePreview('/BG1.png');
                      }}
                      className="px-2 py-0.5 rounded text-[10px] bg-[#0f0f0f] hover:bg-[#222222] text-[#bdbdbd] border border-[#333333]"
                    >
                      Nataraja BG1
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setEventForm({ ...eventForm, image_url: '/BG.2.png' });
                        setImagePreview('/BG.2.png');
                      }}
                      className="px-2 py-0.5 rounded text-[10px] bg-[#0f0f0f] hover:bg-[#222222] text-[#bdbdbd] border border-[#333333]"
                    >
                      Salangai BG2
                    </button>
                  </div>

                  {/* Thumbnail Preview */}
                  {imagePreview && (
                    <div className="h-24 w-full rounded-xl overflow-hidden border border-[#333333] bg-[#0f0f0f] relative mt-2">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#d4af37] mb-1 font-cinzel">
                  Event Description &amp; Margam Agenda *
                </label>
                <textarea
                  rows={3}
                  required
                  value={eventForm.description}
                  onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                  placeholder="Detail the varnams, live orchestra accompaniments, chief guests, and ticket admission..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0f0f0f] border border-[#333333] text-white text-xs sm:text-sm focus:outline-none focus:border-[#d4af37]"
                ></textarea>
              </div>

              <div className="pt-2 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setEventModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-[#333333] text-xs font-medium text-[#bdbdbd] hover:bg-[#222222] hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#d4af37] text-[#111111] text-xs font-cinzel font-bold shadow hover:bg-[#c29d2f] transition-all"
                >
                  {editingEvent ? 'Save Changes' : 'Publish Event'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Broadcast Notice Modal */}
      {noticeModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111111] rounded-3xl border border-[#333333] max-w-md w-full p-6 sm:p-8 shadow-2xl relative text-white">
            <button
              onClick={() => setNoticeModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-[#222222] text-[#888888] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-cinzel font-bold text-xl text-white mb-4">
              Broadcast New Notice
            </h3>
            <form onSubmit={handleCreateNotice} className="space-y-4 font-outfit">
              <div>
                <label className="block text-xs font-semibold text-[#d4af37] mb-1 font-cinzel">
                  Notice Title *
                </label>
                <input
                  type="text"
                  required
                  value={noticeForm.title}
                  onChange={(e) => setNoticeForm({ ...noticeForm, title: e.target.value })}
                  placeholder="e.g. Navaratri Rehearsal Schedule"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0f0f0f] border border-[#333333] text-white text-xs sm:text-sm focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#d4af37] mb-1 font-cinzel">
                  Target Recipient *
                </label>
                <select
                  value={noticeForm.target}
                  onChange={(e) => setNoticeForm({ ...noticeForm, target: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0f0f0f] border border-[#333333] text-white text-xs sm:text-sm focus:outline-none focus:border-[#d4af37]"
                >
                  <option value="all">All Academy Students &amp; Parents</option>
                  <option value="batch">Specific Training Batch</option>
                </select>
              </div>

              {noticeForm.target === 'batch' && (
                <div>
                  <label className="block text-xs font-semibold text-[#d4af37] mb-1 font-cinzel">
                    Select Batch
                  </label>
                  <select
                    value={noticeForm.batch_id}
                    onChange={(e) => setNoticeForm({ ...noticeForm, batch_id: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0f0f0f] border border-[#333333] text-white text-xs sm:text-sm focus:outline-none focus:border-[#d4af37]"
                  >
                    <option value="">Choose a Batch...</option>
                    {batches.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name} ({b.level})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-[#d4af37] mb-1 font-cinzel">
                  Notice Announcement Message *
                </label>
                <textarea
                  rows={4}
                  required
                  value={noticeForm.message}
                  onChange={(e) => setNoticeForm({ ...noticeForm, message: e.target.value })}
                  placeholder="Detailed announcement text..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0f0f0f] border border-[#333333] text-white text-xs sm:text-sm focus:outline-none focus:border-[#d4af37]"
                ></textarea>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setNoticeModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-[#333333] text-xs text-[#bdbdbd] hover:bg-[#222222] hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#d4af37] text-[#111111] text-xs font-cinzel font-bold hover:bg-[#c29d2f]"
                >
                  Publish Notice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

