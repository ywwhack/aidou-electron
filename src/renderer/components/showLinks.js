import Vue from 'vue'
import main from './links-panel'

const Ctor = Vue.extend(main)

let ins = null

export default function showLinks (url) {
  if (!ins) {
    ins = new Ctor({ propsData: { url } }).$mount()
  } else {
    ins.url = url
  }
  return ins.$el
}
