<template>
  <el-aside
    :width="sideWidth"
    class="sidebar-box"
    :class="{'sidebar-collapse': isCollapse}">
    <button
      class="collapse-btn"
      :class="isCollapse ? 'el-icon-d-arrow-right' : 'el-icon-d-arrow-left'"
      @click="collapseHandle" />
    <el-menu
     :router="true"
      background-color="#333744"
      text-color="#fff"
      :default-active="activeRoute"
      :collapse="true">
      <template v-for="menu in menus">
        <template v-if="menu.children">
          <el-submenu
            :index="menu.route"
            v-if="$show(menu.children)">
            <template slot="title">
              <i :class="menu.icon"></i>
              <i v-if="!isCollapse">{{ menu.label }}</i>
            </template>
            <template v-for="subMenu in menu.children">
              <template v-if="subMenu.children">
                <el-submenu
                  :index="menu.route + subMenu.route"
                  v-if="$show(subMenu.children)">
                  <span slot="title">{{ subMenu.label }}</span>
                  <el-menu-item
                    :index="menu.route + subMenu.route + childMenu.route"
                    v-for="childMenu,childIndex in subMenu.children"
                    :key="childIndex"
                    v-if="!(childMenu.show === false)">{{ childMenu.label }}</el-menu-item>
                </el-submenu>
              </template>
              <template v-else>
                <el-menu-item
                  :index="menu.route + subMenu.route"
                  v-if="!(subMenu.show === false)">{{ subMenu.label }}</el-menu-item>
              </template>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item
            :index="menu.route"
            v-if="menu.show">
            <i :class="menu.icon"></i>
            <i v-if="!isCollapse">{{ menu.label }}</i>
            <span slot="title">{{ menu.label }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </el-aside>
</template>

<script>
import mixin from '@/mixins/layout/sidebar'

export default {
  name: 'sidebar',
  mixins: [mixin],
  created () {
    this.checkPermission()
    // 保证刷新时左边菜单栏的相应tab处于激活状态
    this.activeRoute = this.$storage.get('curTab')
  },
  watch: {
    // 保证页面跳转时左边菜单栏的相应tab处于激活状态
    '$route' (to, from) {
      this.activeRoute = to.path
    }
  },
  methods: {
    // 检查页面权限
    checkPermission () {
      this.$permission(check => {
        this.menus[0]['show'] = check('user-group-menu')
        this.menus[0]['children'][0]['show'] = check('user-group-menu/auto-tag-manage-menu')
        this.menus[0]['children'][1]['show'] = check('user-group-menu/manual-tag-manage-menu')
        this.menus[0]['children'][2]['show'] = check('user-group-menu/customers-list-menu')
        this.menus[1]['show'] = check('permission-manage-menu')
        this.menus[1]['children'][0]['show'] = check('permission-manage-menu/user-menu')
        this.menus[1]['children'][1]['show'] = check('permission-manage-menu/role-menu')
        this.menus[2]['show'] = check('contractor-menu')
        this.menus[2]['children'][0]['show'] = check('contractor-menu/contractor-manage-menu')
        this.menus[2]['children'][1]['show'] = check('contractor-menu/visit-records-menu')
        this.menus[2]['children'][2]['show'] = check('contractor-menu/contractor-role-menu')
        this.menus[2]['children'][3]['show'] = check('contractor-menu/report-product-menu')
        this.menus[2]['children'][4]['show'] = check('contractor-menu/group-line-menu')
      })
    },
    /* // 切换路由
    switchRoute (route) {
      this.activeRoute = route
      this.$router.push({ path: route })
    }, */
    // 左侧菜单折叠
    collapseHandle () {
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>

<style lang="less">
.sidebar-box {
  padding-top: 32px;
  overflow: inherit;
  background-color: #333744;
  i {
    font-style: normal;
  }
  .collapse-btn {
    position: fixed;
    top: 68px;
    left: 104px;
    width: 24px;
    height: 24px;
    padding: 0;
    font-size: 18px;
    color: #d4372f;
    border: 0;
    outline: 0;
    background: inherit;
    cursor: pointer;
  }
  &.sidebar-collapse {
    .collapse-btn {
      left: 40px;
    }
    .el-menu--collapse {
      width: 64px;
    }
  }
  .el-menu--collapse {
    border-right: 0;
    width: 128px;
    height: 100%;
    .el-menu-item,
    .el-submenu__title {
      height: 48px;
      line-height: 48px;
    }
    .el-submenu .el-menu-item {
      height: 40px;
      line-height: 40px;
    }
    .el-submenu .el-menu {
      border: 0;
    }
  }
}
</style>
