import Config from "@/../public/app.config.json"
import { VueConstructor } from "vue"
import { extend } from "lodash"

export type OurConfig = typeof Config;

export async function loadConfig (Vue: VueConstructor, next: (config: OurConfig) => void) {
  let combinedConfig: OurConfig
  try {

    const data = await fetch("/config.json")
    const localConfig = await data.json()
    combinedConfig = extend(Config, localConfig)
  }
  catch (e) {
    combinedConfig = Config
  }
  Vue.prototype.$config = combinedConfig
  next(combinedConfig)
}
declare module "vue/types/vue" {
  // eslint-disable-next-line @typescript-eslint/interface-name-prefix
  interface Vue {
    $config: typeof Config;
  }
}

