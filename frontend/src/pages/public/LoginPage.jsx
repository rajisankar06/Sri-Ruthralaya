import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Shield, User, Lock, Mail, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import MudraIcon from '../../components/common/MudraIcon';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState('student'); // 'student' or 'admin'
  const [errorMessage, setErrorMessage] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    setValue,
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
      setErrorMessage(err.response?.data?.message || 'Login failed. Please check your credentials.');
    }
  };

  // Quick 1-click Demo Fill
  const fillDemo = (role) => {
    setErrorMessage('');
    if (role === 'admin') {
      setActiveTab('admin');
      setValue('email', 'admin@sriruthralaya.com');
      setValue('password', 'Admin@123');
    } else if (role === 'student') {
      setActiveTab('student');
      setValue('email', 'ananya.r@gmail.com');
      setValue('password', 'Student@123');
    } else if (role === 'staff') {
      setActiveTab('admin');
      setValue('email', 'instructor@sriruthralaya.com');
      setValue('password', 'Staff@123');
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-hidden bg-temple-maroon-deep">
      {/* Background BG1.png & Temple Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity scale-105 pointer-events-none"
        style={{ backgroundImage: `url('/BG1.png')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-temple-maroon-deep via-temple-maroon/90 to-temple-maroon-deep/95 pointer-events-none" />
      <div className="absolute inset-0 opacity-10 bg-kolam-pattern pointer-events-none" />

      <div className="max-w-md w-full space-y-8 bg-white/95 backdrop-blur-sm p-8 sm:p-10 rounded-3xl border-2 border-temple-gold shadow-2xl relative z-10 overflow-hidden">
        
        {/* Top Gold Ornament */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-temple-maroon via-temple-gold to-temple-maroon"></div>

        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-temple-maroon text-temple-gold border-2 border-temple-gold flex items-center justify-center mx-auto shadow-gold-glow p-2 overflow-hidden">
            <img src="/logo.png" alt="Sri Ruthralaya" className="w-full h-full object-contain" />
          </div>
          <h2 className="mt-3 font-cinzel text-2xl font-bold text-temple-maroon tracking-wide">
            Sri Ruthraalayaa
          </h2>
          <p className="text-xs text-stone-500 font-outfit uppercase tracking-widest mt-0.5">
            Academy Management Portal
          </p>
        </div>

        {/* Portal Role Tabs */}
        <div className="grid grid-cols-2 gap-2 p-1.5 rounded-xl bg-temple-cream border border-temple-gold/40">
          <button
            type="button"
            onClick={() => setActiveTab('student')}
            className={`py-2 text-xs font-cinzel font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'student'
                ? 'bg-temple-maroon text-temple-gold shadow'
                : 'text-stone-600 hover:text-temple-maroon'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Student Portal</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('admin')}
            className={`py-2 text-xs font-cinzel font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'admin'
                ? 'bg-temple-maroon text-temple-gold shadow'
                : 'text-stone-600 hover:text-temple-maroon'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Admin / Staff</span>
          </button>
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
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
              <input
                type="email"
                {...register('email')}
                placeholder={activeTab === 'admin' ? 'admin@sriruthralaya.com' : 'student@example.com'}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-none focus:border-temple-gold focus:ring-1 focus:ring-temple-gold bg-temple-cream/30"
              />
            </div>
            {errors.email && <p className="text-[11px] text-red-600 mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-stone-700 font-cinzel">
                Password
              </label>
              <Link
                to="/forgot-password"
                className="text-[11px] text-temple-maroon hover:underline font-outfit"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
              <input
                type="password"
                {...register('password')}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-none focus:border-temple-gold focus:ring-1 focus:ring-temple-gold bg-temple-cream/30"
              />
            </div>
            {errors.password && <p className="text-[11px] text-red-600 mt-1">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-xl bg-temple-maroon text-temple-gold hover:bg-temple-maroon-dark text-xs sm:text-sm font-cinzel font-bold shadow-md flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            <span>{isSubmitting ? 'Authenticating...' : `Enter ${activeTab === 'admin' ? 'Admin Portal' : 'Student Dashboard'}`}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* 1-Click Demo Login Shortcuts */}
        <div className="pt-2 border-t border-stone-100">
          <p className="text-[11px] font-cinzel text-stone-500 uppercase tracking-wider text-center mb-2">
            ⚡ Quick Demo Logins:
          </p>
          <div className="grid grid-cols-3 gap-1.5 text-[11px] font-medium">
            <button
              type="button"
              onClick={() => fillDemo('admin')}
              className="py-1.5 px-2 rounded bg-amber-50 border border-amber-300 text-amber-900 hover:bg-amber-100 transition-colors text-center"
            >
              Superadmin
            </button>
            <button
              type="button"
              onClick={() => fillDemo('staff')}
              className="py-1.5 px-2 rounded bg-amber-50 border border-amber-300 text-amber-900 hover:bg-amber-100 transition-colors text-center"
            >
              Instructor
            </button>
            <button
              type="button"
              onClick={() => fillDemo('student')}
              className="py-1.5 px-2 rounded bg-amber-50 border border-amber-300 text-amber-900 hover:bg-amber-100 transition-colors text-center"
            >
              Student (Ananya)
            </button>
          </div>
        </div>

        {/* Registration link */}
        <div className="text-center pt-2">
          <p className="text-xs text-stone-600">
            New disciple applying for admission?{' '}
            <Link to="/register" className="font-semibold text-temple-maroon hover:underline">
              Register Here
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}
