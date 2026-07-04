/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Deep maroon / burgundy — brand primary
        maroon: {
          50: '#fbf1f2',
          100: '#f6dedf',
          200: '#edc0c2',
          300: '#df979b',
          400: '#cd646a',
          500: '#b83f47',
          600: '#9f2c36',
          700: '#7c1f2b', // DEFAULT — signature deep maroon
          800: '#611c27',
          900: '#4d1a23',
          950: '#2b0b10',
          DEFAULT: '#7c1f2b',
        },
        // Warm gold accent — used sparingly
        gold: {
          50: '#fbf7ec',
          100: '#f5eacb',
          200: '#ecd494',
          300: '#e0bd5d',
          400: '#d3a635',
          500: '#c49128', // DEFAULT — warm gold
          600: '#a8741f',
          700: '#87561d',
          800: '#71461f',
          900: '#613b1f',
          DEFAULT: '#c49128',
        },
        // Ivory / warm-white backgrounds
        ivory: {
          DEFAULT: '#fbf7f0',
          50: '#fefdfb',
          100: '#fbf7f0',
          200: '#f5ecdd',
        },
        // Near-black text
        ink: {
          DEFAULT: '#1c1a19',
          soft: '#4a4542',
          muted: '#8a827c',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(28,26,25,0.04), 0 8px 24px -12px rgba(28,26,25,0.15)',
        lift: '0 8px 20px -6px rgba(28,26,25,0.12), 0 24px 48px -20px rgba(124,31,43,0.25)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.6s ease-out both',
        'fade': 'fade 0.4s ease-out both',
      },
    },
  },
  plugins: [],
}
