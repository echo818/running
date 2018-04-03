<template>
  <el-form
    class="quick-query"
    inline
    :label-position="position"
    :model="form">
    <el-form-item :label="label">
      <el-select v-model="form.name">
        <el-option
          :label="item"
          :value="key"
          v-for="item,key in options"
          :key="key" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-input v-model="form.value" placeholder="查询条件"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'quick-query',
  props: {
    position: {
      type: String,
      default: 'top'
    },
    label: {
      type: String,
      default: '快速查询'
    },
    options: Object,
    form: Object
  }
}
</script>

<style lang="less">
.quick-query {
  & > .el-form-item:first-child {
    margin-right: 0;
  }
  .el-input {
    width: 220px;
  }
  .el-select .el-input {
    width: 108px;
  }
  .el-input__inner {
    height: 34px;
  }
}
</style>
