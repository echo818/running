// 数组过滤对象的属性
export default (Vue) => {
  Vue.prototype.$filter = (target, filters) => {
    return filters.reduce((opts, key) => {
      opts[key] = target[key]
      return opts
    }, {})
  }
}
