<template>
  <div class="search-box clearfix">
    <!-- 快速查询 -->
    <quick-query
      position="top"
      label="快速查询"
      :form="quickForm"
      :options="quickOpts"
      v-if="Object.keys(quickOpts).length" />
    <!-- 条件搜索 -->
    <!--
      noMore为true时,则显示,否则由isMore控制;
      isMore展开时显示,关闭则不显示
    -->
    <e-query
      :isShow="noMore || isMore"
      :form="form"
      :options="options"
      :searchFn="searchFn" />
    <div class="search-ctrl">
      <el-button
        :class="isMore ? 'more-btn more-btn--close' : 'more-btn'"
        v-if="!noMore"
        @click="() => {isMore = !isMore}">
        <i class="el-icon-d-arrow-left"></i>
      </el-button>
      <!-- <el-button type="primary" @click="searchFn">查询</el-button> -->
    </div>
  </div>
</template>

<script>
import QuickQuery from '../base/QuickQuery'
import EQuery from '../base/Query'

export default {
  name: 'v-search',
  props: {
    quickForm: Object,
    quickOpts: {
      type: Object,
      default: () => { return {} }
    },
    form: Object,
    options: Object,
    searchFn: Function,
    noMore: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isMore: false
    }
  },
  components: {
    EQuery,
    QuickQuery
  }
}
</script>

<style lang="less">
.search-box {
  position: relative;
  margin: 10px 0 16px;
  // padding: 6px 12px 20px;
  padding: 6px 12px 6px;
  background: #f6f0ee;
  .quick-query {
    .el-form-item {
      margin-bottom: 6px;
    }
    .el-form-item__label {
      line-height: 24px;
      padding-bottom: 0;
      color: #d4372f;
    }
    .el-form-item__content {
      line-height: 34px;
    }
    & > .el-form-item:last-child {
      margin-top: 24px;
    }
  }
  .search-ctrl {
    position: absolute;
    left: 42%;
    bottom: -16px;
    .el-button {
      padding: 9px 20px;
      &.more-btn {
        width: 32px;
        line-height: 32px;
        margin-right: 16px;
        padding: 0;
        color: #fff;
        border: 0;
        border-radius: 18px;
        background: #e58782;
        transform: rotate(-90deg);
        transition: transform .3s;
        &.more-btn--close {
          transform: rotate(90deg);
        }
      }
    }
  }
}
</style>
