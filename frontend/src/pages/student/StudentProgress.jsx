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
    <div className="space-y-8 font-outfit">
      
      {/* Header */}
      <div>
        <h1 className="font-cinzel text-2xl sm:text-3xl font-bold text-temple-maroon">
          Sadhana Progress &amp; Certifications
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 mt-1">
          Detailed tracker of Adavus, Margam choreography, and Tamil Nadu Music &amp; Fine Arts University certifications.
        </p>
      </div>

      {/* University Accreditation Badge */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-temple-maroon via-temple-maroon-dark to-temple-maroon text-white border-2 border-temple-gold shadow-temple flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-temple-gold text-temple-maroon-deep flex items-center justify-center font-cinzel font-bold text-lg shadow-gold-glow flex-shrink-0">
            A+
          </div>
          <div>
            <span className="font-cinzel text-xs text-temple-gold uppercase tracking-wider block">
              Latest Examination Grade
            </span>
            <h3 className="font-cinzel font-bold text-lg text-white">
              University Grade 1 Certification (Distinction)
            </h3>
            <p className="text-xs text-amber-200/80 font-cormorant italic">
              Conducted by Tamil Nadu Music and Fine Arts University • Score: 94/100
            </p>
          </div>
        </div>

        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-900/60 border border-emerald-400 text-emerald-300 text-xs font-semibold self-start sm:self-auto">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>Accredited</span>
        </span>
      </div>

      {/* Section 1: Adavus Tracker */}
      <div className="bg-white rounded-3xl border-2 border-temple-gold/40 shadow-temple p-6 sm:p-8">
        <h2 className="font-cinzel font-bold text-lg text-temple-maroon mb-6 flex items-center gap-2">
          <MudraIcon name="pataka" className="w-5 h-5 text-temple-gold" />
          Adavu Mastery Matrix
        </h2>

        <div className="space-y-4">
          {adavuCategories.map((adavu, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-temple-cream/50 border border-amber-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-cinzel font-bold text-sm text-stone-800">
                    {adavu.category}
                  </h3>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-cinzel font-semibold ${
                    adavu.status === 'Mastered'
                      ? 'bg-emerald-100 text-emerald-800'
                      : adavu.status === 'In Progress'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-stone-100 text-stone-600'
                  }`}>
                    {adavu.status}
                  </span>
                </div>
                <p className="text-xs text-stone-500 mt-1">
                  Speed Status: <strong>{adavu.speed}</strong> • Variations: {adavu.completed} of {adavu.variations} cleared
                </p>

                {/* Progress bar */}
                <div className="w-full sm:max-w-xs h-2 rounded-full bg-stone-200 overflow-hidden mt-2">
                  <div
                    className="h-full bg-temple-maroon rounded-full"
                    style={{ width: `${(adavu.completed / adavu.variations) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="text-right">
                <span className="font-cinzel font-bold text-xs text-temple-maroon">
                  {Math.round((adavu.completed / adavu.variations) * 100)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 2: Margam Repertoire */}
      <div className="bg-white rounded-3xl border-2 border-temple-gold/40 shadow-temple p-6 sm:p-8">
        <h2 className="font-cinzel font-bold text-lg text-temple-maroon mb-6 flex items-center gap-2">
          <MudraIcon name="nataraja" className="w-5 h-5 text-temple-gold" />
          Margam Classical Repertoire
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {margamRepertoire.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-white border border-amber-200/80 shadow-xs flex items-center justify-between gap-3"
            >
              <div>
                <h3 className="font-cinzel font-bold text-sm text-stone-800">
                  {item.item}
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">Duration: {item.duration}</p>
                <span className="text-[11px] font-semibold text-temple-maroon block mt-1">
                  Status: {item.status}
                </span>
              </div>

              {item.certified ? (
                <div className="p-2 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200" title="Stage Certified">
                  <CheckCircle className="w-5 h-5" />
                </div>
              ) : (
                <div className="p-2 rounded-full bg-stone-50 text-stone-400 border border-stone-200" title="Learning Stage">
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
