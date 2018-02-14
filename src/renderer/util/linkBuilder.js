export default {
  url (url) {
    return url
  },
  ubb (url) {
    return `[IMG]${url}[/IMG]`
  },
  img (url) {
    return `<img src="${url}"/>`
  },
  markdown (url) {
    return `![](${url})`
  }
}
