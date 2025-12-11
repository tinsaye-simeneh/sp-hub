/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        // Background colors
        bg: {
          primary: '#181921',
          secondary: '#1D1E2B',
          tertiary: '#1A1A1A',
          hover: '#252525',
          card: '#1D1E2B',
          header: '#6D00FF',
          indicator: '#26273B',
          overlay: '#00000026',
          overlayHover: '#00000040',
          dateToday: '#252636',
        },
        // Text colors
        text: {
          primary: '#FFFFFF',
          secondary: '#B3B3B3',
          tertiary: '#808080',
          muted: '#CAC4D0',
          disabled: '#4A4A4A',
        },
        // Brand/Accent colors
        brand: {
          primary: '#00FFA5',
          secondary: '#6D00FF',
          accent: '#00FFA5',
        },
        // Status colors
        status: {
          live: '#10B981',
          finished: '#EE5E52',
          ft: '#EF4444',
          ht: '#10B981',
          scheduled: '#808080',
          success: '#10B981',
          error: '#FF0000',
        },
        // Card colors
        card: {
          yellow: '#FFD700',
          red: '#FF0000',
        },
        // Border colors
        border: {
          primary: '#2A2A2A',
          secondary: '#1F1F1F',
        },
      },
    },
  },
  plugins: [require("daisyui")],
}

