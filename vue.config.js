'use strict'
const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}

const name = '广告设置'
const publicPath = process.env.NODE_ENV === 'production'
  ? '/image/static/dist/'
  : '/'
const port = process.env.port || process.env.npm_config_prot || 9500
module.exports = {
  publicPath: publicPath,
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  chainWebpack: config => {
    config.resolve.alias.set('@', resolve('src'))
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  },
  devServer: {
    host: 'localhost',
    port: port,
    // open: true, // 配置自动启动浏览器
    overlay: { // 将错误显示在html之上
      warning: false,
      errors: true
    }
    // ,
    // proxy: {
    //   '/': {
    //     target: 'http://112.74.99.190/adverisement',
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '^/': ''
    //     }
    //   }
    // }
  },
  configureWebpack: {
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  }
}
