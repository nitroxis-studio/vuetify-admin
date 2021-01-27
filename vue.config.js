module.exports = {
  // transpileDependencies: [
  //   "vuetify"
  // ]
  productionSourceMap: false,
  chainWebpack: (config) => {
    config.module.rules.delete("svg")
  },
  configureWebpack: {
    transpileOnly: true,
    devtool: "source-map",
    module: {
      rules: [
        {
          test: /\.svg$/,
          loader: "vue-svg-loader"
        }
      ]
    }
  }

}
