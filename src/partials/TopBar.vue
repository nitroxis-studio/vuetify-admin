<template>
  <v-app-bar
    class="elevation-4"
    color="primary"
    dark
    app>
    <div
      class="d-flex align-center w-full fill-height">
      <v-progress-linear
        :active="isLoading"
        color="accent"
        absolute
        bottom
        :indeterminate="true"></v-progress-linear>

      <v-toolbar-title v-if="title">
        {{ title }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- <lang-selector /> -->
      <!-- <help-menu /> -->

      <DarkModeToggle
        :value="!!darkMode"
        @input="darkModeChanged" />
      <UserProfile />
    </div>
  </v-app-bar>
</template>

<script>
// import TenantSelector from "@bit/edgraph.shared.tenant-selector"
import DarkModeToggle from "@/components/DarkModeToggle"
import UserProfile from "@/components/UserProfile"
// import QuickLauncher from "@bit/edgraph.shared.quick-launcher"
import { mapState } from "vuex"
// import HelpMenu from "./HelpMenu"
// import LangSelector from "./LangSelector"
export default {
  components: {
    // QuickLauncher,
    // TenantSelector,
    DarkModeToggle,
    UserProfile
    // HelpMenu,
    // LangSelector
  },
  props: {
    apps: {
      type: Array,
      default () {return []}
    },
    hideLauncher: {
      type: Boolean,
      default: false
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: null
    }
  },
  computed: {
    ...mapState([
      "darkMode"
    ])
  },

  methods: {
    darkModeChanged (v) {
      this.$vuetify.theme.dark = !!v
      this.$store.dispatch("changeDarkMode", !!v)
    }
  }
}
</script>
