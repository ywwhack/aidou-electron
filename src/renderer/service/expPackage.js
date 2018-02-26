/**
 * 表情包搜索服务
 * 搜狗上并没有提供相关 api，但是前端可以模仿「爬虫」的方式获取
 */
import axios from 'axios'

export function searchPackages (keyword) {
  return axios.get('https://pic.sogou.com/pic/emo/searchList.jsp', {
    params: { keyword },
    responseType: 'document'
  }).then(response => {
    const doc = response.data
    const expContainerNodes = doc.querySelectorAll('.recall-module')
    return Array.from(expContainerNodes).map(container => {
      const linkNode = container.querySelector('.emo-tit-recall')
      const link = linkNode.href
      // match package id from link
      const id = /id=([^&]*)/.exec(link)[1]
      const title = linkNode.innerText
      // 获取表情包数量
      const countNode = container.querySelector('.more-emo')
      const count = countNode.innerText.slice(0, -1)
      // 取表情包的第一张图片作为预览
      const preview = container.querySelector('img[rsrc]').getAttribute('rsrc')
      return {
        id,
        title,
        count,
        preview
      }
    })
  })
}

export function getPackage (id) {
  return axios.get('http://pic.sogou.com/pic/emo/groupDetail.jsp', {
    params: { id, from: 'emo_search_gname' },
    responseType: 'document'
  }).then(response => {
    const doc = response.data
    const container = doc.getElementById('groupEmojiListUl')
    const expNodes = container.querySelectorAll('img[rsrc]')
    return Array.from(expNodes).map(node => node.getAttribute('rsrc'))
  })
}
