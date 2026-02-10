/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#E50914', // Netflix Red
          light: '#FF1F1F',
          dark: '#B20710',
        },
        secondary: {
          DEFAULT: '#FFFFFF', // White text/accents
          light: '#F5F5F1',
          dark: '#E5E5E5',
        },
        accent: {
          DEFAULT: '#000000', // Deep Black
          light: '#141414',   // Netflix Background
          dark: '#000000',
        },
        success: {
          DEFAULT: '#46D369',
          light: '#6CE88B',
          dark: '#1F9D40',
        },
        warning: {
          DEFAULT: '#F59E0B',
          light: '#FBBF24',
          dark: '#D97706',
        },
        error: {
          DEFAULT: '#E50914',
          light: '#FF1F1F',
          dark: '#B20710',
        },
        dark: {
          DEFAULT: '#141414',
          light: '#181818',
          lighter: '#2F2F2F',
          card: 'rgba(20, 20, 20, 0.85)', // Darker, more opaque cards
        },
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      animation: {
        'gradient-x': 'gradient-x 15s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': {
            'background-position': '0% 50%',
          },
          '50%': {
            'background-position': '100% 50%',
          },
        },
        'float': {
          '0%, 100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-10px)',
          },
        },
        'pulse-glow': {
          '0%, 100%': {
            opacity: '1',
            boxShadow: '0 0 20px rgba(138, 43, 226, 0.7)',
          },
          '50%': {
            opacity: '0.8',
            boxShadow: '0 0 10px rgba(138, 43, 226, 0.3)',
          },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};