/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        coal: '#070707',
        blood: '#C41010'
      },
      boxShadow: {
        redGlow: '0 0 22px rgba(196,16,16,.55)'
      }
    },
  },
  plugins: [],
}
