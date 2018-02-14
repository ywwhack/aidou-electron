<template>
  <expression-list
    mod="remove"
    :data="data"
    :total="data.length"
    :loading="false">
  </expression-list>
</template>

<script>
import ExpressionList from './expression-list'

export default {
  props: {
    query: {
      type: String,
      default: ''
    }
  },

  computed: {
    data ({
      $store
    }) {
      return Object.keys($store.collectData).map(link => {
        return { link, suffix: '.jpg' }
      })
    }
  },

  components: {
    ExpressionList
  }
}
</script>
