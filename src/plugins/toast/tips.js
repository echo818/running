// 封装ElementUI的MessageBox弹框
export default (Vue) => {
  Vue.prototype.$tips = function (msg, fn) {
    this.$alert(msg, {
      showClose: false
    }).then(() => {
      fn && fn()
    })
  }
}
