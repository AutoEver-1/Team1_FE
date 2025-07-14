/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Noto Sans KR", "ui-sans-serif", "system-ui"],
      },
      colors: {
        amber: {
          900: "#1A130B", // 어두운 갈색
          800: "#3F2F13",
          700: "#7A6100",
          600: "#B58900",
          500: "#FDC500", // 메인 노랑
          400: "#FFE04B",
          300: "#FFF066",
          200: "#FFF6AD",
          100: "#FFFBE1", // 거의 흰색에 가까운 노랑
        },
      },
    },
  },
  plugins: [],
  variants: {
    extend: {
      opacity: ["group-hover"],
      translate: ["group-hover"],
    },
  },
};
