import Vue from 'vue'
import swal from 'sweetalert'
import App from './app'
import './style/index.scss'
import store from './store'

Vue.prototype.$swal = swal
Vue.prototype.$store = store
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})
