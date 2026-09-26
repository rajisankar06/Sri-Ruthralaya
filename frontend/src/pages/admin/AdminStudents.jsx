import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  UserPlus, 
  Check, 
  X, 
  Edit2, 
  Trash2, 
  CheckCircle, 
  AlertCircle, 
  Phone, 
  Mail,
  ShieldAlert
} from 'lucide-react';
import api from '../../services/api';

export default function AdminStudents() {
  const [students, setStudents] = useState([]);
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [batchFilter, setBatchFilter] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    batch_id: '',
    status: 'active',
  });

  useEffect(() => {
    loadData();
  }, [statusFilter, batchFilter, search]);

  async function loadData() {
    try {
      const queryParams = new URLSearchParams();
      if (statusFilter) queryParams.append('status', statusFilter);
      if (batchFilter) queryParams.append('batch_id', batchFilter);
      if (search) queryParams.append('search', search);

      const [stuRes, batchRes] = await Promise.all([
        api.get(`/students?${queryParams.toString()}`),
        api.get('/batches'),
      ]);

      if (stuRes.data.success) setStudents(stuRes.data.data);
      if (batchRes.data.success) setBatches(batchRes.data.data);
    } catch (err) {
      console.error('Error loading students:', err);
    } finally {
      setLoading(false);
    }
  }

  // 1-Click Approve Registration
  const handleApprove = async (studentId, preferredBatchId) => {
    try {
      const res = await api.put(`/students/${studentId}/approve`, {
        batch_id: preferredBatchId || batches[0]?.id,
      });
      if (res.data.success) {
        await loadData();
      }
    } catch (err) {
      console.error('Approve error:', err);
    }
  };

  // Toggle Active/Inactive status
  const handleToggleStatus = async (studentId) => {
    try {
      await api.patch(`/students/${studentId}/status`);
      await loadData();
    } catch (err) {
      console.error('Toggle status error:', err);
    }
  };

  const handleCreateStudent = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/students', formData);
      if (res.data.success) {
        setShowAddModal(false);
        setFormData({ name: '', email: '', phone: '', batch_id: '', status: 'active' });
        await loadData();
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create student.');
    }
  };

  const handleUpdateStudent = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put(`/students/${editingStudent.id}`, editingStudent);
      if (res.data.success) {
        setEditingStudent(null);
        await loadData();
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update student.');
    }
  };

  return (
    <div className="space-y-8 font-outfit">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-cinzel text-2xl sm:text-3xl font-bold text-temple-maroon">
            Student Disciple Management
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Review admissions, approve pending registrations, assign batches, and view attendance metrics.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="self-start sm:self-auto px-4 py-2.5 rounded-xl bg-temple-maroon text-temple-gold hover:bg-temple-maroon-dark text-xs font-cinzel font-bold shadow flex items-center gap-2 transition-all"
        >
          <UserPlus className="w-4 h-4" />
          <span>Add New Disciple</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white border border-temple-gold/40 shadow-sm flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search disciples by name, email, or phone number..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-stone-200 text-xs sm:text-sm focus:outline-none focus:border-temple-gold bg-stone-50/50"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-temple-gold bg-stone-50/50 text-stone-700 font-cinzel"
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending Approval</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <select
            value={batchFilter}
            onChange={(e) => setBatchFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-temple-gold bg-stone-50/50 text-stone-700 font-cinzel"
          >
            <option value="">All Batches</option>
            {batches.map((b) => (
              <option key={b.id} value={b.id}>{b.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-3xl border-2 border-temple-gold/40 shadow-temple overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-temple-cream border-b border-amber-200 font-cinzel font-bold text-stone-700">
                <th className="p-4">Disciple Name &amp; Contact</th>
                <th className="p-4">Enrolled Batch</th>
                <th className="p-4">Attendance %</th>
                <th className="p-4">Status</th>
                <th className="p-4">Joining Date</th>
                <th className="p-4 text-right">Administrative Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-amber-50/40 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={student.profile_photo_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
                        alt={student.name}
                        className="w-10 h-10 rounded-full object-cover border border-temple-gold flex-shrink-0"
                      />
                      <div>
                        <div className="font-bold text-stone-800 font-cinzel">{student.name}</div>
                        <div className="text-[11px] text-stone-500 font-outfit">{student.email}</div>
                        {student.phone && <div className="text-[11px] text-stone-400 font-outfit">{student.phone}</div>}
                      </div>
                    </div>
                  </td>

                  <td className="p-4">
                    {student.batch ? (
                      <div>
                        <span className="font-semibold text-stone-800 block">{student.batch.name}</span>
                        <span className="text-[10px] text-stone-400 uppercase font-cinzel">{student.batch.level}</span>
                      </div>
                    ) : (
                      <span className="text-stone-400 italic">Unassigned</span>
                    )}
                  </td>

                  <td className="p-4 font-cinzel font-bold text-temple-maroon">
                    {student.attendancePct}%
                  </td>

                  <td className="p-4">
                    {student.status === 'active' && (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800">
                        Active
                      </span>
                    )}
                    {student.status === 'pending' && (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-amber-100 text-amber-800 animate-pulse">
                        Pending Approval
                      </span>
                    )}
                    {student.status === 'inactive' && (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-stone-100 text-stone-600">
                        Inactive
                      </span>
                    )}
                  </td>

                  <td className="p-4 text-stone-500 text-xs">
                    {new Date(student.created_at).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>

                  <td className="p-4 text-right space-x-2">
                    {student.status === 'pending' ? (
                      <button
                        onClick={() => handleApprove(student.id, batches[0]?.id)}
                        className="px-3 py-1.5 rounded-lg bg-emerald-700 text-white hover:bg-emerald-800 text-xs font-cinzel font-bold shadow inline-flex items-center gap-1"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Approve</span>
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() => setEditingStudent(student)}
                          className="p-1.5 rounded-lg border border-stone-200 hover:bg-stone-50 text-stone-600"
                          title="Edit Student"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleToggleStatus(student.id)}
                          className={`p-1.5 rounded-lg text-xs font-semibold ${
                            student.status === 'active'
                              ? 'text-amber-700 hover:bg-amber-50'
                              : 'text-emerald-700 hover:bg-emerald-50'
                          }`}
                          title={student.status === 'active' ? 'Deactivate' : 'Reactivate'}
                        >
                          {student.status === 'active' ? 'Deactivate' : 'Activate'}
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Student Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border-2 border-temple-gold max-w-md w-full p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-stone-100 text-stone-500"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-cinzel font-bold text-xl text-temple-maroon mb-4">
              Add New Disciple
            </h3>

            <form onSubmit={handleCreateStudent} className="space-y-4 font-outfit">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1 font-cinzel">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Disciple name"
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-none focus:border-temple-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1 font-cinzel">Email Address *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="student@example.com"
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-none focus:border-temple-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1 font-cinzel">Phone Number</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98421 23456"
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-none focus:border-temple-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1 font-cinzel">Assign Batch</label>
                <select
                  value={formData.batch_id}
                  onChange={(e) => setFormData({ ...formData, batch_id: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-none focus:border-temple-gold text-stone-700"
                >
                  <option value="">Select training batch...</option>
                  {batches.map((b) => (
                    <option key={b.id} value={b.id}>{b.name} ({b.level})</option>
                  ))}
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl border border-stone-200 text-xs text-stone-600 hover:bg-stone-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-temple-maroon text-temple-gold text-xs font-cinzel font-bold shadow hover:bg-temple-maroon-dark"
                >
                  Save Disciple
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Student Modal */}
      {editingStudent && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border-2 border-temple-gold max-w-md w-full p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setEditingStudent(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-stone-100 text-stone-500"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-cinzel font-bold text-xl text-temple-maroon mb-4">
              Edit Disciple Details
            </h3>

            <form onSubmit={handleUpdateStudent} className="space-y-4 font-outfit">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1 font-cinzel">Full Name</label>
                <input
                  type="text"
                  required
                  value={editingStudent.name}
                  onChange={(e) => setEditingStudent({ ...editingStudent, name: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-none focus:border-temple-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1 font-cinzel">Phone Number</label>
                <input
                  type="tel"
                  value={editingStudent.phone || ''}
                  onChange={(e) => setEditingStudent({ ...editingStudent, phone: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-none focus:border-temple-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1 font-cinzel">Assign Batch</label>
                <select
                  value={editingStudent.batch_id || editingStudent.batch?.id || ''}
                  onChange={(e) => setEditingStudent({ ...editingStudent, batch_id: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-none focus:border-temple-gold text-stone-700"
                >
                  <option value="">Select batch...</option>
                  {batches.map((b) => (
                    <option key={b.id} value={b.id}>{b.name} ({b.level})</option>
                  ))}
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingStudent(null)}
                  className="px-4 py-2 rounded-xl border border-stone-200 text-xs text-stone-600 hover:bg-stone-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-temple-maroon text-temple-gold text-xs font-cinzel font-bold shadow hover:bg-temple-maroon-dark"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
