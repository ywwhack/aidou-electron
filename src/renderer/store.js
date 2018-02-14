import Vue from 'vue'
import storage from '@/common/storage'
import config from '@/common/config'

// 初始化配置
const appConfig = storage.get('app_config') || config
const collectData = storage.get('collect_data') || {}

export default new Vue({
  data: {
    appConfig,
    collectData
  },

  watch: {
    'appConfig': {
      immediate: true,
      deep: true,
      handler (value) {
        storage.set('app_config', value)
      }
    },

    'collectData': {
      immediate: true,
      deep: true,
      handler (value) {
        storage.set('collect_data', value)
      }
    }
  }
})
