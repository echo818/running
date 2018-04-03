export default {
  data () {
    return {
      // 初始化数据
      initData: {
        dimension_id: {
          label: '维度ID',
          width: 120
        },
        dimension_name: {
          label: '标签维度',
          width: 200
        },
        tag_id: {
          label: '标签ID',
          width: 120
        },
        status: {
          type: 'filter',
          label: '状态',
          width: 100,
          filterFn: this.$statusFilter
        },
        created_at: {
          type: 'filter',
          label: '创建时间',
          width: 200,
          filterFn: this.$format
        },
        operator: {
          label: '操作人',
          width: 150
        },
        updated_at: {
          type: 'filter',
          prop: 'updated_at',
          label: '最后操作时间',
          minWidth: 200,
          filterFn: this.$format
        }
      },
      // 搜索
      searchShow: false,
      searchForm: {
        dimension_id: '',
        tag_id: '',
        status: '',
        created_at: ''
      },
      searchOptions: {
        dimension_id: {
          type: 'select',
          tagType: 1,
          label: '标签维度',
          placeholder: '全部',
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
        created_at: {
          type: 'daterange',
          label: '创建时间',
          startPlaceholder: '开始时间',
          endPlaceholder: '结束时间',
          separator: '-'
        }
      },
      // 操作控制
      ctrlOptions: {
        add_dimension: {
          label: '新增维度',
          show: false,
          ctrlFn: this.addDimension
        },
        add_tag: {
          label: '新增标签',
          show: false,
          ctrlFn: this.addTag
        }
      },
      // 表格
      tableOptions: {
        func: {
          type: 'operate',
          fixed: 'right',
          label: '操作',
          width: 260,
          options: {
            status: {
              typeFn: (rows) => {
                return rows.status === '1' ? 'danger' : 'info'
              },
              show: false,
              textFn: (rows) => {
                return rows.status_label
              },
              clickFn: this.statusChange
            },
            check: {
              text: '查看挂载人群',
              show: false,
              clickFn: this.checkHandle
            },
            edit: {
              text: '编辑',
              show: true,
              clickFn: this.editHandle
            }
          }
        }
      },
      // 新增维度
      dimensionVisible: false,
      dimensionOpts: {
        title: '新增维度',
        width: '560px',
        footOpts: [{
          label: '取消',
          clickFn: () => {
            this.dimensionVisible = false
          }
        }, {
          label: '确定',
          type: 'primary',
          clickFn: this.dimensionHandle
        }]
      },
      dimensionForm: {
        dimension_name: ''
      },
      dimensionOptions: {
        dimension_name: {
          type: 'input',
          label: '新增维度',
          rules: [
            { required: true, message: '请输入维度名称', trigger: 'blur' },
            { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
          ]
        }
      },
      // 新增标签
      tagVisible: false,
      tagOpts: {
        title: '新增标签',
        width: '560px',
        footOpts: [{
          label: '取消',
          clickFn: () => {
            this.tagVisible = false
          }
        }, {
          label: '确定',
          type: 'primary',
          clickFn: this.tagHandle
        }]
      },
      tagForm: {
        dimension_id: '',
        tag_name: '',
        status: ''
      },
      tagOptions: {
        dimension_id: {
          type: 'select',
          label: '标签维度',
          placeholder: '全部',
          rules: { required: true, message: '请选择维度', trigger: 'blur' },
          options: []
        },
        tag_name: {
          type: 'input',
          label: '标签名称'
        },
        status: {
          type: 'select',
          label: '状态',
          placeholder: '全部',
          rules: { required: true, message: '请选择维度', trigger: 'blur' },
          options: [{
            label: '开启',
            value: '1'
          }, {
            label: '禁用',
            value: '2'
          }]
        }
      }
    }
  }
}
