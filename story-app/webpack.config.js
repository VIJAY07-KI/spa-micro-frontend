const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  entry: "./src/index.tsx",
  mode: "development",

  output: {
    publicPath: "auto"
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },

  module: {
    rules: [
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      { test: /\.(ts|tsx)$/, loader: "ts-loader", exclude: /node_modules/ }
    ]
  },

  devServer: {
    port: 9002,
    historyApiFallback: true,
    headers: { "Access-Control-Allow-Origin": "*" }
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "story_app",
      filename: "remoteEntry.js",

      exposes: {
        "./App": "./src/App.tsx"
      },

      // REMOTE MUST NOT SHARE REACT
      shared: {
        react: { singleton: false, requiredVersion: false },
        "react-dom": { singleton: false, requiredVersion: false }
      }
    }),

    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "index.ejs")
    })
  ]
};
