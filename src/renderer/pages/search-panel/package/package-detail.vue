<template>
  <expression-list
    :data="data"
    :total="total"
    :loading="loading">
  </expression-list>
</template>

<script>
import ExpressionList from '@/components/expression-list'
import {
  getPackage
} from '@/service/expPackage'

export default {
  data () {
    return {
      data: [],
      total: 0,
      loading: false
    }
  },

  watch: {
    // 如果查询条件改变了，就退回到上一个页面 package-list
    '$store.query' () {
      this.$router.push({ name: 'package-list' })
    }
  },

  methods: {
    async loadData () {
      const id = this.$route.query.id
      this.loading = true
      const links = await getPackage(id)
      this.loading = false
      this.data = links.map(link => ({ link, suffix: '' }))
      this.total = links.length
    }
  },

  created () {
    this.loadData()
  },

  components: {
    ExpressionList
  }
}
</script>
