<template>
  <section class="cpt-expression-list">
    <div class="expressions" @scroll="requestExpression">
      <expression-item
        v-for="exp in data"
        :key="exp.link"
        :exp="exp" :mod="mod">
      </expression-item>
    </div>
    <div v-show="showEmpty" class="empty">
      <empty :mod="mod"></empty>
    </div>
    <div v-show="loading" :class="loadingClass">
      <loading :size="10"></loading>
    </div>
  </section>
</template>

<script>
import ExpressionItem from '@/components/expression-item'
import Loading from '@/components/loading'
import Empty from '@/components/empty'
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
      return this.data.length === 0
    },

    loadingClass ({
      page
    }) {
      return {
        loading: true,
        // 如果不是滚动加载，loading 显示全屏
        fullscreen: page === 1
      }
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
  position: relative;
  height: 100%;

  .expressions {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    overflow-y: auto;
    height: 100%;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  & > .loading,
  & > .empty {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  & > .loading {
    height: 20px;

    &.fullscreen {
      height: 100%;
      background: #fff;
    }
  }
}
</style>
