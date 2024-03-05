const { createThemes } = require('tw-colors');

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontWeight: {
        normal: 500,
        bold: 600,
      },
      fontFamily: {
        sans: ['Suisse Intl', 'sans-serif'],
      },
    },
  },
  plugins: [
    createThemes({
      variant1: {
        'brand': '#9872ff',
        'dagger0': '#101119',
        'dagger1': '#181A25',
        'dagger2': '#494E6F',
        'dagger3': '#F3F3F766',
        'dagger4': '#F3F3F7',
      },
      variant2: {
        'brand': '#6933ff',
        'dagger0': '#000000',
        'dagger1': '#0c0c0c',
        'dagger2': '#222222',
        'dagger3': '#666666',
        'dagger4': '#ffffff',
      },
      variant22: {
        'brand': '#d7ff37',
        'dagger0': '#000000',
        'dagger1': '#0c0c0c',
        'dagger2': '#ffffff0d',
        'dagger3': '#ffffff7a',
        'dagger4': '#ffffff',
      },
      variant3: {
        'brand': '#7000ff',
        'dagger0': '#111111',
        'dagger1': '#1c1c1c',
        'dagger2': '#444444',
        'dagger3': '#777777',
        'dagger4': '#ffffff',
      },
      variant4: {
        'brand': '#d7ff37', // '#2c5ee8',
        'dagger0': '#000000',
        'dagger1': '#0c0c0c',
        'dagger2': '#2c2c2c',
        'dagger3': '#999999',
        'dagger4': '#ffffff',
      },
      light: {
        'brand': '#2c5ee8', // '#2c5ee8',
        'dagger0': '#ffffff',
        'dagger1': '#eeeeeecc',
        'dagger2': '#1111111a',
        'dagger3': '#777777',
        'dagger4': '#000000',
      },
    }, { defaultTheme: 'variant4' })
  ],
}

