/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dagger0': 'rgb(23, 23, 23)', // '#0e0e11', // '#000000',
        'dagger1': 'rgb(38, 38, 38)', // '#1d1c20', // '#0c0c0c',
        'dagger2': 'rgb(64, 64, 64)', // 'rgba(255,255,255,.08)', // 'rgba(255, 255, 255, 0.07)',
        'dagger3': '#a3a3a3', // '#a9a9a9', // 'rgba(255, 255, 255, 0.48)',
        'dagger4': '#f5f5f5',
      },
      fontWeight: {
        light: 300,
        normal: 400,
        bold: 700,
      },
      fontFamily: {
        sans: ['Suisse Intl', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

