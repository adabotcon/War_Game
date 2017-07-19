var path = require('path');

var webpack = require('webpack');

module.exports = {
    entry: path.resolve(__dirname, 'js/index.js'),
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'build/js'),
    },
    devtool: 'inline-source-map',
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          loader: 'babel',
        }, {
          test: /\.(jpe?g|png|gif|svg)$/i,
          loaders: [
            'file-loader',
            {
              loader: 'image-webpack-loader',
            }
          ]
        }
      ]
    }
};