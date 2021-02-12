export function sleep (ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const arrayToOptions = (name: string | number) => (state: {
  mappings: { [x: string]: string[] };
}) => {
  return state.mappings[name].map((a: string) => ({
    value: a,
    text: a
  }))
}

export function reloadBrowser (redirectUrl?: string) {
  window.location.href = redirectUrl ? redirectUrl : window.location.href
}
export const setStateVal = (property) => (state, payload) => (state[property] = payload)
export const toggleStateVal = (property) => (state) => (state[property] = !state[property])
