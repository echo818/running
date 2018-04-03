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
      :opts="tableOptions"
      :options="pageOptions" />
    <!-- 新增角色弹层 -->
    <v-form-dialog
      v-model="roleVisible"
      :options="roleOpts"
      :form="roleForm"
      :formOptions="roleOptions" />
  </div>
</template>

<script>
import mixin from '@/mixins/auth/role-auth.js'
import page from '@/mixins/common/page.js'

export default {
  name: 'role-auth',
  mixins: [mixin, page],
  created () {
    this.getTableData()
  },
  methods: {
    // 获取表格数据
    getTableData () {
      this.$ajax(
        'roleAuth/list',
        {
          page: this.pageOptions.currentPage,
          page_size: this.pageOptions.pageSize,
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
    // 新增角色
    addRole () {
      this.roleForm = {
        role_name: ''
      }
      this.roleVisible = true
    },
    // 新增角色处理
    roleHandle (formEl) {
      formEl.validate((valid) => {
        if (valid) {
          this.$ajax(
            'roleAuth/addRole',
            this.roleForm
          ).then(data => {
            this.getTableData()
            this.roleVisible = false
            this.$success('添加成功')
          })
        }
      })
    },
    // 操作角色资源
    checkRole (rows) {
      this.$router.push(`/auth/userPermission/${rows.role_id}`)
    },
    // 操作删除
    deleteHandle (rows) {
      this.$msg('确定要删除该角色吗?', () => {
        this.$ajax(
          'roleAuth/deleteRole',
          {
            role_id: rows.role_id
          }
        ).then(() => {
          this.getTableData()
          this.$success('删除成功')
        }, error => {
          this.$error(error.msg)
        })
      })
    }
  }
}
</script>
