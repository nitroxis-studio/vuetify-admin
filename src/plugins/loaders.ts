import Vue, { VueConstructor } from "vue"

export const EventBus = new Vue({
  data () {
    return {
      loaders: []
    } as {
      loaders: string[];
    }
  },
  methods: {
    show (title = "Loading...") {
      this.loaders.push(title)
    },
    hide (title = "Loading...") {
      if (this.loaders.findIndex((f) => f === title) >= 0) {
        this.loaders.splice(
          this.loaders.findIndex((f) => f === title),
          1
        )
      }
    }
  }
})

const MyPlugin = {
  install (Vue: VueConstructor) {
    Vue.prototype.$loading = EventBus
  }
}

declare module "vue/types/vue" {
  interface Vue {
    $loading: {
      hide: (title: string) => void;
      show: (title: string) => void;
      loaders: string[];
    };
  }
}

export default MyPlugin
