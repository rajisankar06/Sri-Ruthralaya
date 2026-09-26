import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, Shield, Sparkles, LogOut, Phone } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import MudraIcon from './MudraIcon';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated, logout, isAdmin, isStudent } = useAuth();
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Guru & Legacy', path: '/about' },
    { name: 'Courses & Batches', path: '/courses' },
    { name: 'Performances Gallery', path: '/gallery' },
    { name: 'Events & Notices', path: '/events' },
    { name: 'Testimonials', path: '/testimonials' },
    { name: 'Contact Us', path: '/contact' },
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
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-full border-2 border-temple-gold bg-gradient-to-br from-temple-maroon to-temple-maroon-dark flex items-center justify-center shadow-gold-glow group-hover:scale-105 transition-transform">
              <MudraIcon name="nataraja" className="w-8 h-8 text-temple-gold" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-cinzel font-bold text-lg sm:text-xl tracking-wider text-temple-gold-light group-hover:text-temple-gold transition-colors">
                  Sri Ruthraalayaa
                </span>
                <span className="text-temple-gold text-xs">🛕</span>
              </div>
              <p className="text-[10px] sm:text-xs text-amber-200/80 font-cormorant tracking-widest uppercase">
                Bharathanatyam Academy & Research
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-1.5 rounded text-xs xl:text-sm font-medium transition-all ${
                  isActive(link.path)
                    ? 'text-temple-gold bg-temple-maroon-dark/80 border-b-2 border-temple-gold font-semibold shadow-inner'
                    : 'text-amber-100/90 hover:text-temple-gold hover:bg-temple-maroon-dark/40'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Auth / Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                {isAdmin && (
                  <Link
                    to="/admin/dashboard"
                    className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded border border-temple-gold bg-temple-maroon-dark text-temple-gold hover:bg-temple-gold hover:text-temple-maroon transition-all shadow"
                  >
                    <Shield className="w-3.5 h-3.5" />
                    Admin Panel
                  </Link>
                )}
                {isStudent && (
                  <Link
                    to="/student/dashboard"
                    className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded border border-temple-gold bg-temple-maroon-dark text-temple-gold hover:bg-temple-gold hover:text-temple-maroon transition-all shadow"
                  >
                    <User className="w-3.5 h-3.5" />
                    My Dashboard
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="p-1.5 rounded text-amber-200/70 hover:text-white hover:bg-temple-maroon-dark transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-3.5 py-1.5 text-xs font-medium rounded text-amber-100 hover:text-temple-gold hover:bg-temple-maroon-dark transition-colors"
                >
                  Portal Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-1.5 text-xs font-semibold rounded bg-gradient-to-r from-temple-gold to-amber-500 text-temple-maroon-deep hover:brightness-110 transition-all shadow-md flex items-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Join Academy
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded text-temple-gold hover:bg-temple-maroon-dark focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden bg-temple-maroon-dark border-t border-temple-gold/30 px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2 rounded text-sm font-medium ${
                isActive(link.path)
                  ? 'bg-temple-maroon text-temple-gold font-bold border-l-4 border-temple-gold'
                  : 'text-amber-100/90 hover:bg-temple-maroon hover:text-white'
              }`}
            >
              {link.name}
            </Link>
          ))}

          <div className="pt-4 border-t border-temple-gold/20 flex flex-col gap-2">
            {isAuthenticated ? (
              <>
                {isAdmin && (
                  <Link
                    to="/admin/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 py-2 text-sm font-semibold rounded bg-temple-gold text-temple-maroon"
                  >
                    <Shield className="w-4 h-4" /> Admin Portal
                  </Link>
                )}
                {isStudent && (
                  <Link
                    to="/student/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 py-2 text-sm font-semibold rounded bg-temple-gold text-temple-maroon"
                  >
                    <User className="w-4 h-4" /> Student Portal
                  </Link>
                )}
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="flex items-center justify-center gap-2 py-2 text-sm text-amber-200/80 hover:text-white"
                >
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="py-2 text-center text-sm font-medium border border-temple-gold/50 rounded text-amber-100"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="py-2 text-center text-sm font-semibold rounded bg-temple-gold text-temple-maroon"
                >
                  Join Academy
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
