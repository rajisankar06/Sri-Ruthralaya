import React from 'react';
import { BookOpen, FileText, Music, Video, Download, ExternalLink } from 'lucide-react';
import MudraIcon from '../../components/common/MudraIcon';

export default function StudentMaterials() {
  const materials = [
    {
      title: 'Asamyuta & Samyuta Hastas Illustrated Chart',
      type: 'PDF Document',
      size: '2.4 MB',
      description: 'Complete 28 single hand & 24 double hand classical mudras with Sanskrit shlokas from Abhinaya Darpana.',
      icon: FileText,
      link: '#',
    },
    {
      title: 'Tatta & Natta Adavu Solkattu Audio Drills',
      type: 'Audio Guide (MP3)',
      size: '8.1 MB',
      description: 'High-clarity nattuvangam practice beats in 1st, 2nd, and 3rd speeds recorded by Guru Sridevi.',
      icon: Music,
      link: '#',
    },
    {
      title: 'Tamil Nadu Music & Fine Arts University Grade 1 & 2 Syllabus',
      type: 'Official Syllabus PDF',
      size: '1.2 MB',
      description: 'Prescribed practical items, viva questions, and theoretical terms required for university grade examination.',
      icon: BookOpen,
      link: '#',
    },
    {
      title: 'Aramandi Posture Stability & Warm-up Video',
      type: 'Video Masterclass',
      size: '18 mins stream',
      description: 'Step-by-step guidance on keeping knees aligned over toes, maintaining spinal erectness, and hand positioning.',
      icon: Video,
      link: '#',
    },
    {
      title: 'Jatiswaram Kalyani Audio Accompaniment Track',
      type: 'Carnatic Accompaniment (MP3)',
      size: '14.5 MB',
      description: 'Studio recorded Carnatic orchestra: Vocal, Mridangam, and Violin for at-home Margam practice.',
      icon: Music,
      link: '#',
    },
  ];

  return (
    <div className="space-y-8 font-outfit">
      
      {/* Header */}
      <div>
        <h1 className="font-cinzel text-2xl sm:text-3xl font-bold text-temple-maroon">
          Study Materials &amp; Practice Media
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 mt-1">
          Authorized curriculum guides, solkattu audio tracks, and theory papers uploaded by Guru Sridevi.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {materials.map((m, idx) => {
          const Icon = m.icon;
          return (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white border-2 border-temple-gold/40 shadow-temple flex flex-col justify-between hover:shadow-temple-lg transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 rounded-full text-[10px] font-cinzel font-semibold bg-temple-maroon/10 text-temple-maroon border border-temple-gold/30">
                    {m.type}
                  </span>
                  <span className="text-[11px] text-stone-400">{m.size}</span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-3 rounded-2xl bg-amber-50 text-temple-maroon border border-temple-gold/30 mt-1 flex-shrink-0">
                    <Icon className="w-5 h-5 text-temple-maroon" />
                  </div>
                  <div>
                    <h3 className="font-cinzel font-bold text-sm sm:text-base text-temple-maroon">
                      {m.title}
                    </h3>
                    <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                      {m.description}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-end">
                <button
                  onClick={() => alert(`Downloading '${m.title}'... Authorized academy discipled resource.`)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-temple-maroon text-temple-gold hover:bg-temple-maroon-dark text-xs font-cinzel font-bold shadow transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Resource</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
