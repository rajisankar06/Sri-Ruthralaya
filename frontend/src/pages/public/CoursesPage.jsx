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
    <div className="bg-[#0f0f0f] text-white min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner with Nataraja BG1.png */}
        <div className="relative rounded-3xl bg-[#111111] text-white p-8 sm:p-12 mb-12 border border-[#333333] shadow-2xl overflow-hidden text-center">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-luminosity pointer-events-none"
            style={{ backgroundImage: `url('/BG1.png')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f0f0f]/95 via-[#111111]/85 to-[#0f0f0f]/95 pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0f0f0f] border border-[#d4af37]/40 text-[#d4af37] text-xs font-cinzel uppercase tracking-widest">
              <img src="/logo.png" alt="Sri Ruthralaya" className="w-4 h-4 object-contain" />
              <span>Systematic Curriculum &amp; University Accreditation</span>
            </div>
            <h1 className="font-cinzel text-3xl sm:text-5xl font-bold text-white">
              Courses &amp; <span className="text-[#d4af37]">Class Batches</span>
            </h1>
            <p className="font-cormorant italic text-lg sm:text-xl text-[#bdbdbd] leading-relaxed">
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
                className="bg-[#111111] rounded-3xl border border-[#333333] shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 transition-all hover:border-[#d4af37]/60"
              >
                {/* Left Header Panel */}
                <div className="lg:col-span-4 bg-[#0a0a0a] text-white p-8 flex flex-col justify-between relative overflow-hidden border-b lg:border-b-0 lg:border-r border-[#333333]">
                  <div className="absolute inset-0 opacity-10 bg-kolam-pattern pointer-events-none"></div>

                  <div className="relative z-10">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-cinzel font-semibold bg-[#d4af37] text-[#111111] mb-3 shadow">
                      Level: {batch.level}
                    </span>

                    <h3 className="font-cinzel font-bold text-2xl text-[#d4af37] leading-snug">
                      {batch.name}
                    </h3>

                    <p className="mt-2 text-xs text-[#999999] font-outfit">
                      Instructor: <strong className="text-white">{batch.instructor_name}</strong>
                    </p>

                    <div className="mt-6 pt-6 border-t border-[#333333] space-y-3 text-xs text-[#bdbdbd] font-outfit">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-[#d4af37] flex-shrink-0" />
                        <span>{batch.schedule_days}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-[#d4af37] flex-shrink-0" />
                        <span>{batch.schedule_time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-[#d4af37] flex-shrink-0" />
                        <span>TN Fine Arts Univ Exam Accredited</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-[#333333] relative z-10">
                    <div className="text-xs text-[#999999] mb-1">Monthly Tuition Fee</div>
                    <div className="font-cinzel text-3xl font-bold text-[#d4af37]">
                      ₹{batch.fee_amount.toLocaleString('en-IN')}
                      <span className="text-xs font-normal text-[#999999]"> / month</span>
                    </div>

                    <Link
                      to="/register"
                      className="join-btn mt-4 w-full text-center block"
                    >
                      Enroll in this Batch
                    </Link>
                  </div>
                </div>

                {/* Right Syllabus Panel */}
                <div className="lg:col-span-8 p-8 flex flex-col justify-between bg-[#111111]">
                  <div>
                    <h4 className="font-cinzel text-lg font-bold text-[#d4af37] mb-4 flex items-center gap-2">
                      <MudraIcon name="pataka" className="w-5 h-5 text-[#d4af37]" />
                      Detailed Syllabus &amp; Learning Modules
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {syllabusItems.map((item, i) => (
                        <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-[#0f0f0f] border border-[#333333] text-xs text-[#bdbdbd]">
                          <Check className="w-4 h-4 text-[#d4af37] flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-[#222222] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#777777] font-outfit">
                    <span className="italic text-[#999999]">
                      Study syllabus booklet and audio practice lessons provided upon admission.
                    </span>
                    <Link
                      to="/contact"
                      className="font-cinzel font-bold text-[#d4af37] hover:underline"
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
        <div className="mt-16 rounded-3xl bg-[#111111] text-white border border-[#333333] shadow-2xl p-8 sm:p-12 overflow-hidden relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-sm rounded-2xl overflow-hidden border border-[#d4af37]/40 shadow-xl">
                <img 
                  src="/BG.2.png" 
                  alt="Aramandi posture and Salangai bells at Sri Ruthralaya" 
                  className="w-full h-72 object-cover object-center hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0f0f0f] border border-[#d4af37]/40 text-[#d4af37] text-xs font-cinzel">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Anga Shuddhi &amp; Pada Bhedas</span>
              </div>
              <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-white">
                The Science of <span className="text-[#d4af37]">Aramandi &amp; Salangai Dedication</span>
              </h2>
              <p className="font-outfit text-xs sm:text-sm text-[#bdbdbd] leading-relaxed">
                At Sri Ruthralaya, every student begins with rigorous anatomical training in Aramandi (half-sitting posture) and geometric lines of the body. After mastering the foundation Adavus, students receive their consecrated brass bells in the auspicious Salangai Pooja ceremony, stepping into the sacred Margam repertoire.
              </p>
              <div className="pt-2">
                <Link
                  to="/register"
                  className="primary-btn inline-flex items-center gap-2"
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
