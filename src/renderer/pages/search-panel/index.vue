<template>
  <div class="page-search-panel">
    <expression-types :selected.sync="expressionType"></expression-types>
    <expression v-if="expressionType === EXPRESSION_TYPE_MAP.expression"></expression>
    <package v-else></package>
  </div>
</template>

<script>
import ExpressionTypes from '@/components/expression-types'
import Expression from './expression'
import Package from './package'
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

  components: {
    ExpressionTypes,
    Expression,
    Package
  }
}
</script>

<style lang="scss">
.page-search-panel {
  height: 100%;
}
</style>
