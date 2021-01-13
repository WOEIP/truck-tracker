'use strict';

const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const MiniCssExtractPluginConfig = new MiniCssExtractPlugin({filename: 'main.css'});
const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/src/index.html',
  filename: 'index.html',
  inject: 'body'
});
const NamedModulesPlugin = new webpack.NamedModulesPlugin();

module.exports = {
  devServer: {
    port: 8083
  },
  devtool: 'source-map',
  entry: {
    main: ['babel-polyfill', 'react-hot-loader/patch', './src/index']
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: '[name].js'
  },
  plugins: [
    NamedModulesPlugin,
    MiniCssExtractPluginConfig,
    HTMLWebpackPluginConfig
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        include: __dirname + '/src',
        use: ['babel-loader']
      },
      {
        test: /\.(s*)css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
      },
      {
        test: /.(png|jpg|jpeg|gif|svg|woff|woff2|eot|ttf)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8000,
              name: 'img/[hash]-[name].[ext]'
            }
          },
        ]
      }
    ]
  }
};
