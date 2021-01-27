<template>
  <div>
    <v-app v-if="$store.state.routeLoaded">
      <!-- :full.sync="full && $vuetify.breakpoint.lgAndUp" -->
      <!-- + full + '-' + $vuetify.breakpoint.lg -->
      <SideNav
        v-if="showSidenav"
        v-model="drawer"
        @drawer-closed="drawer = false" />

      <TopBar
        v-if="showTopnav"
        :title="$route.meta.title"
        :title-btn="$route.meta.titleButton"
        color="transparent"
        @toggle="drawer = !drawer ">
        <!-- @add="$router.push(pgLink)" -->
        <template #addons>
          <v-btn
            v-if="$vuetify.breakpoint.mdAndDown"
            class="mr-2"
            icon
            outlined
            small
            tile
            color="grey lighten-2"
            @click="drawer = !drawer">
            <v-icon color="grey">mdi-menu</v-icon>
          </v-btn>
        </template>
      </TopBar>

      <v-main class="bg">
        <v-progress-linear
          :active="$loading.loaders.length > 0"
          absolute
          top
          :indeterminate="true"></v-progress-linear>
        <v-container
          fluid
          class="bg ma-0 pa-0">
          <vue-page-transition name="overlay-right">
            <router-view :key="$route.fullPath" />
          </vue-page-transition>
          <MyToast />
        </v-container>
      </v-main>
    </v-app>
    <v-app v-else>
      <v-main clipped>
        <v-container fluid>
          <PageLoader msg="Loading Application ..." />
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script>
import SideNav from "@/partials/Sidenav.vue"
import TopBar from "@/partials/TopBar.vue"
import MyToast from "@/plugins/toast/Toast.vue"
import PageLoader from "@/components/PageLoader.vue"
import Vue from "vue"

export default Vue.extend({

  components: {
    SideNav,
    MyToast,
    TopBar,
    PageLoader
  },
  data: function () {
    return {
      showSidenav: true,
      showTopnav: true,
      drawer: true,
      full: true
    }
  },
  computed: {
    oppFull () {
      return !this.full
    }
  },
  watch: {
    "$route.meta.layout" (v) {
      switch (v) {
        case "full":
          this.showSidenav = false
          this.showTopnav = false
          break
        case "topnav":
          this.showSidenav = true
          this.showTopnav = true
          this.full = false
          // this.drawer = false
          break
        default:
          this.full = true
          // this.drawer = true
          this.showSidenav = true
          this.showTopnav = true
          break
      }
    }
  }
})
</script>
