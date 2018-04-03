// 表单搜索 城市/区域 选择
export default {
  created () {
    this.getCityList()
  },
  methods: {
    // 获取城市数据
    getCityList () {
      this.$ajax('group/cityList').then(data => {
        this.searchOptions.city_id.options = data
      })
    },
    // 改变城市
    changeCity (cId) {
      this.searchForm.area_id = ''
      if (cId) {
        this.$ajax(
          'group/regionList',
          {
            city_id: cId
          }
        ).then(data => {
          this.searchOptions.area_id.options = data
          this.searchOptions.area_id.disabled = false
        })
      } else {
        this.searchOptions.area_id.options = []
        this.searchOptions.area_id.disabled = true
      }
    }
  }
}
