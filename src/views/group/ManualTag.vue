<template>
  <div class="page-box">
    <v-search
      noMore
      :form="searchForm"
      :options="searchOptions"
      :searchFn="searchHandle"
      v-if="searchShow" />
    <v-control
      :options="ctrlOptions" />
    <v-page-table
      :data="tableData"
      :opts="tableOptions"
      :options="pageOptions" />
    <!-- 新增维度弹层 -->
    <v-form-dialog
      v-model="dimensionVisible"
      :options="dimensionOpts"
      :form="dimensionForm"
      :formOptions="dimensionOptions" />
    <!-- 新增标签弹层 -->
    <v-form-dialog
      v-model="tagVisible"
      :options="tagOpts"
      :form="tagForm"
      :formOptions="tagOptions" />
  </div>
</template>

<script>
import mixin from '@/mixins/group/manual-tag.js'
import page from '@/mixins/common/page.js'
import tag from '@/mixins/group/tag.js'

export default {
  name: 'manual-tag',
  mixins: [mixin, page, tag],
  created () {
    this.checkPermission()
    this.getTableData()
  },
  methods: {
    // 检查页面权限
    checkPermission () {
      this.$permission(check => {
        this.searchShow = check('manual-dimension/tag-search')
        this.ctrlOptions.add_dimension.show = check('manual-dimension/new-dimension')
        this.ctrlOptions.add_tag.show = check('manual-dimension/new-tag')
        this.tableOptions.func.options.status.show = check('manual-dimension/tag-action')
        this.tableOptions.func.options.check.show = check('manual-dimension/tag-mount-customers')
        this.tableOptions.func.options.edit.show = check('manual-dimension/tag-edit')
      })
    },
    // 获取表格数据
    getTableData () {
      this.$ajax(
        'manualTag/list',
        {
          page: this.pageOptions.currentPage,
          page_size: this.pageOptions.pageSize,
          type: 2,
          ...this.searchForm
        }
      ).then(data => {
        let {items, pagination} = data
        this.tableData = items || []
        this.pageOptions.total = pagination ? pagination.total_count : 0
        let opts = this.tableData[0] || {}
        opts = this.$assign(opts, this.initData)
        Object.assign(this.tableOptions, opts)
      })
    },
    // 搜素
    searchHandle () {
      this.getTableData()
    },
    // 新增维度
    addDimension () {
      this.dimensionVisible = true
    },
    // 新增维度处理
    dimensionHandle (formEl) {
      formEl.validate((valid) => {
        if (valid) {
          this.$ajax(
            'manualTag/addDimension',
            this.dimensionForm
          ).then(data => {
            this.getTableData()
            this.dimensionVisible = false
            this.$success('添加成功')
          })
        }
      })
    },
    // 新增标签
    addTag () {
      this.tagOpts.title = '新增标签'
      this.tagForm = {
        dimension_id: '',
        tag_name: '',
        status: ''
      }
      this.tagVisible = true
    },
    // 新增标签处理
    tagHandle (formEl) {
      formEl.validate((valid) => {
        if (valid) {
          this.$ajax(
            'manualTag/saveTag',
            this.tagForm
          ).then(data => {
            this.getTableData()
            this.tagVisible = false
            let msg = this.tagForm.tag_id ? '编辑成功' : '添加成功'
            this.$success(msg)
          })
        }
      })
    },
    // 操作状态启用/禁用
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
    // 操作查看挂载人群
    checkHandle (rows) {
      this.$router.push(`/group/manualMountUser/${rows.tag_id}`)
    },
    // 操作编辑
    editHandle (rows) {
      this.tagOpts.title = '编辑标签'
      this.tagForm = {
        tag_id: rows.tag_id,
        dimension_id: rows.dimension_id,
        tag_name: rows.tag_name,
        status: rows.status
      }
      this.tagVisible = true
    }
  }
}
</script>
