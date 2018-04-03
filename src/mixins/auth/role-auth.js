export default {
  data () {
    return {
      // 搜索
      searchForm: {
        role_id: '',
        role_name: ''
      },
      searchOptions: {
        role_id: {
          label: 'ID'
        },
        role_name: {
          label: '角色名称'
        }
      },
      // 操作控制
      ctrlOptions: {
        add: {
          label: '新增角色',
          ctrlFn: this.addRole
        }
      },
      // 表格
      tableOptions: {
        role_id: {
          label: 'ID'
        },
        role_name: {
          label: '角色名称'
        },
        func: {
          type: 'operate',
          fixed: 'right',
          label: '操作',
          width: 180,
          options: {
            check: {
              text: '角色资源',
              clickFn: this.checkRole
            },
            delete: {
              text: '删除',
              clickFn: this.deleteHandle
            }
          }
        }
      },
      // 新增角色
      roleVisible: false,
      roleOpts: {
        title: '新增角色',
        width: '560px',
        footOpts: [{
          label: '取消',
          clickFn: () => {
            this.roleVisible = false
          }
        }, {
          label: '确定',
          type: 'primary',
          clickFn: this.roleHandle
        }]
      },
      roleForm: {
        role_name: ''
      },
      roleOptions: {
        role_name: {
          label: '角色名称',
          rules: [
            { required: true, message: '请输入角色名称', trigger: 'blur' },
            { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
          ]
        }
      }
    }
  }
}
