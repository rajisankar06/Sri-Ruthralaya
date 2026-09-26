import React from 'react';
import { Star, Quote, Award } from 'lucide-react';
import TempleBorder from '../../components/common/TempleBorder';
import KolamDivider from '../../components/common/KolamDivider';

export default function TestimonialsPage() {
  const reviews = [
    {
      name: 'Diya Soundararajan',
      role: 'Arangetram Solo Debutant (2024)',
      location: 'Sivakasi',
      text: 'Preparing for my Arangetram under Guru Sridevi was a transformative spiritual experience. Her meticulous guidance through the Varnam and her Nattuvangam rhythm gave me supreme confidence on stage before 500+ rasikas.',
      rating: 5,
    },
    {
      name: 'Dr. K. Ramachandran & Mrs. Shanthi',
      role: 'Parents of Ananya (Intermediate Batch)',
      location: 'Thiruthangal',
      text: 'Finding an academy with pure classical authenticity outside of Chennai was our dream. Guru Sridevi’s patience and academic structure helped our daughter clear University Grade 1 and 2 exams with outstanding marks.',
      rating: 5,
    },
    {
      name: 'Meera Natarajan',
      role: 'Advanced Disciple & BFA Dance Student',
      location: 'Virudhunagar',
      text: 'Sri Ruthraalayaa is more than a dance school; it is a sacred gurukulam. The understanding of Natyashastra theory, Asamyuta Hastas, and Abhinaya taught here is second to none in this region.',
      rating: 5,
    },
    {
      name: 'Smt. Vasumathi Rajan',
      role: 'Carnatic Vocalist & Temple Trustee',
      location: 'Madurai / Sivakasi',
      text: 'As an accompanying artist who has sung for Sri Ruthraalaya’s Natyanjali productions, I can attest to the exceptional rhythmic synchronization and bhava cultivated in Guru Sridevi’s students.',
      rating: 5,
    },
    {
      name: 'Kavya Krishnan',
      role: 'Junior Disciple (Bala Natya)',
      location: 'Sivakasi',
      text: 'I love learning Adavus at Sri Ruthralaya. Guru Ma explains every hand mudra with stories of Lord Krishna and Lord Shiva. Dance class is my favorite part of the week!',
      rating: 5,
    },
    {
      name: 'Mr. R. Balaji',
      role: 'Parent of Swetha Balaji',
      location: 'Thiruthangal',
      text: 'The digital student portal with attendance tracking, fee receipts, and AI assistant has made parent communication so transparent and modern while keeping the traditional art intact.',
      rating: 5,
    },
  ];

  return (
    <div className="bg-temple-cream min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="font-cinzel text-xs font-semibold uppercase tracking-widest text-temple-gold px-3 py-1 rounded-full bg-temple-maroon/10 border border-temple-gold/40">
            Disciples &amp; Parents
          </span>
          <h1 className="font-cinzel text-3xl sm:text-5xl font-bold text-temple-maroon mt-3">
            Words of Gratitude &amp; Experience
          </h1>
          <p className="font-cormorant italic text-lg sm:text-xl text-stone-600 mt-2">
            Reflections on discipline, artistry, and cultural roots nurtured at Sri Ruthraalayaa
          </p>
        </div>

        <TempleBorder />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-12">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl border-2 border-temple-gold/40 p-8 shadow-temple flex flex-col justify-between hover:shadow-temple-lg transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-temple-gold">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-temple-maroon/20" />
                </div>

                <p className="font-cormorant italic text-base text-stone-700 leading-relaxed">
                  "{rev.text}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-amber-200/60">
                <h4 className="font-cinzel font-bold text-sm text-temple-maroon">
                  {rev.name}
                </h4>
                <p className="text-xs text-stone-600 font-outfit mt-0.5">
                  {rev.role}
                </p>
                <p className="text-[10px] text-temple-gold font-cinzel tracking-wider uppercase mt-1">
                  {rev.location}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
