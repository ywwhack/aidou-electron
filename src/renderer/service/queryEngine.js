import axios from 'axios'
import {
  merge,
  serialize
} from '@/util/helper'

const CONFIG = {
  SOGOU: {
    API: 'https://pic.sogou.com/pics/json.jsp',
    PARAMS: {
      query: '',
      st: 5,
      start: 0,
      xml_len: 100,
      reqFrom: 'wap_result'
    },
    HOT_SEARCH: 'https://pic.sogou.com/pic/emo/'
  }
}

function log (e) {
  // todo: error handler
}

export default {
  // 搜狗表情服务
  sogou ({ query, page, size }) {
    const api = CONFIG.SOGOU.API
    const defParams = CONFIG.SOGOU.PARAMS
    const params = merge(defParams, {
      query: `${query}`,
      start: (page - 1) * size,
      xml_len: size
    })
    const queryURL = `${api}?${serialize(params)}`
    return axios.get(queryURL).then(({ data = {} }) => {
      return {
        data: (data.items || []).map(it => ({
          link: it.locImageLink,
          suffix: it.type
        })),
        total: data.totalNum || 0
      }
    }, log)
  }
}
