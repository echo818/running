// 表单搜索 标签维度/标签名称 选择
export default {
  created () {
    this.getDimensionList()
  },
  methods: {
    // 获取标签维度数据
    getDimensionList () {
      this.$ajax(
        'group/dimensionList',
        {
          typ: 'GET_MANUAL_DIMENSIONS',
          type: this.searchOptions.dimension_id.tagType
        }
      ).then(data => {
        this.searchOptions.dimension_id.options = data
        this.tagOptions.dimension_id.options = data
      })
    },
    // 改变标签维度
    changeDimension (dId) {
      this.searchForm.tag_id = ''
      if (dId) {
        this.$ajax(
          'group/tagList',
          {
            typ: 'GET_TAGS_BY_MANUAL_DIMENSION',
            dimension_id: dId
          }
        ).then(data => {
          this.searchOptions.tag_id.options = data || []
          this.searchOptions.tag_id.disabled = false
        })
      } else {
        this.searchOptions.tag_id.options = []
        this.searchOptions.tag_id.disabled = true
      }
    }
  }
}
