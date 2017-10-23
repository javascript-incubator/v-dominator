'use strict'

const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const cssnano = require('cssnano')

const host = 'http://localhost'
const port = 8000

const BASE_CSS_LOADER = 'css?sourceMap&-minimize'

const config = {
  entry: [
    `webpack-dev-server/client?${host}:${port.toString()}`,
    'webpack/hot/dev-server',
    './src/'
  ],
  output: {
    filename: 'bundle.js',
    path: '/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        },
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        exclude: null,
        loaders: [
          'style',
          BASE_CSS_LOADER,
          'postcss',
          'sass?sourceMap'
        ],
        options: {
          sourceMap: true
        }
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ProgressBarPlugin()
  ]
}

config.module.loaders.push({
  test: /\.css$/,
  exclude: null,
  loaders: [
    'style',
    BASE_CSS_LOADER,
    'postcss'
  ],
  options: {
    sourceMap: true
  },
})

config.postcss = [
  cssnano({
    autoprefixer: {
      add: true,
      remove: true,
      browsers: ['last 2 versions']
    },
    discardComments: {
      removeAll: true
    },
    discardUnused: false,
    mergeIdents: false,
    reduceIdents: false,
    safe: true,
    sourceMap: true
  })
]

const compiler = webpack(config)
compiler.plugin('done', () => {
  console.log(`App is running at ${host}:${port}`)
})
const server = new WebpackDevServer(compiler, {
  historyApiFallback: true,
  hot: true,
  contentBase: './public',
  stats: 'errors-only'
})
server.listen(port)
