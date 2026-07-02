/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Palette « artisan premium » : bleu nuit + ambre cuivré
        primary: {
          DEFAULT: '#123A5F',  // Bleu nuit pétrole
          dark: '#0B2740',
          light: '#3A6B99',
        },
        secondary: {
          DEFAULT: '#E8850C',  // Ambre cuivré (CTA)
          dark: '#C26D04',
          light: '#FFA733',
        },
        accent: '#FFC53D',     // Or chaud (étoiles, éclair)
        ink: '#0A1B2E',        // Fond sombre (hero, footer)
        paper: '#F7F4ED',      // Fond clair chaud
      },
      fontFamily: {
        sans: ['Archivo', 'system-ui', 'sans-serif'],
        display: ['"Bricolage Grotesque"', 'Archivo', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(10, 27, 46, 0.06), 0 8px 24px -12px rgba(10, 27, 46, 0.18)',
        'card-hover': '0 2px 4px rgba(10, 27, 46, 0.08), 0 20px 40px -16px rgba(10, 27, 46, 0.28)',
        glow: '0 0 0 4px rgba(232, 133, 12, 0.18)',
      },
    },
  },
  plugins: [],
}
