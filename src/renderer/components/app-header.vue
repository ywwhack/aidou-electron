<template>
  <section class="cpt-app-header">
    <div class="search-input">
      <span class="icon-search"></span>
      <input
        v-model.trim="keyword"
        @keyup.enter="search"
        @focus="$router.push('/search-panel')">
    </div>
    <ul class="oper-btns">
      <li
        class="btn"
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
import HOT_WORDS from '@/common/hotWords'
import bus from '@/util/bus'

export default {
  data () {
    this.hotWords = HOT_WORDS

    return {
      keyword: '',
      tipMod: 0
    }
  },

  computed: {
    tipText () {
      const { tipMod } = this
      if (!tipMod) return
      return tipMod > 0 ? '+ 1' : '- 1'
    },

    isCollectPanelShowed ({
      $route
    }) {
      return $route.path === '/collect-panel'
    },

    btnList () {
      const {
        tipText,
        isCollectPanelShowed,
        shuffleSearch,
        toggleCollectPanel
      } = this

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
          class: { active: isCollectPanelShowed },
          handler: toggleCollectPanel
        }
      ]
    }
  },

  methods: {
    updateCollectTip (v) {
      this.tipMod = v
      setTimeout(() => {
        this.tipMod = 0
      }, 600)
    },

    toggleCollectPanel () {
      const nextPanelPath = this.isCollectPanelShowed ? '/search-panel' : '/collect-panel'
      this.$router.push(nextPanelPath)
    },

    shuffleSearch () {
      const { hotWords, keyword, $store } = this
      const hotWord = hotWords[(Math.random() * hotWords.length | 0)]
      if (!hotWord || hotWord === keyword) {
        return this.shuffleSearch()
      }
      this.keyword = hotWord
      $store.updateQuery(`${this.keyword} 表情`)
      this.$router.push('/search-panel')
    },

    search () {
      if (!this.keyword) {
        return this.shuffleSearch()
      }
      this.$store.updateQuery(`${this.keyword} 表情`)
    }
  },

  created () {
    bus.$on('update-collect-tip', this.updateCollectTip)
  },

  beforeDestroy () {
    bus.$off('update-collect-tip', this.updateCollectTip)
  }
}
</script>

<style lang="scss">
@import '~@/styles/variables.scss';

.cpt-app-header {
  display: flex;
  align-items: center;
  height: 40px;
  padding: 10px 20px;
  margin-bottom: 20px;
  background: #fff;
  box-shadow: 0 3px 8px rgba(0, 0, 0, .1);
  border: 1px solid #eee;
  border-radius: 40px;

  .search-input {
    display: flex;
    align-items: center;
    flex: 1;
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
      padding: 10px 10px 10px 0;
      color: $info-color;
      font-size: 16px;
      vertical-align: middle;
    }
  }

  .oper-btns {
    height: 100%;
    list-style: none;

    .btn {
      position: relative;
      display: inline-block;
      height: 100%;
      margin-left: 20px;
      color: $info-color;

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
          border-top: 4px solid $info-color;
          border-right: 4px solid transparent;
          border-left: 4px solid transparent;
          transform: translateX(-50%);
        }
      }

      .text {
        color: #fff;
        background: $info-color;
        transform: translate3d(-50%, -100%, 0);
        transition: opacity .2s ease-in-out, transform .2s ease-in-out;
        opacity: 0;
      }

      .tip-text {
        color: #fff;
        font-size: 12px;
        background: $main-color;
        transform: translate3d(-50%, -120%, 0);
        animation: popup .2s 1 linear;

        &:after {
          border-top-color: $main-color;
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
        color: $main-color;
      }

      &:hover.text {
        transform: translate3d(-50%, -120%, 0);
        opacity: 1;
      }
    }
  }
}
</style>
