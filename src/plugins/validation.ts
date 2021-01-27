/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable camelcase */
import { isArrayLike } from "lodash"
import isMobilePhone from "validator/es/lib/isMobilePhone"
import isURL from "validator/es/lib/isURL"
import { extend, localize, ValidationObserver, ValidationProvider } from "vee-validate"
import en from "vee-validate/dist/locale/en.json"
import * as rules from "vee-validate/dist/rules"
import { VueConstructor } from "vue"

Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule])
})

// with typescript
for (const [
  rule,
  validation
] of Object.entries(rules)) {
  extend(rule, {
    ...validation
  })
}

// valid URL options
const urlOptions = {
  require_tld: true,
  require_protocol: false,
  require_host: true
}

extend("url", (v) => isURL(v, urlOptions))
extend("fbUrl", (v) => isURL(v, {
  ...urlOptions,
  host_whitelist: [
    "facebook.com",
    "fb.com"
  ]
}))

// const pkMobileRegex = /03\d{2}-?\d{7}$/
extend("mobile", (v) => isMobilePhone(v, "en-PK") ? true : "Enter a valid Number without Country code e.g. 0300-1112223")

extend("imageUrl", (v) => {
  if (isURL(v, urlOptions) && /\.(gif|jpe?g|png|webp|svg)$/i.test(v)) {
    return true
  }
  else {
    return `${v} is not a valid Image Resource URL`
  }
})

extend("chipUrlRule", function (val) {
  if (!isArrayLike(val)) {
    return "Invalid URLs provided"
  }

  for (let i = 0; i < val.length; i++) {
    if (!isURL(val[i], urlOptions)) {
      return `${val[i]} is not a valid website. website url needs to be in <www.url.com> format`
    }
  }

  return true

})

localize({
  en: {
    messages: {
      ...en.messages,
      url: (v) => `${v} is not a valid website. website url needs to be in <www.url.com> format`
    }
  }
})

export default {
  install (Vue: VueConstructor) {
    Vue.mixin({
      methods: {
        isURL: (v) => isURL(v, urlOptions)
      }
    })
    Vue.component("ValidationProvider", ValidationProvider)
    Vue.component("ValidationObserver", ValidationObserver)
  }
}
