import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  Award,
  GraduationCap,
  Camera,
  Calendar,
  PhoneCall,
  LogIn,
  LogOut,
  User,
  Shield,
  Sparkles,
  Phone,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated, logout, isAdmin, isStudent } = useAuth();
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'About', path: '/about', icon: Award },
    { name: 'Courses', path: '/courses', icon: GraduationCap },
    { name: 'Gallery', path: '/gallery', icon: Camera },
    { name: 'Events', path: '/events', icon: Calendar },
    { name: 'Contact', path: '/contact', icon: PhoneCall },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-40 bg-[#111111]/95 backdrop-blur-md text-white shadow-xl border-b border-[#333333]">
      {/* Top Micro Announce Bar */}
      <div className="bg-[#080808] text-xs py-1.5 px-4 text-[#d4af37] border-b border-[#222222] flex justify-between items-center">
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="inline-block w-2 h-2 rounded-full bg-[#d4af37] animate-pulse flex-shrink-0"></span>
          <span className="font-cinzel tracking-wider text-[10px] sm:text-[11px] text-[#d4af37] truncate font-semibold">
            SRI RUTHRALAYAA DANCE ACADEMY • THIRUTHANGAL, SIVAKASI
          </span>
          <span className="hidden md:inline-block px-2 py-0.5 rounded text-[9px] bg-[#d4af37]/15 border border-[#d4af37]/30 text-[#d4af37] font-semibold uppercase tracking-wider">
            Admissions Open
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs text-[#bdbdbd] font-outfit flex-shrink-0">
          <a
            href="tel:+919842123456"
            className="flex items-center gap-1.5 hover:text-[#d4af37] transition-colors"
            title="Call Academy Office"
          >
            <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
            <span className="hidden sm:inline font-medium">+91 98421 23456</span>
          </a>
          <span className="text-[#444444] hidden sm:inline">•</span>
          <span className="italic font-cormorant text-xs sm:text-sm text-[#aaaaaa] hidden lg:inline">
            18+ Years Classical Heritage
          </span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[76px]">

          {/* Brand Logo & Name */}
          <Link to="/" className="brand flex items-center gap-3 group flex-shrink-0">
            <div className="w-12 h-12 rounded-full border-2 border-[#d4af37] bg-[#0d0d0d] flex items-center justify-center p-1.5 shadow-[0_0_15px_rgba(212,175,55,0.25)] group-hover:scale-105 group-hover:shadow-[0_0_22px_rgba(212,175,55,0.45)] transition-all overflow-hidden relative">
              <img
                src="/logo.png"
                alt="Sri Ruthraalayaa Logo"
                className="w-full h-full object-contain filter drop-shadow"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="logo font-cinzel font-bold text-xl sm:text-2xl tracking-wider text-[#d4af37] group-hover:text-[#ffd700] transition-colors drop-shadow-sm">
                  Sri Ruthraalayaa
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-[#aaaaaa] font-cormorant tracking-widest uppercase font-semibold">
                Bharathanatyam Academy
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="nav-links hidden lg:flex items-center gap-1.5 xl:gap-2.5">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`group relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-outfit font-medium transition-all ${
                    active
                      ? 'bg-[#0f0f0f] text-[#d4af37] border border-[#d4af37]/60 shadow-[0_0_15px_rgba(212,175,55,0.15)]'
                      : 'text-white hover:text-[#d4af37] hover:bg-[#181818]'
                  }`}
                >
                  <span
                    className={`p-1 rounded-lg transition-all flex items-center justify-center ${
                      active
                        ? 'bg-[#d4af37] text-[#111111]'
                        : 'bg-[#1c1c1c] text-[#d4af37] group-hover:bg-[#d4af37] group-hover:text-[#111111]'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </span>
                  <span>{link.name}</span>
                  {active && (
                    <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-4 h-1 bg-[#d4af37] rounded-full shadow-[0_0_8px_#d4af37]"></span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Controls: Auth & Action Buttons */}
          <div className="flex items-center gap-2.5 sm:gap-3 flex-shrink-0">

            {/* Desktop Auth Section */}
            <div className="hidden md:flex items-center gap-2.5">
              {isAuthenticated ? (
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#181818] border border-[#333333] shadow-inner">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#d4af37] to-[#e6c762] text-[#111111] font-bold text-xs flex items-center justify-center font-cinzel shadow">
                      {user?.name ? user.name[0].toUpperCase() : 'U'}
                    </div>
                    <span className="text-xs font-medium text-stone-200 max-w-[100px] truncate hidden xl:inline font-outfit">
                      {user?.name?.split(' ')[0] || 'User'}
                    </span>
                  </div>

                  {isAdmin && (
                    <Link
                      to="/admin/dashboard"
                      className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl border border-[#d4af37] bg-[#0f0f0f] text-[#d4af37] hover:bg-[#d4af37] hover:text-[#111111] transition-all shadow-md font-cinzel"
                    >
                      <Shield className="w-3.5 h-3.5" />
                      <span>Admin Portal</span>
                    </Link>
                  )}

                  {isStudent && (
                    <Link
                      to="/student/dashboard"
                      className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl border border-[#d4af37] bg-[#0f0f0f] text-[#d4af37] hover:bg-[#d4af37] hover:text-[#111111] transition-all shadow-md font-cinzel"
                    >
                      <User className="w-3.5 h-3.5" />
                      <span>Student Studio</span>
                    </Link>
                  )}

                  <button
                    type="button"
                    onClick={logout}
                    className="p-2 rounded-xl text-[#999999] hover:text-red-400 hover:bg-[#1f1111] transition-colors border border-transparent hover:border-red-900/40"
                    title="Sign Out"
                    aria-label="Sign Out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    to="/login"
                    className="login-btn"
                  >
                    <LogIn className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Sign In</span>
                  </Link>

                  <Link
                    to="/register"
                    className="join-btn"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Join Academy</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="flex lg:hidden items-center">
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-xl text-[#d4af37] hover:bg-[#181818] border border-[#333333] focus:outline-none transition-colors"
                aria-label="Toggle Navigation Menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden bg-[#111111] border-t border-[#333333] px-4 pt-3 pb-6 space-y-2.5 shadow-2xl">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium tracking-wide transition-all ${
                  active
                    ? 'bg-[#0f0f0f] text-[#d4af37] border-l-4 border-[#d4af37] shadow-sm'
                    : 'text-white hover:bg-[#181818] hover:text-[#d4af37]'
                }`}
              >
                <span
                  className={`p-1.5 rounded-lg flex items-center justify-center ${
                    active
                      ? 'bg-[#d4af37] text-[#111111]'
                      : 'bg-[#1c1c1c] text-[#d4af37] border border-[#333333]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </span>
                <span className="font-outfit font-medium">{link.name}</span>
              </Link>
            );
          })}

          <div className="pt-4 border-t border-[#333333] flex flex-col gap-2">
            {isAuthenticated ? (
              <>
                {isAdmin && (
                  <Link
                    to="/admin/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 py-2.5 text-xs font-bold rounded-xl bg-[#d4af37] text-[#111111] shadow"
                  >
                    <Shield className="w-4 h-4" />
                    <span>Admin Portal</span>
                  </Link>
                )}
                {isStudent && (
                  <Link
                    to="/student/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 py-2.5 text-xs font-bold rounded-xl bg-[#d4af37] text-[#111111] shadow"
                  >
                    <User className="w-4 h-4" />
                    <span>Student Studio</span>
                  </Link>
                )}
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="flex items-center justify-center gap-2 py-2 text-xs text-[#999999] hover:text-red-400 font-outfit"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-2">
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="login-btn justify-center"
                >
                  <LogIn className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Sign In</span>
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="join-btn justify-center"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Join Academy</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
