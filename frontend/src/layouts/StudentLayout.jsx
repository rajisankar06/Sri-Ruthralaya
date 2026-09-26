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
    <div className="min-h-screen bg-[#0f0f0f] text-white flex flex-col lg:flex-row">

      {/* Mobile Top Header */}
      <div className="lg:hidden bg-[#111111] text-white p-4 flex items-center justify-between border-b border-[#333333] shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border border-[#d4af37] bg-[#0f0f0f] flex items-center justify-center p-1 overflow-hidden">
            <img src="/logo.png" alt="Sri Ruthraalayaa Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <h1 className="font-cinzel font-bold text-sm text-[#d4af37]">Sri Ruthraalayaa</h1>
            <p className="text-[10px] text-[#bdbdbd] font-outfit">Student Portal</p>
          </div>
        </div>

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded text-[#d4af37] hover:bg-[#1a1a1a]"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar for Desktop & Mobile Drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#111111] text-white flex flex-col justify-between border-r border-[#333333] shadow-2xl transform transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-auto ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <div>
          {/* Sidebar Header */}
          <div className="p-6 border-b border-[#333333] bg-[#0a0a0a]">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full border-2 border-[#d4af37] bg-[#0f0f0f] flex items-center justify-center p-1 overflow-hidden">
                <img src="/logo.png" alt="Sri Ruthraalayaa Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <h2 className="font-cinzel font-bold text-sm text-[#d4af37]">
                  Sri Ruthraalayaa
                </h2>
                <p className="text-[10px] text-[#999999] font-cormorant italic">
                  Disciple Portal
                </p>
              </div>
            </div>

            {/* Student Mini Profile Card */}
            <div className="mt-4 p-3 rounded-xl bg-[#1a1a1a] border border-[#333333] flex items-center gap-3">
              <img
                src={user?.profile_photo_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
                alt={user?.name}
                className="w-10 h-10 rounded-full object-cover border border-[#d4af37]"
              />
              <div className="overflow-hidden">
                <p className="font-cinzel text-xs font-bold text-white truncate">{user?.name}</p>
                <span className="inline-block text-[10px] px-2 py-0.5 rounded-full bg-[#d4af37] text-[#111111] font-semibold mt-0.5">
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
                      ? 'bg-[#1a1a1a] text-[#d4af37] font-bold border-l-4 border-[#d4af37] shadow-inner'
                      : 'text-[#bdbdbd] hover:bg-[#1a1a1a]/70 hover:text-[#d4af37]'
                    }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-[#d4af37]' : 'text-[#888888]'}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Actions */}
        <div className="p-4 border-t border-[#333333] bg-[#0a0a0a] space-y-2">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 w-full py-2 rounded-lg text-xs text-[#bdbdbd] hover:text-white border border-[#333333] hover:border-[#d4af37] transition-colors font-cinzel"
          >
            <span>Public Academy Site</span>
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full py-2 rounded-lg text-xs text-red-300 hover:text-red-200 bg-red-950/40 hover:bg-red-900/50 border border-red-900/40 transition-colors font-outfit"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Page Area */}
      <main className="flex-1 p-4 sm:p-6 lg:p-10 max-w-7xl mx-auto w-full bg-[#0f0f0f] text-white">
        <Outlet />
      </main>

      {/* Floating AI Chatbot Widget (Personalized Disciple Mode) */}
      <FloatingChatbot />
    </div>
  );
}
