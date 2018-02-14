export default {
  get (key) {
    try {
      return JSON.parse(localStorage.getItem(key))
    } catch (e) {}
  },

  set (key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value))
      return true
    } catch (e) {
      return false
    }
  }
}
