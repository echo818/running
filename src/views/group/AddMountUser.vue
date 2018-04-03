<template>
  <div class="page-box">
    <v-search
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
import mixin from '@/mixins/group/add-mount-user.js'
import init from '@/mixins/common/init.js'
import page from '@/mixins/common/page.js'
import tag from '@/mixins/group/tag.js'
import city from '@/mixins/common/city.js'

export default {
  name: 'add-mount-user',
  mixins: [mixin, init, page, tag, city],
  methods: {
    // 初始化页面数据
    initPage () {
      this.getTableData()
      this.getAutoDimension()
    },
    // 获取表格数据
    getTableData () {
      this.$ajax(
        'addMountUser/list',
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
          'addMountUser/dimension',
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
    // 添加到该标签
    addToTag () {
      if (this.ids.length) {
        this.$ajax(
          'addMountUser/addToTag',
          {
            type: 1,
            tag_id: this.id,
            customer_ids: this.ids
          }
        ).then(() => {
          this.$success('添加成功')
          this.$router.push(`/group/manualMountUser/${this.id}`)
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
    checkHandle () {
      this.$router.push(`/group/userDetail/${this.id}`)
    }
  }
}
</script>
