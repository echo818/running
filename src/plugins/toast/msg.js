// 封装ElementUI的MessageBox弹框
export default (Vue) => {
  Vue.prototype.$msg = function (msg, type, fn) {
    if (typeof type === 'function') {
      fn = type
      type = 'warning'
    }
    this.$confirm(msg, {
      showClose: false,
      type
    }).then(() => {
      fn()
    }).catch(() => {})
  }
}
