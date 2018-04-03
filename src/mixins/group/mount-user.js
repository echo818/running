import { rootUrl } from '@/data/url'
export default {
  data () {
    let id = this.$route.params['id']
    return {
      componentName: 'ManualMountUser',
      id,
      ids: [],
      // 搜索
      searchForm: {
        customer_id: '',
        store_name: '',
        city_id: '',
        area_id: '',
        contractor: ''
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
        }
      },
      // 操作控制
      ctrlOptions: {
        importFile: {
          type: 'upload',
          label: '导入文件',
          action: `${rootUrl}chinacloud/cdn_file_receiver.php`,
          data: {
            entity: 'slim'
          },
          success: this.importSuccess
        },
        exportFile: {
          label: '导出表格',
          ctrlFn: this.exportFile
        },
        add: {
          label: '新增',
          ctrlFn: this.addFn
        },
        del: {
          label: '删除',
          ctrlFn: this.delFn
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
          label: '注册时间'
        },
        phone: {
          label: '联系电话'
        },
        contractor: {
          label: '业务员'
        }
      }
    }
  }
}
