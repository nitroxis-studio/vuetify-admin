import Vue from "vue"
import VueRouter from "vue-router"
import { RouteConfigSingleView } from "vue-router/types/router"
import store from "./store/store"

Vue.use(VueRouter)

export const routes: Array<RouteConfigSingleView> = [
  {
    path: "/",
    redirect: "/vendors"
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/common/Login.vue"),
    meta: {
      layout: "full",
      isPublic: true,
      isChild: false
    }
  },
  {
    path: "/vendors",
    name: "list-vendors",
    component: () => import("@/views/vendors/List.vue"),
    meta: {

      icon: "mdi-cart-plus"
    }
  },
  {
    path: "/vendors/add",
    name: "add-vendor",
    component: () => import("@/views/vendors/Add.vue"),
    meta: {

      icon: "mdi-cart-plus"
    }
  },
  {
    path: "/vendor/edit/:vendorId",
    name: "edit-vendor",
    component: () => import("@/views/vendors/Add.vue"),
    meta: {
      isEditing: true,
      icon: "mdi-cart-plus"
    }
  }

]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior () {
    return {
      x: 0,
      y: 0
    }
  },
  routes
})

router.afterEach(() => {
  // await sleep(10)
  const loadingElem = document.getElementById("loading-bg")
  if (loadingElem) {
    loadingElem.style.display = "none"
  }
  store.state.routeLoaded = true
})

router.beforeEach((to, from, next) => {
  if (to.matched.find((route) => route.meta.isPublic)) {
    next()
  }
  else if (localStorage.getItem("authToken")) {
    next()
  }
  else {
    next("/login")
  }

  if (to.matched.find((route) => route.name == "login") && localStorage.getItem("authToken")) {
    next("/")

  }
})

export default router
