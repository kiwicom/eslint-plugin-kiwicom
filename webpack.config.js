const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  context: __dirname,
  entry: [
    // 'webpack/hot/poll.js?300',
    './lib/index.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js',
    // // [hash:6] with add a SHA based on file changes if the env is build
    // filename:
    //   env === EnvEnum.BUILD ? '[name]-[hash:6].min.js' : '[name].min.js',
    library: 'eslintPluginKiwicom',
    libraryTarget: 'umd'
  },
  node: {
    __dirname: true,
    __filename: true
  },
  watch: true,
  mode: 'development',
  target: 'node',
  externals: [
    nodeExternals({
      whitelist: ['ramda']
    })
    // nodeExternals({
    //   whitelist: ['webpack/hot/poll?300']
    // })
  ],
  module: {
    rules: [
      {
        test: /\.js?$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  recordsPath: path.join(__dirname, 'dist/_records'),
  plugins: [
    new webpack.IgnorePlugin(/\.(css|less)$/),
    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install();',
      raw: true,
      entryOnly: false
    }),
    new webpack.HotModuleReplacementPlugin({ quiet: true })
  ]
}
