/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        keyframes: {
          logoInitial: {
            '0%': { transform: 'translateY(-100px)', opacity: '0' },
            '100%': { transform: 'translateY(0)', opacity: '1' },
          },
        },
        animation: {
          logoInitial: 'logoInitial 1s ease-in-out',
        },
      },
    },
  },
  plugins: [],
}