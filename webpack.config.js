const path = require('path');
const baseConfig = {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: 'babel-loader',
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['react', 'env'],
             plugins: ['transform-object-rest-spread'] 
          }
        }
      }
    ]
  },
}

const serverConfig = {
  entry:{
    server:'./src/server.js'
  },
  target:'node',
  output:{
    path:path.resolve(__dirname,'dist'),
    filename:"server.js",
    libraryTarget: 'commonjs2',
  }
}
const clientConfig = {
  entry:{
    bootstrap:'./src/bootstrap.js'
  },
  target:'web',
  output:{
    path:path.resolve(__dirname,'dist'),
    filename:"bootstrap.js"
  },
  optimization: {
    splitChunks: {
        cacheGroups: {
            commons: {
                test: /[\\/]node_modules[\\/]/,
                name: 'vendor',
                chunks: 'all'
            }
        }
    }
}
}

module.exports = [Object.assign(clientConfig,baseConfig),
  Object.assign(serverConfig,baseConfig)];