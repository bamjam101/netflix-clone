/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,tsx,js}"],
  theme: {
    extend: {
      colors: {
        dark: "hsl(0deg 0% 8%)"
      },
      animation: {
        "slide-rtl": "slide-rtl .5s ease-in-out",
        "slide-ltr": "slide-ltr .6s ease-in-out",
      },

      keyframes: {
        "slide-rtl": {
          from: { "margin-right": "-90%" },
          to: { "margin-right": "0%" }
        },
        "slide-ltr": {
          from: { "margin-right": "90%" },
          to: { "margin-right": "0%" }
        },
      }
    }
  },
  plugins: [require('@tailwindcss/line-clamp'), require('tailwind-scrollbar-hide')],
}