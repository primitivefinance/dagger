/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dagger0': '#131722', // '#171717',
        'dagger1': '#1D2635', // '#262626',
        'dagger2': '#253041', // '#404040',
        'dagger3': '#999999', // '#a3a3a3',
        'dagger4': '#FFFFFF', // '#f5f5f5',
      },
      fontWeight: {
        normal: 500,
        bold: 600,
      },
      /*

      fontSize: {
        xs: '14px',
        sm: '16px',
        md: '18px'
      },
      */
      fontFamily: {
        sans: ['Suisse Intl', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

