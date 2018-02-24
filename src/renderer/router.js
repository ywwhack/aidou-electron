import Vue from 'vue'
import VueRouter from 'vue-router'
import CollectPanel from '@/pages/collect-panel'
import SearchPanel from '@/pages/search-panel'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/search-panel' },
    { path: '/search-panel', component: SearchPanel },
    { path: '/collect-panel', component: CollectPanel }
  ]
})

export default router
