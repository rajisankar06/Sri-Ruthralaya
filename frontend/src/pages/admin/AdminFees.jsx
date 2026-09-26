import React, { useState, useEffect } from 'react';
import { CreditCard, Plus, Download, CheckCircle, Clock, AlertTriangle, Search, Filter, X } from 'lucide-react';
import api from '../../services/api';

export default function AdminFees() {
  const [fees, setFees] = useState([]);
  const [students, setStudents] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const [newFee, setNewFee] = useState({
    student_id: '',
    amount: 2400,
    month: 'November 2026',
    due_date: new Date(Date.now() + 15 * 86400000).toISOString().split('T')[0],
    status: 'pending',
  });

  useEffect(() => {
    loadData();
  }, [statusFilter]);

  async function loadData() {
    try {
      const q = statusFilter ? `?status=${statusFilter}` : '';
      const [feeRes, stuRes] = await Promise.all([
        api.get(`/fees${q}`),
        api.get('/students'),
      ]);

      if (feeRes.data.success) setFees(feeRes.data.data);
      if (stuRes.data.success) {
        setStudents(stuRes.data.data);
        if (stuRes.data.data.length > 0 && !newFee.student_id) {
          setNewFee((prev) => ({ ...prev, student_id: stuRes.data.data[0].id }));
        }
      }
    } catch (err) {
      console.error('Error loading fees:', err);
    } finally {
      setLoading(false);
    }
  }

  const handleCreateFee = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/fees', {
        ...newFee,
        amount: Number(newFee.amount),
      });
      if (res.data.success) {
        setModalOpen(false);
        await loadData();
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to record fee entry.');
    }
  };

  const handleMarkPaid = async (feeId) => {
    try {
      await api.post(`/fees/pay/${feeId}`, {
        payment_ref: `CASH-REC-${Math.floor(100000 + Math.random() * 900000)}`,
      });
      await loadData();
    } catch (err) {
      alert(err.response?.data?.message || 'Payment mark failed.');
    }
  };

  return (
    <div className="space-y-8 font-outfit">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-cinzel text-2xl sm:text-3xl font-bold text-temple-maroon">
            Fee Ledger &amp; Invoice Invoicing
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Track student tuition collections, record direct cash/UPI payments, and issue official receipts.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="self-start sm:self-auto px-4 py-2.5 rounded-xl bg-temple-maroon text-temple-gold hover:bg-temple-maroon-dark text-xs font-cinzel font-bold shadow flex items-center gap-2 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Record New Fee Invoice</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-2xl bg-white border border-temple-gold/40 shadow-sm flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-xs font-cinzel font-bold text-stone-600">Filter By Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-temple-gold bg-stone-50 text-stone-700 font-cinzel"
          >
            <option value="">All Fee Entries</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>

        <span className="text-xs text-stone-400">
          Total Records: {fees.length}
        </span>
      </div>

      {/* Fee Table */}
      <div className="bg-white rounded-3xl border-2 border-temple-gold/40 shadow-temple overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-temple-cream border-b border-amber-200 font-cinzel font-bold text-stone-700">
                <th className="p-4">Disciple Details</th>
                <th className="p-4">Billing Month</th>
                <th className="p-4">Fee Amount</th>
                <th className="p-4">Due Date</th>
                <th className="p-4">Status</th>
                <th className="p-4">Transaction Ref</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {fees.map((fee) => (
                <tr key={fee.id} className="hover:bg-amber-50/40 transition-colors">
                  <td className="p-4 font-semibold text-stone-800">
                    <span className="font-cinzel block text-sm">{fee.student?.name || 'Disciple'}</span>
                    <span className="text-[11px] text-stone-400 font-normal">{fee.student?.email}</span>
                  </td>

                  <td className="p-4 font-outfit text-stone-700">
                    {fee.month || 'Current Term'}
                  </td>

                  <td className="p-4 font-cinzel font-bold text-temple-maroon">
                    ₹{Number(fee.amount).toLocaleString('en-IN')}
                  </td>

                  <td className="p-4 text-stone-500">
                    {new Date(fee.due_date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>

                  <td className="p-4">
                    {fee.status === 'paid' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                        <CheckCircle className="w-3 h-3" />
                        Paid
                      </span>
                    )}
                    {fee.status === 'pending' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">
                        <Clock className="w-3 h-3" />
                        Pending
                      </span>
                    )}
                    {fee.status === 'overdue' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-800">
                        <AlertTriangle className="w-3 h-3" />
                        Overdue
                      </span>
                    )}
                  </td>

                  <td className="p-4 font-mono text-xs text-stone-500">
                    {fee.payment_ref || '—'}
                  </td>

                  <td className="p-4 text-right space-x-2">
                    {fee.status === 'paid' ? (
                      <a
                        href={`/api/v1/fees/receipt/${fee.id}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-temple-maroon text-temple-gold hover:bg-temple-maroon-dark text-xs font-cinzel font-bold shadow transition-all"
                      >
                        <Download className="w-3 h-3" />
                        <span>PDF</span>
                      </a>
                    ) : (
                      <button
                        onClick={() => handleMarkPaid(fee.id)}
                        className="px-3 py-1.5 rounded-lg bg-emerald-700 text-white hover:bg-emerald-800 text-xs font-cinzel font-bold shadow"
                      >
                        Mark Paid
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Record Fee Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border-2 border-temple-gold max-w-md w-full p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-stone-100 text-stone-500"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-cinzel font-bold text-xl text-temple-maroon mb-4">
              Record New Fee Entry
            </h3>

            <form onSubmit={handleCreateFee} className="space-y-4 font-outfit">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1 font-cinzel">Select Disciple *</label>
                <select
                  required
                  value={newFee.student_id}
                  onChange={(e) => setNewFee({ ...newFee, student_id: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-none focus:border-temple-gold text-stone-700"
                >
                  {students.map((s) => (
                    <option key={s.id} value={s.id}>{s.name} ({s.email})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1 font-cinzel">Billing Term / Month *</label>
                <input
                  type="text"
                  required
                  value={newFee.month}
                  onChange={(e) => setNewFee({ ...newFee, month: e.target.value })}
                  placeholder="e.g. November 2026"
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-none focus:border-temple-gold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1 font-cinzel">Amount (₹) *</label>
                  <input
                    type="number"
                    required
                    value={newFee.amount}
                    onChange={(e) => setNewFee({ ...newFee, amount: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-none focus:border-temple-gold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1 font-cinzel">Due Date *</label>
                  <input
                    type="date"
                    required
                    value={newFee.due_date}
                    onChange={(e) => setNewFee({ ...newFee, due_date: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-none focus:border-temple-gold"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-stone-200 text-xs text-stone-600 hover:bg-stone-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-temple-maroon text-temple-gold text-xs font-cinzel font-bold shadow hover:bg-temple-maroon-dark"
                >
                  Save Fee Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
