<template>
  <div class="fast-search clearfix">
    <quick-query
      position="left"
      label=""
      :options="options"
      :form="form" />
    <el-button
      class="fl"
      type="primary"
      @click="searchFn">快速查询</el-button>
  </div>
</template>

<script>
import QuickQuery from '../base/QuickQuery'

export default {
  name: 'v-fast-search',
  props: {
    form: Object,
    options: Object,
    searchFn: Function
  },
  components: {
    QuickQuery
  }
}
</script>

<style lang="less">
.fast-search {
  & > .el-form {
    float: left;
    .el-form-item {
      margin-bottom: 0;
    }
    .el-form-item__content {
      line-height: 34px;
    }
  }
  .el-button {
    padding: 9px 20px;
  }
}
</style>
