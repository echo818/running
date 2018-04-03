<template>
  <el-table
    class="table-box"
    @selection-change="selection => {events.selectionChange && events.selectionChange(selection)}"
    @current-change="row => {events.currentChange && events.currentChange(row)}"
    highlight-current-row
    :data="data"
    :height="events.height">
    <template v-for="item,key in options">
      <!-- 默认显示 -->
      <el-table-column
        :prop="key"
        :label="item.label"
        :width="item.width"
        :min-width="item.minWidth"
        v-if="item.type === undefined" />
      <!-- 多选 -->
      <el-table-column
        type="selection"
        :width="item.width"
        v-else-if="item.type === 'selection'" />
      <!-- 序号 -->
      <el-table-column
        type="index"
        :label="item.label"
        :width="item.width"
        v-else-if="item.type === 'index'" />
      <!-- 过滤数据 -->
      <el-table-column
        :label="item.label"
        :width="item.width"
        v-else-if="item.type === 'filter'">
        <template slot-scope="scope">{{item.filterFn(scope.row[key])}}</template>
      </el-table-column>
      <!-- 操作 -->
      <template v-else-if="item.type === 'operate'">
        <el-table-column
          :label="item.label"
          :width="item.width"
          :fixed="item.fixed"
          v-if="$show(item.options)">
          <template slot-scope="scope">
            <el-button
              size="mini"
              :type="subItem.typeFn ? subItem.typeFn(scope.row) : subItem.type"
              v-for="subItem,subKey in item.options"
              :key="subKey"
              v-if="!(subItem.show === false)"
              @click="subItem.clickFn && subItem.clickFn(scope.row)">{{subItem.textFn ? subItem.textFn(scope.row) : subItem.text}}</el-button>
          </template>
        </el-table-column>
      </template>
      <!-- 自定义 -->
      <el-table-column
        :label="item.label"
        :width="item.width"
        v-else>
        <template slot-scope="scope">
          <!-- 图片 -->
          <img
            :src="item.linkFn(scope.row)"
            :style="item.style"
            v-if="item.type === 'img'"
            @click="item.clickFn && item.clickFn(scope.row)">
          <el-switch
            v-model="scope.row.status"
            @change="item.switchFn && item.switchFn(scope.row)"
            v-else-if="item.type === 'switch'" />
        </template>
      </el-table-column>
    </template>
  </el-table>
</template>

<script>
export default {
  name: 'v-table',
  props: {
    data: Array,
    events: {
      type: Object,
      default: () => { return {} }
    },
    options: Object
  }
}
</script>

<style lang="less">
.table-box {
  width: 100%;
  border: 1px solid #e6ebf5;
  margin-top: 12px;
  th {
    padding: 8px 0;
    background: #f6f0ee;
    color: #3d231f;
  }
  td {
    padding: 6px 0;
  }
}
</style>
