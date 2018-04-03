<template>
  <div>
    <div class="search">
      城市
      <el-select v-model="cityId" @change="getRoutes">
        <el-option v-for="(item, index) in cityOpts"
          :key="index"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      路线名称
      <el-input v-model="routeName"></el-input>
      <el-button @click="getRoutes" type="primary">搜索</el-button>
      <el-button @click="exportRoutes" type="primary" class="fr">导出</el-button>
      <el-button @click="editRoute" type="primary" class="fr">新增路线</el-button>
    </div>
    <v-page-table
      :data="routes"
      :opts="tableOptions"
      :options="pageOptions" />
    <v-form-dialog
      v-model="routeVisible"
      :options="formOpts"
      :form="route"
      :formOptions="itemOpts" />
  </div>
</template>

<script>
import fileDownload from 'react-file-download'
import page from '@/mixins/common/page.js'
import mixin from '@/mixins/saler/routes.js'

export default {
  name: 'routes',
  mixins: [mixin, page],
  methods: {
    // 城市列表
    getCities () {
      this.$ajax('city/list').then(res => {
        this.cityOpts = res
        this.itemOpts.city_id.options = res
      })
    },

    // 路线列表
    getRoutes () {
      let param = {
        city_id: this.cityId,
        group_line_name: this.routeName.trim(),
        page_size: this.pageOptions.pageSize,
        page: this.pageOptions.currentPage
      }
      this.$ajax('routes/list', param).then(res => {
        let { items, pagination } = res
        this.routes = items || []
        this.pageOptions.total = pagination ? pagination.total_count : 0
      })
    },

    // 给超市分配路线
    distributeRoute (row) {
      this.$router.push({
        name: 'DistributeRoute',
        params: {
          sharedData: {
            route: {
              id: row.group_line_id,
              name: row.group_line_name
            },
            city: {
              id: row.city_id,
              name: row.city_name
            }
          }
        }
      })
    },

    // 新增、编辑路线
    editRoute (row) {
      row = row || {}
      this.route.city_id = row.city_id
      this.route.group_line_id = row.group_line_id
      this.route.group_line_name = row.group_line_name
      this.routeVisible = true
    },

    // 导出路线
    exportRoutes () {
      this.$ajax('routes/export').then(res => {
        let filename = `routes_${this.$format(new Date(), 'yyyy_MM_dd hh_mm_ss')}.csv`
        let buffer = Buffer.concat([Buffer.from('\xEF\xBB\xBF', 'binary'), Buffer.from(res)])
        fileDownload(buffer, filename)
      })
    },

    // 保存路线
    saveRoute () {
      let param = this.route
      this.$ajax('routes/save', param).then(res => {
        this.$success('添加成功')
        this.getRoutes()
        this.routeVisible = false
      }).catch(error => {
        this.$message.error(error.msg)
      })
    },

    // 删除路线
    deleteRoute (row) {
      this.$confirm('确定要删除该路线吗？', '提示', {
        type: 'warning'
      }).then(() => {
        let param = {
          city_id: row.city_id,
          group_line_id: row.group_line_id
        }
        this.$ajax('routes/delete', param).then(res => {
          this.$success('删除成功')
          this.getRoutes()
        })
      }).catch(() => {})
    },

    getTableData () {
      this.getRoutes()
    }
  },
  mounted () {
    this.getCities()
    this.getRoutes()
  }
}
</script>

<style lang="less" scoped>
.search {
  margin-top: 20px;
  margin-bottom: 20px;

  .el-select {
    width: 150px;
  }
  .el-input {
    width: 200px;
  }
}
</style>

