'use strict'

const fs = require('fs-extra')
const path = require('path')
const mkdirp = require('mkdirp')
const webpack = require('webpack')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const cssnano = require('cssnano')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const buildPath = path.join(process.cwd(), 'build')
const publicPath = path.join(process.cwd(), 'public')

mkdirp.sync(buildPath)

const BASE_CSS_LOADER = 'css?sourceMap&-minimize'

const config = {
  entry: [
    './src/'
  ],
  output: {
    filename: 'bundle.js',
    path: './public/'
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
      }
    ]
  },
  plugins: [
    new ProgressBarPlugin(),
    new webpack.optimize.UglifyJsPlugin({minimize: true})
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

config.module.loaders.filter((loader) => loader.loaders && loader.loaders.find((name) => /css/.test(name.split('?')[0]))).forEach((loader) => {
    const first = loader.loaders[0]
    const rest = loader.loaders.slice(1)
    loader.loader = ExtractTextPlugin.extract(first, rest.join('!'))
    delete loader.loaders
})

config.plugins.push(
  new ExtractTextPlugin('[name].[contenthash].css', {
    allChunks: true
  })
)

const compiler = webpack(config)

compiler.run((err, stats) => {
  if (err) {
    console.log(err)
  } else {
    fs.copySync(publicPath, buildPath)
  }
})
