const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.conf');

module.exports = merge(webpackBaseConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  output: {
    // publicPath: path.resolve('dist'), // 不要开启这个，这个对热更新文件路径有影响
    path: path.resolve('dist'),
    filename: '[name].[hash].js',
  },
  devServer: {
    contentBase: '../dist',
    hot: true,
    progress: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env'),
    }),
    new webpack.HotModuleReplacementPlugin(),
  ]
})