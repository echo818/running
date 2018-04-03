<template>
  <div class="page-box">
    <v-search
      noMore
      :form="searchForm"
      :options="searchOptions"
      :quickForm="fastForm"
      :quickOpts="fastOptions"
      :searchFn="searchHandle" />
    <v-control
      :options="ctrlOptions" />
    <v-page-table
      :data="tableData"
      :opts="tableOptions"
      :options="pageOptions" />
  </div>
</template>

<script>
import fileDownload from 'react-file-download'
import mixin from '@/mixins/saler/visit-record.js'
import page from '@/mixins/common/page.js'

export default {
  name: 'visit-record',
  mixins: [mixin, page],
  created () {
    this.getTableData()
    this.getCityList()
  },
  methods: {
    // 获取表格数据
    getTableData () {
      let params = this.$filter(this.searchForm, ['record_id_start', 'record_id_end', 'contractor_id_start', 'contractor_id_end', 'city'])
      params['visit_start'] = this.searchForm.visitTime[0]
      params['visit_end'] = this.searchForm.visitTime[1]
      params['created_start'] = this.searchForm.createdTime[0]
      params['created_end'] = this.searchForm.createdTime[1]
      params[this.fastForm.name] = this.fastForm.value
      this.$ajax(
        'visitRecord/list',
        {
          page: this.pageOptions.currentPage,
          page_size: this.pageOptions.pageSize,
          ...params
        }
      ).then(data => {
        let {items, pagination} = data
        this.tableData = items || []
        this.pageOptions.total = pagination ? pagination.total_count : 0
      })
    },
    // 获取城市列表数据
    getCityList () {
      this.$ajax('saler/cityList').then(data => {
        this.searchOptions.city.options = data
      })
    },
    // 搜素
    searchHandle () {
      this.getTableData()
    },
    // 导出
    exportHandle () {
      let params = this.$filter(this.searchForm, ['record_id_start', 'record_id_end', 'contractor_id_start', 'contractor_id_end', 'city'])
      params['visit_start'] = this.searchForm.visitTime[0]
      params['visit_end'] = this.searchForm.visitTime[1]
      params['created_start'] = this.searchForm.createdTime[0]
      params['created_end'] = this.searchForm.createdTime[1]
      params[this.fastForm.name] = this.fastForm.value
      this.$ajax(
        'visitRecord/export',
        params
      ).then(data => {
        let filename = `visit_records_${this.$format(new Date(), 'yyyy_MM_dd hh_mm_ss')}.csv`
        let buffer = Buffer.concat([Buffer.from('\xEF\xBB\xBF', 'binary'), Buffer.from(data)])
        fileDownload(buffer, filename)
      })
    }
  }
}
</script>
