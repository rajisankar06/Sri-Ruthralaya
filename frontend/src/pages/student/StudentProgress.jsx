import React from 'react';
import { Award, CheckCircle, Clock, BookOpen, Star, Sparkles } from 'lucide-react';
import MudraIcon from '../../components/common/MudraIcon';

export default function StudentProgress() {
  const adavuCategories = [
    {
      category: 'Tatta Adavu (Stamping Series)',
      status: 'Mastered',
      speed: '3 Speeds Mastered',
      variations: 8,
      completed: 8,
    },
    {
      category: 'Natta Adavu (Heel & Toe Series)',
      status: 'Mastered',
      speed: '3 Speeds Mastered',
      variations: 8,
      completed: 8,
    },
    {
      category: 'Kuditta Metta Adavu (Jumping on Toes)',
      status: 'Mastered',
      speed: '3 Speeds Mastered',
      variations: 4,
      completed: 4,
    },
    {
      category: 'Teermanam Adavu (Rhythmic Flourishes)',
      status: 'In Progress',
      speed: '2 Speeds Mastered',
      variations: 4,
      completed: 3,
    },
    {
      category: 'Mandi & Sarikkal Adavu (Floor Sitting & Sliding)',
      status: 'Upcoming',
      speed: 'Initial Learning',
      variations: 6,
      completed: 2,
    },
  ];

  const margamRepertoire = [
    { item: 'Pushpanjali (Ragam Nattai)', status: 'Mastered', duration: '4 mins', certified: true },
    { item: 'Alarippu (Tisra Eka Talam)', status: 'Mastered', duration: '5 mins', certified: true },
    { item: 'Jatiswaram (Ragam Kalyani)', status: 'In Progress (90%)', duration: '8 mins', certified: false },
    { item: 'Shabdam (Sarasijakshulu)', status: 'In Progress (60%)', duration: '7 mins', certified: false },
    { item: 'Varnam (Centerpiece Repertoire)', status: 'Upcoming Level', duration: '35 mins', certified: false },
    { item: 'Thillana (Ragam Hindolam)', status: 'Upcoming Level', duration: '6 mins', certified: false },
  ];

  return (
    <div className="space-y-8 font-outfit text-[#bdbdbd]">
      
      {/* Header */}
      <div>
        <h1 className="font-cinzel text-2xl sm:text-3xl font-bold text-white">
          Sadhana Progress &amp; Certifications
        </h1>
        <p className="text-xs sm:text-sm text-[#aaaaaa] mt-1">
          Detailed tracker of Adavus, Margam choreography, and Tamil Nadu Music &amp; Fine Arts University certifications.
        </p>
      </div>

      {/* University Accreditation Badge */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-[#181818] via-[#121212] to-[#0a0a0a] text-white border-2 border-[#d4af37] shadow-[0_0_25px_rgba(212,175,55,0.2)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#d4af37] text-[#111111] flex items-center justify-center font-cinzel font-bold text-lg shadow-[0_0_15px_rgba(212,175,55,0.4)] flex-shrink-0">
            A+
          </div>
          <div>
            <span className="font-cinzel text-xs text-[#d4af37] uppercase tracking-wider block">
              Latest Examination Grade
            </span>
            <h3 className="font-cinzel font-bold text-lg text-white">
              University Grade 1 Certification (Distinction)
            </h3>
            <p className="text-xs text-[#ffd700]/90 font-cormorant italic">
              Conducted by Tamil Nadu Music and Fine Arts University • Score: 94/100
            </p>
          </div>
        </div>

        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-700 text-emerald-300 text-xs font-semibold self-start sm:self-auto">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>Accredited</span>
        </span>
      </div>

      {/* Section 1: Adavus Tracker */}
      <div className="bg-[#111111] rounded-3xl border border-[#333333] shadow-xl p-6 sm:p-8">
        <h2 className="font-cinzel font-bold text-lg text-white mb-6 flex items-center gap-2">
          <MudraIcon name="pataka" className="w-5 h-5 text-[#d4af37]" />
          Adavu Mastery Matrix
        </h2>

        <div className="space-y-4">
          {adavuCategories.map((adavu, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-[#161616] border border-[#262626] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-cinzel font-bold text-sm text-white">
                    {adavu.category}
                  </h3>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-cinzel font-semibold ${
                    adavu.status === 'Mastered'
                      ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800'
                      : adavu.status === 'In Progress'
                      ? 'bg-amber-950/80 text-amber-400 border border-amber-800'
                      : 'bg-[#222222] text-[#888888] border border-[#333333]'
                  }`}>
                    {adavu.status}
                  </span>
                </div>
                <p className="text-xs text-[#aaaaaa] mt-1">
                  Speed Status: <strong className="text-white">{adavu.speed}</strong> • Variations: {adavu.completed} of {adavu.variations} cleared
                </p>

                {/* Progress bar */}
                <div className="w-full sm:max-w-xs h-2 rounded-full bg-[#222222] overflow-hidden border border-[#333333] mt-2">
                  <div
                    className="h-full bg-gradient-to-r from-[#b89025] to-[#ffd700] rounded-full"
                    style={{ width: `${(adavu.completed / adavu.variations) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="text-right">
                <span className="font-cinzel font-bold text-xs text-[#d4af37]">
                  {Math.round((adavu.completed / adavu.variations) * 100)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 2: Margam Repertoire */}
      <div className="bg-[#111111] rounded-3xl border border-[#333333] shadow-xl p-6 sm:p-8">
        <h2 className="font-cinzel font-bold text-lg text-white mb-6 flex items-center gap-2">
          <MudraIcon name="nataraja" className="w-5 h-5 text-[#d4af37]" />
          Margam Classical Repertoire
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {margamRepertoire.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-[#161616] border border-[#262626] hover:border-[#d4af37]/40 shadow-sm flex items-center justify-between gap-3 transition-colors"
            >
              <div>
                <h3 className="font-cinzel font-bold text-sm text-white">
                  {item.item}
                </h3>
                <p className="text-xs text-[#888888] mt-0.5">Duration: {item.duration}</p>
                <span className="text-[11px] font-semibold text-[#d4af37] block mt-1">
                  Status: {item.status}
                </span>
              </div>

              {item.certified ? (
                <div className="p-2 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-800" title="Stage Certified">
                  <CheckCircle className="w-5 h-5" />
                </div>
              ) : (
                <div className="p-2 rounded-full bg-[#222222] text-[#666666] border border-[#333333]" title="Learning Stage">
                  <Clock className="w-5 h-5" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
