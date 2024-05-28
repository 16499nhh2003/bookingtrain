/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}" , 
    "./public/index.html"

  ],
  theme: {
    extend: {
      width: {
        "1100" : "1100px"
      }, 
      backgroundColor: {
        // primary: '#FFFFFF',
        secondary1: '#1266dd',
        secondary2: '#f73859',
        'overlay-30': 'rgba(0,0,0,0.3)',
        'overlay-70': 'rgba(0,0,0,0.7)',
      },
      maxWidth : {
        '1100' :  '1100px'
      }
    },
  },
  plugins: [],
}