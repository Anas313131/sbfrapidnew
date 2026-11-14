/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#F0F4FA',
          100: '#DCE6F4',
          200: '#B5C8E6',
          300: '#87A6D4',
          400: '#5A83C0',
          500: '#3A66A6',
          600: '#2B5190',
          700: '#1F3F78',
          800: '#173161',
          900: '#102B59',
          950: '#0B1D3D',
        },
        red: {
          50: '#FFF1F2',
          100: '#FFE0E3',
          500: '#E8303F',
          600: '#D7192D',
          700: '#B3142A',
          800: '#8F1222',
        },
        green: {
          50: '#EEF9F1',
          100: '#D5F0DD',
          500: '#38A852',
          600: '#2C8A44',
          700: '#22703A',
        },
        sky: {
          50: '#F7FAFE',
          100: '#EEF5FF',
          200: '#DCE9FB',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(16, 43, 89, 0.06), 0 8px 24px rgba(16, 43, 89, 0.08)',
        lift: '0 2px 4px rgba(16, 43, 89, 0.08), 0 16px 40px rgba(16, 43, 89, 0.14)',
      },
    },
  },
  plugins: [],
};
