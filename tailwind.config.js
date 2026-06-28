/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
    },
    extend: {
      fontFamily: {
        sans: ['Outfit', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      colors: {
        brand: {
          deep: '#0F172A', // off-black / deep slate instead of pure black
          dark: '#0A192F', // very deep navy
          navy: '#0B2545', // presidential blue
          blue: '#134074', // secondary blue
          accent: '#8DA9C4', // light blue accent
          gold: '#C5A880', // premium gold tone
          goldlight: '#EEF4F8', // premium light surface tint
        }
      },
      boxShadow: {
        premium: '0 10px 30px -15px rgba(2, 12, 27, 0.3)',
        glass: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'spotlight': '0 0 20px rgba(197, 168, 128, 0.15)',
      }
    },
  },
  plugins: [],
};
