/* eslint-env node */

const path = require('path');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  mode: isProduction ? 'production' : 'development',
  devtool: isProduction ? false : 'inline-source-map',
  entry: {
    app: path.resolve(process.cwd(), 'src/index.js')
  },
  output: {
    path: path.resolve(process.cwd(), 'static'),
    filename: 'app.js'
  },
  devServer: {
    contentBase: path.resolve(process.cwd(), 'static'),
    watchContentBase: !isProduction,
    host: '0.0.0.0',
    port: 7000,
    open: !isProduction
  }
};
