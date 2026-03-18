/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // shadcn/ui CSS variable approach
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        // SDT brand colors (direct usage)
        sdt: {
          50:  '#f0faf7',
          100: '#e6f4f0',
          200: '#c2e5db',
          300: '#8ecfc0',
          400: '#4db09a',
          500: '#0d8a72',
          600: '#0a6b5c',
          700: '#085248',
          800: '#063d36',
          900: '#042b25',
        },
        pink: {
          50:  '#fde6f0',
          100: '#fbbdd8',
          400: '#f0599a',
          500: '#e8157a',
          600: '#c4106a',
          700: '#9a0d53',
        },
      },
      fontFamily: {
        sans: ['Satoshi', 'Helvetica Neue', 'Arial', 'sans-serif'],
        display: ['Clash Display', 'Satoshi', 'sans-serif'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': { from: { height: '0' }, to: { height: 'var(--radix-accordion-content-height)' } },
        'accordion-up': { from: { height: 'var(--radix-accordion-content-height)' }, to: { height: '0' } },
        'slide-up': { from: { opacity: '0', transform: 'translateY(16px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        'slide-in-right': { from: { opacity: '0', transform: 'translateX(20px)' }, to: { opacity: '1', transform: 'translateX(0)' } },
        'scale-in': { from: { opacity: '0', transform: 'scale(.95)' }, to: { opacity: '1', transform: 'scale(1)' } },
        'shimmer': { from: { backgroundPosition: '-200% 0' }, to: { backgroundPosition: '200% 0' } },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'slide-up': 'slide-up .5s cubic-bezier(.25,.8,.25,1) both',
        'slide-in-right': 'slide-in-right .5s cubic-bezier(.25,.8,.25,1) both',
        'scale-in': 'scale-in .4s cubic-bezier(.25,.8,.25,1) both',
        'shimmer': 'shimmer 2s linear infinite',
      },
      boxShadow: {
        'glow-teal': '0 0 24px rgba(10,107,92,.15)',
        'glow-pink': '0 0 24px rgba(232,21,122,.12)',
        'premium': '0 20px 60px -10px rgba(10,30,24,.12)',
        'card-hover': '0 16px 48px rgba(10,107,92,.1), 0 4px 12px rgba(10,107,92,.06)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
