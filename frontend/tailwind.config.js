/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Direct Requested User Palette
        dark: {
          base: '#0f0f0f',          // Main body background
          surface: '#111111',       // Elevated cards / navbar / sections
          deep: '#080808',          // Footer / deepest background
          card: '#161616',          // Card surface
          border: '#333333',        // Standard dark border
          'border-light': '#444444',// Lighter divider
          'border-dark': '#222222', // Deep divider
        },
        gold: {
          DEFAULT: '#d4af37',       // Signature Royal Gold
          light: '#f3e5ab',
          bright: '#ffd700',
          dark: '#b89025',
          pale: '#262010',
        },

        // Mapped to temple semantic system
        temple: {
          maroon: '#111111',        // Elevated dark surface
          'maroon-dark': '#0f0f0f', // Base dark background
          'maroon-deep': '#080808', // Deepest dark background (footer)
          'maroon-light': '#1c1c1c',// Secondary dark surface
          gold: '#d4af37',          // Accent: Signature Gold
          'gold-light': '#f3e5ab',
          'gold-bright': '#ffd700',
          'gold-pale': '#262010',
          'gold-dark': '#b89025',
          cream: '#0f0f0f',         // Background: Dark Base
          'cream-alt': '#111111',   // Section BG: Dark Surface
          ivory: '#161616',         // Card Surface
          sand: '#141414',          // Section BG
          tan: '#333333',           // Border
          espresso: '#ffffff',      // Headings: Pure White
          'warm-gray': '#bdbdbd',   // Body Text
        },

        // Overriding neutral scales to harmoniously blend with the dark palette
        stone: {
          50: '#080808',
          100: '#0f0f0f',
          200: '#161616',
          300: '#222222',
          400: '#333333',
          500: '#777777',
          600: '#999999',
          700: '#aaaaaa',
          800: '#bdbdbd',
          900: '#eeeeee',
          950: '#ffffff',
        },

        amber: {
          50: '#1a160c',
          100: '#f3e5ab',
          200: '#ebd885',
          300: '#e0c45b',
          400: '#d4af37',
          500: '#d4af37',           // Signature Gold
          600: '#b89025',
          700: '#9c771b',
          800: '#785910',
          900: '#4d3708',
        },

        emerald: {
          50: '#0c1a0f',
          100: '#142918',
          200: '#1e3d24',
          300: '#2d5c36',
          400: '#438050',
          500: '#5ca36b',
          600: '#78b884',
          700: '#99cca2',
          800: '#c0e0c6',
          900: '#e5f3e8',
        },

        red: {
          50: '#1a0c0c',
          100: '#291414',
          200: '#421f1f',
          300: '#662f2f',
          400: '#944242',
          500: '#c45a5a',
          600: '#db7878',
          700: '#e89b9b',
          800: '#f2c4c4',
          900: '#fae8e8',
        },
      },
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'serif'],
        outfit: ['Outfit', 'sans-serif'],
      },
      backgroundImage: {
        'temple-gradient': 'linear-gradient(135deg, #111111 0%, #080808 100%)',
        'gold-shimmer': 'linear-gradient(90deg, #d4af37 0%, #ffd700 50%, #d4af37 100%)',
        'cream-gradient': 'linear-gradient(180deg, #0f0f0f 0%, #111111 100%)',
      },
      boxShadow: {
        'temple': '0 10px 30px -5px rgba(0, 0, 0, 0.7), 0 4px 6px -2px rgba(212, 175, 55, 0.12)',
        'temple-lg': '0 20px 40px -10px rgba(0, 0, 0, 0.9), 0 8px 10px -4px rgba(212, 175, 55, 0.25)',
        'gold-glow': '0 0 25px rgba(212, 175, 55, 0.45)',
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
