module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f4fa',
          100: '#d9e2f3',
          200: '#b3c5e7',
          300: '#8aa3d4',
          400: '#6685c2',
          500: '#1e3a8a',
          600: '#172e6e',
          700: '#112254',
          800: '#0c183d',
          900: '#060e28',
        },
        ink: '#0f172a',
        paper: '#ffffff',
        muted: '#64748b',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 12s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
}
