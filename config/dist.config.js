const path = require('path')
const packageName = require('../package.json').name

module.exports = {
  mode: 'production',

  entry: {
    index: './src/index.jsx'
  },

  output: {
    path: path.resolve(__dirname, '../lib'),
    filename: '[name].js',
    library: packageName,
    libraryTarget: 'umd',
    globalObject: 'this'
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          }
        ]
      }
    ]
  },

  optimization: {
    minimize: false
  },

  resolve: {
    extensions: ['.js', '.jsx']
  },

  externals: [
    {
      'react': {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react'
      }
    },
    {
      'prop-types': {
        root: 'PropTypes',
        commonjs2: 'prop-types',
        commonjs: 'prop-types',
        amd: 'prop-types'
      }
    }
  ]
}
