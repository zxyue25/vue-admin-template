const {
  AutoCreateVueRouteWebpackPlugin,
} = require('vue-auto-create-route/build/plugin')

const appName = process.env.VUE_APP_NAME
const publicPath =
  process.env.VUE_APP_ENV === 'production' ? `/${appName}/` : ''

module.exports = {
  productionSourceMap: false,
  publicPath,
  devServer: {
    compress: true,
    // host: '',
    port: 8082,
    hotOnly: false,
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'http://10.222.85.229:8080',
        changeOrigin: true,
        pathRewrite: {
          [`^/api`]: '',
        },
      },
    },
  },
  configureWebpack: {
    plugins: [
      new AutoCreateVueRouteWebpackPlugin(
        { cwd: __dirname},
        null,
        true
      ),
    ],
  },
}
