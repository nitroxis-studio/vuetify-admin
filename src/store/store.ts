import SideNavItems, { ISideNavItem } from "@/store/sideNavItems"
import { routes } from "@/router"
import Vue from "vue"
import Vuex from "vuex"
import authModule from "./modules/auth.module"
import VuexPersistence from "vuex-persist"
const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  reducer: (state: any) => ({
    darkMode: state.darkMode
  })
})

Vue.use(Vuex)

const store = new Vuex.Store({
  plugins: [
    vuexLocal.plugin
  ],
  state: {
    routes: SideNavItems as ISideNavItem[],
    darkMode: false,
    routeLoaded: false,
    sidenavItems: routes.filter((r) => (r.meta?.sidenav ?? false)).map((route) => ({
      title: route.name ?? "",
      path: route.path,
      icon: route.meta?.icon ?? "mdi-star"
    }))
  },
  getters: {
    sidenavItems (state) {
      // put defaults here
      return state.routes.map((r, i) => ({
        ...r,
        header: r.heading,
        order: r.order ?? i,
        icon: r.icon ?? "mdi-star"
      }))
    }
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
