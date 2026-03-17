/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'stiff-black': '#14110F',
        'stiff-gray': '#34312D', 
        'stiff-white': '#F3F3F4',
        'stiff-accent': '#6300FF',
      },
      fontFamily: {
        display: ['Oswald', 'sans-serif'], // Bold headers
        body: ['Inter', 'sans-serif'],     // Paragraphs
        caption: ['Caveat', 'cursive'],    // For polaroid captions
      },
      fontSize: {
        'mega': ['clamp(4rem, 15vw, 12rem)', { lineHeight: '0.9' }],
      },
      animation: {
        marquee: 'marquee 25s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        }
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}