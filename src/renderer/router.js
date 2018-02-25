import Vue from 'vue'
import VueRouter from 'vue-router'
import CollectPanel from '@/pages/collect-panel'
import SearchPanel from '@/pages/search-panel'
import Expression from '@/pages/search-panel/expression'

// package pages
import Package from '@/pages/search-panel/package'
import PackageList from '@/pages/search-panel/package/package-list'
import PackageDetail from '@/pages/search-panel/package/package-detail'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/search-panel' },
    {
      path: '/search-panel',
      component: SearchPanel,
      children: [
        { path: '', component: Expression },
        { path: 'expression', name: 'expression', component: Expression },
        {
          path: 'package',
          component: Package,
          children: [
            { path: '', name: 'package', component: PackageList },
            { path: 'list', name: 'package-list', component: PackageList },
            { path: 'detail', name: 'package-detail', component: PackageDetail }
          ]
        }
      ]
    },
    { path: '/collect-panel', component: CollectPanel }
  ]
})

export default router
