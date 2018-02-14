<template>
  <section id="chrome-extension-aidou">
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
      <config-panel
        class="view"
        key="config"
        v-show="view.config">
      </config-panel>
    </transition-group>
  </section>
</template>

<script>
import AppHeader from './components/app-header'
import SearchPanel from './components/search-panel'
import ConfigPanel from './components/config-panel'
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
        collect: currView === 'collect',
        config: currView === 'config'
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
    ConfigPanel,
    SearchPanel,
    CollectPanel
  }
}
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

html,
body {
  width: 100%;
  height: 100%;
  font-size: 12px;
}

ul {
  list-style: none;
}

.common-input {
  padding: 4px 8px;
  border: 1px solid #eee;
  border-radius: 4px;
  outline: none;
}

.common-btn {
  padding: 4px 8px;
  border: none;
  border-radius: 4px;
  outline: none;
  cursor: pointer;
  transition: opacity .2s;

  &.confirm {
    color: #fff;
    background: #4ad9d9;
  }

  &.cancel {
    background: #ccc;
  }

  &:hover {
    opacity: .8;
  }
}

#chrome-extension-aidou {
  position: relative;
  z-index: 100;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 40px 50px 40px 60px;
  border-left: 1px solid #ebebeb;
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

  .close-btn {
    position: absolute;
    top: 0;
    left: 0;
    padding: 20px;
    color: #929aa3;
    font-size: 14px;

    cursor: pointer;
    transition: color .2s ease-in;

    &:hover {
      color: #4ad9d9;
    }
  }
}
</style>
