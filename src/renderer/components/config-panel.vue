<template>
  <section class="cpt-config-panel">
    <ul class="config-panel" v-if="config">
      <li class="config-item">
        <span class="config-label">显示链接面板：</span>
        <div class="config-content">
          <label>
            <span>显示面板</span>
            <input type="checkbox" v-model="config.showFullLinks">
          </label>
        </div>
      </li>
      <li class="config-item">
        <span class="config-label">默认链接：【 显示链接面板时无效 】</span>
        <div class="config-content">
          <label v-for="link in LINK_OPTIONS" :key="link.name">
            <span>{{ link.name }}</span>
            <input type="radio"
              :value="link.value"
              :disabled="config.showFullLinks"
              v-model="config.copyLink">
          </label>
        </div>
      </li>
      <li class="config-item" v-if="config.shortcut">
        <span class="config-label">快捷键设置：【 {{ shortcutInfo }} 】</span>
        <div class="config-content shortcut-config">
          <label v-for="kb in KB_KEYS" :key="kb.name">
            <span>{{ kb.name }}</span>
            <input type="checkbox" :value="kb.value"
              v-model="config.shortcut.specialKeys">
          </label>
          <span class="add-text">+</span>
          <input type="text"
            class="common-input shortcut-key"
            v-model="config.shortcut.key"
            @keydown="setShortcutCode">
        </div>
      </li>
       <li class="config-item">
        <span class="config-label">图床服务：【 微博图床需要登录微博使用 】</span>
        <div class="config-content">
          <label>
            <span>SM 图床</span>
            <input type="radio" :value="PIC_BED.SM" v-model="config.picBed">
          </label>
          <label>
            <span>微博图床</span>
            <input type="radio" :value="PIC_BED.WEIBO" v-model="config.picBed">
          </label>
        </div>
      </li>
      <li class="config-item">
        <span class="config-label">图床转换：【 有些网站不能直接粘贴表情地址，需要图床转换一下 】</span>
        <div class="config-content transform-config">
           <input type="text" class="common-input"
            v-model.trim="config.transformUrl"
            placeholder="多个 URL 地址请用 , 符号进行分隔">
           <button class="common-btn confirm" @click="addTransformUrl">添加当前网址</button>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
const PIC_BED = {
  SM: 'sm',
  WEIBO: 'weibo'
}

const LINK_OPTIONS = [
  {
    name: 'Markdown',
    value: 'markdown'
  },
  {
    name: '图片链接',
    value: 'url'
  },
  {
    name: 'UBB',
    value: 'ubb'
  },
  {
    name: 'IMG',
    value: 'img'
  }
]

const KB_KEYS = [
  {
    name: 'CMD/WIN',
    value: 'metaKey'
  },
  {
    name: 'CTRL',
    value: 'ctrlKey'
  },
  {
    name: 'OPT/ALT',
    value: 'altKey'
  },
  {
    name: 'SHIFT',
    value: 'shiftKey'
  }
]

const KB_KEYS_MAP = KB_KEYS.reduce((map, curr, i) => {
  map[curr.value] = {
    name: curr.name,
    index: i
  }
  return map
}, {})

const URL_MATCH = /https?:\/\/(.*?)\/.*/

export default {
  data ({
    $store
  }) {
    this.PIC_BED = PIC_BED
    this.KB_KEYS = KB_KEYS
    this.LINK_OPTIONS = LINK_OPTIONS

    return {
      config: $store.appConfig
    }
  },

  computed: {
    shortcutInfo () {
      const { config } = this
      if (!config) return ''
      const { specialKeys = [], key = '' } = config.shortcut || {}
      if (!specialKeys.length) return ''
      const head = specialKeys
        .map(key => KB_KEYS_MAP[key])
        .sort((a, b) => a.index - b.index)
        .map(it => it.name).join(' + ')
      return `${head} + ${String(key).toUpperCase()}`
    },

    transformUrlList () {
      const { transformUrl = '' } = this.config || {}
      return transformUrl.split(/，|；|,|;/)
    }
  },

  watch: {
    'config': {
      deep: true,
      handler: 'updateConfig'
    },

    'transformUrlList' (list) {
      this.config.transformUrl = list.map(url => {
        return url.replace(URL_MATCH, '$1')
      }).join(',')
    },

    'config.shortcut.key' (nv) {
      if (nv) {
        this.config.shortcut.key = nv.slice(0, 1)
      }
    }
  },

  methods: {
    updateConfig (conf) {
    },

    setShortcutCode (event) {
      if (!this.config) return
      this.config.shortcut.code = event.code
    },

    addTransformUrl () {
      const { $root: { HOSTNAME }, transformUrlList } = this
      const { transformUrl = '' } = this.config || {}
      if (~transformUrlList.indexOf(HOSTNAME)) return
      this.config.transformUrl = transformUrl
        ? `${HOSTNAME},${transformUrl}`
        : HOSTNAME
    }
  }
}
</script>

<style lang="scss">
$font-color: #929aa3;
.cpt-config-panel {
  overflow: auto;
  width: 100%;
  border-radius: 4px;
  color: #3e5165;

  &::-webkit-scrollbar {
    display: none;
  }

  .config-panel {
    list-style: none;
  }

  .config-item {
    padding: 20px 0;
    border-bottom: 1px dotted #eee;
  }

  .config-label {
    display: block;
    margin: 10px 0;
    color: #777;
  }

  .config-content {
    margin-right: 10px;

    label {
      margin-right: 20px;

      span {
        margin-right: 6px;
        color: $font-color;
      }
    }
  }

  .shortcut-config {
    label {
      margin-right: 14px;

      span {
        margin-right: 2px;
        color: $font-color;
      }

      &:last-child {
        margin-right: 0;
      }
    }

    .add-text {
      margin-right: 14px;
      font-weight: bolder;
    }

    .shortcut-key {
      display: inline-block;
      width: 60px;
      color: $font-color;
    }
  }

  .transform-config {
    display: flex;
    align-items: center;

    input {
      flex: 1;
      margin-right: 6px;
      color: $font-color;
      &::-webkit-input-placeholder {
        color: #ccc;
        font-size: 10px;;
        font-weight: 200;
      }
    }
  }
}
</style>
