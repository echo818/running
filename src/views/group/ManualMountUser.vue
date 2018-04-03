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
import mixin from '@/mixins/group/mount-user.js'
import init from '@/mixins/common/init.js'
import page from '@/mixins/common/page.js'
import city from '@/mixins/common/city.js'

export default {
  name: 'manual-mount-user',
  mixins: [mixin, init, page, city],
  methods: {
    // 初始化页面数据
    initPage () {
      this.getTableData()
    },
    // 获取表格数据
    getTableData () {
      this.$ajax(
        'mountUser/list',
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
    // 导入文件
    importSuccess (res) {
      if (res.url) {
        this.$ajax(
          'mountUser/import',
          {
            tag_id: this.id,
            type: 2,
            file: res.url
          }
        ).then(data => {
          if (data.url) {
            this.$msg('确定下载导入记录吗?', () => {
              window.location.href = data.url
              this.getTableData()
            })
          } else {
            this.getTableData()
          }
        })
      }
    },
    // 导出表格
    exportFile () {
      this.$ajax(
        'mountUser/export',
        {
          tag_id: this.id,
          customer_ids: this.ids,
          ...this.searchForm
        }
      ).then(data => {
        window.location.href = data.url
      })
    },
    // 新增
    addFn () {
      this.$router.push(`/group/addMountUser/${this.id}`)
    },
    // 删除
    delFn () {
      if (this.ids.length) {
        this.$msg('确定删除选中记录吗?', () => {
          this.$ajax(
            'mountUser/remove',
            {
              tag_id: this.id,
              customer_ids: this.ids
            }
          ).then(() => {
            this.getTableData()
          }, error => {
            this.$error(error.msg)
          })
        })
      } else {
        this.$tips('请先选择用户')
      }
    },
    // 选择
    selectionChange (rows) {
      this.ids = rows.map(item => item.customer_id)
    }
  }
}
</script>
