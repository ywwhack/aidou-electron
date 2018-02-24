<template>
  <ul class="cpt-expression-types">
    <li
      v-for="item in expressionTypes"
      :class="getClass(item)"
      @click="selectType(item)">
      {{ item.value }}
    </li>
  </ul>  
</template>

<script>
import {
  EXPRESSION_TYPE_MAP
} from '@/constants'
import {
  transformMap
} from '@/util/helper'

export default {
  props: {
    selected: String
  },

  methods: {
    getClass (item) {
      return {
        active: item.value === this.selected
      }
    },

    selectType (item) {
      this.$emit('update:selected', item.value)
    }
  },

  created () {
    this.expressionTypes = transformMap(EXPRESSION_TYPE_MAP)
  }
}
</script>

<style lang="scss">
@import '~@/styles/variables.scss';

.cpt-expression-types {
  text-align: center;

  & > li {
    display: inline-block;
    padding: 4px 0;
    color: $info-color;
    cursor: pointer;

    & + li {
      margin-left: 10px;
    }

    &.active {
      color: $main-color;
    }
  }
}
</style>
