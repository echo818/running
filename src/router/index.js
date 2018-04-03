import Vue from 'vue'
import Router from 'vue-router'

// 公共页面
const Home = () => import(/* webpackChunkName: "common" */ '@/views/Home.vue')
const Tabs = () => import(/* webpackChunkName: "common" */ '@/components/layout/Tabs.vue')
const Main = () => import(/* webpackChunkName: "common" */ '@/views/Main.vue')

// 用户分群
const AutoTag = () => import(/* webpackChunkName: "group" */ '@/views/group/AutoTag.vue')
const HistoryData = () => import(/* webpackChunkName: "group" */ '@/views/group/HistoryData.vue')
const AutoMountUser = () => import(/* webpackChunkName: "group" */ '@/views/group/AutoMountUser.vue')

const ManualTag = () => import(/* webpackChunkName: "group" */ '@/views/group/ManualTag.vue')
const AddMountUser = () => import(/* webpackChunkName: "group" */ '@/views/group/AddMountUser.vue')
const ManualMountUser = () => import(/* webpackChunkName: "group" */ '@/views/group/ManualMountUser.vue')

const UserList = () => import(/* webpackChunkName: "group" */ '@/views/group/UserList.vue')
const UserDetail = () => import(/* webpackChunkName: "group" */ '@/views/group/UserDetail.vue')
const HistoryTag = () => import(/* webpackChunkName: "group" */ '@/views/group/HistoryTag.vue')

// 权限管理
const UserAuth = () => import(/* webpackChunkName: "auth" */ '@/views/auth/UserAuth.vue')
const UserPermission = () => import(/* webpackChunkName: "auth" */ '@/views/auth/UserPermission.vue')

const RoleAuth = () => import(/* webpackChunkName: "auth" */ '@/views/auth/RoleAuth.vue')

// 业务员
const SalerManage = () => import(/* webpackChunkName: "saler" */ '@/views/saler/SalerManage.vue')
const VisitRecord = () => import(/* webpackChunkName: "saler" */ '@/views/saler/VisitRecord.vue')
const RoleResource = () => import(/* webpackChunkName: "saler" */ '@/views/saler/RoleResource.vue')
const RolePermission = () => import(/* webpackChunkName: "saler" */ '@/views/saler/RolePermission.vue')
const ReportGoods = () => import(/* webpackChunkName: "saler" */ '@/views/saler/ReportGoods.vue')

const Routes = () => import(/* webpackChunkName: "saler" */ '@/views/saler/Routes.vue')
const DistributeRoute = () => import(/* webpackChunkName: "saler" */ '@/views/saler/DistributeRoute.vue')

Vue.use(Router)

export default new Router({
  mode: 'hash',
  scrollBehavior: () => ({y: 0}),
  routes: [
    {
      path: '/',
      component: Home,
      children: [{
        path: '/',
        component: Tabs,
        redirect: 'main',
        children: [
          {path: 'main', name: 'Main', meta: {label: '新手引导'}, component: Main}
        ]
      }, {
        path: 'group',
        component: Tabs,
        redirect: 'group/autoTag',
        children: [
          {path: 'autoTag', name: 'AutoTag', meta: {label: '自动标签管理'}, component: AutoTag},
          {path: 'historyData/:id', name: 'HistoryData', meta: {label: '历史数据'}, component: HistoryData},
          {path: 'autoMountUser/:id', name: 'AutoMountUser', meta: {label: '挂载人群'}, component: AutoMountUser},

          {path: 'manualTag', name: 'ManualTag', meta: {label: '手动标签管理'}, component: ManualTag},
          {path: 'addMountUser/:id', name: 'AddMountUser', meta: {label: '新增挂载人群'}, component: AddMountUser},
          {path: 'manualMountUser/:id', name: 'ManualMountUser', meta: {label: '挂载人群'}, component: ManualMountUser},

          {path: 'userList', name: 'UserList', meta: {label: '用户列表'}, component: UserList},
          {path: 'userDetail/:id', name: 'UserDetail', meta: {label: '用户详情'}, component: UserDetail, props: true},
          {path: 'historyTag/:id', name: 'HistoryTag', meta: {label: '历史标签'}, component: HistoryTag}
        ]
      }, {
        path: 'auth',
        component: Tabs,
        redirect: 'auth/userAuth',
        children: [
          {path: 'userAuth', name: 'UserAuth', meta: {label: '用户'}, component: UserAuth},
          {path: 'userPermission/:id', name: 'UserPermission', meta: {label: '配置角色资源'}, component: UserPermission},

          {path: 'roleAuth', name: 'RoleAuth', meta: {label: '角色'}, component: RoleAuth}
        ]
      }, {
        path: 'saler',
        component: Tabs,
        redirect: 'saler/salerManage',
        children: [
          {path: 'salerManage', name: 'SalerManage', meta: {label: '业务员管理'}, component: SalerManage},
          {path: 'visitRecord', name: 'VisitRecord', meta: {label: '拜访记录'}, component: VisitRecord},
          {path: 'roleResource', name: 'RoleResource', meta: {label: '角色资源'}, component: RoleResource},
          {path: 'rolePermission/:id', name: 'RolePermission', meta: {label: '配置角色资源'}, component: RolePermission},
          {path: 'reportGoods', name: 'ReportGoods', meta: {label: '业务员上报商品'}, component: ReportGoods},

          {path: 'routes', name: 'Routes', meta: {label: '路线'}, component: Routes},
          {path: 'distribute-route', name: 'DistributeRoute', meta: {label: '分配路线'}, component: DistributeRoute}
        ]
      }]
    }
  ]
})
