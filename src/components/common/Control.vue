<template>
  <div class="control-box clearfix" v-if="$show(options) || $show(rightOpts)">
    <template
      v-if="!(item.show === false)"
      v-for="item,key in options">
      <el-button
        type="primary"
        v-if="item.type === undefined"
        @click="item.ctrlFn">{{item.label}}</el-button>
      <el-upload
        class="el-button upload-btn"
        :action="item.action"
        :on-success="item.success"
        :show-file-list="false"
        :data="item.data"
        v-else-if="item.type === 'upload'">
        <el-button type="primary">{{item.label}}</el-button>
      </el-upload>
    </template>
    <div class="fr" v-if="Object.keys(rightOpts).length && $show(rightOpts)">
      <template
        v-if="!(item.show === false)"
        v-for="item,key in rightOpts">
        <el-button
          type="primary"
          v-if="item.type === undefined"
          @click="item.ctrlFn">{{item.label}}</el-button>
        <el-upload
          class="el-button upload-btn"
          :action="item.action"
          :on-success="item.success"
          :show-file-list="false"
          :data="item.data"
          v-else-if="item.type === 'upload'">
          <el-button type="primary">{{item.label}}</el-button>
        </el-upload>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'v-control',
  props: {
    options: Object,
    rightOpts: {
      type: Object,
      default: () => { return {} }
    }
  }
}
</script>

<style lang="less">
.control-box {
  .el-button {
    padding: 9px 20px;
    &.upload-btn {
      padding: 0;
      border: 0;
    }
  }
}
</style>
