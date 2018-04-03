<template>
  <div class="page-box permission-box">
    <el-tree
      :data="tableData"
      show-checkbox
      default-expand-all
      node-key="id"
      ref="tree"
      :default-checked-keys="permissions">
    </el-tree>
    <el-button size="small" type="primary" @click="saveHandle">保存</el-button>
  </div>
</template>

<script>
import init from '@/mixins/common/init.js'

export default {
  name: 'role-permission',
  mixins: [init],
  data () {
    let id = this.$route.params['id']
    return {
      id,
      componentName: 'RolePermission',
      tableData: [],
      permissions: []
    }
  },
  methods: {
    // 初始化页面数据
    initPage () {
      this.getTableData()
    },
    // 获取表格数据
    getTableData () {
      this.$ajax(
        'rolePermission/list',
        {
          role_id: this.id
        }
      ).then(data => {
        let {tree, values} = data
        this.tableData = tree
        this.permissions = values
      })
    },
    // 保存处理
    saveHandle () {
      let resourceIds = this.$refs.tree.getCheckedKeys()
      this.$ajax(
        'rolePermission/save',
        {
          role_id: this.id,
          resource_ids: resourceIds
        }
      ).then(() => {
        this.$success('保存成功')
      }, error => {
        this.$error(error.msg)
      })
    }
  }
}
</script>

<style lang="less">
.permission-box {
  .el-tree {
    margin: 20px 0;
    padding: 10px 6px;
    border: 1px solid #e5d4d1;
  }
}
</style>
