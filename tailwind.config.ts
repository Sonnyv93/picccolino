import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // olive-green palette (token names kept from the original brass theme)
        ink: "#0f110a", // near-black olive base
        surface: "#161a10",
        cream: "#ece7d8",
        stone: "#98997e",
        brass: "#a8ab6e", // olive accent
        brassDim: "#6e7248",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
