<template>
  <div class="page-box">
    <v-search
      noMore
      :form="searchForm"
      :options="searchOptions"
      :searchFn="searchHandle" />
    <v-table
      :data="tableData"
      :options="tableOptions" />

    <div class="auto-description">
      <p>注:标签释义</p>
      <table>
        <thead>
          <tr><td>标签维度</td><td>用户标签</td><td>注册时间</td><td>逻辑</td></tr>
        </thead>
        <tbody>
          <tr><td rowspan='8'>用户活跃度</td><td>活跃上升用户</td><td rowspan='6'>大于15天</td><td class="td-left">16到30天内有批次,且15天内数量比16-30天内批次数量高</td></tr>
          <tr><td>重新激活用户</td><td class="td-left">15天内有批次但16-30天内无批次</td></tr>
          <tr><td>活跃下降用户</td><td class="td-left">15天内有批次且数量比16-30天内批次数量低</td></tr>
          <tr><td>轻度流失用户</td><td class="td-left">15天内无批次,16-30天内有批次</td></tr>
          <tr><td>重度流失用户</td><td class="td-left">0-30天内无批次但历史有过批次</td></tr>
          <tr><td>僵尸用户</td><td class="td-left">从无批次</td></tr>
          <tr><td>已下单新用户</td><td rowspan='2' >小于等于15天</td><td class="td-left">15天内有批次</td></tr>
          <tr><td>未下单新用户</td><td class="td-left">15天内无批次</td></tr>
        </tbody>  
      </table>
      <p>批的概念是按30分钟内没有下单计算</p>
   </div>
  </div>
</template>

<script>
import mixin from '@/mixins/group/auto-tag.js'
import tag from '@/mixins/group/tag.js'
import city from '@/mixins/common/city.js'

export default {
  name: 'auto-tag',
  mixins: [mixin, tag, city],
  created () {
    this.getTableData()
  },
  methods: {
    // 获取表格数据
    getTableData () {
      this.$ajax(
        'autoTag/list',
        this.searchForm
      ).then(data => {
        this.tableData = data
      })
    },
    // 搜素
    searchHandle () {
      this.getTableData()
    },
    // 操作状态
    statusChange (rows) {
      this.$msg('是否修改此标签的状态?', () => {
        this.$ajax(
          'group/statusTag',
          {
            tag_id: rows.tag_id,
            status: rows.status === '1' ? '2' : '1'
          }
        ).then(data => {
          this.getTableData()
        })
      })
    },
    // 操作查看历史数据
    historyHandle (rows) {
      this.$router.push(`/group/historyData/${rows.tag_id}`)
    },
    // 操作查看人群
    checkHandle (rows) {
      this.$router.push(`/group/autoMountUser/${rows.tag_id}`)
    }
  }
}
</script>

<style lang="less">
.auto-description {
  margin: 38px 0 20px;
  font-size: 14px;
  table {
    vertical-align: middle;
    text-align: center;
    border-spacing: 0;
    border-right: 1px solid #d3d3d3;
    border-bottom: 1px solid #d3d3d3;
    .td-left {
      text-align: left;
    }
    td {
      padding: 5px 10px;
      border-top: 1px solid #d3d3d3;
      border-left: 1px solid #d3d3d3;
    }
    thead td {
      background: #eef1f6;
    }
  }
}
</style>
