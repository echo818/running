export default {
  data () {
    return {
      // 表格
      tableData: [],
      // 分页
      pageOptions: {
        sizeChange: this.sizeChange,
        currentChange: this.currentChange,
        pageSize: 20,
        total: 0,
        currentPage: 1
      }
    }
  },
  methods: {
    // 更改分页数
    sizeChange (size) {
      this.pageOptions.pageSize = size
      this.getTableData()
    },
    // 切换当前页
    currentChange (page) {
      this.pageOptions.currentPage = page
      this.getTableData()
    }
  }
}
