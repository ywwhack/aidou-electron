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
