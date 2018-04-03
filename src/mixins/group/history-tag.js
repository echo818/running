export default {
  data () {
    let id = this.$route.params['id']
    return {
      id,
      componentName: 'HistoryTag',
      // 搜索
      searchForm: {
        customer_id: id,
        date_at: ''
      },
      searchOptions: {
        date_at: {
          type: 'daterange',
          label: '时间周期',
          startPlaceholder: '开始时间',
          endPlaceholder: '结束时间',
          separator: '-'
        }
      },
      // 表格
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
