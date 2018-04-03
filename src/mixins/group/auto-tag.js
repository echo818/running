export default {
  data () {
    return {
      // 搜索
      searchForm: {
        dimension_id: '',
        tag_id: '',
        status: '',
        city_id: '',
        area_id: ''
      },
      searchOptions: {
        dimension_id: {
          type: 'select',
          tagType: 0,
          label: '标签维度',
          placeholder: '全部',
          changeFn: this.changeDimension,
          options: []
        },
        tag_id: {
          type: 'select',
          label: '标签名称',
          placeholder: '全部',
          disabled: true,
          options: []
        },
        status: {
          type: 'select',
          label: '状态',
          placeholder: '全部',
          options: [{
            label: '开启',
            value: '1'
          }, {
            label: '禁用',
            value: '2'
          }]
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
      // 表格
      tableData: [],
      tableOptions: {
        dimension_id: {
          label: '维度ID',
          width: 120
        },
        dimension: {
          label: '维度',
          width: 120
        },
        tag_id: {
          label: '标签ID',
          width: 120
        },
        tag_name: {
          label: '标签名称',
          width: 120
        },
        status: {
          type: 'filter',
          label: '状态',
          width: 100,
          filterFn: this.$statusFilter
        },
        customer_count: {
          label: '标签对应人数'
        },
        proportion: {
          label: '对应人数占比'
        },
        func: {
          type: 'operate',
          fixed: 'right',
          label: '操作',
          width: 260,
          options: {
            status: {
              typeFn: rows => {
                return rows.status === '1' ? 'danger' : 'info'
              },
              textFn: rows => {
                return rows.status === '1' ? '禁用' : '开启'
              },
              clickFn: this.statusChange
            },
            history: {
              text: '查看历史数据',
              clickFn: this.historyHandle
            },
            check: {
              text: '查看人群',
              clickFn: this.checkHandle
            }
          }
        }
      }
    }
  }
}
