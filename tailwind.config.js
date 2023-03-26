module.exports = {
  //mode: 'jit',
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        primary: "rgb(237, 76, 116)",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
