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
import {
  EXPRESSION_TYPE_MAP
} from '@/constants'

export default {
  data () {
    return {
      expressionType: EXPRESSION_TYPE_MAP.expression,

      // expression-list
      data: [],
      size: 30,
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
      return { query, page, size }
    }
  },

  watch: {
    'query': 'reset',

    'params': {
      deep: true,
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
