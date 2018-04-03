<template>
  <div class="page-box">
    <v-search
      noMore
      :form="searchForm"
      :options="searchOptions"
      :searchFn="searchHandle" />
    <v-page-table
      :data="tableData"
      :opts="tableOptions"
      :options="pageOptions" />
  </div>
</template>

<script>
import mixin from '@/mixins/group/history-tag.js'
import init from '@/mixins/common/init.js'
import page from '@/mixins/common/page.js'

export default {
  name: 'history-tag',
  mixins: [mixin, init, page],
  methods: {
    // 初始化页面数据
    initPage () {
      this.getTableData()
    },
    // 获取表格数据
    getTableData () {
      this.searchForm.customer_id = this.id
      this.$ajax(
        'historyTag/list',
        {
          page: this.pageOptions.currentPage,
          page_size: this.pageOptions.pageSize,
          ...this.searchForm
        }
      ).then(data => {
        let {items, pagination} = data
        this.tableData = items || []
        this.pageOptions.total = pagination ? pagination.total_count : 0
      })
    },
    // 搜素
    searchHandle () {
      this.getTableData()
    }
  }
}
</script>
