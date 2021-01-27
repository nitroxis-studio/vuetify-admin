module.exports = {
  productionSourceMap: false,
  chainWebpack: (config) => {
    config.module.rules.delete("svg")
  },
  configureWebpack: {
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
