/** @type {import('tailwindcss').Config} */

/*
 * PALETTE ROLES
 *
 * The token *names* below are inherited from the original theme; their *values*
 * are the current rose-red scheme. Read them by role, not by name:
 *
 *   maroon → the brand rose-red. Steps 50–800 are the true rose ramp (buttons,
 *            links, prices, active states). Steps 900/950 are deliberately dark
 *            neutrals, because they are only ever used as dark surfaces —
 *            footer, page banners, image scrims.
 *   gold   → rose-tinted secondary. Light steps read as on-dark text, deep
 *            steps as eyebrows and labels on light.
 *   ivory  → surfaces and on-dark text. DEFAULT is white; 100/200 are the light
 *            grey bands that alternate between sections.
 *   ink    → charcoal body text.
 *   star   → the one warm accent left, reserved for rating stars.
 */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Royal purple (50–800) + deep aubergine surfaces (900/950)
        maroon: {
          50: '#faf6fd',
          100: '#f4eafb',
          200: '#e9d6f6',
          300: '#d7b4ee',
          400: '#bf87e0',
          500: '#a45ecf',
          600: '#8a3fb5',
          700: '#6b2d8f', // the signature royal purple
          800: '#582674',
          900: '#2a1533', // dark surface — footer, page banners
          950: '#1a0d20', // darkest surface — scrims, footer link columns
          DEFAULT: '#6b2d8f',
        },
        // Blush secondary — labels, eyebrows, on-dark headings
        gold: {
          50: '#fdf5f9',
          100: '#fbe9f2',
          200: '#f7d5e6',
          300: '#e9a6c4', // the signature blush
          400: '#dd82ac',
          500: '#cd5c8f',
          600: '#b34172',
          700: '#94305c',
          800: '#7a2a4d',
          900: '#64243f',
          DEFAULT: '#e9a6c4',
        },
        // Surfaces + on-dark text
        ivory: {
          DEFAULT: '#faf7fb', // soft white — the default page surface
          50: '#ffffff',
          100: '#f5f0f8',
          200: '#ece4f1',
        },
        // Plum charcoal text
        ink: {
          DEFAULT: '#2b2430',
          soft: '#575062',
          muted: '#6f6879', // darkened from the old grey so secondary text clears AA
        },
        // Rating stars only
        star: '#f5a623',
      },
      fontFamily: {
        display: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(20,20,24,0.04), 0 8px 24px -12px rgba(20,20,24,0.12)',
        lift: '0 8px 20px -6px rgba(20,20,24,0.10), 0 24px 48px -20px rgba(20,20,24,0.18)',
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
