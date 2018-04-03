export default {
  data () {
    return {
      // 快速查询
      fastForm: {
        name: 'all',
        value: ''
      },
      fastOptions: {
        all: '快速查询',
        contractor_name: '业务员name',
        customer_id: '超市ID',
        customer_name: '超市名称',
        visit_purpose: '拜访目的',
        visit_content: '拜访内容',
        feedback: '客户反馈'
      },
      // 搜索
      searchForm: {
        record_id_start: '',
        record_id_end: '',
        contractor_id_start: '',
        contractor_id_end: '',
        city: '',
        visitTime: [],
        createdTime: []
      },
      searchOptions: {
        record_id_start: {
          label: 'ID',
          append: 'divide'
        },
        record_id_end: {
          label: '.'
        },
        contractor_id_start: {
          label: '业务员ID',
          append: 'divide'
        },
        contractor_id_end: {
          label: '.'
        },
        city: {
          type: 'select',
          label: '城市',
          changeFn: this.changeCity,
          options: []
        },
        visitTime: {
          type: 'datetimerange',
          label: '拜访时间',
          startPlaceholder: '开始时间',
          endPlaceholder: '结束时间',
          separator: '-'
        },
        createdTime: {
          type: 'datetimerange',
          label: '创建时间',
          startPlaceholder: '开始时间',
          endPlaceholder: '结束时间',
          separator: '-'
        }
      },
      // 操作控制
      ctrlOptions: {
        export: {
          label: '导出',
          ctrlFn: this.exportHandle
        }
      },
      // 表格
      tableOptions: {
        record_id: {
          label: 'ID',
          width: 100
        },
        contractor_name: {
          label: '业务员ID',
          width: 150
        },
        name: {
          label: '业务员姓名',
          width: 150
        },
        city: {
          label: '城市',
          width: 200
        },
        customer_id: {
          label: '超市ID',
          width: 100
        },
        customer_name: {
          label: '超市名称',
          width: 150
        },
        visit_purpose: {
          label: '拜访目的',
          width: 150
        },
        visit_content: {
          label: '拜访内容',
          width: 150
        },
        feedback: {
          label: '客户反馈',
          width: 150
        },
        visited_at: {
          type: 'filter',
          label: '拜访时间',
          width: 180,
          filterFn: this.$format
        },
        created_at: {
          type: 'filter',
          label: '创建时间',
          width: 180,
          filterFn: this.$format
        }
      }
    }
  }
}
