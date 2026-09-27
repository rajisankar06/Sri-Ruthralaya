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
    <div className="bg-[#0f0f0f] text-[#bdbdbd] min-h-screen">
      {/* 1. Hero Section */}
      <section className="hero relative bg-[#080808] text-white pt-16 pb-24 overflow-hidden border-b border-[#333333]">
        {/* Background Nataraja BG1.png & Deep Charcoal Gradients */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-25 mix-blend-luminosity scale-105 pointer-events-none transition-transform duration-1000"
          style={{ backgroundImage: `url('/BG1.png')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/95 via-[#0f0f0f]/85 to-[#080808]/95 pointer-events-none" />
        <div className="absolute inset-0 opacity-10 bg-kolam-pattern pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="hero-content max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left Column: Hero Text */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="hero-small-title inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#111111] border border-[#333333] text-[#d4af37] text-xs font-cinzel tracking-[3px] uppercase shadow-sm">
                <img src="/logo.png" alt="Sri Ruthralaya Academy Emblem" className="w-4 h-4 object-contain" />
                <span>18+ Years of Sacred Dance Pedagogy</span>
              </div>

              <h1 className="font-cinzel text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]">
                Embrace the Divine Art of{' '}
                <span className="text-[#d4af37] block mt-1 font-cinzel">
                  Bharathanatyam
                </span>
              </h1>

              <p className="hero-description font-cormorant italic text-lg sm:text-2xl text-[#eeeeee] leading-relaxed max-w-2xl mx-auto lg:mx-0">
                "Where the hand goes, the eyes follow; where the eyes go, the mind goes; where the mind goes, expression arises; and where expression arises, aesthetic bliss is born."
              </p>
              <p className="text-xs text-[#999999] font-cinzel tracking-widest uppercase">
                — Abhinaya Darpana (Nandikesvara)
              </p>

              <div className="hero-buttons pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  to="/register"
                  className="primary-btn w-full sm:w-auto font-outfit"
                >
                  <MudraIcon name="nataraja" className="w-5 h-5 text-[#111111]" />
                  <span>Begin Your Sadhana (Join Now)</span>
                </Link>

                <Link
                  to="/courses"
                  className="secondary-btn w-full sm:w-auto font-outfit"
                >
                  <span>Explore Batches</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Guru Accreditation Badge */}
              <div className="pt-6 border-t border-[#333333] flex items-center justify-center lg:justify-start gap-3 text-xs text-[#aaaaaa] font-outfit">
                <Award className="w-5 h-5 text-[#d4af37] flex-shrink-0" />
                <span>
                  Under the Guidance of <strong className="text-white">Guru Nattiyakalaimani V. Suriya Sathian</strong> (Diploma in Dance, Title of Nattiyakalaimani, pursuing BFA in Dance)
                </span>
              </div>
            </div>

            {/* Right Column: Hero Visual Card with BG.2.png */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md">
                {/* Decorative Gold Border Frame */}
                <div className="absolute -inset-3 rounded-2xl border border-[#d4af37]/40 rotate-1 pointer-events-none"></div>
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-[#d4af37] bg-[#111111]">
                  <img
                    src="/BG.2.png"
                    alt="Bharatanatyam Salangai Footwork & Sacred Temple Rhythm at Sri Ruthralaya"
                    className="w-full h-[430px] object-cover object-center hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-black/30 pointer-events-none"></div>

                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#0f0f0f]/90 border border-[#333333] backdrop-blur-sm text-left">
                    <div className="flex items-center justify-between">
                      <span className="font-cinzel text-xs font-bold text-[#d4af37] uppercase tracking-wider flex items-center gap-1.5">
                        <img src="/logo.png" alt="" className="w-4 h-4 object-contain inline" />
                        Sri Ruthraalayaa
                      </span>
                      <span className="text-[10px] text-[#aaaaaa] font-outfit">
                        Thiruthangal near Sivakasi
                      </span>
                    </div>
                    <p className="mt-1 font-cormorant text-sm italic text-[#bdbdbd]">
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
      <section className="py-12 bg-[#111111] border-b border-[#333333]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">

            <div className="p-6 rounded-xl bg-[#0f0f0f] border border-[#333333] shadow-md hover:border-[#d4af37]/50 transition-colors">
              <div className="font-cinzel font-bold text-3xl sm:text-4xl text-[#d4af37]">
                18+
              </div>
              <div className="text-xs sm:text-sm font-semibold text-white mt-1 uppercase font-cinzel tracking-wider">
                Years of Heritage
              </div>
              <p className="text-xs text-[#888888] mt-1">In Thiruthangal &amp; Sivakasi</p>
            </div>

            <div className="p-6 rounded-xl bg-[#0f0f0f] border border-[#333333] shadow-md hover:border-[#d4af37]/50 transition-colors">
              <div className="font-cinzel font-bold text-3xl sm:text-4xl text-[#d4af37]">
                100+
              </div>
              <div className="text-xs sm:text-sm font-semibold text-white mt-1 uppercase font-cinzel tracking-wider">
                Active Learners
              </div>
              <p className="text-xs text-[#888888] mt-1">From Beginners to Arangetram</p>
            </div>

            <div className="p-6 rounded-xl bg-[#0f0f0f] border border-[#333333] shadow-md hover:border-[#d4af37]/50 transition-colors">
              <div className="font-cinzel font-bold text-3xl sm:text-4xl text-[#d4af37]">
                100%
              </div>
              <div className="text-xs sm:text-sm font-semibold text-white mt-1 uppercase font-cinzel tracking-wider">
                Exam Pass Rate
              </div>
              <p className="text-xs text-[#888888] mt-1">TN Music &amp; Fine Arts Univ</p>
            </div>

            <div className="p-6 rounded-xl bg-[#0f0f0f] border border-[#333333] shadow-md hover:border-[#d4af37]/50 transition-colors">
              <div className="font-cinzel font-bold text-3xl sm:text-4xl text-[#d4af37]">
                30+
              </div>
              <div className="text-xs sm:text-sm font-semibold text-white mt-1 uppercase font-cinzel tracking-wider">
                Solo Arangetrams
              </div>
              <p className="text-xs text-[#888888] mt-1">Grand Stage Debuts</p>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Guru & Academy Legacy Section (About) */}
      <section className="about py-20 bg-[#0f0f0f]">
        <div className="about-content max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="section-title text-[#d4af37] text-xs sm:text-sm tracking-[3px] uppercase font-cinzel font-semibold block mb-2">
              The Guru-Shishya Tradition
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cinzel font-bold text-white leading-tight">
              Honoring the Sacred Heritage with <span className="text-[#d4af37]">Grace &amp; Precision</span>
            </h2>
            <p className="about-text text-[#bdbdbd] max-w-2xl mx-auto mt-4 text-base sm:text-lg leading-relaxed">
              At Sri Ruthraalayaa Dance Academy in Thiruthangal near Sivakasi, dance is taught not merely as a performing art, but as a sacred yoga connecting body, rhythm, and devotion.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mt-12">
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative">
                <div className="w-72 h-88 sm:w-80 sm:h-96 rounded-2xl overflow-hidden border-2 border-[#d4af37] shadow-[0_0_25px_rgba(212,175,55,0.25)] bg-[#111111]">
                  <img
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80"
                    alt="Guru Nattiyakalaimani V. Suriya Sathian"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div className="absolute -bottom-5 -right-5 p-4 rounded-xl bg-[#111111] text-white border border-[#d4af37] shadow-xl text-center max-w-[230px]">
                  <p className="font-cinzel text-xs font-bold text-[#d4af37]">
                    Guru V. Suriya Sathian
                  </p>
                  <p className="text-[10px] text-[#aaaaaa] font-cormorant italic mt-0.5 leading-tight">
                    Diploma in Dance, Title of Nattiyakalaimani and now doing BFA in Dance
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-white leading-snug">
                Nurturing Grace, Precision, and Devotion for over <span className="text-[#d4af37]">18 Years</span>
              </h3>

              <p className="font-outfit text-sm sm:text-base text-[#bdbdbd] leading-relaxed">
                Founded and directed by <strong className="text-white">Guru Nattiyakalaimani V. Suriya Sathian</strong>, the academy has trained over 100+ students and prepared disciples for Tamil Nadu Music and Fine Arts University grade examinations with a 100% record of distinction.
              </p>

              <div className="about-features grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-[#111111] border border-[#333333] shadow-sm flex items-start gap-3">
                  <div className="p-2 rounded bg-[#0f0f0f] border border-[#333333] text-[#d4af37] mt-1">
                    <MudraIcon name="pataka" className="w-5 h-5 text-[#d4af37]" />
                  </div>
                  <div>
                    <h4 className="font-cinzel text-sm font-semibold text-[#d4af37]">Authentic Adavus</h4>
                    <p className="text-xs text-[#aaaaaa] mt-1">Rigorous training in Aramandi posture, footwork, and Asamyuta/Samyuta Hastas.</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#111111] border border-[#333333] shadow-sm flex items-start gap-3">
                  <div className="p-2 rounded bg-[#0f0f0f] border border-[#333333] text-[#d4af37] mt-1">
                    <Music className="w-5 h-5 text-[#d4af37]" />
                  </div>
                  <div>
                    <h4 className="font-cinzel text-sm font-semibold text-[#d4af37]">Nattuvangam &amp; Thalam</h4>
                    <p className="text-xs text-[#aaaaaa] mt-1">Disciples master complex Carnatic rhythmic cycles (Talam) and cymbals coordination.</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#111111] border border-[#333333] shadow-sm flex items-start gap-3">
                  <div className="p-2 rounded bg-[#0f0f0f] border border-[#333333] text-[#d4af37] mt-1">
                    <Heart className="w-5 h-5 text-[#d4af37]" />
                  </div>
                  <div>
                    <h4 className="font-cinzel text-sm font-semibold text-[#d4af37]">Navarasa Abhinaya</h4>
                    <p className="text-xs text-[#aaaaaa] mt-1">Expressive storytelling bringing epics and bhakti poetry vividly to life.</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#111111] border border-[#333333] shadow-sm flex items-start gap-3">
                  <div className="p-2 rounded bg-[#0f0f0f] border border-[#333333] text-[#d4af37] mt-1">
                    <Award className="w-5 h-5 text-[#d4af37]" />
                  </div>
                  <div>
                    <h4 className="font-cinzel text-sm font-semibold text-[#d4af37]">Arangetram Guidance</h4>
                    <p className="text-xs text-[#aaaaaa] mt-1">Comprehensive solo debut preparation with full live Carnatic ensemble.</p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-sm font-cinzel font-bold text-[#d4af37] hover:text-[#ffd700] transition-colors"
                >
                  <span>Read Guru V. Suriya Sathian's Pedagogical Biography</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Featured Courses / Batches */}
      <section className="courses py-20 bg-[#111111] border-y border-[#333333]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="courses-header text-center mb-12">
            <span className="text-[#d4af37] text-xs sm:text-sm tracking-[3px] uppercase font-cinzel font-semibold block mb-2">
              Curriculum &amp; Training
            </span>
            <h2 className="text-3xl sm:text-4xl font-cinzel font-bold text-white">
              Training Batches &amp; <span className="text-[#d4af37]">Syllabus Levels</span>
            </h2>
            <p className="text-[#aaaaaa] text-sm sm:text-base mt-2 max-w-xl mx-auto">
              Carefully structured levels catering from age 5 beginners to professional stage artists
            </p>
          </div>

          <div className="course-cards grid grid-cols-1 md:grid-cols-3 gap-8">
            {batches.map((batch) => (
              <div
                key={batch.id}
                className="course-card rounded-xl bg-[#0f0f0f] border border-[#333333] overflow-hidden shadow-lg hover:border-[#d4af37] transition-all duration-300 flex flex-col justify-between group text-left p-6"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-md text-xs font-cinzel font-semibold bg-[#1a1a1a] text-[#d4af37] border border-[#333333]">
                      {batch.level}
                    </span>
                    <span className="text-xs text-[#888888] font-outfit">
                      {batch.studentCount || 20}+ Enrolled
                    </span>
                  </div>

                  <h3 className="font-cinzel font-bold text-xl text-[#d4af37] group-hover:text-[#ffd700] transition-colors mb-2">
                    {batch.name}
                  </h3>

                  <p className="text-xs text-[#bbbbbb] mb-4 font-outfit">
                    Instructor: <strong className="text-white">{batch.instructor_name}</strong>
                  </p>

                  <div className="pt-3 border-t border-[#222222] space-y-2 text-xs text-[#888888] font-outfit">
                    <div className="flex justify-between">
                      <span className="text-[#666666]">Class Days:</span>
                      <span className="font-semibold text-[#dddddd]">{batch.schedule_days}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#666666]">Class Timings:</span>
                      <span className="font-semibold text-[#dddddd]">{batch.schedule_time}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#222222] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#777777] block uppercase tracking-wider">Tuition Fee</span>
                    <span className="font-cinzel font-bold text-lg text-white">
                      ₹{batch.fee_amount.toLocaleString('en-IN')}<span className="text-xs font-normal text-[#888888]">/mo</span>
                    </span>
                  </div>

                  <Link
                    to="/register"
                    className="px-4 py-2 rounded-md bg-[#d4af37] text-[#111111] hover:bg-transparent hover:text-[#d4af37] border border-[#d4af37] text-xs font-bold font-outfit shadow transition-all"
                  >
                    Enroll Now
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-md border border-[#d4af37] bg-transparent text-[#d4af37] font-semibold text-xs hover:bg-[#d4af37] hover:text-[#111111] transition-all shadow-sm"
            >
              <span>View All 4 Levels &amp; Detailed University Syllabus</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Upcoming Events & Temple Notices */}
      {events.length > 0 && (
        <section className="events py-20 bg-[#0f0f0f]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="events-header text-center mb-12">
              <span className="text-[#d4af37] text-xs sm:text-sm tracking-[3px] uppercase font-cinzel font-semibold block mb-2">
                Performances &amp; Celebrations
              </span>
              <h2 className="text-3xl sm:text-4xl font-cinzel font-bold text-white">
                Academy Events &amp; <span className="text-[#d4af37]">Stage Performances</span>
              </h2>
              <p className="text-[#aaaaaa] text-sm sm:text-base mt-2 max-w-xl mx-auto">
                Experience the vibrant classical calendar of Sri Ruthraalayaa in Sivakasi and beyond
              </p>
            </div>

            <div className="event-list grid grid-cols-1 md:grid-cols-2 gap-8">
              {events.map((ev) => (
                <div
                  key={ev.id}
                  className="event-card flex flex-col sm:flex-row bg-[#111111] rounded-xl border border-[#333333] overflow-hidden shadow-lg hover:border-[#d4af37]/60 transition-colors"
                >
                  <div className="event-date min-w-[90px] text-center p-5 border-b sm:border-b-0 sm:border-r border-[#444444] bg-[#0c0c0c] flex flex-col justify-center items-center">
                    <strong className="block text-[#d4af37] font-bold text-2xl font-cinzel">
                      {new Date(ev.date).getDate()}
                    </strong>
                    <span className="text-[#aaaaaa] text-xs uppercase tracking-wider font-medium">
                      {new Date(ev.date).toLocaleDateString('en-IN', { month: 'short' })}
                    </span>
                  </div>

                  <div className="event-info p-5 flex flex-col justify-between flex-1">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="event-type text-[#d4af37] text-[11px] font-semibold tracking-wider uppercase">
                          Performance
                        </span>
                        <span className="text-[11px] text-[#777777] flex items-center gap-1 font-outfit">
                          <Calendar className="w-3 h-3 text-[#d4af37]" />
                          {new Date(ev.date).toLocaleDateString('en-IN', { weekday: 'short' })}
                        </span>
                      </div>
                      <h3 className="text-white font-cinzel font-bold text-lg mb-2">
                        {ev.title}
                      </h3>
                      <p className="text-[#999999] text-xs font-outfit line-clamp-2 leading-relaxed">
                        {ev.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#222222] flex items-center justify-between text-xs">
                      <span className="text-[#777777]">Sivakasi / Thiruthangal</span>
                      <Link to="/events" className="text-[#d4af37] hover:text-[#ffd700] font-medium flex items-center gap-1">
                        <span>Details</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. Gallery Preview Section Matching User CSS */}
      <section className="gallery py-20 bg-[#111111] border-y border-[#333333]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="gallery-header text-center mb-12">
            <span className="text-[#d4af37] text-xs sm:text-sm tracking-[3px] uppercase font-cinzel font-semibold block mb-2">
              Visual Chronicles
            </span>
            <h2 className="text-3xl sm:text-4xl font-cinzel font-bold text-white">
              Academy Gallery &amp; <span className="text-[#d4af37]">Moments of Art</span>
            </h2>
            <p className="text-[#aaaaaa] text-sm sm:text-base mt-2 max-w-xl mx-auto">
              Portraying the devotion, rhythmic footwork, and stage debacles of our talented disciples
            </p>
          </div>

          <div className="gallery-grid max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="gallery-item h-64 overflow-hidden rounded-xl border border-[#333333] group bg-[#0f0f0f]">
              <img
                src="/BG.2.png"
                alt="Dance Salangai Footwork"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="gallery-item h-64 overflow-hidden rounded-xl border border-[#333333] group bg-[#0f0f0f]">
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80"
                alt="Guru V. Suriya Sathian"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="gallery-item h-64 overflow-hidden rounded-xl border border-[#333333] group bg-[#0f0f0f]">
              <img
                src="https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=600&q=80"
                alt="Classical Stage Lighting"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="gallery-item h-64 overflow-hidden rounded-xl border border-[#333333] group bg-[#0f0f0f]">
              <img
                src="/BG1.png"
                alt="Nataraja Cosmic Dance"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          <div className="text-center mt-10">
            <Link
              to="/gallery"
              className="secondary-btn"
            >
              <span>Explore Full Photo &amp; Video Archive</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 7. Call To Action Banner */}
      <section className="py-20 bg-[#0f0f0f] relative">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="relative p-8 sm:p-12 rounded-2xl bg-[#111111] text-white border border-[#333333] shadow-2xl overflow-hidden">
            {/* Ambient BG1 backdrop */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-15 mix-blend-luminosity pointer-events-none"
              style={{ backgroundImage: `url('/BG1.png')` }}
            />
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-full bg-[#080808] border border-[#d4af37] mx-auto mb-4 flex items-center justify-center p-2 shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                <img src="/logo.png" alt="Sri Ruthralaya" className="w-full h-full object-contain" />
              </div>
              <h2 className="font-cinzel text-2xl sm:text-4xl font-bold text-white">
                Begin Your Classical <span className="text-[#d4af37]">Dance Journey</span>
              </h2>
              <p className="font-cormorant italic text-base sm:text-xl text-[#bdbdbd] mt-2 max-w-xl mx-auto">
                Admissions are now open for new batches. Join Guru V. Suriya Sathian's lineage and awaken your inner Nataraja.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/register"
                  className="primary-btn w-full sm:w-auto"
                >
                  Apply for Admission Online
                </Link>
                <Link
                  to="/contact"
                  className="secondary-btn w-full sm:w-auto"
                >
                  Visit Academy Studio
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
