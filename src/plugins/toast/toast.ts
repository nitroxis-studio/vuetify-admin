import { VueConstructor } from "vue"
import store from "@/store/store"

const defaultOptions = {
  type: "success",
  title: null,
  closeText: false,
  timeout: 3000,
  callback: null
}

const toaster = {
  success (msgToShow: string, options?: any) {
    this.open({
      ...defaultOptions,
      ...options,
      type: "success",
      text: msgToShow
    })
  },
  error (msgToShow: any, options?: any) {
    this.open({
      ...defaultOptions,
      ...options,
      type: "error",
      text: msgToShow
    })
  },
  open (params: { text: string }) {
    if (!params.text) {return console.error("[toast] no text supplied")}

    const options = {
      ...defaultOptions,
      ...params
    }

    store.commit("addNotification", options)
  }
}

export default {
  install (Vue: VueConstructor) {
    Vue.prototype.$toast = toaster
  }
}

declare module "vue/types/vue" {
  interface Vue {
    $toast: typeof toaster;
  }
}
