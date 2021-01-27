import lodash from "lodash"
import Vue, { VueConstructor } from "vue"

export default {
  install (Vue: VueConstructor) {
    Vue.prototype.$_ = lodash
  }
}

declare module "vue/types/vue" {
  interface Vue {
    $lodash: lodash.LoDashStatic;
  }
}
