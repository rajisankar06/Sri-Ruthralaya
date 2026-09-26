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
    <header className="sticky top-0 z-40 bg-[#111111] text-white shadow-xl border-b border-[#333333]">
      {/* Top micro-bar */}
      <div className="bg-[#080808] text-xs py-1.5 px-4 text-[#d4af37] border-b border-[#222222] flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="font-cinzel tracking-widest text-[11px] text-[#d4af37]">
            || SRI RUTHRALAYAA DANCE ACADEMY — THIRUTHANGAL, SIVAKASI ||
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-xs text-[#bdbdbd] font-outfit">
          <span className="flex items-center gap-1.5 hover:text-[#d4af37] transition-colors">
            <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
            +91 98421 23456
          </span>
          <span className="text-[#444444]">•</span>
          <span className="italic font-cormorant text-sm text-[#aaaaaa]">18+ Years of Classical Dance Heritage</span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[75px]">

          {/* Brand Logo & Name */}
          <Link to="/" className="brand flex items-center gap-3 group flex-shrink-0">
            <div className="w-12 h-12 rounded-full border border-[#d4af37] bg-[#111111] flex items-center justify-center p-1 shadow-[0_0_15px_rgba(212,175,55,0.25)] group-hover:scale-105 transition-transform overflow-hidden">
              <img src="/logo.png" alt="Sri Ruthraalayaa Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="logo font-cinzel font-bold text-xl sm:text-2xl tracking-wider text-[#d4af37] group-hover:text-[#ffd700] transition-colors">
                  Sri Ruthraalayaa
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-[#aaaaaa] font-cormorant tracking-widest uppercase">
                Bharathanatyam Academy
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="nav-links hidden lg:flex items-center gap-2 xl:gap-3">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`group flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-outfit font-medium transition-all ${
                    active
                      ? 'bg-[#0f0f0f] text-[#d4af37] border border-[#d4af37]/60 shadow-inner'
                      : 'text-white hover:text-[#d4af37] hover:bg-[#0f0f0f]/60'
                  }`}
                >
                  <span
                    className={`p-1 rounded-md transition-all flex items-center justify-center ${
                      active
                        ? 'bg-[#d4af37] text-[#111111]'
                        : 'bg-[#1a1a1a] text-[#d4af37] group-hover:bg-[#d4af37] group-hover:text-[#111111]'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </span>
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Desktop Auth / Action Buttons with User CSS specifications */}
          <div className="nav-buttons hidden md:flex items-center gap-3 flex-shrink-0">
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                {isAdmin && (
                  <Link
                    to="/admin/dashboard"
                    className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-md border border-[#d4af37] bg-[#0f0f0f] text-[#d4af37] hover:bg-[#d4af37] hover:text-[#111111] transition-all shadow"
                  >
                    <Shield className="w-3.5 h-3.5" />
                    <span>Admin Panel</span>
                  </Link>
                )}
                {isStudent && (
                  <Link
                    to="/student/dashboard"
                    className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-md border border-[#d4af37] bg-[#0f0f0f] text-[#d4af37] hover:bg-[#d4af37] hover:text-[#111111] transition-all shadow"
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>My Dashboard</span>
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="p-2 rounded-lg text-[#999999] hover:text-white hover:bg-[#0f0f0f] transition-colors border border-transparent hover:border-[#333333]"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2.5">
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
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-[#d4af37] hover:bg-[#0f0f0f] border border-[#333333] focus:outline-none transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer with Arranged Icons */}
      {isOpen && (
        <div className="lg:hidden bg-[#111111] border-t border-[#333333] px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium tracking-wide transition-all ${
                  active
                    ? 'bg-[#0f0f0f] text-[#d4af37] border-l-4 border-[#d4af37]'
                    : 'text-white hover:bg-[#0f0f0f] hover:text-[#d4af37]'
                }`}
              >
                <span
                  className={`p-1.5 rounded-md flex items-center justify-center ${
                    active
                      ? 'bg-[#d4af37] text-[#111111]'
                      : 'bg-[#1c1c1c] text-[#d4af37] border border-[#333333]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </span>
                <span>{link.name}</span>
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
                    className="flex items-center justify-center gap-2 py-2.5 text-xs font-bold rounded-lg bg-[#d4af37] text-[#111111] shadow"
                  >
                    <Shield className="w-4 h-4" />
                    <span>Admin Portal</span>
                  </Link>
                )}
                {isStudent && (
                  <Link
                    to="/student/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 py-2.5 text-xs font-bold rounded-lg bg-[#d4af37] text-[#111111] shadow"
                  >
                    <User className="w-4 h-4" />
                    <span>Student Portal</span>
                  </Link>
                )}
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="flex items-center justify-center gap-2 py-2 text-xs text-[#999999] hover:text-white"
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
