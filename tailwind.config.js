/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: ["Arial, Helvetica, sans-serif"], // Định nghĩa font tùy chỉnh
        mono: ["var(--font-geist-mono)"], // Nếu bạn muốn dùng font-mono
      },
    },
  },
  plugins: [],
};
