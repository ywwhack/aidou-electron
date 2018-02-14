<template>
  <section class="cpt-app-header">
    <div class="search-input">
      <span class="icon-search"></span>
      <input v-model.trim="keyword"
        @keyup.enter="fetchExp"
        @focus="showView('search')">
    </div>
    <ul class="oper-btns">
      <li class="btn"
        v-for="btn in btnList"
        :key="btn.text"
        :class="btn.class"
        @click="btn.handler">
        <span class="icon" :class="btn.icon"></span>
        <span class="text">{{ btn.text }}</span>
        <span v-show="btn.tip" class="tip-text" >{{ btn.tip }}</span>
      </li>
    </ul>
  </section>
</template>

<script>
import HOT_WORDS from '@/common/hotWords.js'
import bus from '../util/bus'
export default {
  props: {
    view: {
      type: String,
      default: 'search'
    }
  },

  data () {
    this.hotWords = HOT_WORDS
    return {
      keyword: '',
      hotWord: '',
      tipMod: 0
    }
  },

  computed: {
    syncView: {
      get () {
        return this.view
      },

      set (v) {
        this.$emit('update:view', v)
      }
    },

    tipText () {
      const { tipMod } = this
      if (!tipMod) return
      return tipMod > 0 ? '+ 1' : '- 1'
    },

    btnList () {
      const { shuffleSearch, shwoCollect, showConfig, tipText, view } = this
      return [
        {
          icon: 'icon-shuffle',
          text: '随便看看',
          handler: shuffleSearch
        },
        {
          icon: 'icon-favorite_border',
          text: '我的收藏',
          tip: tipText,
          class: { active: view === 'collect' },
          handler: shwoCollect
        },
        {
          icon: 'icon-settings',
          text: '设置',
          class: { active: view === 'config' },
          handler: showConfig
        }
      ]
    }
  },

  created () {
    bus.$on('update-collect-tip', this.updateCollectTip)
  },

  beforeDestroy () {
    bus.$off('update-collect-tip', this.updateCollectTip)
  },

  methods: {
    updateCollectTip (v) {
      this.tipMod = v
      setTimeout(() => {
        this.tipMod = 0
      }, 600)
    },

    shuffleSearch () {
      const { hotWords } = this
      const keyword = hotWords[(Math.random() * hotWords.length | 0)]
      if (!keyword) return
      if (this.keyword === keyword) {
        return this.shuffleSearch()
      }
      this.syncView = 'search'
      this.keyword = keyword
      this.$emit('fetch-exp', `${this.keyword} 表情`)
    },

    showView (view) {
      const { syncView } = this
      if (syncView !== view) {
        this.syncView = view
      } else {
        this.syncView = 'search'
      }
    },

    showConfig () {
      this.showView('config')
    },

    shwoCollect () {
      this.showView('collect')
    },

    fetchExp () {
      if (!this.keyword) {
        return this.shuffleSearch()
      }
      this.$emit('fetch-exp', `${this.keyword} 表情`)
    }
  }
}
</script>

<style lang="scss">
.cpt-app-header {
  $main-color: #929aa3;
  display: flex;
  align-items: center;
  height: 40px;
  padding: 10px;
  margin-bottom: 20px;
  background: #fff;
  box-shadow: 0 3px 8px rgba(0, 0, 0, .1);
  border: 1px solid #eee;
  border-radius: 40px;

  .search-input {
    display: flex;
    align-items: center;
    flex: 3;
    height: 40px;
    padding: 2px 0;

    input {
      display: block;
      flex: 1;
      height: 100%;
      font-size: 14px;
      font-weight: 500;
      appearance: none;
      border: none;
      outline: none;
    }

    .icon-search {
      padding: 10px;
      color: $main-color;
      font-size: 16px;
      vertical-align: middle;
    }
  }

  .oper-btns {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex: 1;
    height: 100%;
    list-style: none;

    .btn {
      position: relative;
      height: 100%;
      color: $main-color;

      .icon {
        font-size: 16px;
        vertical-align: middle;
        cursor: pointer;
      }

      .text,
      .tip-text {
        position: absolute;
        top: 0;
        left: 50%;
        width: 70px;
        padding: 4px 0;
        font-size: 10px;
        text-align: center;
        border-radius: 40px;

        &:after {
          content: '';
          position: absolute;
          bottom: -3px;
          left: 50%;
          border-top: 4px solid $main-color;
          border-right: 4px solid transparent;
          border-left: 4px solid transparent;
          transform: translateX(-50%);
        }
      }

      .text {
        color: #fff;
        background: $main-color;
        transform: translate3d(-50%, -100%, 0);
        transition: opacity .2s ease-in-out, transform .2s ease-in-out;
        opacity: 0;
      }

      .tip-text {
        color: #fff;
        font-size: 12px;
        background: #4ad9d9;
        transform: translate3d(-50%, -120%, 0);
        animation: popup .2s 1 linear;

        &:after {
          border-top-color: #4ad9d9;
        }

        @keyframes popup {
          0% {
            transform: translate3d(-50%, -100%, 0);
            opacity: 0;
          }

          50% {
            opacity: .5;
          }

          100% {
            transform: translate3d(-50%, -120%, 0);
            opacity: 1;
          }
        }
      }

      &.active,
      &:hover {
        color: #4ad9d9;
      }

      &:hover.text {
        transform: translate3d(-50%, -120%, 0);
        opacity: 1;
      }
    }
  }
}
</style>
