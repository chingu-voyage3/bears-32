const path = require('path');
const webpack = require('webpack');
const ChromeExtensionReloader = require('webpack-chrome-extension-reloader');
const ChromeDevPlugin = require('chrome-dev-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: {
    newtab: './src/newtab/index.js',
    background: './src/background/index.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'window.$': 'jquery',
    }),
    new ChromeExtensionReloader(),
    new ChromeDevPlugin({
      output: './manifest.json',
      entry: './src/manifest.json',
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      chunks: ['newtab'],
    }),
  ],
};
