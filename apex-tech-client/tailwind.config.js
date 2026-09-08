/**@type {import('tailwindcss').COnfig} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: "#0B0E14",
        surface: {
          DEFAULT: "#181A20",
          card: "#22252D",
          light: "#2B2D3A",
          input: "#2A2D37",
        },
        neon: {
          blue: "#00E5FF",
          purple: "#9D00FF",
          green: "#00FF66",
        },
        textMuted: "#8E92BC",
        },
      },
    },
    plugins: [],
  };

