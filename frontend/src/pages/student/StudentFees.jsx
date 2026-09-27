import React, { useState, useEffect } from 'react';
import { CreditCard, CheckCircle, Clock, AlertTriangle, Download, ArrowRight, X } from 'lucide-react';
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
      const res = await api.patch(`/fees/${payingFee.id}/pay`, {
        payment_method: 'upi_online',
        transaction_ref: `SRD-${Date.now().toString().slice(-6)}`,
      });

      if (res.data.success) {
        await loadFees();
        setPayingFee(null);
      }
    } catch (err) {
      console.error('Payment processing failed:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-8 font-outfit text-[#bdbdbd]">
      
      {/* Header */}
      <div>
        <h1 className="font-cinzel text-2xl sm:text-3xl font-bold text-white">
          Fee Invoices &amp; Receipts
        </h1>
        <p className="text-xs sm:text-sm text-[#aaaaaa] mt-1">
          Review your tuition payment history, complete monthly term payments, and download certified GST-exempt academy PDF receipts.
        </p>
      </div>

      {/* Fee Records Table */}
      <div className="bg-[#111111] rounded-3xl border border-[#333333] shadow-xl overflow-hidden">
        <div className="p-6 border-b border-[#222222] flex items-center justify-between">
          <h2 className="font-cinzel font-bold text-lg text-white">
            Tuition Ledger
          </h2>
          <span className="text-xs text-[#888888] font-cinzel">
            Academy Year 2026
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-[#161616] border-b border-[#262626] font-cinzel font-bold text-[#aaaaaa]">
                <th className="p-4">Billing Month</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Due Date</th>
                <th className="p-4">Payment Status</th>
                <th className="p-4">Transaction Ref</th>
                <th className="p-4 text-right">Receipt / Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#222222]">
              {fees.map((fee) => (
                <tr key={fee.id} className="hover:bg-[#161616]/60 transition-colors">
                  <td className="p-4 font-semibold text-white">
                    {fee.month || 'Current Month'}
                  </td>
                  <td className="p-4 font-cinzel font-bold text-[#ffd700]">
                    ₹{Number(fee.amount).toLocaleString('en-IN')}
                  </td>
                  <td className="p-4 text-[#888888]">
                    {new Date(fee.due_date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                  <td className="p-4">
                    {fee.status === 'paid' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-950/80 text-emerald-400 border border-emerald-800">
                        <CheckCircle className="w-3.5 h-3.5" />
                        Paid
                      </span>
                    )}
                    {fee.status === 'pending' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-950/80 text-amber-400 border border-amber-800">
                        <Clock className="w-3.5 h-3.5" />
                        Due Soon
                      </span>
                    )}
                    {fee.status === 'overdue' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-950/80 text-red-400 border border-red-800">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        Overdue
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-[#888888] font-mono text-xs">
                    {fee.payment_ref || '—'}
                  </td>
                  <td className="p-4 text-right">
                    {fee.status === 'paid' ? (
                      <a
                        href={`/api/v1/fees/receipt/${fee.id}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#0f0f0f] border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-[#111111] text-xs font-cinzel font-bold shadow transition-all"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download PDF</span>
                      </a>
                    ) : (
                      <button
                        onClick={() => setPayingFee(fee)}
                        className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-lg bg-[#d4af37] text-[#111111] hover:bg-[#ffd700] text-xs font-cinzel font-bold shadow transition-all"
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
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111111] rounded-3xl border-2 border-[#d4af37] max-w-md w-full p-6 sm:p-8 shadow-2xl relative text-white">
            <button
              onClick={() => setPayingFee(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-[#1a1a1a] text-[#888888] hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-full bg-[#1a1a1a] text-[#d4af37] border border-[#d4af37] flex items-center justify-center mx-auto mb-2 shadow">
                <CreditCard className="w-6 h-6" />
              </div>
              <h3 className="font-cinzel font-bold text-xl text-white">
                Tuition Fee Payment
              </h3>
              <p className="text-xs text-[#888888] font-outfit mt-0.5">
                Sri Ruthraalayaa Bharathanatyam Academy
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#161616] border border-[#262626] space-y-2 mb-6 text-xs text-[#e0e0e0]">
              <div className="flex justify-between">
                <span className="text-[#888888]">Term / Month:</span>
                <span className="font-bold text-white">{payingFee.month || 'Current Month'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#888888]">Total Due Amount:</span>
                <span className="font-cinzel font-bold text-base text-[#ffd700]">
                  ₹{Number(payingFee.amount).toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#888888]">Payment Channel:</span>
                <span className="font-semibold text-emerald-400">UPI / QR Code / NetBanking</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/30 text-center mb-6">
              <p className="text-xs font-semibold text-[#ffd700] font-cinzel">
                Online Academy Fee Settlement
              </p>
              <p className="text-[11px] text-[#aaaaaa] mt-1">
                Clicking confirm will record your tuition payment and auto-generate your certified official academy PDF receipt.
              </p>
            </div>

            <button
              onClick={handlePay}
              disabled={isProcessing}
              className="w-full py-3.5 rounded-xl bg-[#d4af37] text-[#111111] hover:bg-[#ffd700] font-cinzel font-bold text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2 transition-all disabled:opacity-50"
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
