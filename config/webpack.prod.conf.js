const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.conf');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(webpackBaseConfig, {
  mode: 'production',
  devtool: 'source-map', // 开启调试的原因是，利于线上程序出错后，错误查找
  output: {
    publicPath: path.resolve('dist'),
    path: path.resolve('dist'),
    filename: '[name].[chunkhash].js',
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/prod.env'),
    }),
    new UglifyJsPlugin({ // 相比 webpack 自带的代码压缩，他可以用来删除未引用的代码
      sourceMap: true,
    })
  ]
})