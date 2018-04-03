<template>
  <div class="page-box user-detail">
    <div class="user-info">
      <el-row :gutter="10">
        <el-col :md="24" :lg="16" :xl="12">
          <div class="page-title">基本信息</div>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :md="12" :lg="8" :xl="6">
          <span class="item-title">用户ID</span>
          <span class="item-text">{{userInfo.customer_id}}</span>
        </el-col>
        <el-col :md="12" :lg="8" :xl="6">
          <span class="item-title">小店名称</span>
          <span class="item-text">{{userInfo.store_name}}</span>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :md="12" :lg="8" :xl="6">
          <span class="item-title">店主</span>
          <span class="item-text">{{userInfo.storekeeper}}</span>
        </el-col>
        <el-col :md="12" :lg="8" :xl="6">
          <span class="item-title">联系方式</span>
          <span class="item-text">{{userInfo.phone}}</span>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :md="12" :lg="8" :xl="6">
          <span class="item-title">城市</span>
          <span class="item-text">{{userInfo.city}}</span>
        </el-col>
        <el-col :md="12" :lg="8" :xl="6">
          <span class="item-title">区块</span>
          <span class="item-text">{{userInfo.area}}</span>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :md="12" :lg="8" :xl="6">
          <span class="item-title">详细地址</span>
          <span class="item-text">{{userInfo.detail_address}}</span>
        </el-col>
        <el-col :md="12" :lg="8" :xl="6">
          <span class="item-title">店铺等级</span>
          <span class="item-text">{{userInfo.level}}</span>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :md="12" :lg="8" :xl="6">
          <span class="item-title">在店时间段</span>
          <span class="item-text">{{userInfo.in_store_times}}</span>
        </el-col>
        <el-col :md="12" :lg="8" :xl="6">
          <span class="item-title">业务员</span>
          <span class="item-text">{{userInfo.contractor}}</span>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :md="12" :lg="8" :xl="6">
          <span class="item-title">申请时间</span>
          <span class="item-text">{{userInfo.created_at}}</span>
        </el-col>
        <el-col :md="12" :lg="8" :xl="6">
          <span class="item-title">申请通过时间</span>
          <span class="item-text">{{userInfo.apply_at}}</span>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :md="12" :lg="8" :xl="6">
          <span class="item-title">营业执照号</span>
          <span class="item-text">{{userInfo.business_license_no}}</span>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :md="12" :lg="8" :xl="6">
          <span class="item-title">营业执照</span>
          <span class="item-text"><img :src="userInfo.business_license_img"></span>
        </el-col>
        <el-col :md="12" :lg="8" :xl="6">
          <span class="item-title">店铺照片</span>
          <span class="item-text"><img :src="userInfo.store_front_img"></span>
        </el-col>
      </el-row>
    </div>
    <v-control
      :options="ctrlOptions" />
    <v-table
      :data="tableData"
      :options="tableOptions" />
  </div>
</template>

<script>
import mixin from '@/mixins/group/user-detail.js'
import init from '@/mixins/common/init.js'

export default {
  name: 'user-detail',
  mixins: [mixin, init],
  methods: {
    // 初始化页面数据
    initPage () {
      this.getTableData()
    },
    // 获取表格数据
    getTableData () {
      this.$ajax(
        'userDetail/list',
        {
          customer_id: this.id
        }
      ).then(data => {
        this.userInfo = data
        this.tableData = data.dimension_tags
      })
    },
    // 查看历史标签
    checkTag () {
      this.$router.push(`/group/historyTag/${this.id}`)
    }
  }
}
</script>

<style lang="less">
.user-detail {
  .user-info {
    padding-top: 20px;
    .page-title {
      font-size: 18px;
      color: #333;
      border-bottom: 1px solid #cdcdcd;
    }
    .el-row {
      line-height: 32px;
    }
  }
  .item-title {
    font-size: 14px;
    color: #333;
    padding-right: 12px;
  }
  .item-text {
    font-size: 15px;
    color: #666;
    img {
      vertical-align: top;
      width: 120px;
    }
  }
}
</style>
