<template>
  <div class="page-search-panel">
    <div class="header">
      <button class="common-btn confirm" @click="back">后退</button>
      <expression-types :selected.sync="expressionType"></expression-types>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import ExpressionTypes from '@/components/expression-types'
import {
  EXPRESSION_TYPE_MAP
} from '@/constants'

export default {
  data () {
    this.EXPRESSION_TYPE_MAP = EXPRESSION_TYPE_MAP

    return {
      expressionType: EXPRESSION_TYPE_MAP.expression
    }
  },

  watch: {
    'expressionType' (value) {
      const routeName = value === EXPRESSION_TYPE_MAP.expression ? 'expression' : 'package-list'
      this.$router.push({ name: routeName })
    }
  },

  methods: {
    back () {
      this.$router.back()
    }
  },

  components: {
    ExpressionTypes
  }
}
</script>

<style lang="scss">
.page-search-panel {
  height: 100%;

  & > .header {
    display: flex;
    justify-content: space-between;
  }
}
</style>
