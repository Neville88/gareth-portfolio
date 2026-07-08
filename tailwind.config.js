/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Preset D — "Vapor Clinic" (Neon Biotech)
        // (named "night" not "base" to avoid clashing with Tailwind's text-base)
        night: '#0A0A14',
        accent: '#7B61FF',
        light: '#F0EFF4',
        surface: '#18181B',
      },
      fontFamily: {
        sans: ['Sora', 'system-ui', 'sans-serif'],
        drama: ['"Instrument Serif"', 'Georgia', 'serif'],
        mono: ['"Fira Code"', 'ui-monospace', 'monospace'],
      },
      transitionTimingFunction: {
        magnetic: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
}
