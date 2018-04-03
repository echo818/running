<template>
  <div class="page-box">
    <v-search
      noMore
      :form="searchForm"
      :options="searchOptions"
      :searchFn="searchHandle" />
    <v-control
      :options="ctrlOptions" />
    <v-page-table
      :data="tableData"
      :events="tableEvents"
      :opts="tableOptions"
      :options="pageOptions" />
  </div>
</template>

<script>
import mixin from '@/mixins/group/auto-mount-user.js'
import page from '@/mixins/common/page.js'
import city from '@/mixins/common/city.js'

export default {
  name: 'auto-mount-user',
  mixins: [mixin, page, city],
  created () {
    this.getTableData()
  },
  methods: {
    // 获取表格数据
    getTableData () {
      this.$ajax(
        'autoMountUser/list',
        {
          page: this.pageOptions.currentPage,
          page_size: this.pageOptions.pageSize,
          tag_id: this.id,
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
    },
    // 导出表格
    exportFile () {
      this.$ajax(
        'autoMountUser/export',
        {
          tag_id: this.id,
          customer_ids: this.ids,
          ...this.searchForm
        }
      ).then(data => {
        window.location.href = data.url
      })
    }
  }
}
</script>
