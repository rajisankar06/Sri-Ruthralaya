import React from 'react';

export default function TempleBorder({ className = '' }) {
  return (
    <div className={`w-full flex items-center justify-center overflow-hidden py-1 ${className}`}>
      <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent via-[#d4af37] to-[#333333]"></div>
      
      {/* Temple Gopuram / Kalasam Motif */}
      <div className="mx-3 flex items-center gap-1.5 text-[#d4af37]">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L9 8H15L12 2Z" />
          <path d="M8 9H16L17 14H7L8 9Z" />
          <path d="M6 15H18L19 21H5L6 15Z" />
          <circle cx="12" cy="1" r="1" fill="#ffd700" />
        </svg>
        <span className="text-xs uppercase tracking-[0.25em] font-cinzel font-semibold text-[#d4af37]">
          ॐ
        </span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L9 8H15L12 2Z" />
          <path d="M8 9H16L17 14H7L8 9Z" />
          <path d="M6 15H18L19 21H5L6 15Z" />
          <circle cx="12" cy="1" r="1" fill="#ffd700" />
        </svg>
      </div>

      <div className="h-[1px] flex-grow bg-gradient-to-l from-transparent via-[#d4af37] to-[#333333]"></div>
    </div>
  );
}
