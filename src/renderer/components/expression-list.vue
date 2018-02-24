<template>
  <section class="cpt-expression-list">
    <div class="expression-wrapper" @scroll="requestExpression">
      <expression
        v-for="exp in data"
        :key="exp.link"
        :exp="exp" :mod="mod">
      </expression>
    </div>
    <div class="loading-wrapper" v-show="loading">
      <loading :size="10"></loading>
    </div>
    <div class="empty-wrapper" v-show="showEmpyt">
      <img v-if="mod === 'add'" src="../assets/no-data.png">
      <img v-else src="../assets/empty-icon.png">
    </div>
  </section>
</template>

<script>
import Expression from '@/components/expression'
import Loading from '@/components/loading'
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

    showEmpyt () {
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
    Expression,
    Loading
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

  .empty-wrapper,
  .loading-wrapper {
    position: absolute;
    z-index: 10;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .empty-wrapper {
    display: flex;
    align-items: center;

    img {
      margin: 0 auto;
    }
  }
}
</style>
