import React from 'react';

export default function KolamDivider({ title = '', subtitle = '' }) {
  return (
    <div className="text-center my-8 relative">
      {/* Kolam Geometric Centerpiece */}
      <div className="flex items-center justify-center gap-3">
        <div className="h-[1px] w-16 sm:w-28 bg-gradient-to-r from-transparent to-temple-gold"></div>
        <div className="w-3 h-3 rotate-45 border border-temple-gold bg-temple-maroon"></div>
        <div className="w-2 h-2 rotate-45 bg-temple-gold"></div>
        <div className="w-3 h-3 rotate-45 border border-temple-gold bg-temple-maroon"></div>
        <div className="h-[1px] w-16 sm:w-28 bg-gradient-to-l from-transparent to-temple-gold"></div>
      </div>

      {title && (
        <h2 className="mt-3 text-2xl sm:text-3xl font-cinzel font-bold text-temple-maroon tracking-wide">
          {title}
        </h2>
      )}

      {subtitle && (
        <p className="mt-1 font-cormorant italic text-base sm:text-lg text-stone-600 max-w-xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
