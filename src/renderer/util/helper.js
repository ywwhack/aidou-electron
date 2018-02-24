export function merge (...args) {
  return Object.assign({}, ...args)
}

export function serialize (params) {
  return Object.keys(params).map(key => `${key}=${params[key]}`).join('&')
}

export function transformMap (map, options) {
  const {
    key = 'key',
    value = 'value'
  } = options || {}
  return Object.keys(map).map(item => ({
    [key]: item,
    [value]: map[item]
  }))
}
