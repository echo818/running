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
import mixin from '@/mixins/group/user-list.js'
import page from '@/mixins/common/page.js'
import tag from '@/mixins/group/tag.js'
import city from '@/mixins/common/city.js'

export default {
  name: 'user-list',
  mixins: [mixin, page, tag, city],
  created () {
    this.getTableData()
    this.getAutoDimension()
  },
  methods: {
    // 获取表格数据
    getTableData () {
      this.$ajax(
        'userList/list',
        {
          page: this.pageOptions.currentPage,
          page_size: this.pageOptions.pageSize,
          ...this.searchForm
        }
      ).then(data => {
        let {items, pagination} = data
        this.tableData = items || []
        this.pageOptions.total = pagination ? pagination.total_count : 0
      }, error => {
        this.$error(error.msg)
      })
    },
    // 获取自动标签维度数据
    getAutoDimension () {
      this.$ajax(
        'group/dimensionList',
        {
          typ: 'GET_AUTO_DIMENSIONS',
          type: 0
        }
      ).then(data => {
        this.searchOptions.auto_dimension_id.options = data || []
      })
    },
    // 搜素
    searchHandle () {
      this.getTableData()
    },
    // 自动标签维度
    changeAutoDimension (aId) {
      this.searchForm.from_tag_id = ''
      this.searchForm.to_tag_id = ''
      if (aId) {
        this.$ajax(
          'group/tagList',
          {
            typ: 'GET_TAGS_BY_AUTO_DIMENSION',
            dimension_id: aId
          }
        ).then(data => {
          console.log(data)
          this.searchOptions.from_tag_id.options = []
          this.searchOptions.from_tag_id.disabled = false
          this.searchOptions.to_tag_id.options = []
          this.searchOptions.to_tag_id.disabled = false
        })
      } else {
        this.searchOptions.from_tag_id.options = []
        this.searchOptions.from_tag_id.disabled = true
        this.searchOptions.to_tag_id.options = []
        this.searchOptions.to_tag_id.disabled = true
      }
    },
    // 批量导出
    exportHandle () {
      if (this.ids.length) {
        this.$ajax(
          'userlist/export',
          {
            customer_ids: this.ids,
            ...this.searchForm
          }
        ).then(data => {
          window.location.href = data.url
        }, error => {
          this.$error(error.msg)
        })
      } else {
        this.$tips('请先选择用户')
      }
    },
    // 选择
    selectionChange (rows) {
      this.ids = rows.map(item => item.customer_id)
    },
    // 查看用户详情
    checkHandle (rows) {
      this.$router.push(`/group/userDetail/${rows.customer_id}`)
    }
  }
}
</script>
