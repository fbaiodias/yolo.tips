var webpack = require('webpack')

module.exports = {
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.js', '.jsx', '.json']
  },
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './src/index.jsx'
  ],
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js',
    publicPath: 'http://localhost:8080/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      {
        include: /\.js*/,
        loaders: [
          'react-hot',
          'babel-loader?stage=0'
        ],
        exclude: /node_modules/
      },
      {
        test: /\.(scss)$/,
        loader: 'style!css!sass?outputStyle=expanded'
      },
      {
        test: /\.(css)$/,
        loader: 'style!css?outputStyle=expanded'
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&minetype=application/font-woff'
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      }
    ]
  },
  devServer: {
    contentBase: './dist',
    publicPath: 'http://localhost:8080/',
    hot: true,
    inline: true,
    lazy: false,
    quiet: true,
    noInfo: false,
    headers: { 'Access-Control-Allow-Origin': '*' },
    stats: { colors: true },
    host: 'localhost'
  }
}
