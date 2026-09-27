import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Shield, User, Lock, Mail, ArrowRight, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import MudraIcon from '../../components/common/MudraIcon';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState('student'); // 'student' or 'admin'
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setErrorMessage('');
    try {
      const res = await login(data.email, data.password);
      if (res.success) {
        if (res.user.role === 'admin' || res.user.role === 'staff') {
          navigate('/admin/dashboard');
        } else {
          navigate('/student/dashboard');
        }
      } else {
        setErrorMessage(res.message || 'Login failed. Please verify credentials.');
      }
    } catch (err) {
      const serverMsg = err.response?.data?.message;
      if (serverMsg) {
        setErrorMessage(serverMsg);
      } else if (err.message && err.message.includes('Network Error')) {
        setErrorMessage('Cannot connect to backend API server. Please ensure VITE_API_BASE_URL is set in Netlify and Render is running.');
      } else {
        setErrorMessage(err.response?.data?.message || err.message || 'Login failed. Please check your credentials or server connection.');
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

      <div className="max-w-md w-full space-y-8 bg-[#111111] p-8 sm:p-10 rounded-2xl border border-[#333333] shadow-2xl relative z-10 overflow-hidden">

        {/* Top Gold Ornament */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent"></div>

        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-[#080808] text-[#d4af37] border border-[#d4af37] flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(212,175,55,0.3)] p-2 overflow-hidden">
            <img src="/logo.png" alt="Sri Ruthralaya" className="w-full h-full object-contain" />
          </div>
          <h2 className="mt-3 font-cinzel text-2xl font-bold text-white tracking-wide">
            Sri <span className="text-[#d4af37]">Ruthraalayaa</span>
          </h2>
          <p className="text-xs text-[#888888] font-outfit uppercase tracking-widest mt-0.5">
            Academy Management Portal
          </p>
        </div>

        {/* Portal Role Tabs */}
        <div className="grid grid-cols-2 gap-2 p-1.5 rounded-lg bg-[#0a0a0a] border border-[#222222]">
          <button
            type="button"
            onClick={() => setActiveTab('student')}
            className={`py-2 text-xs font-cinzel font-bold rounded-md transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'student'
                ? 'bg-[#d4af37] text-[#111111] shadow'
                : 'text-[#888888] hover:text-white'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Student Portal</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('admin')}
            className={`py-2 text-xs font-cinzel font-bold rounded-md transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'admin'
                ? 'bg-[#d4af37] text-[#111111] shadow'
                : 'text-[#888888] hover:text-white'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Admin / Staff</span>
          </button>
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
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#666666] absolute left-3.5 top-3.5" />
              <input
                type="email"
                {...register('email')}
                placeholder={activeTab === 'admin' ? 'admin@sriruthralaya.com' : 'student@example.com'}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#333333] text-xs sm:text-sm focus:outline-none focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/20 bg-[#0f0f0f] text-white placeholder-[#555555] transition-all"
              />
            </div>
            {errors.email && <p className="text-[11px] text-red-400 mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-[#cccccc] font-cinzel">
                Password
              </label>
              <Link
                to="/forgot-password"
                className="text-[11px] text-[#d4af37] hover:underline font-outfit"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#666666] absolute left-3.5 top-3.5" />
              <input
                type={showPassword ? 'text' : 'password'}
                {...register('password')}
                placeholder="••••••••"
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

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-[#d4af37] to-[#e6c762] text-[#111111] hover:brightness-110 active:scale-[0.99] border border-[#d4af37] text-xs sm:text-sm font-cinzel font-bold shadow-lg shadow-[#d4af37]/10 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            <span>{isSubmitting ? 'Authenticating...' : `Enter ${activeTab === 'admin' ? 'Admin Portal' : 'Student Dashboard'}`}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Registration link */}
        <div className="text-center pt-2">
          <p className="text-xs text-[#888888]">
            New disciple applying for admission?{' '}
            <Link to="/register" className="font-semibold text-[#d4af37] hover:underline">
              Register Here
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}
