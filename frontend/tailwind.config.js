/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        temple: {
          maroon: '#7B1E1E',
          'maroon-dark': '#58111A',
          'maroon-deep': '#3B0000',
          'maroon-light': '#9B2C2C',
          gold: '#D4AF37',
          'gold-light': '#F3E5AB',
          'gold-bright': '#FFD700',
          'gold-pale': '#FFF8D6',
          'gold-dark': '#996515',
          cream: '#FDFBF7',
          'cream-alt': '#FAF5EE',
          ivory: '#FFFDF9',
          sand: '#F5EBE1',
          bronze: '#8C6239',
        },
      },
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'serif'],
        outfit: ['Outfit', 'sans-serif'],
      },
      backgroundImage: {
        'temple-gradient': 'linear-gradient(135deg, #7B1E1E 0%, #4A0E17 100%)',
        'gold-shimmer': 'linear-gradient(90deg, #D4AF37 0%, #FFF2A8 50%, #D4AF37 100%)',
        'cream-gradient': 'linear-gradient(180deg, #FDFBF7 0%, #FAF5EE 100%)',
      },
      boxShadow: {
        'temple': '0 10px 30px -5px rgba(123, 30, 30, 0.15), 0 4px 6px -2px rgba(212, 175, 55, 0.1)',
        'temple-lg': '0 20px 40px -10px rgba(123, 30, 30, 0.25), 0 8px 10px -4px rgba(212, 175, 55, 0.15)',
        'gold-glow': '0 0 25px rgba(212, 175, 55, 0.35)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
};
