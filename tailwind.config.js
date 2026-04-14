/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          300: '#4a7ab5',
          400: '#2a4f82',
          500: '#1e3a5f',
          600: '#162d4a',
          700: '#0e1e32',
        },
        light: {
          700: '#e0e8f0',
          800: '#f0f4f8',
          900: '#f8f9fa',
          950: '#ffffff',
        },
      },
      fontFamily: {
        // PP Neue Machina is the licensed brand font. Space Grotesk is the
        // closest open-source proxy (geometric sans, same x-height family).
        sans: ['"PP Neue Machina"', '"Space Grotesk"', 'system-ui', 'sans-serif'],
        display: ['"PP Neue Machina"', '"Space Grotesk"', 'system-ui', 'sans-serif'],
        serif: ['Fraunces', '"Playfair Display"', 'Georgia', 'serif'],
      },
      fontSize: {
        // Brand typography scale — desktop values
        'eyebrow': ['11px', { lineHeight: '1.4', letterSpacing: '0.12em' }],
        'body': ['15px', { lineHeight: '1.7' }],
        'body-lg': ['16px', { lineHeight: '1.7' }],
        'h2-card': ['22px', { lineHeight: '1.2' }],
        'h1-section': ['44px', { lineHeight: '1.1' }],
        'display': ['72px', { lineHeight: '1.0' }],
        'stat': ['44px', { lineHeight: '1.0' }],
      },
      letterSpacing: {
        'brand-eyebrow': '0.12em',
        'brand-button': '0.02em',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 25s linear infinite',
        'gradient-x': 'gradientX 8s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        gradientX: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
