import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User, Mail, Lock, Phone, BookOpen, CheckCircle, AlertCircle, ArrowRight, Eye, EyeOff } from 'lucide-react';
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

const DEFAULT_FALLBACK_BATCHES = [
  { id: 'd979992a-24b4-41d2-bd34-1709097d3d43', name: 'Bala Natya (Beginner Adavus)', schedule_days: 'Mon, Wed, Fri', fee_amount: 1800 },
  { id: '60a372cb-6a05-48b8-8dec-808abee75659', name: 'Madhyama (Intermediate Jatiswaram & Shabdam)', schedule_days: 'Tue, Thu, Sat', fee_amount: 2400 },
  { id: '01797166-7685-4641-824c-d898c29786a4', name: 'Visharada (Advanced Varnam & Padam)', schedule_days: 'Sat, Sun', fee_amount: 3200 },
  { id: '22a16b97-4584-4865-84db-99fc59482bdd', name: 'Arangetram Margam Intensive', schedule_days: 'Sat, Sun', fee_amount: 4500 },
];

export default function RegisterPage() {
  const [batches, setBatches] = useState(DEFAULT_FALLBACK_BATCHES);
  const [loadingBatches, setLoadingBatches] = useState(true);
  const [successData, setSuccessData] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
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
        if (res.data?.success && Array.isArray(res.data?.data) && res.data.data.length > 0) {
          setBatches(res.data.data);
        } else {
          setBatches(DEFAULT_FALLBACK_BATCHES);
        }
      } catch (err) {
        console.warn('Using default batches fallback:', err.message);
        setBatches(DEFAULT_FALLBACK_BATCHES);
      } finally {
        setLoadingBatches(false);
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
      const serverMsg = err.response?.data?.message;
      if (serverMsg) {
        setErrorMessage(serverMsg);
      } else if (err.message && err.message.includes('Network Error')) {
        setErrorMessage('Cannot connect to backend API server. Please ensure VITE_API_BASE_URL is set in Netlify and Render is running.');
      } else {
        setErrorMessage(err.response?.data?.message || err.message || 'Registration failed. Please check inputs or server connection.');
      }
    }
  };

  return (
    <div className="min-h-[calc(100vh-160px)] relative flex items-center justify-center py-12 sm:py-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#080808]">
      {/* Background BG1.png & Deep Charcoal Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-luminosity scale-105 pointer-events-none"
        style={{ backgroundImage: `url('/BG1.png')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#0f0f0f]/90 to-[#080808] pointer-events-none" />
      <div className="absolute inset-0 opacity-10 bg-kolam-pattern pointer-events-none" />

      <div className="max-w-lg w-full space-y-6 bg-[#111111] p-8 sm:p-10 rounded-2xl border border-[#333333] shadow-2xl relative z-10 overflow-hidden">
        
        {/* Top Gold Ornament */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent"></div>

        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-[#080808] text-[#d4af37] border border-[#d4af37] flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(212,175,55,0.3)] p-2 overflow-hidden">
            <img src="/logo.png" alt="Sri Ruthralaya" className="w-full h-full object-contain" />
          </div>
          <h2 className="mt-3 font-cinzel text-2xl font-bold text-white tracking-wide">
            Student <span className="text-[#d4af37]">Registration</span>
          </h2>
          <p className="text-xs text-[#888888] font-outfit uppercase tracking-widest mt-0.5">
            Sri Ruthraalayaa Bharathanatyam Academy
          </p>
        </div>

        {successData ? (
          <div className="p-6 rounded-xl bg-[#0f0f0f] border border-[#d4af37] text-center space-y-4">
            <CheckCircle className="w-14 h-14 text-[#d4af37] mx-auto" />
            <h3 className="font-cinzel font-bold text-lg text-white">
              Application Submitted Successfully!
            </h3>
            <div className="text-xs text-[#bbbbbb] font-outfit space-y-2 leading-relaxed">
              <p>
                Namaskaram <strong className="text-white">{successData.name}</strong>! Your registration for Sri Ruthralaya has been recorded with status: <span className="font-bold text-[#d4af37] uppercase">Pending Admin Approval</span>.
              </p>
              <p className="p-3 bg-[#111111] rounded-lg border border-[#333333] text-[#aaaaaa]">
                To preserve academic excellence and proper batch levels, Guru Sridevi approves applications within 24 hours. You can sign in once verified.
              </p>
            </div>

            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-md bg-[#d4af37] text-[#111111] font-cinzel font-bold text-xs shadow hover:bg-transparent hover:text-[#d4af37] border border-[#d4af37] transition-all"
            >
              <span>Go to Sign In Portal</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <>
            <div className="p-3 bg-[#0a0a0a] rounded-lg border border-[#333333] text-[11px] text-[#aaaaaa] font-outfit leading-relaxed flex items-center gap-2">
              <span className="text-base">🛕</span>
              <span>
                New admissions undergo review by <strong className="text-white">Guru Sridevi</strong>. Once approved, your student dashboard and calendar will activate.
              </span>
            </div>

            {errorMessage && (
              <div className="p-3.5 rounded-lg bg-red-950/60 border border-red-800 text-xs text-red-200 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 font-outfit">
              <div>
                <label className="block text-xs font-semibold text-[#cccccc] mb-1.5 font-cinzel">
                  Disciple Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#666666] absolute left-3.5 top-3" />
                  <input
                    type="text"
                    {...register('name')}
                    placeholder="e.g. Ananya Ramachandran"
                    className="w-full pl-10 pr-4 py-2.5 rounded-md border border-[#333333] text-xs sm:text-sm focus:outline-none focus:border-[#d4af37] bg-[#0f0f0f] text-white placeholder-[#555555]"
                  />
                </div>
                {errors.name && <p className="text-[11px] text-red-400 mt-1">{errors.name.message}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#cccccc] mb-1.5 font-cinzel">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#666666] absolute left-3.5 top-3" />
                    <input
                      type="email"
                      {...register('email')}
                      placeholder="student@example.com"
                      className="w-full pl-10 pr-4 py-2.5 rounded-md border border-[#333333] text-xs sm:text-sm focus:outline-none focus:border-[#d4af37] bg-[#0f0f0f] text-white placeholder-[#555555]"
                    />
                  </div>
                  {errors.email && <p className="text-[11px] text-red-400 mt-1">{errors.email.message}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#cccccc] mb-1.5 font-cinzel">
                    WhatsApp Phone *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#666666] absolute left-3.5 top-3" />
                    <input
                      type="tel"
                      {...register('phone')}
                      placeholder="98421 23456"
                      className="w-full pl-10 pr-4 py-2.5 rounded-md border border-[#333333] text-xs sm:text-sm focus:outline-none focus:border-[#d4af37] bg-[#0f0f0f] text-white placeholder-[#555555]"
                    />
                  </div>
                  {errors.phone && <p className="text-[11px] text-red-400 mt-1">{errors.phone.message}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#cccccc] mb-1.5 font-cinzel">
                  Set Portal Password *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#666666] absolute left-3.5 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    {...register('password')}
                    placeholder="At least 6 characters"
                    className="w-full pl-10 pr-11 py-2.5 rounded-lg border border-[#333333] text-xs sm:text-sm focus:outline-none focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/20 bg-[#0f0f0f] text-white placeholder-[#555555] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-[#666666] hover:text-[#d4af37] transition-colors"
                    title={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-[11px] text-red-400 mt-1">{errors.password.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#cccccc] mb-1.5 font-cinzel">
                  Preferred Training Batch / Level *
                </label>
                <div className="relative">
                  <BookOpen className="w-4 h-4 text-[#666666] absolute left-3.5 top-3" />
                  <select
                    {...register('batch_id')}
                    className="w-full pl-10 pr-4 py-2.5 rounded-md border border-[#333333] text-xs sm:text-sm focus:outline-none focus:border-[#d4af37] bg-[#0f0f0f] text-white"
                  >
                    <option value="" className="bg-[#0f0f0f]">
                      {loadingBatches ? 'Loading available grades...' : 'Select a grade / batch level...'}
                    </option>
                    {batches.map((b) => (
                      <option key={b.id} value={b.id} className="bg-[#0f0f0f]">
                        {b.name}{b.schedule_days ? ` (${b.schedule_days}` : ''}{b.fee_amount ? ` • ₹${b.fee_amount}/mo)` : (b.schedule_days ? ')' : '')}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.batch_id && <p className="text-[11px] text-red-400 mt-1">{errors.batch_id.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-md bg-[#d4af37] text-[#111111] hover:bg-transparent hover:text-[#d4af37] border border-[#d4af37] font-cinzel font-bold text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                <span>{isSubmitting ? 'Submitting Application...' : 'Submit Application for Approval'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="text-center pt-2">
              <p className="text-xs text-[#888888]">
                Already registered?{' '}
                <Link to="/login" className="font-semibold text-[#d4af37] hover:underline">
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
