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
    <div v-show="showEmpty" class="empty">
      <empty></empty>
    </div>
    <div v-show="loading" class="loading">
      <loading></loading>
    </div>
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
      return packages.length === 0
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
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

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
        display: flex;
        justify-content: space-between;
        width: 100%;
        padding: 0 10px;
        color: #fff;
        background: #ddd;
      }
    }
  }

  & > .loading,
  & > .empty {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
  
  & > .loading {
    background: #fff;
  }
}
</style>
