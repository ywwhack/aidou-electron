<template>
  <expression-list
    :data="data"
    :total="total"
    :page.sync="page"
    :loading="loading">
  </expression-list>
</template>

<script>
import ExpressionList from '@/components/expression-list'
import queryEngine from '@/service/queryEngine'

export default {
  data () {
    return {
      data: [],
      page: 1,
      total: 0,
      loading: false
    }
  },

  computed: {
    query () {
      return this.$store.query
    },

    params ({
      query,
      page,
      size
    }) {
      if (!query) return
      return { query, page, size: 30 }
    }
  },

  watch: {
    'query': 'reset',

    'params': {
      deep: true,
      immediate: true,
      handler: 'fetchExpression'
    }
  },

  methods: {
    reset () {
      this.data = []
      this.page = 1
      this.total = 0
    },

    fetchExpression () {
      const params = this.params
      if (!params) return
      this.loading = true
      queryEngine.sogou(params).then(res => {
        this.loading = false
        if (!res) return
        this.total = res.total
        this.data = this.data.concat(res.data)
      })
    }
  },

  components: {
    ExpressionList
  }
}
</script>
