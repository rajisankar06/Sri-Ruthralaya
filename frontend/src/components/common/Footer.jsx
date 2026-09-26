import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Award, Shield } from 'lucide-react';
import MudraIcon from './MudraIcon';

export default function Footer() {
  return (
    <footer className="footer bg-[#080808] text-[#bbbbbb] border-t border-[#333333] relative overflow-hidden">
      {/* Decorative Kolam Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-kolam-pattern"></div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10 relative z-10">
        <div className="footer-content grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Col 1: Academy & Guru */}
          <div className="footer-brand">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full border border-[#d4af37] bg-[#111111] flex items-center justify-center p-1 shadow-[0_0_15px_rgba(212,175,55,0.2)] overflow-hidden">
                <img src="/logo.png" alt="Sri Ruthraalayaa Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <h3 className="font-cinzel font-bold text-lg text-[#d4af37]">
                  Sri Ruthraalayaa
                </h3>
                <p className="text-xs text-[#999999] font-cormorant tracking-widest uppercase">
                  Bharathanatyam Academy
                </p>
              </div>
            </div>
            
            <p className="text-xs text-[#999999] leading-relaxed font-outfit mb-3">
              Founded and directed by <strong className="text-white">Guru Nattiyakalaimani R. Sridevi</strong> (Diploma in Dance, Title of Nattiyakalaimani, BFA Dance). Over 18 years dedicated to preserving the pristine Pandanallur and Vazhuvoor traditions in Thiruthangal and Sivakasi.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#111111] border border-[#333333] text-xs text-[#d4af37]">
              <Award className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Affiliated to TN Music &amp; Fine Arts Univ</span>
            </div>
          </div>

          {/* Col 2: Programs & Margam */}
          <div className="footer-links-col">
            <h4 className="font-cinzel text-sm font-semibold text-[#d4af37] uppercase tracking-wider mb-4 border-b border-[#333333] pb-2">
              Programs &amp; Levels
            </h4>
            <ul className="footer-links space-y-2 text-xs font-outfit">
              <li>
                <Link to="/courses" className="text-[#bbbbbb] hover:text-[#d4af37] transition-colors flex items-center gap-2">
                  <span className="text-[#d4af37]">›</span> Bala Natya (Beginner Adavus &amp; Mudras)
                </Link>
              </li>
              <li>
                <Link to="/courses" className="text-[#bbbbbb] hover:text-[#d4af37] transition-colors flex items-center gap-2">
                  <span className="text-[#d4af37]">›</span> Madhyama (Intermediate Jatiswaram &amp; Shabdam)
                </Link>
              </li>
              <li>
                <Link to="/courses" className="text-[#bbbbbb] hover:text-[#d4af37] transition-colors flex items-center gap-2">
                  <span className="text-[#d4af37]">›</span> Visharada (Advanced Varnam &amp; Padams)
                </Link>
              </li>
              <li>
                <Link to="/courses" className="text-[#bbbbbb] hover:text-[#d4af37] transition-colors flex items-center gap-2">
                  <span className="text-[#d4af37]">›</span> Arangetram Intensive Debut Preparation
                </Link>
              </li>
              <li>
                <Link to="/courses" className="text-[#bbbbbb] hover:text-[#d4af37] transition-colors flex items-center gap-2">
                  <span className="text-[#d4af37]">›</span> Salangai Pooja &amp; Nattuvangam Coaching
                </Link>
              </li>
              <li>
                <Link to="/courses" className="text-[#bbbbbb] hover:text-[#d4af37] transition-colors flex items-center gap-2">
                  <span className="text-[#d4af37]">›</span> University Grade Examination Prep
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Academy Hours & Schedule */}
          <div>
            <h4 className="font-cinzel text-sm font-semibold text-[#d4af37] uppercase tracking-wider mb-4 border-b border-[#333333] pb-2">
              Studio Timings
            </h4>
            <div className="space-y-3 text-xs font-outfit">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#d4af37] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-white">Monday – Friday</p>
                  <p className="text-[#999999]">04:30 PM – 07:30 PM (Evening Batches)</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#d4af37] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-white">Saturday – Sunday</p>
                  <p className="text-[#999999]">08:00 AM – 11:30 AM &amp; 04:00 PM – 07:00 PM</p>
                </div>
              </div>
              <div className="mt-3 p-2.5 rounded-md bg-[#111111] border border-[#222222] text-[11px] text-[#bdbdbd] font-cormorant italic">
                "Natyamevam Pavithram — Dance is prayer made visible through rhythm, posture, and devotion."
              </div>
            </div>
          </div>

          {/* Col 4: Contact & Location */}
          <div>
            <h4 className="font-cinzel text-sm font-semibold text-[#d4af37] uppercase tracking-wider mb-4 border-b border-[#333333] pb-2">
              Academy Premises
            </h4>
            <div className="space-y-2.5 text-xs font-outfit">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#d4af37] mt-0.5 flex-shrink-0" />
                <p className="text-[#bbbbbb] leading-relaxed">
                  Sri Ruthraalayaa Temple Dance Hall, Main Road,<br />
                  Thiruthangal near Sivakasi, Virudhunagar District,<br />
                  Tamil Nadu — 626130, India.
                </p>
              </div>

              <div className="flex items-center gap-2.5 pt-1">
                <Phone className="w-4 h-4 text-[#d4af37] flex-shrink-0" />
                <a href="tel:+919842123456" className="text-[#bbbbbb] hover:text-[#d4af37] transition-colors font-medium">
                  +91 98421 23456
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#d4af37] flex-shrink-0" />
                <a href="mailto:info@sriruthralaya.com" className="text-[#bbbbbb] hover:text-[#d4af37] transition-colors font-medium">
                  info@sriruthralaya.com
                </a>
              </div>

              <div className="pt-2">
                <Link
                  to="/admin/dashboard"
                  className="inline-flex items-center gap-1.5 text-[11px] text-[#777777] hover:text-[#d4af37] transition-colors"
                >
                  <Shield className="w-3 h-3" /> Staff &amp; Administrator Login
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom mt-12 pt-6 border-t border-[#222222] flex flex-col sm:flex-row items-center justify-between text-xs text-[#777777] font-outfit gap-3">
          <p>
            © {new Date().getFullYear()} Sri Ruthralaya Bharathanatyam Academy. All Rights Reserved.
          </p>
          <p className="font-cinzel text-[#d4af37] tracking-widest text-[11px]">
            ॥ नृत्यार्चना परमं तपः ॥
          </p>
          <p className="text-[#777777] text-[11px]">
            Classical Temple Tradition • Thiruthangal Sivakasi
          </p>
        </div>
      </div>
    </footer>
  );
}
