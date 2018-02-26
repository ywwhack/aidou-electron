<template>
  <div class="page-search-panel__package-list">
    <ul class="packages">
      <li
        v-for="item in packages"
        class="package-item"
        :title="item.title"
        @click="goDetail(item)">
        <img :src="item.preview">
        <div class="info">
          <span>{{ item.title }}</span>
          <span>{{ item.count }} 张</span>
        </div>
      </li>
    </ul>
    <loading v-show="loading"></loading>
    <empty v-show="showEmpty"></empty>
  </div>
</template>

<script>
import Empty from '@/components/empty'
import Loading from '@/components/loading'
import {
  searchPackages
} from '@/service/expPackage'

export default {
  data () {
    return {
      packages: [],
      loading: false
    }
  },

  computed: {
    query () {
      return this.$store.query
    },

    showEmpty ({
      packages,
      loading
    }) {
      return packages.length === 0 && !loading
    }
  },

  watch: {
    'query': {
      immediate: true,
      handler: 'searchPackages'
    }
  },

  methods: {
    async searchPackages (value) {
      if (!value) return

      this.loading = true
      this.packages = await searchPackages(value)
      this.loading = false
    },

    goDetail (item) {
      this.$router.push({
        name: 'package-detail',
        query: {
          id: item.id
        }
      })
    }
  },

  components: {
    Empty,
    Loading
  }
}
</script>

<style lang="scss">
.page-search-panel__package-list {
  position: relative;
  height: 100%;

  .packages {
    overflow: auto;
    flex: 1;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .package-item {
    position: relative;
    width: 200px;
    height: 200px;
    padding: 10px;
    border: 1px solid #efefef;
    margin: 20px 0;
    background: #fff;
    cursor: pointer;

    & > img {
      width: 100%;
      height: 100%;
    }

    & > .info {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      display: flex;
      justify-content: space-between;
      padding: 0 10px;
      color: #fff;
      background: #ddd;
    }
  }
}
</style>
