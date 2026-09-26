/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Direct Requested Palette Roles
        terracotta: '#9B3D2E',      // Primary
        'deep-brown': '#4A211B',    // Primary Dark
        'muted-gold': '#B78A4A',    // Accent
        'warm-cream': '#FAF6EE',    // Background
        sand: '#F0E5D2',            // Section BG
        ivory: '#FFFDF8',           // Card
        espresso: '#30221E',        // Heading
        'warm-gray': '#665A54',     // Body
        'soft-tan': '#D8C8B3',      // Border
        sage: '#637A61',            // Success
        ochre: '#B27A32',           // Warning
        brick: '#A7463A',           // Error

        // Mapped to temple semantic system
        temple: {
          maroon: '#9B3D2E',        // Primary: Terracotta
          'maroon-dark': '#4A211B', // Primary Dark: Deep Brown
          'maroon-deep': '#30221E', // Heading: Espresso / Deep Brown
          'maroon-light': '#B44D3D',
          gold: '#B78A4A',          // Accent: Muted Gold
          'gold-light': '#D8B681',
          'gold-bright': '#C79854',
          'gold-pale': '#F7EFE1',
          'gold-dark': '#8E6731',
          cream: '#FAF6EE',         // Background: Warm Cream
          'cream-alt': '#F0E5D2',   // Section BG: Sand
          ivory: '#FFFDF8',         // Card: Ivory
          sand: '#F0E5D2',          // Section BG: Sand
          tan: '#D8C8B3',           // Border: Soft Tan
          espresso: '#30221E',      // Heading: Espresso
          'warm-gray': '#665A54',   // Body: Warm Gray
        },

        // Overriding neutral scales to harmoniously blend with the palette
        stone: {
          50: '#FAF6EE',            // Warm Cream
          100: '#F5EFE4',
          200: '#E8DCCC',
          300: '#D8C8B3',           // Border: Soft Tan
          400: '#A8998C',
          500: '#837367',
          600: '#665A54',           // Body: Warm Gray
          700: '#4D403A',
          800: '#30221E',           // Heading: Espresso
          900: '#231815',
          950: '#140C0A',
        },

        amber: {
          50: '#FAF6EE',
          100: '#F7EFE1',
          200: '#EAD6B5',
          300: '#D8B681',
          400: '#C79854',
          500: '#B78A4A',           // Accent: Muted Gold
          600: '#B27A32',           // Warning: Ochre
          700: '#9B3D2E',           // Primary: Terracotta
          800: '#6F2B20',
          900: '#4A211B',           // Primary Dark: Deep Brown
        },

        emerald: {
          50: '#F4F7F4',
          100: '#E6ECE5',
          200: '#C7D5C5',
          300: '#A2B9A0',
          400: '#7E9B7C',
          500: '#637A61',           // Success: Sage
          600: '#4F634E',
          700: '#3D4E3C',
          800: '#2D392C',
          900: '#1D251C',
        },

        red: {
          50: '#FDF5F4',
          100: '#FAECE9',
          200: '#F2D3CD',
          300: '#E5B1A8',
          400: '#C97467',
          500: '#A7463A',           // Error: Brick
          600: '#9B3D2E',           // Primary: Terracotta
          700: '#7E2E23',
          800: '#5A1D15',
          900: '#3B100B',
        },
      },
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'serif'],
        outfit: ['Outfit', 'sans-serif'],
      },
      backgroundImage: {
        'temple-gradient': 'linear-gradient(135deg, #9B3D2E 0%, #4A211B 100%)',
        'gold-shimmer': 'linear-gradient(90deg, #B78A4A 0%, #D8B681 50%, #B78A4A 100%)',
        'cream-gradient': 'linear-gradient(180deg, #FAF6EE 0%, #F0E5D2 100%)',
      },
      boxShadow: {
        'temple': '0 10px 30px -5px rgba(155, 61, 46, 0.14), 0 4px 6px -2px rgba(183, 138, 74, 0.1)',
        'temple-lg': '0 20px 40px -10px rgba(74, 33, 27, 0.22), 0 8px 10px -4px rgba(183, 138, 74, 0.12)',
        'gold-glow': '0 0 25px rgba(183, 138, 74, 0.35)',
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
