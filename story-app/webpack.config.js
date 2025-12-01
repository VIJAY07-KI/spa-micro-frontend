const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  entry: "./src/index.tsx",
  mode: "development",
  output: { publicPath: "auto" },
  resolve: { extensions: [".tsx", ".ts", ".js"] },
  module: {
    rules: [
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      { test: /\.(ts|tsx)$/, loader: "ts-loader", exclude: /node_modules/ }
    ]
  },
  devServer: { port: 9002, historyApiFallback: true },
  plugins: [
    new ModuleFederationPlugin({
      name: "story_app",
      filename: "remoteEntry.js",
      exposes: { "./App": "./src/index.tsx" },
      shared: {
        react: { singleton: true, requiredVersion: "17.0.2"},
        "react-dom": { singleton: true, requiredVersion: "17.0.2"}
      }
    }),
    new HtmlWebpackPlugin({ template: path.resolve(__dirname, "index.ejs") })
  ]
};
