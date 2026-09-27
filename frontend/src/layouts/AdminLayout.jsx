import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Layers,
  CalendarCheck,
  CreditCard,
  Calendar,
  Image,
  MessageSquare,
  ShieldCheck,
  Shield,
  LogOut,
  Menu,
  X,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import MudraIcon from '../components/common/MudraIcon';

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const navigation = [
    { name: 'Executive Dashboard & AI', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Student Management', path: '/admin/students', icon: Users },
    { name: 'Batches & Curriculum', path: '/admin/batches', icon: Layers },
    { name: 'Attendance & CSV Upload', path: '/admin/attendance', icon: CalendarCheck },
    { name: 'Fee & Invoicing Ledger', path: '/admin/fees', icon: CreditCard },
    { name: 'Stage Events & Notices', path: '/admin/events', icon: Calendar },
    { name: 'Photo Gallery Studio', path: '/admin/gallery', icon: Image },
    { name: 'AI Chatbot Logs', path: '/admin/chatbot-logs', icon: MessageSquare },
    { name: 'DB Activity Audit Logs', path: '/admin/activities', icon: ShieldCheck },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const isActive = (path) => {
    if (path === '/admin/events' && (location.pathname === '/admin/events' || location.pathname === '/admin/events-notices')) return true;
    if (path === '/admin/activities' && (location.pathname === '/admin/activities' || location.pathname === '/admin/activity-logs')) return true;
    return location.pathname === path;
  };


  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white flex flex-col lg:flex-row font-outfit">

      {/* Mobile Top Header */}
      <div className="lg:hidden bg-[#111111] text-white p-4 flex items-center justify-between border-b border-[#333333] shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border border-[#d4af37] bg-[#0f0f0f] flex items-center justify-center p-1 overflow-hidden">
            <img src="/logo.png" alt="Sri Ruthraalayaa Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <h1 className="font-cinzel font-bold text-sm text-[#d4af37]">Sri Ruthraalayaa</h1>
            <p className="text-[10px] text-[#bdbdbd] font-outfit">Admin Executive Panel</p>
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
          {/* Header */}
          <div className="p-6 border-b border-[#333333] bg-[#0a0a0a]">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full border-2 border-[#d4af37] bg-[#0f0f0f] flex items-center justify-center p-1 overflow-hidden">
                <img src="/logo.png" alt="Sri Ruthraalayaa Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <h2 className="font-cinzel font-bold text-sm text-[#d4af37]">
                  Sri Ruthraalayaa
                </h2>
                <p className="text-[10px] text-[#999999] font-cinzel uppercase tracking-wider">
                  Admin Administration
                </p>
              </div>
            </div>

            {/* Admin Badge */}
            <div className="mt-4 p-3 rounded-xl bg-[#1a1a1a] border border-[#333333] flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#d4af37] text-[#111111] font-bold font-cinzel flex items-center justify-center shadow">
                <Shield className="w-5 h-5 text-[#111111]" />
              </div>
              <div className="overflow-hidden">
                <p className="font-cinzel text-xs font-bold text-white truncate">{user?.name}</p>
                <span className="inline-block text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#d4af37] text-[#111111] font-bold mt-0.5">
                  {user?.role === 'admin' ? 'Superadmin' : 'Staff / Guru'}
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
            <span>View Public Academy Site</span>
            <ExternalLink className="w-3 h-3" />
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

      {/* Main Content View */}
      <main className="flex-1 p-4 sm:p-6 lg:p-10 max-w-7xl mx-auto w-full bg-[#0f0f0f] text-white space-y-6">

        {/* Desktop Top Executive Header Bar */}
        <div className="hidden lg:flex items-center justify-between p-4 rounded-2xl bg-[#111111] border border-[#333333] shadow-md">
          {/* Breadcrumb / Title Context */}
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#d4af37]" />
            <div>
              <span className="text-[10px] font-cinzel text-[#888888] uppercase tracking-wider">
                Sri Ruthraalayaa Administration
              </span>
              <p className="text-xs font-cinzel font-bold text-white">
                {navigation.find(n => isActive(n.path))?.name || 'Executive Control Center'}
              </p>
            </div>
          </div>

          {/* Quick System Indicators */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#0f0f0f] border border-[#333333] text-[11px] text-[#bdbdbd]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>PostgreSQL Engine Online</span>
            </div>

            <div className="hidden xl:flex items-center gap-2 px-3 py-1 rounded-full bg-[#0f0f0f] border border-[#333333] text-[11px] text-[#d4af37] font-cinzel">
              <Calendar className="w-3.5 h-3.5" />
              <span>Academic Year 2026-27</span>
            </div>

            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0f0f0f] border border-[#333333] hover:border-[#d4af37] text-xs text-[#bdbdbd] hover:text-[#d4af37] transition-all"
            >
              <span>Live Site</span>
              <ExternalLink className="w-3 h-3" />
            </Link>

            <div className="flex items-center gap-2.5 pl-3 border-l border-[#333333]">
              <div className="w-8 h-8 rounded-full border border-[#d4af37] overflow-hidden bg-[#0a0a0a] flex items-center justify-center">
                <img
                  src="/logo.png"
                  alt={user?.name || 'Academy Administration'}
                  className="w-5 h-5 object-contain"
                />
              </div>
              <div className="text-left text-xs">
                <p className="font-cinzel font-bold text-white leading-tight">{user?.name}</p>
                <span className="text-[10px] text-[#d4af37] uppercase">{user?.role || 'Admin'}</span>
              </div>
            </div>
          </div>
        </div>

        <Outlet />
      </main>

    </div>
  );
}
