const colors = require('tailwindcss/colors');
const defaultConfig = require('tailwindcss/defaultConfig');

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      normal: ['Nunito-Regular'],
    },
    fontSize: {
      ...defaultConfig.theme.fontSize,
      'confirmation-date': '90px',
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.blueGray,
      indigo: colors.indigo,
      red: colors.rose,
      yellow: colors.amber,
      purple: colors.purple,
      blue: colors.blue,
      green: colors.green,
    },
    extend: {
      colors: {
        'lasswho-main': '#151515',
        'lasswho-secondary': '#343434',
        'lasswho-accent': '#C31811',
        'lasswho-green': '#00B050',
        'lasswho-gold': '#FFC000',
        'login-FB': '#3b5998',
      },
      borderRadius: {
        xl: '30px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
