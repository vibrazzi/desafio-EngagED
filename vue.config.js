const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: ['quasar'],
  publicPath: '/',
  pluginOptions: {
    quasar: {
      importStrategy: 'kebab',
      rtlSupport: false,
    },
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/styles/quasar.variables.sass";`,
      },
    },
  },
});
