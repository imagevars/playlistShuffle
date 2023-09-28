const { createThemes } = require('tw-colors');

module.exports = {
  content: ['./src/**/*.{html,jsx}'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      open: ['Open Sans', 'sans-serif'],
      nunito: ['Nunito', 'sans-serif'],
    },
    screens: {
      sm: '476px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
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
      red: '#fe0000',
    },
  },
  plugins: [
    createThemes({
      light: {
        primary: '#006868',
        secondary: '#008484',
        backColor: '#F2E7FE',
        textColor: '#000000',
        textColorInside: '#ffffff',
        gray: '#4d4d4d',
        accent: '#00cdcd',
        kofiHover: '#13C3FF',
      },
      dark: {
        primary: '#008BA7',
        secondary: '#00aacd',
        backColor: '#000000',
        textColor: '#ffffff',
        textColorInside: '#ffffff',
        gray: '#808080',
        accent: '#baf3ff',
        kofiHover: '#FF5E5B',
      },
      image: {
        primary: '#e94747',
        secondary: '#ed6969',
        backColor: '#404040',
        textColor: '#ffffff',
        textColorInside: '#ffffff',
        gray: '#999999',
        accent: '#f7bfbf',
        kofiHover: '#13C3FF',
      },
    }),
  ],
};
