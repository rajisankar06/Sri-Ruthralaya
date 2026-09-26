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
    <header className="sticky top-0 z-40 bg-temple-maroon text-white shadow-temple border-b-2 border-temple-gold/40">
      {/* Top micro-bar */}
      <div className="bg-temple-maroon-dark text-xs py-1.5 px-4 text-temple-gold-light border-b border-temple-gold/20 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="font-cinzel tracking-widest text-[11px] text-temple-gold">
            || SRI RUTHRALAYAA DANCE ACADEMY — THIRUTHANGAL, SIVAKASI ||
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-xs text-amber-100/90 font-outfit">
          <span className="flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-temple-gold" />
            +91 98421 23456
          </span>
          <span className="text-temple-gold/60">•</span>
          <span className="italic font-cormorant text-sm">18+ Years of Classical Dance Heritage</span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Brand Logo & Name */}
          <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
            <div className="w-12 h-12 rounded-full border-2 border-temple-gold bg-white flex items-center justify-center p-1 shadow-gold-glow group-hover:scale-105 transition-transform overflow-hidden">
              <img src="/logo.png" alt="Sri Ruthraalayaa Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-cinzel font-bold text-lg sm:text-xl tracking-wider text-temple-gold-light group-hover:text-temple-gold transition-colors">
                  Sri Ruthraalayaa
                </span>
                <span>

                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-amber-200/80 font-cormorant tracking-widest uppercase">
                Bharathanatyam Academy
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links — Neatly Arranged with Icons */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`group flex items-center gap-2 px-3 py-2 rounded-xl text-xs xl:text-sm font-cinzel font-semibold tracking-wide transition-all ${active
                    ? 'bg-temple-maroon-dark text-temple-gold border border-temple-gold/60 shadow-inner'
                    : 'text-amber-100/90 hover:text-temple-gold hover:bg-temple-maroon-dark/50'
                    }`}
                >
                  <span
                    className={`p-1.5 rounded-lg transition-all flex items-center justify-center ${active
                      ? 'bg-temple-gold text-temple-maroon-deep shadow-gold-glow'
                      : 'bg-temple-maroon-dark/80 text-temple-gold group-hover:bg-temple-gold group-hover:text-temple-maroon-deep group-hover:scale-105'
                      }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </span>
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Desktop Auth / Action Buttons with Icons */}
          <div className="hidden md:flex items-center gap-2.5 flex-shrink-0">
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                {isAdmin && (
                  <Link
                    to="/admin/dashboard"
                    className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-cinzel font-semibold rounded-xl border border-temple-gold bg-temple-maroon-dark text-temple-gold hover:bg-temple-gold hover:text-temple-maroon transition-all shadow"
                  >
                    <Shield className="w-3.5 h-3.5" />
                    <span>Admin Panel</span>
                  </Link>
                )}
                {isStudent && (
                  <Link
                    to="/student/dashboard"
                    className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-cinzel font-semibold rounded-xl border border-temple-gold bg-temple-maroon-dark text-temple-gold hover:bg-temple-gold hover:text-temple-maroon transition-all shadow"
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>My Dashboard</span>
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="p-2 rounded-xl text-amber-200/70 hover:text-white hover:bg-temple-maroon-dark transition-colors border border-transparent hover:border-temple-gold/30"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-cinzel font-semibold rounded-xl transition-all border ${location.pathname === '/login'
                    ? 'bg-temple-maroon-dark text-temple-gold border-temple-gold/60 shadow-inner'
                    : 'text-amber-100 hover:text-temple-gold hover:bg-temple-maroon-dark/60 border-transparent hover:border-temple-gold/40'
                    }`}
                >
                  <LogIn className="w-3.5 h-3.5 text-temple-gold" />
                  <span>Sign In</span>
                </Link>
                <Link
                  to="/register"
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-cinzel font-bold rounded-xl bg-gradient-to-r from-temple-gold to-amber-500 text-temple-maroon-deep hover:brightness-110 transition-all shadow-md transform hover:-translate-y-0.5"
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
              className="p-2 rounded-xl text-temple-gold hover:bg-temple-maroon-dark border border-temple-gold/30 focus:outline-none transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer with Arranged Icons */}
      {isOpen && (
        <div className="lg:hidden bg-temple-maroon-dark border-t border-temple-gold/30 px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-cinzel font-semibold tracking-wide transition-all ${active
                  ? 'bg-temple-maroon text-temple-gold border-l-4 border-temple-gold shadow'
                  : 'text-amber-100/90 hover:bg-temple-maroon hover:text-white'
                  }`}
              >
                <span
                  className={`p-1.5 rounded-lg flex items-center justify-center ${active
                    ? 'bg-temple-gold text-temple-maroon-deep shadow-gold-glow'
                    : 'bg-temple-maroon text-temple-gold border border-temple-gold/30'
                    }`}
                >
                  <Icon className="w-4 h-4" />
                </span>
                <span>{link.name}</span>
              </Link>
            );
          })}

          <div className="pt-4 border-t border-temple-gold/20 flex flex-col gap-2">
            {isAuthenticated ? (
              <>
                {isAdmin && (
                  <Link
                    to="/admin/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 py-2.5 text-xs font-cinzel font-bold rounded-xl bg-temple-gold text-temple-maroon-deep shadow"
                  >
                    <Shield className="w-4 h-4" />
                    <span>Admin Portal</span>
                  </Link>
                )}
                {isStudent && (
                  <Link
                    to="/student/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 py-2.5 text-xs font-cinzel font-bold rounded-xl bg-temple-gold text-temple-maroon-deep shadow"
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
                  className="flex items-center justify-center gap-2 py-2 text-xs font-cinzel text-amber-200/80 hover:text-white"
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
                  className="flex items-center justify-center gap-1.5 py-2.5 text-center text-xs font-cinzel font-semibold border border-temple-gold/50 rounded-xl text-amber-100 hover:bg-temple-maroon"
                >
                  <LogIn className="w-3.5 h-3.5 text-temple-gold" />
                  <span>Sign In</span>
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-1.5 py-2.5 text-center text-xs font-cinzel font-bold rounded-xl bg-gradient-to-r from-temple-gold to-amber-500 text-temple-maroon-deep shadow"
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
