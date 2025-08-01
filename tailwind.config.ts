/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          light: 'hsl(220, 51%, 30%)',
          dark: 'hsl(220, 51%, 20%)',
        },
        background: {
          light: 'hsl(46, 82%, 90%)',
          dark: 'hsl(46, 82%, 50%)',
        },
      },
    },
  },
  plugins: [],
};
