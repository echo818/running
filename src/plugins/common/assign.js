// 合并对象
export default (Vue) => {
  Vue.prototype.$assign = (target, options) => {
    let opts = {}
    for (let key in target) {
      if (target[key] !== undefined && options[key] !== undefined) {
        opts[key] = options[key]
      }
    }
    return opts
  }
}
