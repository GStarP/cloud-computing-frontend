const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir)
}

// 生产环境部署的路径
const BASE_URL = process.env.NODE_ENV === 'production'
  ? '/'
  : '/';

module.exports = {
  publicPath: BASE_URL,
  outputDir: 'dist',
  assetsDir: '',
  indexPath: 'index.html',
  pages: undefined,
  productionSourceMap: false,
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('plugins', resolve('src/plugins'))
      .set('views', resolve('src/views'));
    config.resolve.extensions
      .add('*', '.js', '.json', '.vue');
    // vuetify
    ['vue-modules', 'vue', 'normal-modules', 'normal'].forEach((match) => {
      config.module.rule('scss').oneOf(match).use('sass-loader')
        .tap(opt => Object.assign(opt, {data: `@import '~assets/style/main.scss';`}))
    });
  },
  css: {
    loaderOptions: {
      sass: {
        data: `@import "~assets/style/main.scss"`
      }
    }
  },
  devServer: {
    https: false,
    open: true,
    port: 8080
  }
};
