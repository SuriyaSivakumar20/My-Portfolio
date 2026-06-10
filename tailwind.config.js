/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FFFFFF',
          light: '#F0F0F0',
          dark: '#CCCCCC',
        },
        secondary: {
          DEFAULT: '#000000',
          light: '#111111',
          dark: '#000000',
        },
        accent: {
          DEFAULT: '#888888',
          light: '#AAAAAA',
          dark: '#555555',
        },
        success: {
          DEFAULT: '#FFFFFF',
          light: '#EEEEEE',
          dark: '#BBBBBB',
        },
        warning: {
          DEFAULT: '#AAAAAA',
          light: '#CCCCCC',
          dark: '#888888',
        },
        error: {
          DEFAULT: '#FFFFFF',
          light: '#EEEEEE',
          dark: '#CCCCCC',
        },
        dark: {
          DEFAULT: '#000000',
          light: '#0a0a0a',
          lighter: '#1a1a1a',
          card: 'rgba(10, 10, 10, 0.95)',
        },
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', 'monospace'],
        mono: ['"Share Tech Mono"', 'monospace'],
        body: ['"Inter"', 'sans-serif'],
        poppins: ['"Press Start 2P"', 'monospace'],
        inter: ['"Inter"', 'sans-serif'],
      },
      animation: {
        'cursor-blink': 'cursor-blink 1s step-end infinite',
        'pixel-float': 'pixel-float 4s ease-in-out infinite',
        'scanline': 'scanline 8s linear infinite',
        'march': 'march 1s step-start infinite',
      },
      keyframes: {
        'cursor-blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        'pixel-float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'scanline': {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '0 100vh' },
        },
        'march': {
          '0%': { strokeDashoffset: '0' },
          '100%': { strokeDashoffset: '-16' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};