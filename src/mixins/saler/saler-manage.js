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
        name: '姓名',
        phone: 'phone'
      },
      // 搜索
      searchForm: {
        id_start: '',
        id_end: '',
        role_id: '',
        city: '',
        status: 1
      },
      searchOptions: {
        id_start: {
          label: 'ID',
          append: 'divide'
        },
        id_end: {
          label: '.'
        },
        role_id: {
          type: 'select',
          label: '角色',
          options: []
        },
        city: {
          type: 'select',
          label: '城市',
          changeFn: this.changeCity,
          options: []
        },
        status: {
          type: 'select',
          label: '状态',
          options: [{
            label: '开启',
            value: 1
          }, {
            label: '禁用',
            value: 0
          }]
        }
      },
      // 操作控制
      ctrlOptions: {
        export: {
          label: '导出',
          ctrlFn: this.exportHandle
        },
        add: {
          label: '新增业务员',
          ctrlFn: this.addSaler
        }
      },
      // 表格
      tableOptions: {
        contractor_id: {
          label: 'ID',
          width: 120
        },
        role_name: {
          label: '角色',
          width: 150
        },
        name: {
          label: '姓名',
          width: 200
        },
        city: {
          label: '城市',
          width: 200
        },
        phone: {
          label: 'phone',
          width: 200
        },
        status: {
          type: 'filter',
          label: '状态',
          width: 100,
          filterFn: this.$statusFilter
        },
        contractor: {
          label: '业务员'
        },
        func: {
          type: 'operate',
          fixed: 'right',
          label: '操作',
          width: 100,
          options: {
            edit: {
              text: '编辑',
              clickFn: this.editHandle
            }
          }
        }
      },
      // 新增业务员
      salerVisible: false,
      salerOpts: {
        title: '新增业务员',
        width: '560px',
        footOpts: [{
          label: '取消',
          clickFn: (formEl) => {
            this.salerVisible = false
            formEl.resetFields()
          }
        }, {
          label: '确定',
          type: 'primary',
          clickFn: this.salerHandle
        }]
      },
      salerForm: {
        contractor_id: '',
        role_id: '',
        name: '',
        city: '',
        city_list: [],
        phone: '',
        password: '',
        status: 1
      },
      salerOptions: {
        role_id: {
          type: 'select',
          label: '角色',
          rules: {type: 'integer', required: true, message: '请选择角色', trigger: 'blur'},
          options: []
        },
        name: {
          type: 'input',
          label: '姓名',
          rules: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { min: 2, max: 32, message: '长度在 2 到 32 个字符', trigger: 'blur' }
          ]
        },
        city: {
          type: 'select',
          label: '账号所属城市',
          rules: {type: 'integer', required: true, message: '请选择账号所属城市', trigger: 'blur'},
          options: []
        },
        city_list: {
          type: 'select',
          label: '管理城市',
          multiple: true,
          rules: {type: 'array', required: true, message: '请选择管理城市', trigger: 'blur'},
          options: []
        },
        phone: {
          type: 'input',
          label: '手机',
          rules: [
            { required: true, message: '手机号不能为空', trigger: 'blur' },
            { pattern: /^0?(13|14|15|17|18)[0-9]{9}$/, message: '手机格式不正确' }
          ]
        },
        password: {
          type: 'input',
          label: '密码'
        },
        status: {
          type: 'select',
          label: '是否启用',
          clearable: false,
          rules: {required: true, message: '请选择是否启用', trigger: 'blur'},
          options: [{
            label: '停用',
            value: 0
          }, {
            label: '启用',
            value: 1
          }]
        }
      }
    }
  }
}
