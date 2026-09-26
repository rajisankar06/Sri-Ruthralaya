import React, { useState, useEffect } from 'react';
import { Image, Plus, Trash2, X, ExternalLink } from 'lucide-react';
import api from '../../services/api';

export default function AdminGallery() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const [form, setForm] = useState({
    title: '',
    category: 'performances',
    media_url: '',
    media_type: 'image',
  });

  useEffect(() => {
    loadGallery();
  }, []);

  async function loadGallery() {
    try {
      const res = await api.get('/gallery');
      if (res.data.success) {
        setItems(res.data.data);
      }
    } catch (err) {
      console.error('Error loading gallery:', err);
    } finally {
      setLoading(false);
    }
  }

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/gallery', form);
      if (res.data.success) {
        setModalOpen(false);
        setForm({ title: '', category: 'performances', media_url: '', media_type: 'image' });
        await loadGallery();
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to add media item.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this photo from gallery?')) return;
    try {
      await api.delete(`/gallery/${id}`);
      await loadGallery();
    } catch (err) {
      alert('Failed to delete item.');
    }
  };

  return (
    <div className="space-y-8 font-outfit">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-cinzel text-2xl sm:text-3xl font-bold text-temple-maroon">
            Performance Media &amp; Gallery Management
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Organize stage photography, Arangetram debuts, and Salangai Pooja dedications (Cloudinary/S3 storage URLs).
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="self-start sm:self-auto px-4 py-2.5 rounded-xl bg-temple-maroon text-temple-gold text-xs font-cinzel font-bold shadow flex items-center gap-2 hover:bg-temple-maroon-dark transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Upload Media Item</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="rounded-3xl bg-white border-2 border-temple-gold/40 shadow-temple overflow-hidden flex flex-col justify-between group"
          >
            <div className="h-56 bg-temple-maroon relative overflow-hidden">
              <img
                src={item.media_url}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 px-2.5 py-1 rounded bg-temple-maroon/90 text-temple-gold border border-temple-gold/40 text-[10px] font-cinzel uppercase font-bold">
                {item.category}
              </span>
              <button
                onClick={() => handleDelete(item.id)}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-red-600/90 text-white hover:bg-red-700 transition-colors"
                title="Delete Media"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 bg-white">
              <h3 className="font-cinzel font-bold text-sm text-temple-maroon">
                {item.title}
              </h3>
              <p className="text-[11px] text-stone-400 mt-1 truncate">
                {item.media_url}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border-2 border-temple-gold max-w-md w-full p-6 sm:p-8 shadow-2xl relative">
            <button onClick={() => setModalOpen(false)} className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-stone-100 text-stone-500">
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-cinzel font-bold text-xl text-temple-maroon mb-4">Add Gallery Media</h3>
            <form onSubmit={handleCreate} className="space-y-4 font-outfit">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1 font-cinzel">Media Caption / Title *</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Navarasa Abhinaya in Varnam"
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-none focus:border-temple-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1 font-cinzel">Category *</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-none focus:border-temple-gold text-stone-700"
                >
                  <option value="performances">Stage Performances</option>
                  <option value="arangetram">Arangetram Solo Debuts</option>
                  <option value="salangai-pooja">Salangai Pooja Ceremony</option>
                  <option value="classroom">Classroom &amp; Practice Drills</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1 font-cinzel">Cloudinary / Direct Image URL *</label>
                <input
                  type="url"
                  required
                  value={form.media_url}
                  onChange={(e) => setForm({ ...form, media_url: e.target.value })}
                  placeholder="https://res.cloudinary.com/... or https://images.unsplash.com/..."
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-none focus:border-temple-gold"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 rounded-xl border text-xs text-stone-600">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-temple-maroon text-temple-gold text-xs font-cinzel font-bold">Save Media</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
