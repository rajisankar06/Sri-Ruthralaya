import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  CalendarCheck,
  Clock,
  CreditCard,
  Award,
  Bell,
  Calendar,
  BookOpen,
  User,
  LogOut,
  Menu,
  X,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import MudraIcon from '../components/common/MudraIcon';
import FloatingChatbot from '../components/chatbot/FloatingChatbot';

export default function StudentLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const navigation = [
    { name: 'Dashboard Overview', path: '/student/dashboard', icon: LayoutDashboard },
    { name: 'My Profile', path: '/student/profile', icon: User },
    { name: 'Attendance Calendar', path: '/student/attendance', icon: CalendarCheck },
    { name: 'Class Schedule', path: '/student/schedule', icon: Clock },
    { name: 'Fee Status & Receipts', path: '/student/fees', icon: CreditCard },
    { name: 'Adavu & Margam Progress', path: '/student/progress', icon: Award },
    { name: 'Notices & Circulars', path: '/student/notices', icon: Bell },
    { name: 'Events & Workshops', path: '/student/events', icon: Calendar },
    { name: 'Study Material & Videos', path: '/student/materials', icon: BookOpen },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-temple-cream flex flex-col lg:flex-row">

      {/* Mobile Top Header */}
      <div className="lg:hidden bg-temple-maroon text-white p-4 flex items-center justify-between border-b-2 border-temple-gold shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border border-temple-gold bg-temple-maroon-dark flex items-center justify-center">
            <MudraIcon name="nataraja" className="w-6 h-6 text-temple-gold" />
          </div>
          <div>
            <h1 className="font-cinzel font-bold text-sm text-temple-gold-light">Sri Ruthraalayaa</h1>
            <p className="text-[10px] text-amber-200/70 font-outfit">Student Portal</p>
          </div>
        </div>

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded text-temple-gold hover:bg-temple-maroon-dark"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar for Desktop & Mobile Drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-temple-maroon text-white flex flex-col justify-between border-r-2 border-temple-gold shadow-xl transform transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-auto ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <div>
          {/* Sidebar Header */}
          <div className="p-6 border-b border-temple-gold/30 bg-temple-maroon-dark">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full border-2 border-temple-gold bg-temple-maroon flex items-center justify-center shadow-gold-glow">
                <MudraIcon name="nataraja" className="w-7 h-7 text-temple-gold" />
              </div>
              <div>
                <h2 className="font-cinzel font-bold text-sm text-temple-gold-light">
                  Sri Ruthraalayaa
                </h2>
                <p className="text-[10px] text-amber-200/80 font-cormorant italic">
                  Disciple Portal
                </p>
              </div>
            </div>

            {/* Student Mini Profile Card */}
            <div className="mt-4 p-3 rounded-xl bg-temple-maroon/70 border border-temple-gold/30 flex items-center gap-3">
              <img
                src={user?.profile_photo_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
                alt={user?.name}
                className="w-10 h-10 rounded-full object-cover border border-temple-gold"
              />
              <div className="overflow-hidden">
                <p className="font-cinzel text-xs font-bold text-white truncate">{user?.name}</p>
                <span className="inline-block text-[10px] px-2 py-0.5 rounded-full bg-temple-gold text-temple-maroon-deep font-semibold mt-0.5">
                  Disciple
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-280px)] scrollbar-none font-outfit">
            {navigation.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${active
                      ? 'bg-temple-maroon-dark text-temple-gold font-bold border-l-4 border-temple-gold shadow-inner'
                      : 'text-amber-100/80 hover:bg-temple-maroon-dark/60 hover:text-temple-gold'
                    }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-temple-gold' : 'text-amber-200/60'}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Actions */}
        <div className="p-4 border-t border-temple-gold/20 bg-temple-maroon-dark space-y-2">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 w-full py-2 rounded-lg text-xs text-amber-200/80 hover:text-white border border-temple-gold/30 hover:bg-white/5 transition-colors font-cinzel"
          >
            <span>Public Academy Site</span>
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full py-2 rounded-lg text-xs text-red-200 hover:text-red-100 bg-red-950/40 hover:bg-red-900/50 transition-colors font-outfit"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Page Area */}
      <main className="flex-1 p-4 sm:p-6 lg:p-10 max-w-7xl mx-auto w-full">
        <Outlet />
      </main>

      {/* Floating AI Chatbot Widget (Personalized Disciple Mode) */}
      <FloatingChatbot />
    </div>
  );
}
