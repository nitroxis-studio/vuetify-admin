import { routes } from "@/router"
import Vue from "vue"
import Vuex from "vuex"
import authModule from "./modules/auth.module"

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    notifications: [],
    darkMode: false,
    routeLoaded: false,
    sidenavItems: routes.filter((r) => (r.meta?.sidenav ?? false)).map((route) => ({
      title: route.name ?? "",
      path: route.path,
      icon: route.meta?.icon ?? "mdi-star"
    }))
  },
  mutations: {
  },
  actions: {
    changeDarkMode ({ state }, darkMode: boolean) {
      state.darkMode = !!darkMode
    }
  },
  modules: {
    auth: authModule
  }
})
export default store
