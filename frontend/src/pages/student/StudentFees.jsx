import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CreditCard, Download, CheckCircle, Clock, AlertTriangle, ShieldCheck, ArrowRight, X } from 'lucide-react';
import api from '../../services/api';

export default function StudentFees() {
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [payingFee, setPayingFee] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    loadFees();
  }, []);

  async function loadFees() {
    try {
      const res = await api.get('/fees/my-fees');
      if (res.data.success) {
        setFees(res.data.data);
      }
    } catch (err) {
      console.error('Failed to load fees:', err);
    } finally {
      setLoading(false);
    }
  }

  const handlePay = async () => {
    if (!payingFee) return;
    setIsProcessing(true);

    try {
      const res = await api.post(`/fees/pay/${payingFee.id}`, {
        payment_ref: `UPI-SR-${Math.floor(100000 + Math.random() * 900000)}`,
      });

      if (res.data.success) {
        // Trigger celebratory confetti
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#9B3D2E', '#B78A4A', '#B27A32', '#F0E5D2'],
        });

        await loadFees();
        setPayingFee(null);
      }
    } catch (err) {
      console.error('Payment error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-8 font-outfit">
      
      {/* Header */}
      <div>
        <h1 className="font-cinzel text-2xl sm:text-3xl font-bold text-temple-maroon">
          Fee Status &amp; Official Receipts
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 mt-1">
          Review your tuition payment history, complete monthly term payments, and download certified GST-exempt academy PDF receipts.
        </p>
      </div>

      {/* Fee Records Table */}
      <div className="bg-white rounded-3xl border-2 border-temple-gold/40 shadow-temple overflow-hidden">
        <div className="p-6 border-b border-stone-100 flex items-center justify-between">
          <h2 className="font-cinzel font-bold text-lg text-temple-maroon">
            Tuition Ledger
          </h2>
          <span className="text-xs text-stone-500 font-cinzel">
            Academy Year 2026
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-temple-cream border-b border-amber-200/60 font-cinzel font-bold text-stone-700">
                <th className="p-4">Billing Month</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Due Date</th>
                <th className="p-4">Payment Status</th>
                <th className="p-4">Transaction Ref</th>
                <th className="p-4 text-right">Receipt / Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {fees.map((fee) => (
                <tr key={fee.id} className="hover:bg-amber-50/40 transition-colors">
                  <td className="p-4 font-semibold text-stone-800">
                    {fee.month || 'Current Month'}
                  </td>
                  <td className="p-4 font-cinzel font-bold text-temple-maroon">
                    ₹{Number(fee.amount).toLocaleString('en-IN')}
                  </td>
                  <td className="p-4 text-stone-500">
                    {new Date(fee.due_date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                  <td className="p-4">
                    {fee.status === 'paid' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                        <CheckCircle className="w-3.5 h-3.5" />
                        Paid
                      </span>
                    )}
                    {fee.status === 'pending' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">
                        <Clock className="w-3.5 h-3.5" />
                        Due Soon
                      </span>
                    )}
                    {fee.status === 'overdue' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        Overdue
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-stone-500 font-mono text-xs">
                    {fee.payment_ref || '—'}
                  </td>
                  <td className="p-4 text-right">
                    {fee.status === 'paid' ? (
                      <a
                        href={`/api/v1/fees/receipt/${fee.id}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-temple-maroon text-temple-gold hover:bg-temple-maroon-dark text-xs font-cinzel font-bold shadow transition-all"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download PDF</span>
                      </a>
                    ) : (
                      <button
                        onClick={() => setPayingFee(fee)}
                        className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-temple-gold to-amber-500 text-temple-maroon-deep hover:brightness-110 text-xs font-cinzel font-bold shadow transition-all"
                      >
                        <CreditCard className="w-3.5 h-3.5" />
                        <span>Pay Online</span>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Online Payment Modal */}
      {payingFee && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border-2 border-temple-gold max-w-md w-full p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setPayingFee(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-stone-100 text-stone-500"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-full bg-temple-maroon text-temple-gold border border-temple-gold flex items-center justify-center mx-auto mb-2 shadow">
                <CreditCard className="w-6 h-6" />
              </div>
              <h3 className="font-cinzel font-bold text-xl text-temple-maroon">
                Tuition Fee Payment
              </h3>
              <p className="text-xs text-stone-500 font-outfit mt-0.5">
                Sri Ruthraalayaa Bharathanatyam Academy
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-temple-cream border border-amber-200 space-y-2 mb-6 text-xs text-stone-700">
              <div className="flex justify-between">
                <span className="text-stone-500">Term / Month:</span>
                <span className="font-bold text-stone-800">{payingFee.month || 'Current Month'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Total Due Amount:</span>
                <span className="font-cinzel font-bold text-base text-temple-maroon">
                  ₹{Number(payingFee.amount).toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Payment Channel:</span>
                <span className="font-semibold text-emerald-700">UPI / QR Code / NetBanking</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-center mb-6">
              <p className="text-xs font-semibold text-amber-900 font-cinzel">
                Demo Payment Simulator Active
              </p>
              <p className="text-[11px] text-amber-800 mt-1">
                Clicking confirm will simulate instant UPI clearing and auto-generate your certified PDF receipt.
              </p>
            </div>

            <button
              onClick={handlePay}
              disabled={isProcessing}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-temple-gold to-amber-500 text-temple-maroon-deep font-cinzel font-bold text-xs uppercase tracking-wider shadow-md hover:brightness-110 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              <span>{isProcessing ? 'Verifying with Bank...' : `Confirm & Pay ₹${payingFee.amount}`}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
