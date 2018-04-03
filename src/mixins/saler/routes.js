export default {
  data () {
    return {
      // search
      cityId: '',
      cityOpts: [],
      routeName: '',
      // table
      routes: [],
      tableOptions: {
        city_name: {
          label: '城市'
        },
        group_line_id: {
          label: '路线ID'
        },
        group_line_name: {
          label: '路线名称'
        },
        updated_at: {
          type: 'filter',
          label: '最后修改时间',
          filterFn: this.$format
        },
        updated_by: {
          label: '修改人'
        },
        store_num: {
          label: '路线超市个数'
        },
        func: {
          type: 'operate',
          fixed: 'right',
          label: '操作',
          width: 400,
          options: [
            {
              text: '编辑',
              clickFn: this.editRoute
            }, {
              text: '删除',
              clickFn: this.deleteRoute
            }, {
              text: '管理',
              clickFn: this.distributeRoute
            }
          ]
        }
      },

      // dialog
      routeVisible: false,
      route: {
        city_id: '',
        group_line_id: '',
        group_line_name: ''
      },
      formOpts: {
        title: '新增路线',
        width: '560px',
        footOpts: [
          {
            label: '取消',
            clickFn: () => {
              this.routeVisible = false
            }
          }, {
            label: '确定',
            type: 'primary',
            clickFn: this.saveRoute
          }
        ]
      },
      itemOpts: {
        city_id: {
          type: 'select',
          label: '城市',
          rules: {
            type: 'integer', required: true, message: '请选择城市', trigger: 'blur'
          },
          options: []
        },
        group_line_name: {
          type: 'input',
          label: '路线名称',
          rules: [
            { required: true, message: '请输入路线名称', trigger: 'blur' },
            { min: 2, max: 32, message: '长度在 2 到 32 个字符', trigger: 'blur' }
          ]
        }
      }
    }
  }
}
