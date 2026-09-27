import React from 'react';
import { Award, BookOpen, Heart, Sparkles, CheckCircle, ShieldCheck } from 'lucide-react';
import TempleBorder from '../../components/common/TempleBorder';
import KolamDivider from '../../components/common/KolamDivider';
import MudraIcon from '../../components/common/MudraIcon';

export default function AboutPage() {
  return (
    <div className="about-page bg-[#0f0f0f] text-[#bdbdbd] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Page Banner with BG1.png */}
        <div className="relative rounded-2xl bg-[#111111] text-white p-8 sm:p-12 mb-12 border border-[#333333] shadow-2xl overflow-hidden text-center">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-luminosity pointer-events-none"
            style={{ backgroundImage: `url('/BG1.png')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/90 via-[#111111]/80 to-[#080808]/90 pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0a0a0a] border border-[#333333] text-[#d4af37] text-xs font-cinzel uppercase tracking-[3px]">
              <img src="/logo.png" alt="Sri Ruthralaya" className="w-4 h-4 object-contain" />
              <span>Guru &amp; Academy Heritage • 18+ Years</span>
            </div>
            <h1 className="font-cinzel text-3xl sm:text-5xl font-bold text-white">
              Sri Ruthraalayaa <span className="text-[#d4af37]">Dance Academy</span>
            </h1>
            <p className="font-cormorant italic text-lg sm:text-xl text-[#bbbbbb] leading-relaxed">
              Preserving the sacred Guru-Shishya tradition of Bharatanatyam in Thiruthangal near Sivakasi
            </p>
          </div>
        </div>

        <TempleBorder />

        {/* Guru Profile Section */}
        <div className="my-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full max-w-sm rounded-3xl p-8 bg-gradient-to-b from-[#181818] via-[#121212] to-[#0c0c0c] border-2 border-[#d4af37] shadow-[0_0_35px_rgba(212,175,55,0.25)] relative overflow-hidden text-center">
              {/* Decorative corner accents */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#d4af37]/60"></div>
              <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#d4af37]/60"></div>
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#d4af37]/60"></div>
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#d4af37]/60"></div>

              {/* Glowing Aura & Academy Seal */}
              <div className="relative mx-auto w-28 h-28 flex items-center justify-center mb-6">
                <div className="absolute inset-0 rounded-full bg-[#d4af37]/15 blur-xl"></div>
                <div className="w-24 h-24 rounded-full border-2 border-[#d4af37] p-3 bg-[#0a0a0a] shadow-inner flex items-center justify-center">
                  <img
                    src="/logo.png"
                    alt="Sri Ruthraalayaa Academy Seal"
                    className="w-full h-full object-contain filter drop-shadow-[0_0_12px_rgba(212,175,55,0.4)]"
                  />
                </div>
              </div>

              {/* Guru Crest Info */}
              <span className="text-[10px] uppercase font-cinzel tracking-[3px] text-[#d4af37] block font-semibold mb-1">
                Founder &amp; Artistic Director
              </span>
              <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-white tracking-wide">
                Guru V. Suriya Sathian
              </h2>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/40 text-[#d4af37] text-xs font-semibold mt-3">
                <Award className="w-3.5 h-3.5" />
                <span>Title of "Nattiyakalaimani"</span>
              </div>

              <div className="mt-5 pt-5 border-t border-[#333333] space-y-1.5">
                <p className="text-xs text-[#cccccc] font-outfit font-medium">
                  Diploma in Dance • Pursuing BFA in Dance
                </p>
                <p className="text-[11px] text-[#888888] font-cormorant italic">
                  18+ Years of Guru-Shishya Sadhana • Thiruthangal &amp; Sivakasi
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6 text-[#bbbbbb] font-outfit">
            <div className="p-6 rounded-2xl bg-[#111111] border border-[#333333] shadow-lg">
              <h3 className="font-cinzel text-xl font-bold text-white mb-2 flex items-center gap-2">
                <MudraIcon name="nataraja" className="w-5 h-5 text-[#d4af37]" />
                <span>Guru's Journey &amp; Legacy</span>
              </h3>
              <p className="text-sm sm:text-base leading-relaxed text-[#bbbbbb]">
                For the past <strong className="text-white">18 years</strong>, Guru <strong className="text-white">Nattiyakalaimani V. Suriya Sathian</strong> has been nurturing Sri Ruthraalaya Dance Academy in <strong className="text-white">Thiruthangal near Sivakasi</strong>, teaching more than 100+ students from early childhood to professional Arangetram solo debuts.
              </p>
              <p className="text-sm sm:text-base leading-relaxed text-[#bbbbbb] mt-3">
                Holding a prestigious <strong className="text-white">Diploma in Dance</strong>, the revered title of <strong className="text-white">Nattiyakalaimani</strong>, and currently completing his <strong className="text-white">BFA in Dance</strong>, he brings deep theoretical and practical mastery of the Natyashastra and Abhinaya Darpana to every disciple.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-cinzel text-base font-bold text-[#d4af37]">
                Key Accreditations &amp; Milestones:
              </h4>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-[#111111] border border-[#333333]">
                <CheckCircle className="w-5 h-5 text-[#d4af37] flex-shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-cinzel text-xs font-bold text-white">Tamil Nadu Music and Fine Arts University Affiliation</h5>
                  <p className="text-xs text-[#aaaaaa] mt-0.5">Disciples are trained and sent for official university grade examinations (Grades 1 through 7) with a consistent 100% distinction record.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-[#111111] border border-[#333333]">
                <CheckCircle className="w-5 h-5 text-[#d4af37] flex-shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-cinzel text-xs font-bold text-white">Over 30+ Solo Arangetrams Conducted</h5>
                  <p className="text-xs text-[#aaaaaa] mt-0.5">Comprehensive guidance covering complete Margams, Nattuvangam coordination, live orchestra direction, and traditional aharya costuming.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-[#111111] border border-[#333333]">
                <CheckCircle className="w-5 h-5 text-[#d4af37] flex-shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-cinzel text-xs font-bold text-white">Sacred Salangai Pooja Dedications</h5>
                  <p className="text-xs text-[#aaaaaa] mt-0.5">The sacred blessing ceremony dedicating rhythm anklets, marking a student's transition into advanced Margam repertoire.</p>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Academy Philosophy Section */}
        <div className="my-20">
          <KolamDivider
            title="The Three Pillars of Our Pedagogy"
            subtitle="Preserving classical integrity while inspiring contemporary youth"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">

            <div className="p-8 rounded-2xl bg-[#111111] border border-[#333333] shadow-lg text-center hover:border-[#d4af37] transition-colors">
              <div className="w-14 h-14 rounded-full bg-[#0a0a0a] border border-[#333333] text-[#d4af37] flex items-center justify-center mx-auto mb-4 shadow-md">
                <MudraIcon name="pataka" className="w-7 h-7 text-[#d4af37]" />
              </div>
              <h3 className="font-cinzel font-bold text-lg text-white mb-2">
                Anga Shuddhi (Postural Purity)
              </h3>
              <p className="text-xs sm:text-sm text-[#aaaaaa] leading-relaxed font-outfit">
                Intensive dedication to the geometric lines of Aramandi, Muzhumandi, clear footwork (Pada Bheda), and firm spinal alignment as codified in ancient scriptures.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#111111] border border-[#333333] shadow-lg text-center hover:border-[#d4af37] transition-colors">
              <div className="w-14 h-14 rounded-full bg-[#0a0a0a] border border-[#333333] text-[#d4af37] flex items-center justify-center mx-auto mb-4 shadow-md">
                <BookOpen className="w-7 h-7 text-[#d4af37]" />
              </div>
              <h3 className="font-cinzel font-bold text-lg text-white mb-2">
                Tala Jnana (Rhythmic Mastery)
              </h3>
              <p className="text-xs sm:text-sm text-[#aaaaaa] leading-relaxed font-outfit">
                Mastery of Nattuvangam, Solkattu (rhythmic syllables), Jathis, and intricate Carnatic Tala cycles (Adi, Rupaka, Mishra Chapu, Khanda Chapu).
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#111111] border border-[#333333] shadow-lg text-center hover:border-[#d4af37] transition-colors">
              <div className="w-14 h-14 rounded-full bg-[#0a0a0a] border border-[#333333] text-[#d4af37] flex items-center justify-center mx-auto mb-4 shadow-md">
                <Heart className="w-7 h-7 text-[#d4af37]" />
              </div>
              <h3 className="font-cinzel font-bold text-lg text-white mb-2">
                Bhava &amp; Rasa (Devotional Expression)
              </h3>
              <p className="text-xs sm:text-sm text-[#aaaaaa] leading-relaxed font-outfit">
                Awakening the Navarasas through subtle eye glances (Drishti Bheda) and emotional connection to the divine lyrics of Purandara Dasa, Thyagaraja, and Papanasam Sivan.
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
