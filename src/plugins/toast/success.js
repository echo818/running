// 封装ElementUI的message弹框
export default (Vue) => {
  Vue.prototype.$success = function (msg) {
    this.$message.success(msg)
  }
}
