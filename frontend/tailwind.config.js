/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#1746d1',
          blueDark: '#0e2f8c',
          blueLight: '#3b6bf0',
          green: '#2fb84f',
          greenDark: '#25963f',
        },
      },
      borderRadius: {
        xl2: '1.25rem',
      },
    },
  },
  plugins: [],
};
