<template>
  <el-form
    class="form-box"
    ref="form"
    :label-width="opts.labelWidth !== undefined ? opts.labelWidth : '120px'"
    :model="form">
    <el-form-item
      :label="item.label"
      :prop="key"
      :rules="item.rules"
      v-for="item,key in options"
      :key="key">
      <el-input
        v-model="form[key]"
        :type="item.type"
        :rows="item.rows"
        :resize="item.resize"
        :placeholder="item.placeholder"
        v-if="item.type === undefined || item.type === 'input' || item.type === 'password' || item.type === 'textarea'" />
      <el-select
        v-model="form[key]"
        :multiple="item.multiple"
        :clearable="!(item.clearable === false)"
        :placeholder="item.placeholder"
        v-else-if="item.type === 'select'">
        <el-option
          :label="subItem.label"
          :value="subItem.value"
          v-for="subItem,subIndex in item.options"
          :key="subIndex" />
      </el-select>
      <el-date-picker
        v-model="form[key]"
        type="daterange"
        :range-separator="item.separator"
        :start-placeholder="item.startPlaceholder"
        :end-placeholder="item.endPlaceholder"
        value-format="yyyy-MM-dd"
        v-else-if="item.type === 'daterange'">
      </el-date-picker>
      <el-date-picker
        v-model="form[key]"
        type="datetimerange"
        :range-separator="item.separator"
        :start-placeholder="item.startPlaceholder"
        :end-placeholder="item.endPlaceholder"
        value-format="yyyy-MM-dd hh:mm:ss"
        v-else-if="item.type === 'datetimerange'">
      </el-date-picker>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'v-form',
  props: {
    opts: {
      type: Object,
      default: () => { return {} }
    },
    form: Object,
    options: Object
  }
}
</script>

<style lang="less">
.form-box {
  .el-input__inner {
    width: 320px;
  }
}
</style>
