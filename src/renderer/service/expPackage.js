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
      const link = container.querySelector('.emo-tit-recall').href
      // 取表情包的第一张图片作为预览
      const preview = container.querySelector('img[rsrc]').getAttribute('rsrc')
      return {
        link,
        preview
      }
    })
  })
}

export function getPackage (packageLink) {
  return axios.get(packageLink, { responseType: 'document' })
    .then(response => {
      const doc = response.data
      const container = doc.getElementById('groupEmojiListUl')
      const expNodes = container.querySelectorAll('img[rsrc]')
      return Array.from(expNodes).map(node => node.getAttribute('rsrc'))
    })
}
