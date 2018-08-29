const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.ts',
  devtool: 'inline-source-map',
  target: "web",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    watchContentBase: true,
    open: true,
    openPage: './index.html'
  },
  plugins: [
   new HtmlWebpackPlugin({
     title: 'Custom template',
     // Load a custom template (lodash by default see the FAQ for details)
     template: 'index.html'
   })
 ]
};
