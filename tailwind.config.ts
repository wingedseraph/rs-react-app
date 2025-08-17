/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  plugins: [],
  theme: {
    extend: {
      colors: {
        background: {
          dark: 'hsl(46, 82%, 50%)',
          light: 'hsl(46, 82%, 90%)',
        },
        primary: {
          dark: 'hsl(220, 51%, 20%)',
          light: 'hsl(220, 51%, 30%)',
        },
      },
    },
  },
};
