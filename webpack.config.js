const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
// eslint-disable-next-line
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const { HotModuleReplacementPlugin } = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");

const isDevelopment = process.env.NODE_ENV !== "production";
module.exports = {
  mode: isDevelopment ? "development" : "production",
  entry: ["./src/main.jsx", "./src/app.css"],
  output: {
    publicPath: "/",
    path: path.join(process.cwd(), "dist"),
    filename: "[name].bundle.js",
    chunkFilename: "[name].[contenthash].js",
    clean: true,
  },
  // devtool: "source-map",
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
    splitChunks: {
      chunks: "all",
    },
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve("babel-loader"),
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
              plugins: [
                isDevelopment && require.resolve("react-refresh/babel"),
              ].filter(Boolean),
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        include: path.resolve(__dirname, "src"),
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
  resolve: {
    extensions: ["", ".js", ".jsx"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
      scriptLoading: "defer",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "src/images/silivan-munguarakarama-NrR9gn3lFKU-unsplash.jpg",
          to: "assets/images/",
        },
        {
          from: "src/images/Logo_white.png",
          to: "assets/images/",
        },
      ],
    }),

    new MiniCssExtractPlugin(),
    new FaviconsWebpackPlugin("./src/images/favicon.png"),
    new WebpackManifestPlugin(),
    // new BundleAnalyzerPlugin(),
    new CompressionPlugin({
      test: /\.js$|\.css$|\.html$/,
      algorithm: "gzip",
    }),
    new CompressionPlugin({
      test: /\.js$|\.css$|\.html$/,
      algorithm: "brotliCompress",
    }),
    isDevelopment && new HotModuleReplacementPlugin(),
    isDevelopment && new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),
  devServer: {
    hot: true,
    watchFiles: ["src/**/*"],
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
    historyApiFallback: {
      index: "/",
    },

    static: {
      directory: path.join(__dirname, "dist"),
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    compress: true,
    port: 9550,
  },
};
