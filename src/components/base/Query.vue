<template>
  <el-form
    class="query-box"
    inline
    label-position="top"
    :model="form">
    <!--
      item.hide传值为true时,则该元素支持隐藏控制,否则显示;
      isShow为true时,则显示,否则隐藏;
      form[item.name]有值时显示，空值则隐藏
    -->
    <el-form-item
      :label="item.label"
      v-show="!item.hide || isShow || form[item.name]"
      v-for="item,key in options"
      :key="key">
      <el-input
        v-model="form[key]"
        :placeholder="item.placeholder"
        v-if="(item.type === 'input' || item.type === undefined)" />
      <el-select
        v-model="form[key]"
        :placeholder="item.placeholder"
        :disabled="item.disabled"
        :clearable="!(item.clearable === false)"
        @change="val => {item.changeFn && item.changeFn(val)}"
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
      <span class="divide-line" v-if="item.append === 'divide'">--</span>
    </el-form-item>
    <el-button class="search-btn" type="primary" @click="searchFn">查询</el-button>
  </el-form>
</template>

<script>
export default {
  name: 'query',
  props: {
    isShow: Boolean,
    form: Object,
    options: Object,
    searchFn: Function
  }
}
</script>

<style lang="less">
.query-box {
  .el-form-item {
    margin-bottom: 6px;
  }
  .el-form-item__label {
    line-height: 24px;
    padding-bottom: 0;
  }
  .el-form-item__content {
    line-height: 34px;
  }
  .el-input {
    width: 180px;
  }
  .el-input__inner {
    height: 34px;
    &.el-range-editor {
      padding: 0 5px 0 10px;
      .el-range__close-icon {
        width: 20px;
      }
    }
    &.el-date-editor--daterange {
      width: 250px;
      .el-range-input {
        width: 36%;
      }
    }
    &.el-date-editor--datetimerange {
      width: 360px;
    }
  }
  .divide-line {
    padding-left: 4px;
    color: #d4372f;
  }
  .search-btn {
    margin-top: 24px;
    padding: 9px 20px;
  }
}
</style>
