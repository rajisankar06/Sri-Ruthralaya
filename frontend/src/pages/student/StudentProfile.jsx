import React, { useState } from 'react';
import { User, Mail, Phone, Calendar, ShieldCheck, MapPin, Award, CheckCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import MudraIcon from '../../components/common/MudraIcon';

export default function StudentProfile() {
  const { user, refreshUserProfile } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [profilePhoto, setProfilePhoto] = useState(user?.profile_photo_url || '');
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  const activeBatch = user?.enrollments?.[0]?.batch || {
    name: 'Madhyama (Intermediate Jatiswaram & Shabdam)',
    instructor_name: 'Guru Nattiyakalaimani V. Suriya Sathian',
    schedule_days: 'Tue, Thu, Sat',
    schedule_time: '05:30 PM - 07:00 PM',
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSaved(false);
    try {
      await api.put(`/students/${user.id}`, {
        name,
        phone,
        profile_photo_url: profilePhoto,
      });
      await refreshUserProfile();
      setSaved(true);
    } catch (err) {
      console.error('Update profile error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 font-outfit text-[#bdbdbd]">
      
      {/* Header */}
      <div>
        <h1 className="font-cinzel text-2xl sm:text-3xl font-bold text-white">
          Disciple Profile &amp; Enrollment Info
        </h1>
        <p className="text-xs sm:text-sm text-[#aaaaaa] mt-1">
          Review your enrolled batch, assigned guru, and keep contact details updated for examination circulars.
        </p>
      </div>

      {saved && (
        <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-800 text-xs text-emerald-300 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <span>Your disciple profile has been updated successfully!</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Avatar & Academy Credentials */}
        <div className="lg:col-span-4 bg-[#111111] rounded-3xl border border-[#333333] p-6 shadow-xl text-center space-y-4">
          <div className="relative inline-block mx-auto">
            {profilePhoto ? (
              <img
                src={profilePhoto}
                alt={name}
                className="w-32 h-32 rounded-full object-cover border-4 border-[#d4af37] shadow-[0_0_20px_rgba(212,175,55,0.25)] mx-auto"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#d4af37] to-[#b89025] text-[#111111] border-4 border-[#d4af37] shadow-[0_0_25px_rgba(212,175,55,0.35)] flex items-center justify-center font-cinzel font-bold text-4xl mx-auto">
                {name ? name[0].toUpperCase() : 'D'}
              </div>
            )}
            <span className="absolute bottom-1 right-1 p-1.5 rounded-full bg-[#111111] text-[#d4af37] border-2 border-[#d4af37] shadow">
              <MudraIcon name="nataraja" className="w-4 h-4 text-[#d4af37]" />
            </span>
          </div>

          <div>
            <h2 className="font-cinzel text-lg font-bold text-white">
              {name}
            </h2>
            <p className="text-xs text-[#888888] font-cormorant italic mt-0.5">
              Registered Disciple
            </p>
            <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-cinzel font-semibold bg-emerald-950/80 text-emerald-400 border border-emerald-800">
              Status: Active Disciple
            </span>
          </div>

          <div className="pt-4 border-t border-[#222222] text-left space-y-3 text-xs">
            <div>
              <span className="text-[#666666] block font-cinzel text-[10px] uppercase">Enrolled Batch</span>
              <span className="font-semibold text-white">{activeBatch.name}</span>
            </div>
            <div>
              <span className="text-[#666666] block font-cinzel text-[10px] uppercase">Principal Guru</span>
              <span className="font-semibold text-white">{activeBatch.instructor_name}</span>
            </div>
            <div>
              <span className="text-[#666666] block font-cinzel text-[10px] uppercase">Academy Location</span>
              <span className="font-semibold text-white">Thiruthangal near Sivakasi</span>
            </div>
            <div>
              <span className="text-[#666666] block font-cinzel text-[10px] uppercase">Affiliated University</span>
              <span className="font-semibold text-white">TN Music &amp; Fine Arts University</span>
            </div>
          </div>
        </div>

        {/* Right Column: Editable Profile Details */}
        <div className="lg:col-span-8 bg-[#111111] rounded-3xl border border-[#333333] p-8 shadow-xl">
          <h3 className="font-cinzel text-lg font-bold text-white mb-6 border-b border-[#222222] pb-3">
            Contact &amp; Account Details
          </h3>

          <form onSubmit={handleUpdate} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-[#aaaaaa] mb-1 font-cinzel">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-[#888888] absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#333333] text-xs sm:text-sm focus:outline-none focus:border-[#d4af37] bg-[#0f0f0f] text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#aaaaaa] mb-1 font-cinzel">
                  Email Address (Login ID)
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#666666] absolute left-3.5 top-3" />
                  <input
                    type="email"
                    value={user?.email || ''}
                    disabled
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#222222] text-xs sm:text-sm bg-[#161616] text-[#777777] cursor-not-allowed"
                  />
                </div>
                <span className="text-[10px] text-[#666666] mt-1 block">Email is locked to your account ID</span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#aaaaaa] mb-1 font-cinzel">
                  WhatsApp Contact Phone
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-[#888888] absolute left-3.5 top-3" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98421 23456"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#333333] text-xs sm:text-sm focus:outline-none focus:border-[#d4af37] bg-[#0f0f0f] text-white placeholder-[#555555]"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#aaaaaa] mb-1 font-cinzel">
                Profile Photo URL
              </label>
              <input
                type="url"
                value={profilePhoto}
                onChange={(e) => setProfilePhoto(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-4 py-2.5 rounded-xl border border-[#333333] text-xs sm:text-sm focus:outline-none focus:border-[#d4af37] bg-[#0f0f0f] text-white placeholder-[#555555]"
              />
            </div>

            <div className="pt-4 border-t border-[#222222] flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 rounded-xl bg-[#d4af37] text-[#111111] hover:bg-[#ffd700] text-xs font-cinzel font-bold shadow-md transition-all disabled:opacity-50"
              >
                {loading ? 'Saving Changes...' : 'Save Profile Changes'}
              </button>
            </div>
          </form>
        </div>

      </div>

    </div>
  );
}
