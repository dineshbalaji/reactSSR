module.exports = {
  target:'node',
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
            /* plugins: ['@babel/plugin-transform-runtime'] */
          }
        }
      }
    ]
  },
 /*  optimization: {
    splitChunks: {
        cacheGroups: {
            commons: {
                test: /[\\/]node_modules[\\/]/,
                name: 'vendor',
                chunks: 'initial'
            }
        }
    }
} */
};