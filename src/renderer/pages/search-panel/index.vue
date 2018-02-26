<template>
  <div class="page-search-panel">
    <div class="package-header">
      <span v-if="showBackBtn" class="icon-rewind" @click="back">返回</span>
      <!-- 元素占位符，目的是让 expression-types 排列在行的右侧 -->
      <span v-else></span>
      <expression-types :selected.sync="expressionType"></expression-types>
    </div>
    <div class="package-content">
      <router-view></router-view>
    </div>
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

  computed: {
    // 目前只有在进入具体表情包的时候，才会显示后退按钮
    showBackBtn ({
      $route
    }) {
      return $route.name === 'package-detail'
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
      this.$router.push({ name: 'package-list' })
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
  display: flex;
  flex-direction: column;

  & > .package-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    & > .icon-rewind {
      cursor: pointer;
    }
  }

  & > .package-content {
    flex: 1;
    overflow: auto;

    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
