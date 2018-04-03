export default {
  data () {
    return {
      // 搜索
      searchForm: {
        user_id: '',
        username: '',
        status: '',
        role_id: ''
      },
      searchOptions: {
        user_id: {
          label: 'ID'
        },
        username: {
          label: '用户名'
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
        role_id: {
          type: 'select',
          label: '角色',
          placeholder: '全部',
          options: []
        }
      },
      // 操作控制
      ctrlOptions: {
        add: {
          label: '新增用户',
          ctrlFn: this.addUser
        }
      },
      // 表格
      tableOptions: {
        user_id: {
          label: 'ID',
          width: 120
        },
        username: {
          label: '用户名',
          width: 200
        },
        name: {
          label: '名字',
          width: 200
        },
        email: {
          label: '电子邮件',
          width: 300
        },
        status: {
          type: 'filter',
          label: '状态',
          width: 120,
          filterFn: this.$statusFilter
        },
        role_name: {
          label: '角色'
        },
        func: {
          type: 'operate',
          fixed: 'right',
          label: '操作',
          width: 260,
          options: {
            edit: {
              text: '编辑',
              clickFn: this.editUser
            },
            pwd: {
              text: '重置密码',
              clickFn: this.resetPwd
            },
            delete: {
              text: '删除',
              clickFn: this.deleteHandle
            }
          }
        }
      },
      // 新增用户
      userVisible: false,
      userOpts: {
        title: '新增用户',
        width: '560px',
        footOpts: [{
          label: '取消',
          clickFn: () => {
            this.userVisible = false
          }
        }, {
          label: '确定',
          type: 'primary',
          clickFn: this.userHandle
        }]
      },
      userForm: {
        user_id: '',
        username: '',
        name: '',
        email: '',
        role_id: '',
        status: 1
      },
      userOptions: {
        username: {
          label: '用户名',
          rules: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 2, max: 32, message: '长度在 2 到 32 个字符', trigger: 'blur' }
          ]
        },
        name: {
          label: '名字',
          rules: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { min: 2, max: 32, message: '长度在 2 到 32 个字符', trigger: 'blur' }
          ]
        },
        email: {
          label: '电子邮件',
          rules: [
            { required: true, message: '请输入电子邮件', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur, change' }
          ]
        },
        role_id: {
          type: 'select',
          label: '角色',
          placeholder: '全部',
          rules: { required: true, message: '请选择角色', trigger: 'blur' },
          options: []
        },
        status: {
          type: 'select',
          label: '状态',
          placeholder: '全部',
          clearable: false,
          options: [{
            label: '开启',
            value: '1'
          }, {
            label: '禁用',
            value: '2'
          }]
        }
      },
      // 重置密码
      pwdVisible: false,
      pwdOpts: {
        title: '重置密码',
        width: '560px',
        footOpts: [{
          label: '取消',
          clickFn: () => {
            this.pwdVisible = false
          }
        }, {
          label: '确定',
          type: 'primary',
          clickFn: this.pwdHandle
        }]
      },
      pwdForm: {
        role_id: '',
        password: '',
        confirm_pwd: ''
      },
      pwdOptions: {
        password: {
          type: 'password',
          label: '密码',
          rules: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 7, max: 16, message: '长度在 7 到 16 个字符', trigger: 'blur' },
            {
              validator: (rule, value, callback) => {
                let reg = /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*-]+$)[a-zA-Z\d!@#$%^&*-]+$/
                if (reg.test(value)) {
                  callback()
                } else {
                  callback(new Error('任意数字、字母、特殊字符组合!'))
                }
              },
              trigger: 'blur'
            }
          ]
        },
        confirm_pwd: {
          type: 'password',
          label: '确认密码',
          rules: [
            { required: true, message: '请输入确认密码', trigger: 'blur' },
            { min: 7, max: 16, message: '长度在 7 到 16 个字符', trigger: 'blur' },
            {
              validator: (rule, value, callback) => {
                let reg = /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*-]+$)[a-zA-Z\d!@#$%^&*-]+$/
                if (reg.test(value)) {
                  if (value !== this.pwdForm.password) {
                    callback(new Error('两次输入密码不一致!'))
                  } else {
                    callback()
                  }
                } else {
                  callback(new Error('任意数字、字母、特殊字符组合!'))
                }
              },
              trigger: 'blur'
            }
          ]
        }
      }
    }
  }
}
