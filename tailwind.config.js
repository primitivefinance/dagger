/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dagger0': '#171717',
        'dagger1': '#262626',
        'dagger2': '#404040',
        'dagger3': '#a3a3a3',
        'dagger4': '#f5f5f5',
      },
      fontWeight: {
        normal: 500,
        bold: 600,
      },
      fontFamily: {
        sans: ['Suisse Intl', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

