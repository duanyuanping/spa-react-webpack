const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
// const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const nodeModulePath = path.resolve(__dirname, './node_module');

module.exports = {
  mode: 'development',
  entry: [
    './src/index.js'
  ],
  resolve: {
    modules: ['node_modules'], // 告诉 webpack 解析模块应该搜索的目录
    extensions: ['.web.js', '.js', '.json', '.web.jsx', '.jsx'], // 用户引用模块是这些文件不用标明后缀
    // plugins: [new ModuleScopePlugin('/src') /* 规定自定义的模块只能在 src 目录中使用 */] // 额外的解析插件
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [nodeModulePath],
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.sass$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: [
          // {
          //   loader: 'file-loader',
          //   options: {
          //     name: 'photo.[hash].[ext]', // 打包的图片名
          //     publicPath: path.resolve('dist'), // 这里如果不设置publicPath，最终导出的路径有问题？？？
          //   }
          // },
          // 使用 url-loader 来将文件以 BASE64 字符串内联到代码中，limit设置能够内联的最大文件，如果不设置 limit 所有的文件都会内联进代码中
          // 这样做的目的减少网络请求数，以免在使用非 HTTP2.0 时降低页面性能
          {
            loader: 'url-loader',
            options: {
              limit: 50 * 1024, // 50k
              name: 'photo.[hash].[ext]', // 打包的图片名
              publicPath: path.resolve('dist'), // 这里如果不设置publicPath，最终导出的路径有问题？？？
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          // 'file-loader',
          // url-loadder 可以用来将字体文件内联到代码中
          {
            loader: 'url-loader',
            options: {
              limit: 10 * 1024
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'init',
      template: 'public/index.html',
      filename: 'index.html',
    }),
    new CleanWebpackPlugin(['dist'], { root: path.resolve()}),
  ]
}