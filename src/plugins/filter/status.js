// 状态过滤
export default (Vue) => {
  Vue.prototype.$statusFilter = (val) => {
    if (val === '1') {
      return '开启'
    } else if (val === '2') {
      return '禁用'
    }
  }
}
