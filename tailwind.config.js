module.exports = {
  purge: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./HOC/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    backgroundColor: (theme) => ({
      ...theme("colors"),
      "very-dark-violet-color": "hsl(260, 8%, 14%)",
    }),
    textColor: (theme) => ({
      ...theme("colors"),
      "very-dark-violet-color": "hsl(260, 8%, 14%)",
    }),
    extend: {
      backgroundImage: (theme) => ({
        "grass-background": "url('/images/grass-background.png')",
        "forest-background": "url('/images/background-forest.jpg')",
        "forest-background-2": "url('/images/background-forest-2.jpg')",
        "background-green-meadow": "url('/images/background-green-meadow.jpg')",
      }),
    },
  },
  variants: {
    extend: {
      width: ["hover", "focus"],
      fontSize: ["hover", "focus"],
    },
  },
  plugins: [],
}
