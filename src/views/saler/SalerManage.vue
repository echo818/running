<template>
  <div class="page-box">
    <v-search noMore :form="searchForm" :options="searchOptions" :quickForm="fastForm" :quickOpts="fastOptions" :searchFn="searchHandle" />
    <v-control :options="ctrlOptions" />
    <v-page-table :data="tableData" :opts="tableOptions" :options="pageOptions" />
    <!-- 新增业务员弹层 -->
    <v-form-dialog v-model="salerVisible" :options="salerOpts" :form="salerForm" :formOptions="salerOptions" />
  </div>
</template>

<script>
  import fileDownload from 'react-file-download'
  import mixin from '@/mixins/saler/saler-manage.js'
  import page from '@/mixins/common/page.js'

  export default {
    name: 'saler-manage',
    mixins: [mixin, page],
    created () {
      this.getTableData()
      this.getRoleList()
      this.getCityList()
    },
    methods: {
      // 获取表格数据
      getTableData () {
        let params = JSON.parse(JSON.stringify(this.searchForm))
        params[this.fastForm.name] = this.fastForm.value
        params.status = params.status === '' ? -1 : params.status
        this.$ajax(
          'salerManage/list',
          {
            page: this.pageOptions.currentPage,
            page_size: this.pageOptions.pageSize,
            ...params
          }
        ).then(data => {
          let { items, pagination } = data
          this.tableData = items || []
          this.pageOptions.total = pagination ? pagination.total_count : 0
        })
      },
      // 获取角色列表数据
      getRoleList () {
        this.$ajax('saler/roleList').then(data => {
          this.searchOptions.role_id.options = data
          this.salerOptions.role_id.options = data
        })
      },
      // 获取城市列表数据
      getCityList () {
        this.$ajax('saler/cityList').then(data => {
          this.searchOptions.city.options = data
          this.salerOptions.city.options = data
          this.salerOptions.city_list.options = data
        })
      },
      // 搜素
      searchHandle () {
        this.getTableData()
      },
      // 导出
      exportHandle () {
        let params = this.searchForm
        params[this.fastForm.name] = this.fastForm.value
        params.status = params.status === '' ? -1 : params.status
        this.$ajax(
          'salerManage/export',
          params
        ).then(data => {
          let filename = `salesmen_${this.$format(new Date(), 'yyyy_MM_dd hh_mm_ss')}.csv`
          let buffer = Buffer.concat([Buffer.from('\xEF\xBB\xBF', 'binary'), Buffer.from(data)])
          fileDownload(buffer, filename)
        })
      },
      // 新增业务员
      addSaler () {
        this.salerOpts.title = '新增业务员'
        this.salerForm = {
          role_id: '',
          name: '',
          city: '',
          city_list: [],
          phone: '',
          password: '',
          status: '1'
        }
        this.salerVisible = true
      },
      // 新增业务员处理
      salerHandle (formEl) {
        formEl.validate((valid) => {
          if (valid) {
            this.$ajax(
              'salerManage/addSaler',
              this.salerForm
            ).then(data => {
              this.getTableData()
              this.salerVisible = false
              this.$success('添加成功')
            }, data => {
              this.$error(data.msg)
            })
          }
        })
      },
      // 编辑业务员信息
      editHandle (rows) {
        this.$ajax(
          'salerManage/getSalerDetail',
          {contractor_id: rows.contractor_id}
        ).then(data => {
          this.salerForm = {
            contractor_id: rows.contractor_id,
            role_id: rows.role_id,
            name: rows.name,
            city: data.city,
            city_list: data.city_list,
            phone: rows.phone,
            password: rows.password,
            status: rows.status
          }
          this.salerOpts.title = '编辑业务员'
          this.salerVisible = true
        })
      }
    }
  }
</script>
