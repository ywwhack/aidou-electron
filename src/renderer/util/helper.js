export function merge (...args) {
  return Object.assign({}, ...args)
}

export function serialize (params) {
  return Object.keys(params).map(key => `${key}=${params[key]}`).join('&')
}
