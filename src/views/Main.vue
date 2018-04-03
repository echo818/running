<template>
  <div class="main-box">
    <h2 style="text-align: center;padding-top: 80px;">{{$cookie.get('username')}}, 欢迎您重新登陆运营平台!</h2>
    <!-- <h2>新手引导</h2>
    <ul class="nav-list clearfix">
      <li class="nav-item fl" v-for="item,index in navs" :key="index">
        <div class="nav-title">{{item.title}}</div>
        <template v-for="subItem in item.menus">
          <el-button type="primary" @click="routerLink(item.route + subItem.route)">{{subItem.label}}</el-button>
        </template>
      </li>
    </ul> -->
  </div>
</template>

<script>
export default {
  name: 'v-main',
  data () {
    return {
      navs: [{
        title: '用户分群',
        route: '/group',
        menus: [
          {label: '自动标签管理', route: '/autoTag'},
          {label: '手动标签管理', route: '/manualTag'},
          {label: '用户列表', route: '/userList'}
        ]
      }, {
        title: '权限管理',
        route: '/auth',
        menus: [
          {label: '用户', route: '/userAuth'},
          {label: '角色', route: '/roleAuth'}
        ]
      }, {
        title: '业务员',
        route: '/saler',
        menus: [
          {label: '业务员管理', route: '/salerManage'},
          {label: '拜访记录', route: '/visitRecord'},
          {label: '角色资源', route: '/roleResource'},
          {label: '业务员上报商品', route: '/reportGoods'},
          {label: '路线', route: '/routes'}
        ]
      }]
    }
  },
  methods: {
    routerLink (route) {
      this.$router.push(route)
    }
  }
}
</script>
