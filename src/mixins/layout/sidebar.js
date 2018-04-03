export default {
  data () {
    return {
      isCollapse: false,
      activeRoute: '/main',
      sideWidth: '128px',
      menus: [{
        label: '用户分群',
        route: '/group',
        show: false,
        icon: 'el-icon-menu',
        children: [{
          label: '自动标签管理',
          route: '/autoTag',
          show: false
        }, {
          label: '手动标签管理',
          route: '/manualTag',
          show: false
        }, {
          label: '用户列表',
          route: '/userList',
          show: false
        }]
      }, {
        label: '权限管理',
        route: '/auth',
        show: false,
        icon: 'el-icon-news',
        children: [{
          label: '用户',
          route: '/userAuth',
          show: false
        }, {
          label: '角色',
          route: '/roleAuth',
          show: false
        }]
      }, {
        label: '业务员',
        route: '/saler',
        show: false,
        icon: 'el-icon-printer',
        children: [{
          label: '业务员管理',
          route: '/salerManage',
          show: false
        }, {
          label: '拜访记录',
          route: '/visitRecord',
          show: false
        }, {
          label: '角色资源',
          route: '/roleResource',
          show: false
        }, {
          label: '业务员上报商品',
          route: '/reportGoods',
          show: false
        }, {
          label: '路线',
          route: '/routes',
          show: false
        }]
      }]
    }
  },
  watch: {
    isCollapse (val) {
      this.sideWidth = val ? '64px' : '128px'
    }
  }
}
