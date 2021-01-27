import "@/scss/variables.scss"
import "@mdi/font/css/materialdesignicons.css"
import "roboto-fontface/css/roboto/roboto-fontface.css"
import Vue from "vue"
import AsyncComputed from "vue-async-computed"
import VuetifyConfirm from "vuetify-confirm"
import loaderPlugin from "./plugins/loaders"
import vuetifyToastEngine from "./plugins/toast/toast"
import validation from "./plugins/validation"
import router from "./router"
import store from "./store/store"
import App from "./App.vue"
import VuePageTransition from "vue-page-transition"
import * as VueGoogleMaps from "vue2-google-maps"

import vuetify from "./plugins/vuetify"

// our plugins
import lodashPlugin from "./plugins/lodash"
Vue.use(lodashPlugin)
import configPlugin from "./plugins/config"
Vue.use(configPlugin)

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyDc6Bk-nnV_lbglxdyTWkoHNFd4m4AFNFA",
    libraries: "places" // necessary for places input
  }
})

Vue.use(AsyncComputed)

Vue.use(VuetifyConfirm, {
  vuetify,
  color: "primary",
  title: "Are you sure?"
})

Vue.use(validation)

Vue.use(VuePageTransition)

Vue.use(vuetifyToastEngine)

Vue.use(loaderPlugin)
Vue.config.productionTip = false

require("./plugins/axios.plugin")

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount("#app")
