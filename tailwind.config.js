// @type {import('tailwindcss').Config}

import defaultTheme from "tailwindcss/defaultTheme";
import colors from "tailwindcss/colors";

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    colors: {
      lilac: { 50: "#4437FF80", 100: "#6843FF" },
      purple: "#4324c2",
      white: colors.white,
      gray: colors.gray,
      green: colors.green,
      red: colors.red,
      yellow: "#fdc500" //"#ff9e00" //"#ffb703",
    },
    extend: {
      fontFamily: {
        sans: ['"Press Start 2P"', ...defaultTheme.fontFamily.sans],
      },
      dropShadow: {
        lg: [
          "1.75px 1.75px 0px #6843FF",
          "1.5px 1.5px 0px #6843FF",
          "1.25px 1.25px 0px #6843FF",
          "1px 1px 0px #6843FF",
          "0.5px 0.5px 0px #6843FF",
          "0.25px 0.25px 0px #6843FF",
        ],
      },
    },
    container: {
      center: true,
    },
  },
  plugins: [],
};
