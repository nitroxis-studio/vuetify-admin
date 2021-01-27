import Vue from "vue"
import VueRouter from "vue-router"
import { RouteConfigSingleView } from "vue-router/types/router"
import { sleep } from "./plugins/utils"
import store from "./store/store"

Vue.use(VueRouter)
interface MyRouterConfig extends RouteConfigSingleView {
  meta?: {
    sidenav?: boolean;
    icon?: string;
  };
}
export const routes: Array<MyRouterConfig> = [
  {
    path: "/",
    redirect: "/products"
  },
  {
    path: "/products",
    name: "Products",
    component: () => import("@/views/Products.vue"),
    meta: {
      sidenav: true,
      icon: "mdi-cart"
    }
  },
  {
    path: "/categories",
    name: "Categories",
    component: () => import("@/views/Categories.vue"),
    meta: {
      sidenav: true,
      icon: "mdi-heart"
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

router.afterEach(async () => {
  await sleep(1000)
  const loadingElem = document.getElementById("loading-bg")
  if (loadingElem) {
    loadingElem.style.display = "none"
  }
  store.state.routeLoaded = true
})

export default router
