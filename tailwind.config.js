/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3cbbd6',
        primary_hover:'#4ED5F2',
        primary_flat:'#3CBBD6',
        primary_flat_hover:'#3CBBD61F',
        primary_light:'#4CCFEB',

        secondary:'#33bb99',
        secondary_hover:'#31DDB2',

        success:'#8438ff',
        success_hover:'#9156F0',
        success_light:'#8438FF1F',

        danger:'#e73b3c',
        danger_hover:'#F34F54',
        danger_disable: '#E73B3CA6',
        danger_clean: '#E73B3C1F',

        warning:'#ff7438',
        warning_hover:'#FC824D',

        info:'#fcc235',
        info_hover:'#FFC946',

        dark:'#3b3c3d',
        dark_hover:'#4E4F50',
        dark_flat_hover:'#3B3C3D1F',

        light:'#A4ACB9',

        gray_clear: '#e1e0e6',
        gray_light: '#f5f5f5',

        white: '#fff',

        violet_dark:'#6E6B7B',

        title_color:'#5E5873',
      },
      
    },
    screens: {
      'lg': {'max':'1024px'},
      'md': {'max': '768px'},
    },
  },
  plugins: [],
}
