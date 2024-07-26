/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'selector',
  theme: {
    extend: {
      colors: {
        color1: '#C0C0C0',
        color2: '#B2BEB5',
        color3: '#76ABDF',
        color4: '#041E42',
        color5: '#034694',
        color6: '#0E3386',
        color7: '#0C2340',
        color8: '#0070BB',

        color9: '#FF4433',
        color10: '#FF7518',
        color11: '#DAA06D',
        color12: '#00FF7F',
        color13: '#89CFF0',
      },
      fontFamily: {
        font1: ['Syncopate'],
        font2: ['Exo'],
        font3: ['Bai Jamjuree'],
        font4: ['Raleway Dots'],
        font5: ['Tilt Neon'],
        font6: ['Offside'],
        font7: ['Inconsolata'],
      }
    },
  },
  plugins: [],
}