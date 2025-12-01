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
      {
        test: /\.(ts|tsx)$/i,
        exclude: /node_modules/,
        use: "ts-loader"
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "host",

      remotes: {
        comments_app: "comments_app@http://localhost:9001/remoteEntry.js",
        story_app: "story_app@http://localhost:9002/remoteEntry.js"
      },

      shared: {
        react: {
          singleton: true,
          requiredVersion: "17.0.2"
        },
        "react-dom": {
          singleton: true,
          requiredVersion: "17.0.2"
        }
      }
    }),

    new HtmlWebpackPlugin({
      template: "./public/index.html"
    })
  ],

  devServer: {
    port: 3000,
    historyApiFallback: true,
    hot: true,
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  }
};
