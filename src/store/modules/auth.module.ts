import { reloadBrowser } from "@/plugins/utils"
import { Module } from "vuex"

export default {
  namespaced: true,
  state: {
    isLoggedIn: true,
    token: "",
    profile: {
      name: "Hammad Asif",
      photo: "https://randomuser.me/api/portraits/lego/2.jpg"
    }
  },
  actions: {
    doLogin ({ state }, { user, token }){
      state.profile = user
      state.token = token
      reloadBrowser("/")
    },
    doLogout ({ state }) {
      state.isLoggedIn = false
      state.token = null
      state.profile = {
      }
      reloadBrowser()
    }
  }
} as Module<any, any>
