import React from 'react';

export default function MudraIcon({ name = 'nataraja', className = 'w-6 h-6', color = '#B78A4A' }) {
  if (name === 'pataka') {
    // Pataka Hand Mudra
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v10M9 4v8M15 4v8M6 8v5c0 4.5 3 7 6 7s6-2.5 6-7V6" />
        <path d="M18 10c0 1.5-.5 2-1 2" />
      </svg>
    );
  }

  if (name === 'alapadma') {
    // Alapadma (Blooming Lotus Mudra)
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" fill={color} fillOpacity="0.3" />
        <path d="M12 3c-2 3-2 6 0 6s2-3 0-6z" />
        <path d="M12 15c-2 3-2 6 0 6s2-3 0-6z" />
        <path d="M3 12c3-2 6-2 6 0s-3 2-6 0z" />
        <path d="M15 12c3-2 6-2 6 0s-3 2-6 0z" />
        <path d="M5.5 5.5c3-1 5 1 5 3s-3 3-5 1z" />
        <path d="M13.5 13.5c3-1 5 1 5 3s-3 3-5 1z" />
      </svg>
    );
  }

  // Default: Nataraja Cosmic Dancer Silhouette
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="14" stroke={color} strokeWidth="1.5" strokeDasharray="3 2" />
      <path d="M16 6C17.1046 6 18 6.89543 18 8C18 9.10457 17.1046 10 16 10C14.8954 10 14 9.10457 14 8C14 6.89543 14.8954 6 16 6Z" fill={color} />
      <path d="M16 10V18M16 18L12 24M16 18L21 21" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M10 13C12 15 20 15 22 13" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M8 10L11 13M24 10L21 13" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="7" cy="9" r="1.5" fill={color} />
      <circle cx="25" cy="9" r="1.5" fill={color} />
    </svg>
  );
}
