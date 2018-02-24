<template>
  <section id="app">
    <app-header @fetch-exp="fetchExp" :view.sync="currView"></app-header>
    <transition-group name="panels" tag="div" class="app-wrapper">
      <search-panel
        class="view"
        key="search"
        :query="query"
        v-show="view.search">
      </search-panel>
      <collect-panel
        class="view"
        key="collect"
        v-show="view.collect">
      </collect-panel>
    </transition-group>
  </section>
</template>

<script>
import AppHeader from './components/app-header'
import SearchPanel from './components/search-panel'
import CollectPanel from './components/collect-panel'

export default {
  data () {
    return {
      query: '',
      currView: 'search'
    }
  },

  computed: {
    view () {
      const { currView } = this
      return {
        search: currView === 'search',
        collect: currView === 'collect'
      }
    }
  },

  methods: {
    fetchExp (v) {
      this.query = v
    }
  },

  components: {
    AppHeader,
    SearchPanel,
    CollectPanel
  }
}
</script>

<style lang="scss">
#app {
  position: relative;
  z-index: 100;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 40px 50px 40px 60px;
  background: #fff;
  color: #3e5165;
  font-weight: 200;

  .app-wrapper {
    position: relative;
    flex: 1;
    overflow: hidden;

    .view {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #fff;
    }
  }

  .panels-enter-active,
  .panels-leave-active {
    transition: opacity .8s, transform .8s;
  }
  .panels-enter,
  .panels-leave-to {
    opacity: 0;
    transform: translateY(10px);
  }
}
</style>
