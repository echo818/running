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
    <!-- 新增用户弹层 -->
    <v-form-dialog
      v-model="userVisible"
      :options="userOpts"
      :form="userForm"
      :formOptions="userOptions" />
    <!-- 重置密码弹层 -->
    <v-form-dialog
      v-model="pwdVisible"
      :options="pwdOpts"
      :form="pwdForm"
      :formOptions="pwdOptions" />
  </div>
</template>

<script>
import mixin from '@/mixins/auth/user-auth.js'
import page from '@/mixins/common/page.js'

export default {
  name: 'user-auth',
  mixins: [mixin, page],
  created () {
    this.getTableData()
    this.getRole()
  },
  methods: {
    // 获取表格数据
    getTableData () {
      this.$ajax(
        'userAuth/list',
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
    // 获取角色
    getRole () {
      this.$ajax(
        'userAuth/userList',
        {}
      ).then(data => {
        this.searchOptions.role_id.options = data
        this.userOptions.role_id.options = data
      })
    },
    // 搜素
    searchHandle () {
      this.getTableData()
    },
    // 新增用户
    addUser () {
      this.userForm = {
        user_id: '',
        username: '',
        name: '',
        email: '',
        role_id: '',
        status: 1
      }
      this.userVisible = true
    },
    // 新增用户处理
    userHandle (formEl) {
      formEl.validate((valid) => {
        if (valid) {
          this.$ajax(
            'userAuth/addUser',
            this.userForm
          ).then(data => {
            this.getTableData()
            this.userVisible = false
            this.$success('添加成功')
          }, error => {
            this.$error(error.msg)
          })
        }
      })
    },
    // 编辑用户
    editUser (row) {
      this.userForm.user_id = row.user_id
      this.userForm.username = row.username
      this.userForm.name = row.name
      this.userForm.email = row.email
      this.userForm.role_id = row.role_id
      this.userForm.status = row.status
      this.userVisible = true
    },
    // 重置密码
    resetPwd (row) {
      this.pwdForm = {
        user_id: row.user_id,
        password: '',
        confirm_pwd: ''
      }
      this.pwdVisible = true
    },
    // 重置密码处理
    pwdHandle (formEl) {
      let params = {
        user_id: this.pwdForm.user_id,
        password: this.$encrypt(this.pwdForm.password)
      }
      formEl.validate((valid) => {
        if (valid) {
          this.$ajax(
            'userAuth/resetPwd',
            params
          ).then(data => {
            this.pwdVisible = false
            this.$success('重置密码成功')
          }, error => {
            this.$error(error.msg)
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
          'userAuth/deleteUser',
          {
            user_id: rows.user_id
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
