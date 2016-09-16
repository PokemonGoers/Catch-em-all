var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

var BUILD_ENV = process.env['BUILD_ENV'] || 'develop';
var devEnv = BUILD_ENV === 'develop';

var outputDir = path.join(__dirname, '../server/app');

module.exports = {
  colors: true,
  progress: true,
  entry: {
    app: [
      './app/app.ts'
    ],
    core: [
      'reflect-metadata/Reflect',
      'zone.js/dist/zone',
      'es6-shim/es6-shim.min',
      '@angular/core',
      '@angular/http',
      'ionic-angular'
    ],
    lib: [
      'rxjs'
    ],
    style_ios: [
      './app/theme/app.ios.scss'
    ],
    style_wp: [
      './app/theme/app.wp.scss'
    ],
    style_md: [
      './app/theme/app.md.scss'
    ]
  },
  output: {
    path: outputDir,
    filename: '[name].[hash].bundle.js',
    chunkFilename: '[id].[hash].bundle.js'
  },
  devtool: devEnv ? 'cheap-module-eval-source-map' : 'source-map',
  cache: devEnv,
  resolve: {
    extensions: ['', '.js', '.ts']
  },
  module: {
    loaders: [
      {test: /\.ts$/, loader: 'awesome-typescript-loader'},
      {test: /\.html$/, loader: 'raw'},
      {test: /\/theme\/.*\.scss$/, loader:ExtractTextPlugin.extract(['css', 'sass'])},
      {test: /\.(component|page)\.scss$/, loaders: ['raw', 'sass']},
      {test: /\.woff(2)?(\?v=.+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff'},
      {test: /\.(ttf|eot|svg)(\?v=.+)?$/, loader: 'file'}
    ]
  },
  sassLoader: {
    includePaths: [
      './node_modules/ionic-angular/',
      './node_modules/ionicons/dist/scss/'
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      BUILD_ENV: JSON.stringify(BUILD_ENV),
      BUILD_TIME: JSON.stringify(new Date())
    }),
    new HtmlWebpackPlugin({
      template: './app/index.html',
      excludeChunks: ['style_ios', 'style_wp', 'style_md']
    }),
    new ExtractTextPlugin('[name].css'),
    new webpack.optimize.CommonsChunkPlugin({names: ['core', 'lib'], filename: '[name].[hash].bundle.js'})
  ].concat({
    develop: [],
    release: [
      new CleanWebpackPlugin('./server/app', {root: path.resolve('../')}),
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: false,
        mangle: false,
        compress: {warnings: false}
      }),
      new webpack.optimize.DedupePlugin()
    ]
  }[BUILD_ENV])
};
