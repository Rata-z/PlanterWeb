import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
    },
  },
  "files.associations": {
    "*.css": "tailwindcss",
  },
  "editor.quickSuggestions": {
    strings: "on",
  },
  plugins: [],
} satisfies Config;
