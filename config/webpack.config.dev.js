//var autoprefixer = require('autoprefixer');
//var WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');


const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const getClientEnvironment = require('./env')
const paths = require('./paths')

const babelConfig = {
  cacheDirectory: true,
  presets: [
    ['es2015', { 'modules': false }],
    'stage-2',
    'react'
  ],
  plugins: [
    'transform-async-to-generator',
    //'react-hot-loader/babel'
  ]
}
const env = getClientEnvironment('')

module.exports = {
  //devtool: 'cheap-module-source-map',
  devtool: 'source-map',
  entry: [
    require.resolve('react-dev-utils/webpackHotDevClient'),
    require.resolve('./polyfills'),
    paths.appIndexJs
  ],
  output: {
    path: paths.appBuild,
    pathinfo: true,
    filename: 'static/js/bundle.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx'],
    alias: {
      components: paths.appComponents,
      containers: paths.appContainers,
      router: paths.appRouter,
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        enforce: 'pre',
        loader: 'eslint-loader',
      },
      {
        test: /\.js$/,
        include: paths.appSrc,
        loader: 'babel-loader',
        options: babelConfig
      },
      {
        exclude: [
          /\.html$/,
          /\.js$/,
          /\.css$/,
          /\.json$/,
          /\.svg$/
        ],
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]'
        }
      },
      {
        test: /\.svg$/,
        loader: 'file',
        query: {
          name: 'static/media/[name].[hash:8].[ext]'
        }
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      favicon: paths.appFavicon,
      template: paths.appHtml,
    }),
    new webpack.DefinePlugin(env),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ]
}
