import router from "@/router"
import axios from "axios"
import cap from "lodash/capitalize"
import get from "lodash/get"
import Vue from "vue"

export function getComponentName (url) {
  const parser = document.createElement("a")
  const searchObject = {
  }
  let queries: string[] = []
  let split: string[] = []
  let i = 0
  // Let the browser do the work
  parser.href = url
  // Convert query string to object
  queries = parser.search.replace(/^\?/, "").split("&")
  for (; i < queries.length; i++) {
    split = queries[i].split("=")
    searchObject[split[0]] = split[1]
  }

  return cap(parser.pathname.split("/").filter((r) => !!r)
    .join(" ") || "Data") + "..."
}
// export default function (config) {
// const axiosInstance = axios.create({
//   baseURL: `${config.api.baseUri}`
// })

// console.log(Vue.prototype.$config.API_BASE_URL)
axios.defaults.baseURL = `${Vue.prototype.$config.API_BASE_URL}`

axios.interceptors.request.use((request) => {
  const pathName = getComponentName(request.url)
  if (get(request, "headers.skipLoader") != true) {
    const loaderName = `Processing ${pathName}`
    // console.log("show", loaderName)
    Vue.prototype.$showLoader(loaderName)
  }
  request.headers.Authorization = "Bearer " + localStorage.getItem("authToken")
  request.headers["Content-Type"] = "application/json; charset=utf-8"
  return request
})

axios.interceptors.response.use((success) => {
  const pathName = getComponentName(success.config.url)
  const loaderName = `Processing ${pathName}`
  // console.log(pathName)
  Vue.prototype.$hideLoader(loaderName)
  return Promise.resolve(success)
}, (response) =>  {
  try {
    console.log(response.config.url)
    const pathName = getComponentName(response.config.url)
    Vue.prototype.$hideLoader(`Processing ${pathName}`)

    if (get(response, "response.status") == 401) {
      localStorage.clear()
      if (!router.currentRoute.meta.isPublic) {
        // take him to login with error
        Vue.prototype.$toast.error("You need to be logged in for accessing the requested page")
        window.location.href = "/"
      }
    }
    else {
      return Promise.reject(response)
    }
  } catch (e) {
    console.error(response)
    return Promise.reject(response)
  }

})

// return axiosInstance
// }
