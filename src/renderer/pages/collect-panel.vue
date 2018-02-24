<template>
  <expression-list
    mod="remove"
    :data="data"
    :total="data.length">
  </expression-list>
</template>

<script>
import ExpressionList from '@/components/expression-list'

export default {
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
