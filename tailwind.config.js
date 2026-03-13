/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#e11d48',
        secondary: '#9333ea',
        safe: '#16a34a',
        warning: '#f59e0b',
        danger: '#dc2626',
      },
    },
  },
  plugins: [],
}
