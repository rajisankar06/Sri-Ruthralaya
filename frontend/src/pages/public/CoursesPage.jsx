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
        
        {/* Banner */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="font-cinzel text-xs font-semibold uppercase tracking-widest text-temple-gold px-3 py-1 rounded-full bg-temple-maroon/10 border border-temple-gold/40">
            Systematic Curriculum
          </span>
          <h1 className="font-cinzel text-3xl sm:text-5xl font-bold text-temple-maroon mt-3">
            Courses &amp; Class Batches
          </h1>
          <p className="font-cormorant italic text-lg sm:text-xl text-stone-600 mt-2">
            From Sacred First Steps to Majestic Solo Arangetram Stage Debuts
          </p>
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

      </div>
    </div>
  );
}
