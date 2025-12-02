const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  entry: "./src/index.tsx",
  mode: "development",

  // 👇 ADD THIS LINE TO REMOVE eval() AND CLEAN THE CONSOLE
  devtool: "source-map",

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
    port: 9001,
    historyApiFallback: true,
    headers: { "Access-Control-Allow-Origin": "*" }
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "comments_app",
      filename: "remoteEntry.js",

      exposes: {
        "./App": "./src/App.tsx"
      },

      // REMOTE SHOULD NOT SHARE REACT
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
