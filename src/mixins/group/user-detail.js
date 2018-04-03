export default {
  data () {
    return {
      componentName: 'UserDetail',
      id: this.$route.params.id,
      // 用户信息
      userInfo: {},
      // 操作控制
      ctrlOptions: {
        add: {
          label: '查看历史标签',
          ctrlFn: this.checkTag
        }
      },
      // 表格
      tableData: [],
      tableOptions: {
        dimension_name: {
          label: '标签维度'
        },
        tags: {
          label: '标签名称'
        }
      }
    }
  }
}
