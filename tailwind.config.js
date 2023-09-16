module.exports = {
  content: ['./src/**/*.{html,jsx}'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      open: ['Open Sans', 'sans-serif'],
      nunito: ['Nunito', 'sans-serif'],
    },
    extend: {
      dropShadow: {
        '3xl': '3px 5px 2px rgb(0 0 0 / 0.4)',
        svgShadow: '1px 0.5px 1px rgb(0 0 0 / 0.4)',
        svgShadowDarkMode: '1px 0.5px 1px rgb(255 255 255 / 0.4)',
      },
      boxShadow: {
        shadowBox: '1.5px 1.5px 2px black;',
        shadowBoxDarkMode: '1.5px 1.5px 2px white;',
        shadowLine: '1px 1px 1px bgBlack;',
        shadowLineDarkMode: '1px 1px 1px #8c8c8c;',

      },
    },
    colors: {
      black: '#000000',
      white: '#ffffff',
      bgWhite: '#F2E7FE',
      primaryColor: '#0c518a',
      primaryColorDarker: '#0b4677',
      DarkPrimaryColor: '#00aacd',
      DarkPrimaryColorDarker: '#008BA7',
      borderColor: '#C6C6C6',
      bgBlack: '#000000',
      bgShadow: '#4d4d4d',
      gray: '#4F4F4F',
      clearGray: '#C6C6C6',
      lightGray: '#d4d4d4',
    },
  },
  plugins: [],
};
