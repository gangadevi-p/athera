/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'warm-sand': '#F5F0E8',
        walnut: '#5C3D2E',
        terracotta: '#C16A44',
        sage: '#7A9E7E',
        stone: '#A89F94',
        cream: '#FBF8F3',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        heading: ['"Cormorant Garamond"', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
