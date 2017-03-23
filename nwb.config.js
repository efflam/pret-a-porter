module.exports = {
  type: "web-module",
  npm: {
    esModules: true,
    umd: false
  },
  babel: {
    presets: ["es2015", "stage-0"],
    plugins: [
      ["transform-decorators-legacy"],
      ["transform-react-jsx", { pragma: "h" }]
    ]
  }
};
