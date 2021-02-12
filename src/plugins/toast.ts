import { extend } from "lodash"
import Vue, { VueConstructor } from "vue"
import Notifications from "vue-notification"

interface INotifyOptions  {
  group?: string;
  type?: "success-notification" | "error-notification" | "warn-notification" | "info-notification";
  position?: "top right" | "bottom right" | "top left" | "bottom left";
  duration?: number;
  speed?: number;
  title: string;
  text?: string;
  data?: any;
}

class Toaster {

  success (msgToShow: string, options?: INotifyOptions) {
    const defaultOptions = {
      group: "app",
      type: "success-notification",
      position: "bottom right",
      text: msgToShow,
      duration: 10000,
      speed: 1000
    } as INotifyOptions

    Vue.notify(extend(defaultOptions, options))
  }

  error (msgToShow: string, options?: INotifyOptions) {
    const defaultOptions = {
      group: "app",
      type: "error-notification",
      text: msgToShow,
      position: "bottom right",
      duration: 10000,
      speed: 1000
    } as INotifyOptions
    Vue.notify(extend(defaultOptions, options))
  }

  warn (msgToShow: string, options?: INotifyOptions) {
    const defaultOptions = {
      group: "app",
      type: "warn-notification",
      position: "bottom right",
      text: msgToShow,
      duration: 10000,
      speed: 1000
    } as INotifyOptions

    Vue.notify(extend(defaultOptions, options))
  }

  info (msgToShow: string, options?: INotifyOptions) {
    const defaultOptions = {
      group: "app",
      type: "info-notification",
      text: msgToShow,
      position: "bottom right",
      duration: 10000,
      speed: 1000
    } as INotifyOptions
    Vue.notify(extend(defaultOptions, options))
  }

}

export const toaster = new Toaster()

export default {
  install (Vue: VueConstructor) {
    Vue.use(Notifications, {
      componentName: "AppNotifications"
    })
    Vue.prototype.$toast = new Toaster()
  }
}

declare module "vue/types/vue" {
  // eslint-disable-next-line @typescript-eslint/interface-name-prefix
  interface Vue {
    $toast: Toaster;
  }
}
