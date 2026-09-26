import React from 'react';
import { Award, BookOpen, Heart, Sparkles, CheckCircle, ShieldCheck } from 'lucide-react';
import TempleBorder from '../../components/common/TempleBorder';
import KolamDivider from '../../components/common/KolamDivider';
import MudraIcon from '../../components/common/MudraIcon';

export default function AboutPage() {
  return (
    <div className="bg-temple-cream min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Banner */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="font-cinzel text-xs font-semibold uppercase tracking-widest text-temple-gold px-3 py-1 rounded-full bg-temple-maroon/10 border border-temple-gold/40">
            Guru &amp; Academy Heritage
          </span>
          <h1 className="font-cinzel text-3xl sm:text-5xl font-bold text-temple-maroon mt-3">
            Sri Ruthraalayaa Dance Academy
          </h1>
          <p className="font-cormorant italic text-lg sm:text-xl text-stone-600 mt-2">
            18 Years of Dedication to Bharatanatyam in Thiruthangal near Sivakasi
          </p>
        </div>

        <TempleBorder />

        {/* Guru Profile Section */}
        <div className="my-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative">
              <div className="w-80 h-96 rounded-2xl overflow-hidden border-4 border-temple-gold shadow-temple-lg bg-temple-maroon">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=700&q=80"
                  alt="Guru Nattiyakalaimani R. Sridevi"
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* Title Crest */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-11/12 p-4 rounded-xl bg-temple-maroon text-white border-2 border-temple-gold shadow-xl text-center">
                <h2 className="font-cinzel text-sm sm:text-base font-bold text-temple-gold tracking-wide">
                  Guru R. Sridevi
                </h2>
                <p className="text-[11px] text-amber-200/90 font-cormorant italic mt-0.5">
                  Founder &amp; Artistic Director
                </p>
              </div>
            </div>

            <div className="mt-12 text-center space-y-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-temple-maroon">
                <Award className="w-4 h-4 text-temple-gold" />
                <span>Title of "Nattiyakalaimani"</span>
              </div>
              <p className="text-xs text-stone-500 font-outfit">
                Diploma in Dance • BFA in Classical Dance
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6 text-stone-700 font-outfit">
            <div className="p-6 rounded-2xl bg-white border border-temple-gold/40 shadow-temple">
              <h3 className="font-cinzel text-xl font-bold text-temple-maroon mb-2 flex items-center gap-2">
                <MudraIcon name="nataraja" className="w-5 h-5 text-temple-gold" />
                Guru's Journey &amp; Legacy
              </h3>
              <p className="text-sm sm:text-base leading-relaxed text-stone-600">
                For the past <strong>18 years</strong>, Guru <strong>Nattiyakalaimani R. Sridevi</strong> has been nurturing Sri Ruthraalaya Dance Academy in <strong>Thiruthangal near Sivakasi</strong>, teaching more than 100+ students from early childhood to professional Arangetram solo debuts.
              </p>
              <p className="text-sm sm:text-base leading-relaxed text-stone-600 mt-3">
                Holding a prestigious <strong>Diploma in Dance</strong>, the revered title of <strong>Nattiyakalaimani</strong>, and having completed her <strong>BFA in Dance</strong>, she brings deep theoretical and practical mastery of the Natyashastra and Abhinaya Darpana to every disciple.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-cinzel text-base font-bold text-temple-maroon">
                Key Accreditations &amp; Milestones:
              </h4>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-amber-200">
                <CheckCircle className="w-5 h-5 text-temple-maroon flex-shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-cinzel text-xs font-bold text-stone-800">Tamil Nadu Music and Fine Arts University Affiliation</h5>
                  <p className="text-xs text-stone-600">Disciples are trained and sent for official university grade examinations (Grades 1 through 7) with a consistent 100% distinction record.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-amber-200">
                <CheckCircle className="w-5 h-5 text-temple-maroon flex-shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-cinzel text-xs font-bold text-stone-800">Over 30+ Solo Arangetrams Conducted</h5>
                  <p className="text-xs text-stone-600">Comprehensive guidance covering complete Margams, Nattuvangam coordination, live orchestra direction, and traditional aharya costuming.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-amber-200">
                <CheckCircle className="w-5 h-5 text-temple-maroon flex-shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-cinzel text-xs font-bold text-stone-800">Sacred Salangai Pooja Dedications</h5>
                  <p className="text-xs text-stone-600">The sacred blessing ceremony dedicating rhythm anklets, marking a student's transition into advanced Margam repertoire.</p>
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
            
            <div className="p-8 rounded-2xl bg-white border-2 border-temple-gold/40 shadow-temple text-center">
              <div className="w-14 h-14 rounded-full bg-temple-maroon text-temple-gold flex items-center justify-center mx-auto mb-4 shadow-md">
                <MudraIcon name="pataka" className="w-7 h-7 text-temple-gold" />
              </div>
              <h3 className="font-cinzel font-bold text-lg text-temple-maroon mb-2">
                Anga Shuddhi (Postural Purity)
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-outfit">
                Intensive dedication to the geometric lines of Aramandi, Muzhumandi, clear footwork (Pada Bheda), and firm spinal alignment as codified in ancient scriptures.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border-2 border-temple-gold/40 shadow-temple text-center">
              <div className="w-14 h-14 rounded-full bg-temple-maroon text-temple-gold flex items-center justify-center mx-auto mb-4 shadow-md">
                <BookOpen className="w-7 h-7 text-temple-gold" />
              </div>
              <h3 className="font-cinzel font-bold text-lg text-temple-maroon mb-2">
                Tala Jnana (Rhythmic Mastery)
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-outfit">
                Mastery of Nattuvangam, Solkattu (rhythmic syllables), Jathis, and intricate Carnatic Tala cycles (Adi, Rupaka, Mishra Chapu, Khanda Chapu).
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border-2 border-temple-gold/40 shadow-temple text-center">
              <div className="w-14 h-14 rounded-full bg-temple-maroon text-temple-gold flex items-center justify-center mx-auto mb-4 shadow-md">
                <Heart className="w-7 h-7 text-temple-gold" />
              </div>
              <h3 className="font-cinzel font-bold text-lg text-temple-maroon mb-2">
                Bhava &amp; Rasa (Devotional Expression)
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-outfit">
                Awakening the Navarasas through subtle eye glances (Drishti Bheda) and emotional connection to the divine lyrics of Purandara Dasa, Thyagaraja, and Papanasam Sivan.
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
