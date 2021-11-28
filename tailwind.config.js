module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      padding: {
        "4/3": "133.33%",
      },
      colors: {
        graybody: "#555555",
        grayLabel: "#C5C5C5",
        grayMiddle: "#8c8c8c",
        blue: "#58ade3",
        g: "#f6f6f6",
        gray: {
          1000: "#191919", // darkGray
          900: "#4b4b4b", // blacklight
          800: "#555555", // medium
          700: "#909090", // light
          600: "#A9A9A9",
          500: "#c5c5c5", // disable
          400: "#DDDDDD",
          300: "#EAEAEA", // productCardBorder
          200: "#EEEEEE",
          100: "#f5f5f5",
          50: "#f7f7f7",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
