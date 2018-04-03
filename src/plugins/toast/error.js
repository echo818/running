// 封装ElementUI的message弹框
export default (Vue) => {
  Vue.prototype.$error = function (msg) {
    this.$message.error(msg)
  }
}
