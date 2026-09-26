import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, Calendar, Check, Sparkles, Award } from 'lucide-react';
import api from '../../services/api';
import TempleBorder from '../../components/common/TempleBorder';
import KolamDivider from '../../components/common/KolamDivider';
import MudraIcon from '../../components/common/MudraIcon';

export default function CoursesPage() {
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBatches() {
      try {
        const res = await api.get('/batches');
        if (res.data.success) {
          setBatches(res.data.data);
        }
      } catch (err) {
        console.error('Failed to load batches:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchBatches();
  }, []);

  const courseSyllabus = {
    'Beginner': [
      'Natyarambha and Aramandi foundation exercises',
      'Tatta Adavu (8 variations in 3 speeds)',
      'Natta Adavu (8 variations)',
      'Kuditta Metta & Teermanam Adavu basics',
      'Asamyuta Hastas (28 Single Hand Gestures with Shlokas)',
      'Samyuta Hastas (24 Double Hand Gestures)',
      'Drishti, Greeva, and Shiro Bhedas (Eye, Neck, and Head Movements)',
    ],
    'Intermediate': [
      'Advanced complex Adavu combinations (Sarikkal, Katti, Mandi Adavus)',
      'Pushpanjali & Alarippu in Tisra and Misra Eka Talams',
      'Jatiswaram (Ragam Kalyani / Saveri / Vasantha)',
      'Shabdam on Lord Muruga / Krishna (Abhinaya introduction)',
      'Rhythmic recitation of Jathis and Talam counting',
      'Preparation for TN University Grade 1 & 2 Examinations',
    ],
    'Advanced': [
      'The Grand Varnam (The centerpiece of Bharatanatyam Margam)',
      'Padams & Keerthanams (Sringara, Bhakti, and Vatsalya Bhavas)',
      'Javali and Ashtapadi expressive items',
      'Nattuvangam practice holding cymbals (Thalam)',
      'Theory: Natyashastra chapters and historical lineages',
      'Preparation for University Grade 3 to 5 examinations',
    ],
    'Arangetram Prep': [
      'Complete solo performance Margam mastery (2.5 to 3 hours repertoire)',
      'Alarippu, Jatiswaram, Shabdam, Varnam, 3 Padams, Thillana, Mangalam',
      'Coordination with live Carnatic orchestra (Vocal, Mridangam, Violin, Flute)',
      'Aharya Abhinaya: Temple jewellery selection and custom silk costume styling',
      'Stage stamina and physical conditioning for solo debut',
      'Graduation certificate and university accreditation credentials',
    ],
  };

  return (
    <div className="bg-temple-cream min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner with Nataraja BG1.png */}
        <div className="relative rounded-3xl bg-temple-maroon text-white p-8 sm:p-12 mb-12 border-2 border-temple-gold shadow-temple-lg overflow-hidden text-center">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity pointer-events-none"
            style={{ backgroundImage: `url('/BG1.png')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-temple-maroon-deep/90 via-temple-maroon/80 to-temple-maroon-deep/90 pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-temple-gold/20 border border-temple-gold text-temple-gold-light text-xs font-cinzel uppercase tracking-widest">
              <img src="/logo.png" alt="Sri Ruthralaya" className="w-4 h-4 object-contain" />
              <span>Systematic Curriculum &amp; University Accreditation</span>
            </div>
            <h1 className="font-cinzel text-3xl sm:text-5xl font-bold text-white">
              Courses &amp; Class Batches
            </h1>
            <p className="font-cormorant italic text-lg sm:text-xl text-amber-100/90 leading-relaxed">
              From Sacred First Steps and Adavu Geometry to Majestic Solo Arangetram Stage Debuts
            </p>
          </div>
        </div>

        <TempleBorder />

        {/* Batches Grid */}
        <div className="mt-12 space-y-12">
          {batches.map((batch, index) => {
            const syllabusItems = courseSyllabus[batch.level] || courseSyllabus['Beginner'];

            return (
              <div
                key={batch.id}
                className="bg-white rounded-3xl border-2 border-temple-gold/50 shadow-temple overflow-hidden grid grid-cols-1 lg:grid-cols-12 transition-all hover:border-temple-gold hover:shadow-temple-lg"
              >
                {/* Left Header Panel */}
                <div className="lg:col-span-4 bg-gradient-to-br from-temple-maroon to-temple-maroon-dark text-white p-8 flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10 bg-kolam-pattern pointer-events-none"></div>

                  <div className="relative z-10">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-cinzel font-semibold bg-temple-gold text-temple-maroon-deep mb-3 shadow">
                      Level: {batch.level}
                    </span>

                    <h3 className="font-cinzel font-bold text-2xl text-temple-gold-light leading-snug">
                      {batch.name}
                    </h3>

                    <p className="mt-2 text-xs text-amber-200/80 font-outfit">
                      Instructor: <strong>{batch.instructor_name}</strong>
                    </p>

                    <div className="mt-6 pt-6 border-t border-temple-gold/30 space-y-3 text-xs text-amber-100 font-outfit">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-temple-gold flex-shrink-0" />
                        <span>{batch.schedule_days}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-temple-gold flex-shrink-0" />
                        <span>{batch.schedule_time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-temple-gold flex-shrink-0" />
                        <span>TN Fine Arts Univ Exam Accredited</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-temple-gold/30 relative z-10">
                    <div className="text-xs text-amber-200/80 mb-1">Monthly Tuition Fee</div>
                    <div className="font-cinzel text-3xl font-bold text-temple-gold">
                      ₹{batch.fee_amount.toLocaleString('en-IN')}
                      <span className="text-xs font-normal text-amber-200/70"> / month</span>
                    </div>

                    <Link
                      to="/register"
                      className="mt-4 w-full py-3 rounded-xl bg-gradient-to-r from-temple-gold to-amber-500 text-temple-maroon-deep font-cinzel font-bold text-xs uppercase tracking-wider text-center block shadow hover:brightness-110 transition-all"
                    >
                      Enroll in this Batch
                    </Link>
                  </div>
                </div>

                {/* Right Syllabus Panel */}
                <div className="lg:col-span-8 p-8 flex flex-col justify-between">
                  <div>
                    <h4 className="font-cinzel text-lg font-bold text-temple-maroon mb-4 flex items-center gap-2">
                      <MudraIcon name="pataka" className="w-5 h-5 text-temple-gold" />
                      Detailed Syllabus &amp; Learning Modules
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {syllabusItems.map((item, i) => (
                        <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-temple-cream/60 border border-amber-200/60 text-xs text-stone-700">
                          <Check className="w-4 h-4 text-temple-maroon flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-stone-500 font-outfit">
                    <span className="italic">
                      Study syllabus booklet and audio practice lessons provided upon admission.
                    </span>
                    <Link
                      to="/contact"
                      className="font-cinzel font-bold text-temple-maroon hover:text-amber-700"
                    >
                      Enquire about trial class →
                    </Link>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Featured Showcase: Sacred Salangai Pooja & Aramandi Discipline with BG.2.png */}
        <div className="mt-16 rounded-3xl bg-gradient-to-r from-temple-maroon via-temple-maroon-dark to-temple-maroon text-white border-2 border-temple-gold shadow-temple-lg p-8 sm:p-12 overflow-hidden relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-sm rounded-2xl overflow-hidden border-2 border-temple-gold shadow-xl">
                <img 
                  src="/BG.2.png" 
                  alt="Aramandi posture and Salangai bells at Sri Ruthralaya" 
                  className="w-full h-72 object-cover object-center hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-temple-gold/20 border border-temple-gold text-temple-gold text-xs font-cinzel">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Anga Shuddhi &amp; Pada Bhedas</span>
              </div>
              <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-white">
                The Science of Aramandi &amp; Salangai Dedication
              </h2>
              <p className="font-outfit text-xs sm:text-sm text-amber-100/90 leading-relaxed">
                At Sri Ruthralaya, every student begins with rigorous anatomical training in Aramandi (half-sitting posture) and geometric lines of the body. After mastering the foundation Adavus, students receive their consecrated brass bells in the auspicious Salangai Pooja ceremony, stepping into the sacred Margam repertoire.
              </p>
              <div className="pt-2">
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-temple-gold to-amber-500 text-temple-maroon font-cinzel font-bold text-xs shadow-gold-glow hover:brightness-110 transition-all"
                >
                  <span>Apply for Next Admission Cycle</span>
                  <Award className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
