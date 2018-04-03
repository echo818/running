// post网络请求
export default (Vue) => {
  Vue.prototype.$post = function (path, data = {}, options = {}) {
    return this.$ajax(path, data, options)
  }
}
