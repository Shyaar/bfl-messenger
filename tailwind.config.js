/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./build/**/*.{html,js}"],
  theme: {
    extend:{
      animation: {
        'bounce-slow': 'bounce 30s infinite',
      },
    },
  },
  plugins: [],
}

