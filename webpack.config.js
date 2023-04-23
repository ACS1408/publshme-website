const path = require("path");

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "public/assets/js/main.js"),
  output: {
    path: path.resolve(__dirname, "public/output"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
