/* eslint-disable */

require('dotenv').load({ path: '../.env' });

var path = require('path');
var webpack = require('webpack');

var dir = {
  src:   'src/',
  build: 'www/wp-content/themes/ihr-2018/'
};

var isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }
    ]
  },
  output: {
    filename: 'app.js'
  },
  resolve: {
    modules: [path.resolve(__dirname, dir.src + 'js/'), 'node_modules']
  },
  plugins: [
    new webpack.DefinePlugin({ ENV: process.env }),
    isProduction ? new webpack.optimize.UglifyJsPlugin({ minimize: true, test: /\.js$/ }) : undefined
  ].filter(p => p !== undefined),
  devtool: isProduction ? 'none' : 'source-map'
};
