/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: "#09090B",
        darkCard: "#111827",
        darkPrimary: "#FAFAFA",
        darkSecondary: "#A1A1AA",
        darkMuted: "#71717A",
        lightBg: "#F8F9FB",
        lightPrimary: "#111827",
        lightSecondary: "#6B7280",
        accentBlue: "#3B82F6",
        accentHover: "#2563EB",
      },
      borderRadius: {
        small: "8px",
        card: "12px",
        largeCard: "16px",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
