<template>
  <div class="page-box">
    <v-search
      noMore
      :quickForm="fastForm"
      :quickOpts="fastOptions"
      :searchFn="searchHandle" />
    <v-page-table
      :data="tableData"
      :opts="tableOptions"
      :options="pageOptions" />
    <el-dialog
      title="上报图片"
      :visible.sync="visible"
      :show-close="false">
      <el-carousel height="500px">
        <el-carousel-item v-for="item,index in gallerys" :key="index">
          <div :style="`width: 100%; height: 100%; background: url(${item}) no-repeat center center; background-size: cover;`"></div>
        </el-carousel-item>
      </el-carousel>
    </el-dialog>
  </div>
</template>

<script>
import mixin from '@/mixins/saler/report-goods.js'
import page from '@/mixins/common/page.js'

export default {
  name: 'report-goods',
  mixins: [mixin, page],
  created () {
    this.getTableData()
  },
  methods: {
    // 获取表格数据
    getTableData () {
      this.$ajax(
        'reportGoods/list',
        {
          page: this.pageOptions.currentPage,
          page_size: this.pageOptions.pageSize,
          [this.fastForm.name]: this.fastForm.value
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
    // 展示图片
    showGallery (rows) {
      this.gallerys = rows.gallery
      this.visible = true
    }
  }
}
</script>
