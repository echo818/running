// get网络请求
export default (Vue) => {
  Vue.prototype.$get = function (path, data = {}, options = {}) {
    return this.$ajax(path, data, Object.assign(options, {method: 'get'}))
  }
}
