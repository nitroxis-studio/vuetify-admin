import Vue, { VueConstructor } from "vue"
import Config from "@/config.json"

export default {
  install (Vue: VueConstructor) {
    Vue.prototype.$config = Config
  }
}

declare module "vue/types/vue" {
  interface Vue {
    $config: typeof Config;
  }
}

