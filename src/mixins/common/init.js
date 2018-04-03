export default {
  created () {
    this.initPage()
  },
  watch: {
    // 动态路由页面再次进入重新请求数据
    '$route' (to, from) {
      this.id = to.params.id
      let newPath = this.$storage.get('newTab')
      if (to.path === newPath && to.name === this.componentName) {
        this.initPage()
      }
    }
  }
}
