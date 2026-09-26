import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Award, Users, Calendar, ArrowRight, ShieldCheck, Heart, Star, BookOpen, Music } from 'lucide-react';
import api from '../../services/api';
import TempleBorder from '../../components/common/TempleBorder';
import KolamDivider from '../../components/common/KolamDivider';
import MudraIcon from '../../components/common/MudraIcon';

export default function HomePage() {
  const [batches, setBatches] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function loadData() {
      try {
        const [batchRes, eventRes] = await Promise.all([
          api.get('/batches'),
          api.get('/events'),
        ]);
        if (batchRes.data.success) setBatches(batchRes.data.data.slice(0, 3));
        if (eventRes.data.success) setEvents(eventRes.data.data.slice(0, 2));
      } catch (e) {
        console.warn('Home page data load notice:', e.message);
      }
    }
    loadData();
  }, []);

  return (
    <div className="bg-temple-cream min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative bg-gradient-to-b from-temple-maroon via-temple-maroon-dark to-temple-maroon-deep text-white pt-16 pb-24 overflow-hidden border-b-4 border-temple-gold">
        {/* Kolam / Temple Background Motifs */}
        <div className="absolute inset-0 opacity-10 bg-kolam-pattern pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-temple-gold/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Hero Text */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-temple-gold/20 border border-temple-gold text-temple-gold-light text-xs font-cinzel tracking-widest uppercase shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-temple-gold" />
                <span>18+ Years of Sacred Dance Pedagogy</span>
              </div>

              <h1 className="font-cinzel text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
                Embrace the Divine Art of{' '}
                <span className="text-gold-gradient block mt-1">
                  Bharathanatyam
                </span>
              </h1>

              <p className="font-cormorant italic text-lg sm:text-2xl text-amber-100/90 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                "Where the hand goes, the eyes follow; where the eyes go, the mind goes; where the mind goes, expression arises; and where expression arises, aesthetic bliss is born."
              </p>
              <p className="text-xs text-amber-200/60 font-cinzel tracking-widest uppercase">
                — Abhinaya Darpana (Nandikesvara)
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  to="/register"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-lg bg-gradient-to-r from-temple-gold to-amber-500 text-temple-maroon-deep font-cinzel font-bold text-sm hover:brightness-110 shadow-gold-glow flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
                >
                  <MudraIcon name="nataraja" className="w-5 h-5 text-temple-maroon" />
                  Begin Your Sadhana (Join Now)
                </Link>

                <Link
                  to="/courses"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-lg bg-temple-maroon-dark/80 border border-temple-gold text-temple-gold-light hover:bg-temple-gold hover:text-temple-maroon font-cinzel text-sm font-semibold transition-all flex items-center justify-center gap-2"
                >
                  <span>Explore Batches</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Guru Accreditation Badge */}
              <div className="pt-6 border-t border-temple-gold/20 flex items-center justify-center lg:justify-start gap-3 text-xs text-amber-200/80 font-outfit">
                <Award className="w-5 h-5 text-temple-gold flex-shrink-0" />
                <span>
                  Under the Guidance of <strong>Guru Nattiyakalaimani R. Sridevi</strong> (Diploma in Dance, BFA Dance)
                </span>
              </div>
            </div>

            {/* Right Column: Hero Visual Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md">
                {/* Decorative Temple Border Frame */}
                <div className="absolute -inset-3 rounded-2xl border-2 border-temple-gold/50 rotate-1 pointer-events-none"></div>
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-temple-gold bg-temple-maroon">
                  <img
                    src="https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80"
                    alt="Bharatanatyam dancer performing in classical costume"
                    className="w-full h-[430px] object-cover object-top hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-temple-maroon-deep via-transparent to-black/20 pointer-events-none"></div>

                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-temple-maroon-dark/90 border border-temple-gold/40 backdrop-blur-sm text-left">
                    <div className="flex items-center justify-between">
                      <span className="font-cinzel text-xs font-bold text-temple-gold uppercase tracking-wider">
                        Sri Ruthraalayaa
                      </span>
                      <span className="text-[10px] text-amber-200/70 font-outfit">
                        Thiruthangal near Sivakasi
                      </span>
                    </div>
                    <p className="mt-1 font-cormorant text-sm italic text-amber-100">
                      Adavus • Margam • Salangai Pooja • Arangetram Solo Debuts
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <TempleBorder />

      {/* 2. Key Metrics & Pillars */}
      <section className="py-12 bg-temple-cream-alt border-b border-amber-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            
            <div className="p-6 rounded-xl bg-white border border-temple-gold/40 shadow-temple">
              <div className="font-cinzel font-bold text-3xl sm:text-4xl text-temple-maroon">
                18+
              </div>
              <div className="text-xs sm:text-sm font-semibold text-stone-700 mt-1 uppercase font-cinzel tracking-wider">
                Years of Heritage
              </div>
              <p className="text-xs text-stone-500 mt-1">In Thiruthangal &amp; Sivakasi</p>
            </div>

            <div className="p-6 rounded-xl bg-white border border-temple-gold/40 shadow-temple">
              <div className="font-cinzel font-bold text-3xl sm:text-4xl text-temple-maroon">
                100+
              </div>
              <div className="text-xs sm:text-sm font-semibold text-stone-700 mt-1 uppercase font-cinzel tracking-wider">
                Active Learners
              </div>
              <p className="text-xs text-stone-500 mt-1">From Beginners to Arangetram</p>
            </div>

            <div className="p-6 rounded-xl bg-white border border-temple-gold/40 shadow-temple">
              <div className="font-cinzel font-bold text-3xl sm:text-4xl text-temple-maroon">
                100%
              </div>
              <div className="text-xs sm:text-sm font-semibold text-stone-700 mt-1 uppercase font-cinzel tracking-wider">
                Exam Pass Rate
              </div>
              <p className="text-xs text-stone-500 mt-1">TN Music &amp; Fine Arts Univ</p>
            </div>

            <div className="p-6 rounded-xl bg-white border border-temple-gold/40 shadow-temple">
              <div className="font-cinzel font-bold text-3xl sm:text-4xl text-temple-maroon">
                30+
              </div>
              <div className="text-xs sm:text-sm font-semibold text-stone-700 mt-1 uppercase font-cinzel tracking-wider">
                Solo Arangetrams
              </div>
              <p className="text-xs text-stone-500 mt-1">Grand Stage Debuts</p>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Guru & Academy Legacy Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <KolamDivider
          title="The Guru-Shishya Tradition"
          subtitle="Honoring the timeless temple traditions of Bharatanatyam with authenticity and discipline"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mt-12">
          
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative">
              <div className="w-72 h-88 sm:w-80 sm:h-96 rounded-2xl overflow-hidden border-4 border-temple-gold shadow-temple-lg bg-temple-maroon">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80"
                  alt="Guru Nattiyakalaimani R. Sridevi"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="absolute -bottom-5 -right-5 p-4 rounded-xl bg-temple-maroon text-white border-2 border-temple-gold shadow-lg text-center max-w-[200px]">
                <p className="font-cinzel text-xs font-bold text-temple-gold">
                  Guru R. Sridevi
                </p>
                <p className="text-[10px] text-amber-200/80 font-cormorant italic">
                  Diploma in Dance, Title of Nattiyakalaimani, BFA Dance
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-5 text-stone-700">
            <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-temple-maroon leading-snug">
              Nurturing Grace, Precision, and Devotion for over 18 Years
            </h3>

            <p className="font-outfit text-sm sm:text-base leading-relaxed">
              At <strong>Sri Ruthraalayaa Dance Academy</strong> in Thiruthangal near Sivakasi, dance is taught not merely as a performing art, but as a sacred yoga connecting body, rhythm, and devotion. Founded and directed by <strong>Guru Nattiyakalaimani R. Sridevi</strong>, the academy has trained over 100+ students and consistently prepared disciples for Tamil Nadu Music and Fine Arts University grade examinations.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-white border border-amber-200 shadow-sm flex items-start gap-3">
                <div className="p-2 rounded bg-temple-maroon/10 text-temple-maroon mt-1">
                  <MudraIcon name="pataka" className="w-5 h-5 text-temple-maroon" />
                </div>
                <div>
                  <h4 className="font-cinzel text-sm font-semibold text-temple-maroon">Authentic Adavus</h4>
                  <p className="text-xs text-stone-600 mt-1">Rigorous training in Aramandi posture, footwork, and Asamyuta/Samyuta Hastas.</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-amber-200 shadow-sm flex items-start gap-3">
                <div className="p-2 rounded bg-temple-maroon/10 text-temple-maroon mt-1">
                  <Music className="w-5 h-5 text-temple-maroon" />
                </div>
                <div>
                  <h4 className="font-cinzel text-sm font-semibold text-temple-maroon">Nattuvangam &amp; Thalam</h4>
                  <p className="text-xs text-stone-600 mt-1">Disciples master complex Carnatic rhythmic cycles (Talam) and cymbals coordination.</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-amber-200 shadow-sm flex items-start gap-3">
                <div className="p-2 rounded bg-temple-maroon/10 text-temple-maroon mt-1">
                  <Heart className="w-5 h-5 text-temple-maroon" />
                </div>
                <div>
                  <h4 className="font-cinzel text-sm font-semibold text-temple-maroon">Navarasa Abhinaya</h4>
                  <p className="text-xs text-stone-600 mt-1">Expressive storytelling bringing epics and bhakti poetry vividly to life.</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-amber-200 shadow-sm flex items-start gap-3">
                <div className="p-2 rounded bg-temple-maroon/10 text-temple-maroon mt-1">
                  <Award className="w-5 h-5 text-temple-maroon" />
                </div>
                <div>
                  <h4 className="font-cinzel text-sm font-semibold text-temple-maroon">Arangetram Guidance</h4>
                  <p className="text-xs text-stone-600 mt-1">Comprehensive solo debut preparation with full live Carnatic ensemble.</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-sm font-cinzel font-bold text-temple-maroon hover:text-amber-700 transition-colors"
              >
                <span>Read Guru Sridevi's Full Pedagogical Biography</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Featured Courses / Batches */}
      <section className="py-16 bg-temple-cream-alt border-y border-amber-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <KolamDivider
            title="Training Batches & Curriculum"
            subtitle="Carefully structured levels catering from age 5 beginners to professional stage artists"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            {batches.map((batch) => (
              <div
                key={batch.id}
                className="rounded-2xl bg-white border-2 border-temple-gold/40 overflow-hidden shadow-temple hover:shadow-temple-lg transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 rounded-full text-xs font-cinzel font-semibold bg-temple-maroon text-temple-gold">
                      {batch.level}
                    </span>
                    <span className="text-xs text-stone-500 font-outfit">
                      {batch.studentCount || 20}+ Enrolled
                    </span>
                  </div>

                  <h3 className="font-cinzel font-bold text-xl text-temple-maroon group-hover:text-amber-700 transition-colors">
                    {batch.name}
                  </h3>

                  <p className="text-xs text-stone-600 mt-2 font-outfit">
                    Instructor: <strong>{batch.instructor_name}</strong>
                  </p>

                  <div className="mt-4 pt-4 border-t border-stone-100 space-y-2 text-xs text-stone-600 font-outfit">
                    <div className="flex justify-between">
                      <span className="text-stone-400">Class Days:</span>
                      <span className="font-semibold text-stone-800">{batch.schedule_days}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-400">Class Timings:</span>
                      <span className="font-semibold text-stone-800">{batch.schedule_time}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-temple-cream/50 border-t border-amber-200/40 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-stone-500 block">Tuition Fee</span>
                    <span className="font-cinzel font-bold text-lg text-temple-maroon">
                      ₹{batch.fee_amount.toLocaleString('en-IN')}<span className="text-xs font-normal text-stone-500">/mo</span>
                    </span>
                  </div>

                  <Link
                    to="/register"
                    className="px-4 py-2 rounded-lg bg-temple-maroon text-temple-gold hover:bg-temple-maroon-dark text-xs font-cinzel font-semibold shadow transition-all"
                  >
                    Enroll Now
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg border border-temple-gold bg-white text-temple-maroon font-cinzel font-semibold text-xs hover:bg-temple-gold hover:text-white transition-all shadow-sm"
            >
              <span>View All 4 Levels &amp; Detailed University Syllabus</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Upcoming Events & Temple Notices */}
      {events.length > 0 && (
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <KolamDivider
            title="Academy Events & Stage Performances"
            subtitle="Experience the vibrant classical calendar of Sri Ruthraalayaa in Sivakasi and beyond"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
            {events.map((ev) => (
              <div
                key={ev.id}
                className="flex flex-col sm:flex-row bg-white rounded-2xl border border-temple-gold/40 overflow-hidden shadow-temple"
              >
                <div className="sm:w-2/5 h-48 sm:h-auto relative overflow-hidden bg-temple-maroon">
                  <img
                    src={ev.image_url || 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=600&q=80'}
                    alt={ev.title}
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-temple-maroon text-temple-gold text-xs font-cinzel font-bold">
                    {new Date(ev.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                  </div>
                </div>

                <div className="sm:w-3/5 p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="font-cinzel font-bold text-lg text-temple-maroon">
                      {ev.title}
                    </h3>
                    <p className="text-xs text-stone-600 mt-2 font-outfit line-clamp-3 leading-relaxed">
                      {ev.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500 font-outfit">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-temple-gold" />
                      {new Date(ev.date).toLocaleDateString('en-IN', { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 6. Testimonials Highlight */}
      <section className="py-16 bg-temple-maroon text-white border-t-2 border-temple-gold relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-kolam-pattern pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="font-cinzel text-2xl sm:text-4xl font-bold text-temple-gold-light">
              Voices of Disciples &amp; Connoisseurs
            </h2>
            <p className="font-cormorant italic text-base sm:text-lg text-amber-200/80 mt-1">
              Celebrating transformation through discipline, music, and divine art
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-temple-maroon-dark/90 border border-temple-gold/40 shadow-xl">
              <div className="flex text-temple-gold mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="font-cormorant italic text-sm text-amber-100/90 leading-relaxed">
                "Learning under Guru Sridevi for the past 6 years leading up to my Arangetram has shaped my posture, confidence, and soul. Her patience with every adavu is unmatched."
              </p>
              <div className="mt-4 pt-3 border-t border-temple-gold/20">
                <p className="font-cinzel text-xs font-bold text-temple-gold">Diya Soundararajan</p>
                <p className="text-[10px] text-amber-200/60">Arangetram Disciple, Sivakasi</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-temple-maroon-dark/90 border border-temple-gold/40 shadow-xl">
              <div className="flex text-temple-gold mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="font-cormorant italic text-sm text-amber-100/90 leading-relaxed">
                "My daughter joined Sri Ruthralaya at age 6. The transformation in her discipline and cultural pride has been immense. She cleared her University Grade 2 exam with distinction!"
              </p>
              <div className="mt-4 pt-3 border-t border-temple-gold/20">
                <p className="font-cinzel text-xs font-bold text-temple-gold">Dr. K. Ramachandran</p>
                <p className="text-[10px] text-amber-200/60">Parent, Thiruthangal</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-temple-maroon-dark/90 border border-temple-gold/40 shadow-xl">
              <div className="flex text-temple-gold mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="font-cormorant italic text-sm text-amber-100/90 leading-relaxed">
                "Sri Ruthraalayaa's Natyanjali performances bring the sacred temple tradition alive. Every varnam and thillana shows rigorous adherence to classical Nattuvangam."
              </p>
              <div className="mt-4 pt-3 border-t border-temple-gold/20">
                <p className="font-cinzel text-xs font-bold text-temple-gold">Smt. Vasumathi Rajan</p>
                <p className="text-[10px] text-amber-200/60">Carnatic Vocalist &amp; Art Patron</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Call To Action Banner */}
      <section className="py-16 bg-temple-cream relative">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-temple-maroon via-temple-maroon-dark to-temple-maroon text-white border-2 border-temple-gold shadow-temple-lg">
            <h2 className="font-cinzel text-2xl sm:text-4xl font-bold text-temple-gold-light">
              Begin Your Classical Dance Journey
            </h2>
            <p className="font-cormorant italic text-base sm:text-xl text-amber-100/90 mt-2 max-w-xl mx-auto">
              Admissions are now open for new batches. Join Guru Sridevi's lineage and awaken your inner Nataraja.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/register"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-temple-gold to-amber-500 text-temple-maroon-deep font-cinzel font-bold text-sm hover:brightness-110 shadow-gold-glow transition-all"
              >
                Apply for Admission Online
              </Link>
              <Link
                to="/contact"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-temple-gold text-amber-100 hover:bg-temple-gold hover:text-temple-maroon font-cinzel text-sm font-semibold transition-all"
              >
                Visit Academy Studio
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
