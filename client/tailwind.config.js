/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'custom':[ 'SFMono-Regular']
      
      },
      colors:{
        tealc:'#244855',
        greyc:'#90AEAD',
        orangec:'#E64833',
        brownc:'#874f41',
        skinc:'#FBE9D0'
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
  ],
}