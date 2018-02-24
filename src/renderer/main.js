import Vue from 'vue'
import swal from 'sweetalert'
import App from './app'
import './styles/index.scss'
import store from './store'
import router from './router'

Vue.prototype.$swal = swal
Vue.prototype.$store = store
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
