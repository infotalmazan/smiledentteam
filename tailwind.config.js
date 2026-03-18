/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        sdt: {
          // Primary teal — from SDT logo
          50:  '#f0faf7',
          100: '#e6f4f0',
          200: '#c2e5db',
          300: '#8ecfc0',
          400: '#4db09a',
          500: '#0d8a72',  // mid
          600: '#0a6b5c',  // PRIMARY
          700: '#085248',
          800: '#063d36',
          900: '#042b25',
        },
        pink: {
          // Accent pink — S bar in logo
          50:  '#fde6f0',
          100: '#fbbdd8',
          400: '#f0599a',
          500: '#e8157a',  // PRIMARY ACCENT
          600: '#c4106a',
          700: '#9a0d53',
        },
      },
      fontFamily: {
        sans: ['DM Sans', 'Helvetica Neue', 'Arial', 'sans-serif'],
        display: ['Syne', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
