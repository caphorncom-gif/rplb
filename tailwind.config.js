/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Couleurs électricien (bleu électrique + orange sécurité)
        primary: {
          DEFAULT: '#0066CC',  // Bleu électrique
          dark: '#004C99',
          light: '#3385D6',
        },
        secondary: {
          DEFAULT: '#FF6B35',  // Orange sécurité
          dark: '#E55A2B',
          light: '#FF8555',
        },
        accent: '#FFD700',     // Jaune (éclair)
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

