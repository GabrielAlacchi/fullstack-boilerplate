/**
 * Created by gabriel on 9/13/16.
 */

var DEBUG = process.env.NODE_ENV != 'production';

var path = require('path');

module.exports = {
  context: __dirname,
  entry: './web/src/main.js',
  devtool: DEBUG ? 'inline-source-map' : null,
  output: {
    path: path.join(__dirname, 'build/src'),
    filename: 'bundle.js'
  }
};