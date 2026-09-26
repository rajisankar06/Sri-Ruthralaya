import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User, Mail, Lock, Phone, BookOpen, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import MudraIcon from '../../components/common/MudraIcon';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  phone: z.string().min(10, 'Please enter a valid 10-digit phone number'),
  batch_id: z.string().min(1, 'Please select a preferred training batch'),
});

export default function RegisterPage() {
  const [batches, setBatches] = useState([]);
  const [successData, setSuccessData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  useEffect(() => {
    async function loadBatches() {
      try {
        const res = await api.get('/batches');
        if (res.data.success) {
          setBatches(res.data.data);
        }
      } catch (err) {
        console.error('Failed to load batches:', err);
      }
    }
    loadBatches();
  }, []);

  const onSubmit = async (data) => {
    setErrorMessage('');
    try {
      const res = await registerUser(data);
      if (res.success) {
        setSuccessData(res.data);
      } else {
        setErrorMessage(res.message || 'Registration failed.');
      }
    } catch (err) {
      setErrorMessage(err.response?.data?.message || 'Registration failed. Please check inputs.');
    }
  };

  return (
    <div className="min-h-[calc(100vh-160px)] relative flex items-center justify-center py-12 sm:py-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-temple-maroon-deep">
      {/* Background BG1.png & Temple Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity scale-105 pointer-events-none"
        style={{ backgroundImage: `url('/BG1.png')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-temple-maroon-deep via-temple-maroon/90 to-temple-maroon-deep/95 pointer-events-none" />
      <div className="absolute inset-0 opacity-10 bg-kolam-pattern pointer-events-none" />

      <div className="max-w-lg w-full space-y-6 bg-white/95 backdrop-blur-sm p-8 sm:p-10 rounded-3xl border-2 border-temple-gold shadow-2xl relative z-10 overflow-hidden">
        
        {/* Top Gold Ornament */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-temple-maroon via-temple-gold to-temple-maroon"></div>

        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-temple-maroon text-temple-gold border-2 border-temple-gold flex items-center justify-center mx-auto shadow-gold-glow p-2 overflow-hidden">
            <img src="/logo.png" alt="Sri Ruthralaya" className="w-full h-full object-contain" />
          </div>
          <h2 className="mt-3 font-cinzel text-2xl font-bold text-temple-maroon tracking-wide">
            Student Registration
          </h2>
          <p className="text-xs text-stone-500 font-outfit uppercase tracking-widest mt-0.5">
            Sri Ruthraalayaa Bharathanatyam Academy
          </p>
        </div>

        {successData ? (
          <div className="p-6 rounded-2xl bg-amber-50 border border-temple-gold text-center space-y-4">
            <CheckCircle className="w-14 h-14 text-emerald-600 mx-auto" />
            <h3 className="font-cinzel font-bold text-lg text-temple-maroon">
              Application Submitted Successfully!
            </h3>
            <div className="text-xs text-stone-700 font-outfit space-y-2 leading-relaxed">
              <p>
                Namaskaram <strong>{successData.name}</strong>! Your registration for Sri Ruthralaya has been recorded with status: <span className="font-bold text-amber-700 uppercase">Pending Admin Approval</span>.
              </p>
              <p className="p-3 bg-white rounded-lg border border-amber-200 text-stone-600">
                To preserve academic excellence and proper batch levels, Guru Sridevi approves applications within 24 hours. You can sign in once verified.
              </p>
            </div>

            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-temple-maroon text-temple-gold font-cinzel font-bold text-xs shadow hover:bg-temple-maroon-dark transition-colors"
            >
              <span>Go to Sign In Portal</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <>
            <div className="p-3 bg-temple-cream rounded-xl border border-temple-gold/40 text-[11px] text-stone-600 font-outfit leading-relaxed flex items-center gap-2">
              <span className="text-base">🛕</span>
              <span>
                New admissions undergo review by <strong>Guru Sridevi</strong>. Once approved, your student dashboard and calendar will activate.
              </span>
            </div>

            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 font-outfit">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1 font-cinzel">
                  Disciple Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    {...register('name')}
                    placeholder="e.g. Ananya Ramachandran"
                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-none focus:border-temple-gold bg-temple-cream/30"
                  />
                </div>
                {errors.name && <p className="text-[11px] text-red-600 mt-1">{errors.name.message}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1 font-cinzel">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                    <input
                      type="email"
                      {...register('email')}
                      placeholder="student@example.com"
                      className="w-full pl-10 pr-4 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-none focus:border-temple-gold bg-temple-cream/30"
                    />
                  </div>
                  {errors.email && <p className="text-[11px] text-red-600 mt-1">{errors.email.message}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1 font-cinzel">
                    WhatsApp Phone *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                    <input
                      type="tel"
                      {...register('phone')}
                      placeholder="98421 23456"
                      className="w-full pl-10 pr-4 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-none focus:border-temple-gold bg-temple-cream/30"
                    />
                  </div>
                  {errors.phone && <p className="text-[11px] text-red-600 mt-1">{errors.phone.message}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1 font-cinzel">
                  Set Portal Password *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                  <input
                    type="password"
                    {...register('password')}
                    placeholder="At least 6 characters"
                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-none focus:border-temple-gold bg-temple-cream/30"
                  />
                </div>
                {errors.password && <p className="text-[11px] text-red-600 mt-1">{errors.password.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1 font-cinzel">
                  Preferred Training Batch / Level *
                </label>
                <div className="relative">
                  <BookOpen className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                  <select
                    {...register('batch_id')}
                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-none focus:border-temple-gold bg-temple-cream/30 text-stone-700"
                  >
                    <option value="">Select a batch level...</option>
                    {batches.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name} ({b.schedule_days} • ₹{b.fee_amount}/mo)
                      </option>
                    ))}
                  </select>
                </div>
                {errors.batch_id && <p className="text-[11px] text-red-600 mt-1">{errors.batch_id.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-temple-gold to-amber-500 text-temple-maroon-deep font-cinzel font-bold text-xs uppercase tracking-wider shadow-md hover:brightness-110 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                <span>{isSubmitting ? 'Submitting Application...' : 'Submit Application for Approval'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="text-center pt-2">
              <p className="text-xs text-stone-600">
                Already registered?{' '}
                <Link to="/login" className="font-semibold text-temple-maroon hover:underline">
                  Sign In
                </Link>
              </p>
            </div>
          </>
        )}

      </div>
    </div>
  );
}
