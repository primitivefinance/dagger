/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: '390px', // older iphones
        xl: '1280px',
        '2xl': '1536px',
        '4xl': '3840px',
      },

      colors: {
        transparent: 'transparent',
        midnight: '#191970',
        primary: '#191970',
        accent: '#23252B',
        black: '#151718',
        background: '#f9f9f9',
        white: {
          DEFAULT: '#FFFFFF',
          100: '#fcfcfc',
          200: '#f8f9f9',
          300: '#f5f6f7',
          400: '#f1f3f4',
          500: '#eef0f1',
          600: '#ebecee',
          700: '#e7e9eb',
          800: '#e4e6e9',
          900: '#e0e3e6',
        },
        green: {
          DEFAULT: '#2BBA58',
          100: '#E1FDEA',
          200: '#BCF2CD',
          300: '#95E8AF',
          400: '#6CDD90',
          500: '#45D471',
          600: '#2BBA58',
          700: '#1F9143',
          800: '#136730',
          900: '#063F1A',
        },
        blue: {
          DEFAULT: '#4845e2',
          100: '#eaedfd',
          200: '#d9dffb',
          300: '#bac3f8',
          400: '#929cf3',
          500: '#666cec',
          600: '#4845e2',
          700: '#3833ce',
          800: '#2f2aad',
          900: '#29258d',
        },
        gray: {
          100: '#F1F1FC',
          200: '#D6D8DF',
          300: '#BBBEC3',
          400: '#A2A4AA',
          500: '#878A91',
          600: '#6D7077',
          700: '#55575E',
          800: '#3D3E44',
          900: '#23252B',
        },
      },
      spacing: {
        0.25: '0.0625rem',
        0.75: '0.195rem',
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem',
        '2xl': '4rem',
        '3xl': '8rem',
        '4xl': '16rem',
        '5xl': '32rem',
        '6xl': '64rem',
        112: '28rem',
      },
      letterSpacing: {
        tighter: '-.04em',
      },
      lineHeight: {
        tight: 1.2,
      },
      fontSize: {
        '5xl': '2.5rem',
        '6xl': '2.75rem',
        '7xl': '4.5rem',
        '8xl': '6.25rem',
      },
      fontWeight: {
        light: 300,
        normal: 400,
        bold: 700,
      },
      fontFamily: {
        sans: ['Suisse Intl', 'sans-serif'],
      },
      boxShadow: {
        sm: '0 5px 10px rgba(0, 0, 0, 0.12)',
        md: '0 8px 30px rgba(0, 0, 0, 0.12)',
      },
    },
  },
  plugins: [],
}

