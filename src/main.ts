import "@/scss/main.scss"
import "@mdi/font/css/materialdesignicons.css"
import Vue from "vue"
import AsyncComputed from "vue-async-computed"
import VuetifyConfirm from "vuetify-confirm"
import loaderPlugin from "./plugins/loaders"
import validation from "./plugins/validation"
import router from "./router"
import store from "./store/store"
import App from "./App.vue"
import VuePageTransition from "vue-page-transition"
import * as VueGoogleMaps from "vue2-google-maps"
require("typeface-ubuntu")

import vuetify from "./plugins/vuetify"

Vue.use(AsyncComputed)

Vue.use(VuetifyConfirm, {
  vuetify,
  color: "primary",
  title: "Are you sure?"
})

// our plugins
import lodashPlugin from "./plugins/lodash"
Vue.use(lodashPlugin)

import toasterPlugin from "./plugins/toast"
Vue.use(toasterPlugin)

Vue.use(validation)

Vue.use(VuePageTransition)

Vue.use(loaderPlugin)
Vue.config.productionTip = false

import { loadConfig, OurConfig } from "@/plugins/config"

// check for localConfig file

loadConfig(Vue, (config: OurConfig) => {
  require("./plugins/axios.plugin")
  Vue.use(VueGoogleMaps, {
    load: {
      key: config.api.googlePlaces,
      libraries: "places" // necessary for places input
    }
  })
  new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(App)
  }).$mount("#app")
}).catch((e) => {
  console.error(e)
  document.write("Unable to load app. Try Again")
})

