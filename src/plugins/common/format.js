import {typeOf} from '@/utils/util'

// 格式化时间
/* eslint-disable */
Date.prototype.format = function (fmt) {
  const date = {
    'M+': this.getMonth() + 1,
    'd+': this.getDate(),
    'h+': this.getHours(),
    'm+': this.getMinutes(),
    's+': this.getSeconds(),
    'q+': Math.floor((this.getMonth() + 3) / 3),
    'S+': this.getMilliseconds()
  }
  if (/(y+)/i.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (let k in date) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? date[k] : ('00' + date[k]).substr(('' + date[k]).length)
      )
    }
  }
  return fmt
}

export default (Vue) => {
  Vue.prototype.$format = (date, fmt) => {
    fmt = fmt || 'yyyy-MM-dd hh:ss'
    if (typeof date === 'string') {
      return new Date(date).format(fmt)
    } else if (typeOf(date) === 'Date') {
      return date.format(fmt)
    } else {
      return ''
    }
  }
}
