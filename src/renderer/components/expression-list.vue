<template>
  <section class="cpt-expression-list">
    <div class="expression-wrapper" @scroll="requestExpression">
      <expression-item
        v-for="exp in data"
        :key="exp.link"
        :exp="exp" :mod="mod">
      </expression-item>
    </div>
    <div class="loading-wrapper" v-show="loading">
      <loading :size="10"></loading>
    </div>
    <empty v-show="showEmpty" :mod="mod"></empty>
  </section>
</template>

<script>
import ExpressionItem from '@/components/expression-item'
import Loading from '@/components/loading'
import Empty from '@/components/Empty'
import debounce from 'lodash/debounce'

export default {
  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    },

    page: {
      type: Number,
      default: 1
    },

    total: {
      type: Number,
      default: 0
    },

    loading: Boolean,

    mod: {
      type: String,
      default: 'add'
    }
  },

  computed: {
    pageNum: {
      get () {
        return this.page
      },

      set (v) {
        this.$emit('update:page', v)
      }
    },

    showEmpty () {
      return !this.data.length && !this.loading
    }
  },

  methods: {
    requestExpression: debounce(function ({ target }) {
      const { data, total, loading } = this
      if (data.length === total || loading) return
      const { scrollHeight, offsetHeight, scrollTop } = target
      if (scrollTop + offsetHeight >= scrollHeight) {
        this.pageNum += 1
      }
    }, 400)
  },

  components: {
    ExpressionItem,
    Loading,
    Empty
  }
}
</script>

<style lang="scss">
.cpt-expression-list {
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 100%;

  .expression-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    overflow-y: auto;
    height: 100%;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .loading-wrapper {
    position: absolute;
    z-index: 10;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
