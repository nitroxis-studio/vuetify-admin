import Vue from "vue"
import Vuetify from "vuetify/lib/framework"
import "vuetify/dist/vuetify.min.css"

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    // options: {
    //   customProperties: true
    // },
    dark: localStorage.getItem("darkMode") === "true",
    themes: {
      light: {
        primary: "#d12026",
        secondary: "#222222",
        accent: "#82B1FF",

        error: "#FF5252",
        info: "#2196F3",
        success: "#28C76F",
        warning: "#FEC400",

        bg: "#f2f2f2"
      },
      dark: {
        primary: "#d12026",
        secondary: "#222222",
        accent: "#82B1FF",

        error: "#FF5252",
        info: "#2196F3",
        success: "#28C76F",
        warning: "#FEC400",

        bg: "#121212"
      }
    }
  }
})
