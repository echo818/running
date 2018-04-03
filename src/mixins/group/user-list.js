export default {
  data () {
    return {
      ids: [],
      // 搜索
      searchForm: {
        customer_id: '',
        store_name: '',
        city_id: '',
        area_id: '',
        contractor: '',
        created_at: '',
        dimension_id: '',
        tag_id: '',
        marked_at: '',
        auto_dimension_id: '',
        from_tag_id: '',
        to_tag_id: ''
      },
      searchOptions: {
        customer_id: {
          label: '用户ID'
        },
        store_name: {
          label: '小店名称'
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
        },
        contractor: {
          label: '业务员'
        },
        created_at: {
          type: 'daterange',
          label: '注册时间',
          startPlaceholder: '开始时间',
          endPlaceholder: '结束时间',
          separator: '-'
        },
        dimension_id: {
          type: 'select',
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
        marked_at: {
          type: 'daterange',
          // hide: true,
          label: '时间',
          startPlaceholder: '开始时间',
          endPlaceholder: '结束时间',
          separator: '-'
        },
        auto_dimension_id: {
          type: 'select',
          // hide: true,
          label: '自动标签维度',
          placeholder: '全部',
          changeFn: this.changeAutoDimension,
          options: []
        },
        from_tag_id: {
          type: 'select',
          // hide: true,
          label: '开始标签',
          placeholder: '全部',
          disabled: true,
          options: []
        },
        to_tag_id: {
          type: 'select',
          // hide: true,
          label: '结束标签',
          placeholder: '全部',
          disabled: true,
          options: []
        }
      },
      // 操作控制
      ctrlOptions: {
        exportFile: {
          label: '批量导出',
          ctrlFn: this.exportHandle
        }
      },
      // 表格
      tableEvents: {
        selectionChange: this.selectionChange
      },
      tableOptions: {
        selection: {
          type: 'selection'
        },
        customer_id: {
          label: '用户ID'
        },
        store_name: {
          label: '小店名称'
        },
        city_name: {
          label: '城市'
        },
        area_name: {
          label: '区域'
        },
        created_at: {
          type: 'filter',
          label: '注册时间',
          filterFn: this.$format
        },
        phone: {
          label: '联系电话'
        },
        contractor: {
          label: '业务员'
        },
        func: {
          type: 'operate',
          fixed: 'right',
          label: '操作',
          width: 120,
          options: {
            check: {
              text: '查看用户详情',
              clickFn: this.checkHandle
            }
          }
        }
      }
    }
  }
}
