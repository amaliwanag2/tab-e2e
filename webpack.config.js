const path = require('path')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const nodeExternals = require('webpack-node-externals')

const analyzeBundle = process.env.WEBPACK_ANALYZE_BUNDLE

const sharedConfig = {
  mode: 'production',
  output: {
    // filename set in individual configs below.
    path: path.resolve(__dirname, 'build'),
    libraryTarget: 'commonjs2',
    libraryExport: 'default',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  externals: [
    // By default, don't bundle anything from node_modules.
    nodeExternals({
      allowlist: ['cookies'],
    }),
    'fetch',
  ],
}

const clientConfig = {
  ...sharedConfig,
  entry: './src/index.js',
  target: 'web',
  output: {
    ...sharedConfig.output,
    filename: 'index.js',
  },
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: analyzeBundle ? 'static' : 'disabled',
      defaultSizes: 'stat',
      reportFilename: 'report.index.html',
    }),
  ],
}

module.exports = [clientConfig]
