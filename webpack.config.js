const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const BrotliPlugin = require("brotli-webpack-plugin");
module.exports = {
  mode: "production",
  entry: "./src/main.jsx",
  output: {
    publicPath: "/playlistShuffle",
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
        use: ["babel-loader"],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
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
    new FaviconsWebpackPlugin("./src/icon.svg"),
    new WebpackManifestPlugin(),
    // new BundleAnalyzerPlugin(),
    new CompressionPlugin({
      algorithm: "gzip",
      test: /.js$|.css$/,
    }),
    new BrotliPlugin({
      test: /.js$|.css$/,
    }),
  ],
  devServer: {
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
    historyApiFallback: {
      index: "/playlistShuffle",
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
