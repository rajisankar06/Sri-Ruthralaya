import React, { useState, useEffect } from 'react';
import { Layers, Plus, Edit2, Trash2, Users, Clock, Calendar, X, DollarSign } from 'lucide-react';
import api from '../../services/api';

export default function AdminBatches() {
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBatch, setEditingBatch] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    level: 'Beginner',
    instructor_name: 'Guru Nattiyakalaimani V. Suriya Sathian',
    schedule_days: 'Mon, Wed, Fri',
    schedule_time: '04:30 PM - 05:30 PM',
    fee_amount: 1800,
  });

  useEffect(() => {
    loadBatches();
  }, []);

  async function loadBatches() {
    try {
      const res = await api.get('/batches');
      if (res.data.success) {
        setBatches(res.data.data);
      }
    } catch (err) {
      console.error('Error loading batches:', err);
    } finally {
      setLoading(false);
    }
  }

  const handleOpenAdd = () => {
    setEditingBatch(null);
    setFormData({
      name: '',
      level: 'Beginner',
      instructor_name: 'Guru Nattiyakalaimani V. Suriya Sathian',
      schedule_days: 'Mon, Wed, Fri',
      schedule_time: '04:30 PM - 05:30 PM',
      fee_amount: 1800,
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (batch) => {
    setEditingBatch(batch);
    setFormData({
      name: batch.name,
      level: batch.level,
      instructor_name: batch.instructor_name,
      schedule_days: batch.schedule_days,
      schedule_time: batch.schedule_time,
      fee_amount: batch.fee_amount,
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingBatch) {
        await api.put(`/batches/${editingBatch.id}`, {
          ...formData,
          fee_amount: Number(formData.fee_amount),
        });
      } else {
        await api.post('/batches', {
          ...formData,
          fee_amount: Number(formData.fee_amount),
        });
      }
      setModalOpen(false);
      await loadBatches();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save batch.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this batch?')) return;
    try {
      await api.delete(`/batches/${id}`);
      await loadBatches();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete batch.');
    }
  };

  return (
    <div className="space-y-6 font-outfit text-white">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-[#111111] border border-[#333333] shadow-xl">
        <div>
          <h1 className="font-cinzel text-2xl sm:text-3xl font-bold text-white">
            Course &amp; <span className="text-[#d4af37]">Batch Management</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#bdbdbd] mt-1">
            Configure training levels, class schedules, assigned instructors, and tuition fee tariffs.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="primary-btn self-start sm:self-auto flex items-center gap-2 text-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Batch</span>
        </button>
      </div>

      {/* Batches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {batches.map((batch) => (
          <div
            key={batch.id}
            className="p-6 rounded-3xl bg-[#111111] border border-[#333333] shadow-xl flex flex-col justify-between hover:border-[#d4af37]/60 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 rounded-full text-xs font-cinzel font-semibold bg-[#d4af37] text-[#111111]">
                  {batch.level}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEdit(batch)}
                    className="p-2 rounded-lg border border-[#333333] hover:border-[#d4af37] bg-[#0f0f0f] text-[#bdbdbd] hover:text-[#d4af37] transition-all"
                    title="Edit Batch"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(batch.id)}
                    className="p-2 rounded-lg border border-red-900/40 hover:border-red-500 bg-red-950/20 text-red-300 transition-all"
                    title="Delete Batch"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <h3 className="font-cinzel font-bold text-lg text-white">
                {batch.name}
              </h3>
              <p className="text-xs text-[#888888] mt-1">
                Instructor: <strong className="text-[#bdbdbd]">{batch.instructor_name}</strong>
              </p>

              <div className="mt-4 pt-4 border-t border-[#222222] space-y-2 text-xs text-[#bdbdbd]">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Days: {batch.schedule_days}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Time: {batch.schedule_time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>{batch.studentCount || 0} Enrolled Disciples</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#222222] flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#777777] font-cinzel uppercase block">Monthly Fee</span>
                <span className="font-cinzel font-bold text-xl text-[#d4af37]">
                  ₹{Number(batch.fee_amount).toLocaleString('en-IN')}
                </span>
              </div>

              <span className="text-xs text-emerald-400 font-outfit px-2.5 py-1 rounded bg-[#0f0f0f] border border-emerald-500/30">
                Active Tier
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Create / Edit Batch Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#111111] rounded-3xl border border-[#d4af37] max-w-lg w-full p-6 sm:p-8 shadow-2xl relative text-white">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#222222] text-[#888888] hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-cinzel font-bold text-xl text-[#d4af37] mb-4">
              {editingBatch ? 'Edit Batch Configuration' : 'Create New Training Batch'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 font-outfit">
              <div>
                <label className="block text-xs font-semibold text-[#bdbdbd] mb-1 font-cinzel">Batch Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Bala Natya (Beginner Adavus)"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#0f0f0f] border border-[#333333] text-white text-xs sm:text-sm focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#bdbdbd] mb-1 font-cinzel">Level *</label>
                  <select
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#0f0f0f] border border-[#333333] text-white text-xs sm:text-sm focus:outline-none focus:border-[#d4af37]"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Arangetram Prep">Arangetram Prep</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#bdbdbd] mb-1 font-cinzel">Monthly Fee (₹) *</label>
                  <input
                    type="number"
                    required
                    value={formData.fee_amount}
                    onChange={(e) => setFormData({ ...formData, fee_amount: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#0f0f0f] border border-[#333333] text-white text-xs sm:text-sm focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#bdbdbd] mb-1 font-cinzel">Instructor Name *</label>
                <input
                  type="text"
                  required
                  value={formData.instructor_name}
                  onChange={(e) => setFormData({ ...formData, instructor_name: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#0f0f0f] border border-[#333333] text-white text-xs sm:text-sm focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#bdbdbd] mb-1 font-cinzel">Schedule Days *</label>
                  <input
                    type="text"
                    required
                    value={formData.schedule_days}
                    onChange={(e) => setFormData({ ...formData, schedule_days: e.target.value })}
                    placeholder="Mon, Wed, Fri"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#0f0f0f] border border-[#333333] text-white text-xs sm:text-sm focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#bdbdbd] mb-1 font-cinzel">Schedule Time *</label>
                  <input
                    type="text"
                    required
                    value={formData.schedule_time}
                    onChange={(e) => setFormData({ ...formData, schedule_time: e.target.value })}
                    placeholder="04:30 PM - 05:30 PM"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#0f0f0f] border border-[#333333] text-white text-xs sm:text-sm focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="secondary-btn text-xs py-2 px-4"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="primary-btn text-xs py-2 px-5"
                >
                  {editingBatch ? 'Update Batch' : 'Save Batch'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
