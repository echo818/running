<template>
  <div class="page-table">
    <!-- table表格 -->
    <e-table :events="events" :data="data" :options="opts" />
    <!-- table分页 -->
    <el-pagination
      class="text-fr"
      background
      @size-change="size => {options.sizeChange && options.sizeChange(size)}"
      @current-change="page => {options.currentChange && options.currentChange(page)}"
      :current-page="options.currentPage"
      :page-sizes="[20, 30, 50, 100]"
      :page-size="options.pageSize"
      :layout="options.layout || 'total, sizes, prev, pager, next, jumper'"
      :total="options.total" />
  </div>
</template>

<script>
import ETable from './Table'

export default {
  name: 'v-page-table',
  props: {
    data: Array,
    opts: Object,
    events: {
      type: Object,
      default: () => { return {} }
    },
    options: Object
  },
  components: {
    ETable
  }
}
</script>

<style lang="less">
.page-table {
  .el-pagination {
    padding: 10px 0;
  }
}
</style>
