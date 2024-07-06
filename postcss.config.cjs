module.exports = {
  plugins: [
    require("postcss-mobile-forever")({
      appSelector: "#app",
      viewportWidth: 750,
      maxDisplayWidth: 600,
    }),
  ],
}