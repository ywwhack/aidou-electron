import Vue from 'vue'
import swal from 'sweetalert'
import App from './app'
import './styles/index.scss'
import store from './store'
import router from './router'

// add default timer(1s) to sweetalert
Vue.prototype.$swal = function (options) {
  if (options.timer === undefined) {
    options.timer = 1000
  }
  swal(options)
}
Vue.prototype.$store = store
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
