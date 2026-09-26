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
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const isActive = (path) => {
    if (path === '/admin/events' && (location.pathname === '/admin/events' || location.pathname === '/admin/events-notices')) return true;
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col lg:flex-row font-outfit">
      
      {/* Mobile Top Header */}
      <div className="lg:hidden bg-temple-maroon text-white p-4 flex items-center justify-between border-b-2 border-temple-gold shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border border-temple-gold bg-white flex items-center justify-center p-1 overflow-hidden">
            <img src="/logo.png" alt="Sri Ruthraalayaa Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <h1 className="font-cinzel font-bold text-sm text-temple-gold-light">Sri Ruthraalayaa</h1>
            <p className="text-[10px] text-amber-200/70 font-outfit">Admin Executive Panel</p>
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
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-temple-maroon-deep text-white flex flex-col justify-between border-r-2 border-temple-gold shadow-2xl transform transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-auto ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Header */}
          <div className="p-6 border-b border-temple-gold/30 bg-black/30">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full border-2 border-temple-gold bg-white flex items-center justify-center p-1 shadow-gold-glow overflow-hidden">
                <img src="/logo.png" alt="Sri Ruthraalayaa Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <h2 className="font-cinzel font-bold text-sm text-temple-gold-light">
                  Sri Ruthraalayaa
                </h2>
                <p className="text-[10px] text-amber-200/80 font-cinzel uppercase tracking-wider">
                  Admin Administration
                </p>
              </div>
            </div>

            {/* Admin Badge */}
            <div className="mt-4 p-3 rounded-xl bg-temple-maroon/90 border border-temple-gold/30 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-temple-gold text-temple-maroon-deep font-bold font-cinzel flex items-center justify-center shadow">
                <Shield className="w-5 h-5 text-temple-maroon" />
              </div>
              <div className="overflow-hidden">
                <p className="font-cinzel text-xs font-bold text-white truncate">{user?.name}</p>
                <span className="inline-block text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-400 text-stone-900 font-bold mt-0.5">
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
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    active
                      ? 'bg-temple-maroon text-temple-gold font-bold border-l-4 border-temple-gold shadow-md'
                      : 'text-amber-100/80 hover:bg-white/5 hover:text-temple-gold'
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
        <div className="p-4 border-t border-temple-gold/20 bg-black/40 space-y-2">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 w-full py-2 rounded-lg text-xs text-amber-200/80 hover:text-white border border-temple-gold/30 hover:bg-white/5 transition-colors font-cinzel"
          >
            <span>View Public Academy Site</span>
            <ExternalLink className="w-3 h-3" />
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full py-2 rounded-lg text-xs text-red-200 hover:text-red-100 bg-red-950/50 hover:bg-red-900/60 transition-colors font-outfit"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content View */}
      <main className="flex-1 p-4 sm:p-6 lg:p-10 max-w-7xl mx-auto w-full">
        <Outlet />
      </main>

    </div>
  );
}
