export default {
  data () {
    let id = this.$route.params['id']
    return {
      id,
      // 搜索
      searchForm: {
        date_at: '',
        city_id: '',
        area_id: ''
      },
      searchOptions: {
        date_at: {
          type: 'daterange',
          label: '时间',
          startPlaceholder: '开始时间',
          endPlaceholder: '结束时间',
          separator: '-'
        },
        city_id: {
          type: 'select',
          label: '城市',
          placeholder: '全部',
          changeFn: this.changeCity,
          options: []
        },
        area_id: {
          type: 'select',
          label: '区域',
          placeholder: '全部',
          disabled: true,
          options: []
        }
      },
      // 操作控制
      ctrlOptions: {
        export: {
          label: '批量导出',
          ctrlFn: this.exportHandle
        }
      },
      // 表格
      tableOptions: {
        date: {
          label: '时间'
        },
        customer_count: {
          label: '人数'
        },
        proportion: {
          label: '百分比'
        }
      }
    }
  }
}
