import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // --- Warna Bawaan Kamu (Tetap Aman) ---
        "brand-dark": "#0a0a0a",
        "brand-charcoal": "#1a1a1a",
        "brand-red": "#B22222",
        "brand-dark-red": "#8B0000",
        "brand-light-red": "#DC143C",
        "brand-gray": "#8a8a8a",
        "brand-light-gray": "#d1d1d1",

        // --- Warna Premium Baru untuk Web Kenar ---
        background: "#030712", // Deep slate black (Biar nggak tabrakan sama brand-dark)
        primary: "#1DB954", // Spotify green (buat controller lagu)
        romantic: {
          50: "#fdf2f8",
          400: "#ec4899", // Pink romantis utama
          600: "#db2777",
          900: "#1e1b4b", // Deep indigo untuk background gradient
        },
      },
      fontFamily: {
        // Font bawaanmu tetap ada
        sans: ["Inter", "sans-serif"],
        syne: ["var(--font-syne)", "sans-serif"],
        // Tambahan untuk font ala The 1975
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      animation: {
        // --- Animasi Bawaan Kamu ---
        float: "float 6s ease-in-out infinite",
        "pulse-green": "pulse-green 2s infinite cubic-bezier(0.66, 0, 0, 1)",
        scroll: "scroll 20s linear infinite",
        "fade-in-down": "fadeInDown 1.2s ease-out forwards",

        // --- Animasi Tambahan Baru ---
        "fade-in-up": "fadeInUp 0.8s ease-out forwards",
        "fade-in": "fadeIn 1s ease-out forwards",
      },
      keyframes: {
        // --- Keyframes Bawaan Kamu ---
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "pulse-green": {
          "0%": { width: "100%", height: "100%", opacity: "0.7" },
          "100%": { width: "300%", height: "300%", opacity: "0" },
        },
        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        fadeInDown: {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },

        // --- Keyframes Tambahan Baru ---
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
