import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Quote, Award, Sparkles, Heart, CheckCircle2 } from 'lucide-react';
import KolamDivider from '../../components/common/KolamDivider';
import TempleBorder from '../../components/common/TempleBorder';

const testimonials = [
  {
    name: 'Diya Soundararajan',
    role: 'Solo Arangetram Graduate, Sivakasi',
    text: 'Learning under Guru Nattiyakalaimani R. Sridevi for the past 6 years leading up to my Arangetram has shaped my posture, confidence, and soul. Her patience with every adavu and intricate varnam choreography is unmatched.',
    year: 'Class of 2023',
    rating: 5,
    tag: 'Arangetram Solo Debut',
  },
  {
    name: 'Dr. K. Ramachandran',
    role: 'Parent of Bala Natya Student, Thiruthangal',
    text: 'My daughter joined Sri Ruthralaya at age 6. The transformation in her discipline, concentration, and cultural pride has been immense. She cleared her TN Music and Fine Arts University Grade 2 exam with distinction!',
    year: 'Parent Review',
    rating: 5,
    tag: 'University Grade Distinction',
  },
  {
    name: 'Smt. Vasumathi Rajan',
    role: 'Carnatic Vocalist & Art Connoisseur, Madurai',
    text: "Sri Ruthraalayaa's annual Natyanjali and stage performances bring the sacred temple tradition alive. Every varnam, shabdam, and thillana shows rigorous adherence to classical Nattuvangam and pure Aramandi.",
    year: 'Patron',
    rating: 5,
    tag: 'Classical Authenticity',
  },
  {
    name: 'Meenakshi Sundaram',
    role: 'Intermediate Student (Madhyama Batch)',
    text: 'The academy environment is like a temple. Sridevi Master personally checks the geometric lines of our hastas and eye movements (drishti bheda). The theoretical understanding of Abhinaya Darpana has elevated my understanding of dance.',
    year: 'Enrolled 4 Years',
    rating: 5,
    tag: 'Anga Shuddhi & Theory',
  },
  {
    name: 'S. Ananthi & Family',
    role: 'Parents of Twin Disciples, Sivakasi',
    text: 'Both my daughters performed their Salangai Pooja last Margazhi under Guru Sridevi. The dedication of the faculty, live orchestra coordination, and personal care given to every student make Sri Ruthraalayaa truly special.',
    year: 'Parent Review',
    rating: 5,
    tag: 'Salangai Pooja Milestone',
  },
  {
    name: 'Kavitha Senthilkumar',
    role: 'Arangetram Alumna & Performing Artist',
    text: 'The rigorous training in Tala Jnana and stamina conditioning prepared me not just for my 3-hour solo Arangetram, but for performing on national stages across South India. I am forever grateful to Sri Ruthralaya.',
    year: 'Class of 2021',
    rating: 5,
    tag: 'Alumni Excellence',
  },
];

export default function TestimonialsPage() {
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
              <span>Voices of Our Lineage</span>
            </div>
            <h1 className="font-cinzel text-3xl sm:text-5xl font-bold text-white">
              Words of Disciples &amp; Families
            </h1>
            <p className="font-cormorant italic text-lg sm:text-xl text-amber-100/90 leading-relaxed">
              Eighteen years of timeless Guru-Shishya tradition in Thiruthangal and Sivakasi, celebrated through true student experiences.
            </p>
          </div>
        </div>

        <TempleBorder />

        {/* Testimonials Grid */}
        <div className="my-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border-2 border-temple-gold/40 shadow-temple p-7 flex flex-col justify-between hover:shadow-temple-lg transition-all duration-300 relative group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-cinzel font-bold bg-temple-maroon/10 text-temple-maroon border border-temple-gold/30">
                    {item.tag}
                  </span>
                  <div className="flex text-amber-500">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                </div>

                <Quote className="w-8 h-8 text-temple-gold/30 mb-2" />

                <p className="font-cormorant italic text-stone-700 text-base leading-relaxed">
                  "{item.text}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <h4 className="font-cinzel text-xs font-bold text-temple-maroon">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-stone-500 font-outfit mt-0.5">
                    {item.role}
                  </p>
                </div>
                <span className="text-[10px] text-amber-700/80 font-cinzel font-semibold bg-amber-50 px-2 py-0.5 rounded">
                  {item.year}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Spotlight Showcase with Salangai BG.2.png */}
        <div className="my-16 relative rounded-3xl bg-gradient-to-r from-temple-maroon-deep via-temple-maroon to-temple-maroon-deep text-white border-2 border-temple-gold shadow-2xl overflow-hidden p-8 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-sm rounded-2xl overflow-hidden border-2 border-temple-gold shadow-xl bg-black">
                <img
                  src="/BG.2.png"
                  alt="Sacred Salangai bells on wooden stage"
                  className="w-full h-64 object-cover object-center hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-cinzel uppercase tracking-widest text-temple-gold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                The Salangai Pooja Milestone
              </span>
              <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-white">
                Every Disciple's Sacred Awakening
              </h2>
              <p className="font-outfit text-xs sm:text-sm text-amber-100/90 leading-relaxed">
                When a student ties the sacred Salangai bells blessed before Lord Nataraja, they step into a lifetime of rhythmic discipline and spiritual grace. Under Guru Sridevi's lineage, over 100+ students have experienced this profound milestone.
              </p>
              <div className="pt-2 flex flex-wrap gap-4">
                <Link
                  to="/register"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-temple-gold to-amber-500 text-temple-maroon-deep font-cinzel font-bold text-xs shadow hover:brightness-110 transition-all"
                >
                  Join Next Batch
                </Link>
                <Link
                  to="/courses"
                  className="px-5 py-2.5 rounded-xl border border-temple-gold text-amber-200 font-cinzel text-xs hover:bg-temple-gold hover:text-temple-maroon transition-all"
                >
                  View Curriculum
                </Link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
