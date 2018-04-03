import { typeOf } from '@/utils/util'

// 检查页面元素显示
export default (Vue) => {
  Vue.prototype.$show = (data) => {
    if (typeOf(data) === 'Object') {
      for (let key in data) {
        if (data[key]['show'] || data[key]['show'] === undefined) return true
      }
      return false
    } else {
      for (let i = 0, l = data.length; i < l; i++) {
        if (data[i]['show'] || data[i]['show'] === undefined) return true
      }
      return false
    }
  }
}
