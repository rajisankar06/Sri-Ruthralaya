import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Search, 
  RefreshCw, 
  Calendar, 
  Image as ImageIcon, 
  Users, 
  CreditCard, 
  CalendarCheck, 
  Layers, 
  Bell, 
  LogIn, 
  Clock, 
  Download,
  Filter,
  CheckCircle2
} from 'lucide-react';
import api from '../../services/api';

export default function AdminActivityLogs() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedEntity, setSelectedEntity] = useState('all');

  useEffect(() => {
    loadActivities();
  }, [selectedEntity]);

  async function loadActivities() {
    setLoading(true);
    try {
      const url = selectedEntity === 'all' 
        ? '/admin/activities?limit=100' 
        : `/admin/activities?entity_type=${selectedEntity}&limit=100`;
      const res = await api.get(url);
      if (res.data.success) {
        setActivities(res.data.data);
      }
    } catch (err) {
      console.error('Error fetching admin activities:', err);
    } finally {
      setLoading(false);
    }
  }

  const filteredActivities = activities.filter((act) => {
    const q = search.toLowerCase();
    const title = act.title?.toLowerCase() || '';
    const details = act.details?.toLowerCase() || '';
    const action = act.action?.toLowerCase() || '';
    const admin = act.admin_name?.toLowerCase() || '';
    const ip = act.ip_address?.toLowerCase() || '';
    return title.includes(q) || details.includes(q) || action.includes(q) || admin.includes(q) || ip.includes(q);
  });

  const getEntityIcon = (type) => {
    switch (type) {
      case 'event': return <Calendar className="w-4 h-4 text-terracotta" />;
      case 'gallery': return <ImageIcon className="w-4 h-4 text-muted-gold" />;
      case 'student': return <Users className="w-4 h-4 text-deep-brown" />;
      case 'batch': return <Layers className="w-4 h-4 text-terracotta" />;
      case 'attendance': return <CalendarCheck className="w-4 h-4 text-ochre" />;
      case 'fee': return <CreditCard className="w-4 h-4 text-sage" />;
      case 'notice': return <Bell className="w-4 h-4 text-muted-gold" />;
      case 'auth': return <LogIn className="w-4 h-4 text-sage" />;
      default: return <ShieldCheck className="w-4 h-4 text-temple-gold" />;
    }
  };

  const getEntityBadgeStyle = (type) => {
    switch (type) {
      case 'event': return 'bg-terracotta/10 text-terracotta border-terracotta/30';
      case 'gallery': return 'bg-muted-gold/15 text-muted-gold border-muted-gold/40';
      case 'student': return 'bg-amber-100 text-stone-800 border-amber-300';
      case 'batch': return 'bg-orange-50 text-orange-800 border-orange-200';
      case 'attendance': return 'bg-amber-50 text-ochre border-amber-200';
      case 'fee': return 'bg-emerald-50 text-sage border-emerald-200';
      case 'notice': return 'bg-yellow-50 text-amber-800 border-yellow-200';
      case 'auth': return 'bg-stone-100 text-stone-700 border-stone-300';
      default: return 'bg-stone-50 text-stone-600 border-stone-200';
    }
  };

  const exportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(filteredActivities, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `sri-ruthralaya-audit-logs-${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const categories = [
    { id: 'all', label: 'All Activities' },
    { id: 'event', label: 'Events' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'student', label: 'Students' },
    { id: 'batch', label: 'Batches' },
    { id: 'attendance', label: 'Attendance' },
    { id: 'fee', label: 'Fees & Invoices' },
    { id: 'notice', label: 'Circulars' },
    { id: 'auth', label: 'Logins & Auth' },
  ];

  return (
    <div className="space-y-6 font-outfit text-white">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-[#111111] border border-[#333333] shadow-xl">
        <div>
          <span className="text-[10px] font-cinzel font-bold text-[#d4af37] uppercase tracking-wider px-2.5 py-1 rounded bg-[#0f0f0f] border border-[#333333]">
            Database Audit Ledger
          </span>
          <h1 className="font-cinzel text-2xl sm:text-3xl font-bold text-white mt-2">
            Admin Activities &amp; <span className="text-[#d4af37]">System Audit</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#bdbdbd] mt-1 max-w-2xl">
            Immutable database records of all administrative actions executed across student admissions, events, gallery studio, attendance, and fee transactions.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={loadActivities}
            disabled={loading}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0f0f0f] border border-[#333333] hover:border-[#d4af37] text-[#bdbdbd] hover:text-[#d4af37] text-xs font-cinzel font-semibold shadow-sm transition-all"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>

          <button
            onClick={exportJSON}
            className="primary-btn text-xs flex items-center gap-1.5 py-2 px-3.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Audit Log</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#111111] border border-[#333333] shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#888888] absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by action, title, details, administrator or IP address..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-[#333333] focus:outline-none focus:border-[#d4af37] font-outfit text-white bg-[#0f0f0f] placeholder-[#666666]"
            />
          </div>

          <div className="flex items-center gap-2 text-xs font-outfit text-[#888888]">
            <span className="font-semibold text-white">{filteredActivities.length}</span> activities logged
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#222222]">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedEntity(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-cinzel font-bold transition-all ${
                selectedEntity === cat.id
                  ? 'bg-[#d4af37] text-[#111111] shadow'
                  : 'bg-[#0f0f0f] text-[#bdbdbd] hover:text-[#d4af37] border border-[#333333]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Activities Timeline / Cards */}
      <div className="space-y-3">
        {loading && activities.length === 0 ? (
          <div className="text-center py-12 text-[#888888] text-sm font-outfit flex flex-col items-center gap-2">
            <RefreshCw className="w-6 h-6 animate-spin text-[#d4af37]" />
            <span>Fetching database activity records...</span>
          </div>
        ) : filteredActivities.length === 0 ? (
          <div className="p-10 rounded-2xl bg-[#111111] border border-[#333333] text-center text-[#888888] text-sm font-outfit">
            No admin activities match your filter criteria.
          </div>
        ) : (
          filteredActivities.map((act) => (
            <div
              key={act.id}
              className="p-4 sm:p-5 rounded-2xl bg-[#111111] border border-[#333333] hover:border-[#d4af37]/60 shadow-sm transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#0f0f0f] border border-[#333333] flex items-center justify-center flex-shrink-0 mt-0.5">
                  {getEntityIcon(act.entity_type)}
                </div>

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-cinzel font-bold border uppercase bg-[#0f0f0f] text-[#d4af37] border-[#333333]">
                      {act.entity_type}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#161616] text-[#888888] border border-[#333333]">
                      {act.action}
                    </span>
                    <h3 className="font-cinzel font-bold text-sm text-white">
                      {act.title}
                    </h3>
                  </div>

                  <p className="text-xs text-[#bdbdbd] font-outfit leading-relaxed max-w-3xl">
                    {act.details}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 text-[11px] text-[#777777] font-outfit pt-1">
                    <span className="flex items-center gap-1 text-[#aaaaaa] font-medium">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                      {act.admin_name || 'Academy Administrator'}
                    </span>
                    {act.ip_address && (
                      <span>IP: {act.ip_address}</span>
                    )}
                    {act.entity_id && (
                      <span className="font-mono text-[10px] bg-[#0f0f0f] px-1.5 py-0.5 rounded border border-[#333333] text-[#888888]">
                        Ref: {act.entity_id}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center border-t md:border-t-0 pt-2 md:pt-0 border-[#222222] flex-shrink-0">
                <span className="flex items-center gap-1 text-xs font-semibold text-[#d4af37] font-cinzel">
                  <Clock className="w-3.5 h-3.5" />
                  {new Date(act.created_at).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                </span>
                <span className="text-[11px] text-[#777777] font-outfit">
                  {new Date(act.created_at).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
