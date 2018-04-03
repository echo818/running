<template>
  <el-dialog
    custom-class="dialog-box select-dialog"
    :title="options.title"
    :visible.sync="visible"
    :show-close="false"
    :width="options.width">
    <fast-search
      :form="fastOpts.form"
      :options="fastOpts.options"
      :searchFn="fastOpts.searchFn" />
    <page-table
      :data="tableOpts.data"
      :opts="tableOpts.opts"
      :options="tableOpts.options" />
    <span slot="footer">
      <el-button
        :type="item.type"
        v-for="item,index in options.footOpts"
        :key="index"
        @click="item.clickFn && item.clickFn()">{{item.label}}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import FastSearch from './FastSearch'
import PageTable from './PageTable'

export default {
  name: 'v-select-dialog',
  props: {
    value: Boolean,
    options: Object,
    fastOpts: Object,
    tableOpts: Object
  },
  computed: {
    visible: {
      get: function () {
        return this.value
      },
      set: function (v) {
        this.$emit('input', v)
      }
    }
  },
  components: {
    FastSearch,
    PageTable
  }
}
</script>

<style lang="less">
.select-dialog {
  .el-dialog__header {
    padding: 12px 15px 8px;
    background: #f6f0ee;
  }
  .el-dialog__title {
    font-size: 15px;
    color: #333744;
  }
  .el-dialog__body {
    padding: 20px 20px 10px;
    .fast-search {
      padding-bottom: 12px;
    }
  }
  .el-dialog__footer {
    text-align: center;
    .el-button {
      padding: 9px 20px;
    }
  }
}
</style>
