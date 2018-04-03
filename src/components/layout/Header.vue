<template>
  <el-header class="header-box">
    <div class="logo fl">
      <img class="logo-img" :src="logoImg">
    </div>
    <div :class="`header-user fr ${item.className}`" v-for="item,index in subMenus" :key="index">
      <img class="user-img" :src="avatarImg">
      <!-- 下拉菜单 -->
      <el-dropdown @command="handleCommand" trigger="click">
        <el-button type="text" class="white-btn">{{item.text}}<i class="el-icon-caret-bottom el-icon--right"></i></el-button>
        <el-dropdown-menu slot="dropdown">
          <template v-for="subItem in item.options">
            <el-dropdown-item :command="subItem.command" v-if="subItem.command">{{subItem.text}}</el-dropdown-item>
            <el-dropdown-item disabled v-else>{{subItem.text}}</el-dropdown-item>
          </template>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!-- 意见反馈弹窗 -->
    <v-form-dialog
      v-model="visible"
      :options="options"
      :form="form"
      :formOpts="formOpts"
      :formOptions="formOptions" />
  </el-header>
</template>

<script>
import mixin from '@/mixins/layout/header.js'
import {loginUrl} from '@/data/url'

export default {
  name: 'v-header',
  mixins: [mixin],
  methods: {
    // 退出登录 指令
    logoutHandle () {
      ['username', 'access_token', 'refresh_token'].forEach(key => {
        this.$cookie.remove(key)
      })
      window.location.href = loginUrl
    },
    handleCommand (command) {
      switch (command) {
        case 'logout':
          this.logoutHandle()
          break
        case 'main':
          this.$router.push('/main')
          break
        case 'feedback':
          this.visible = true
          break
      }
    }
  }
}
</script>

<style lang="less">
.header-box {
  width: 100%;
  background-color: #d4372f;
  .logo {
    line-height: 60px;
    .logo-img {
      vertical-align: middle;
    }
  }
  .header-user {
    line-height: 60px;
    font-size: 12px;
    color: #fff;
    &.user-info {
      padding-right: 64px;
    }
    &.user-help {
      padding-right: 48px;
    }
    .user-img {
      position: absolute;
      top: 18px;
      right: 48px;
      width: 24px;
      height: 24px;
      border-radius: 50%;
    }
  }
  .white-btn {
    &, &:focus, &:hover, &:active {
      color: #fff;
    }
  }
}
</style>
