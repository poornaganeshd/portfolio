// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#F5F5F5",
        ink: "#000000",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
        display: ['Anton', 'sans-serif'],
        cyber: ['Space Grotesk', 'sans-serif'],
        tech: ['Space Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};
