/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {
      colors: {
        primary: '#17181F',
        secondary: '#21212B',
        tertiary: '#DEDEDF',
        quaternary: '#FB76A0',
      },
      fontFamily: {
        Pacifico: ['Pacifico', 'cursive'],
        Courgette: ['Courgette', 'cursive'],
      },
      screens: {
        mobile: {
          max: '640px',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
}
