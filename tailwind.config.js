/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'bg-hifeed-green',
    'bg-hifeed-accent',
    'bg-green-500',
    'bg-blue-500',
    'bg-purple-500',
    'border-red-200',
    'border-orange-200',
    'border-yellow-200',
    'border-purple-200',
    'bg-red-100',
    'bg-orange-100',
    'bg-yellow-100',
    'bg-purple-100',
    'text-red-500',
    'text-orange-500',
    'text-yellow-500',
    'text-purple-500',
    // Animation classes
    'float-animation',
    'float-delayed',
    'bounce-gentle',
    'rotate-slow',
    'wiggle',
    'pulse-scale',
    'fade-in-up',
    'slide-in-left',
    'slide-in-right',
    'is-visible',
    'scale-hover',
    'shake',
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      colors: {
        'hifeed-green': '#00AB7E',
        'hifeed-light': '#E8F5F0',
        'hifeed-dark': '#006B4F',
        'hifeed-accent': '#FF6B35',
        'hifeed-gray': '#F8FAFC'
      },
      animation: {
        'bounce-gentle': 'bounceGentle 2s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 1s ease-out',
        'slide-in-left': 'slideInLeft 1s ease-out',
        'slide-in-right': 'slideInRight 1s ease-out',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'pulse-scale': 'pulseScale 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'float-delayed': 'float 3s ease-in-out infinite 1.5s',
        'rotate-slow': 'rotateSlow 20s linear infinite',
        'shake': 'shake 0.5s ease-in-out',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(1deg)' },
          '75%': { transform: 'rotate(-1deg)' },
        },
        pulseScale: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        rotateSlow: {
          'from': { transform: 'rotate(0deg)' },
          'to': { transform: 'rotate(360deg)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-5px)' },
          '75%': { transform: 'translateX(5px)' },
        },
      },
    },
  },
  plugins: [],
}
