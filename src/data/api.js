import {rootUrl} from './url'

const api = {
  // root
  root: {
    authToken: `${rootUrl}group/auth/token`,
    userInfo: '/user/user/is-logged-in',
    permission: '/user/user/permission-list'
  },
  // group
  group: {
    cityList: '/city/city/opened-list',
    regionList: '/city/city/region-list',
    dimensionList: '/dimension/dimension/list',
    tagList: '/dimension/dimension/tag-list',
    statusTag: '/dimension/dimension-tag/enable-disable-tag'
  },
  autoTag: {
    list: '/dimension/dimension-tag/auto-tag-manage'
  },
  historyData: {
    list: '/dimension/dimension-tag/auto-tag-history',
    export: '/dimension/dimension-tag/auto-tag-history-export'
  },
  autoMountUser: {
    list: '/dimension/dimension-tag/mounted-customer-list',
    export: '/dimension/dimension-tag/export-mounted-customer'
  },
  manualTag: {
    list: '/dimension/dimension-tag/list',
    addDimension: '/dimension/dimension/add-dimension',
    saveTag: '/dimension/dimension-tag/save'
  },
  userList: {
    list: '/customers/customer/customer-collection',
    export: '/customers/customer/customer-collection-export'
  },
  userDetail: {
    list: '/customers/customer/customer-detail'
  },
  historyTag: {
    list: '/dimension/dimension/customer-tag-history'
  },
  mountUser: {
    list: '/dimension/dimension-tag/mounted-customer-list',
    import: '/dimension/dimension-tag/mount-customer',
    export: '/dimension/dimension-tag/export-mounted-customer',
    remove: '/dimension/dimension-tag/unmount-customer'
  },
  addMountUser: {
    list: '/customers/customer/customer-collection',
    addToTag: '/dimension/dimension-tag/mount-customer',
    dimension: '/dimension/dimension/tag-list'
  },
  // auth
  userAuth: {
    list: '/user/user/list',
    userList: '/user/role/options',
    addUser: '/user/user/add-or-update',
    resetPwd: '/user/user/reset-password',
    deleteUser: '/user/user/delete'
  },
  roleAuth: {
    list: '/user/role/list',
    addRole: '/user/role/add-or-update',
    deleteRole: '/user/role/delete'
  },
  userPermission: {
    list: '/user/permission/list',
    save: '/user/permission/edit'
  },
  // saler
  saler: {
    roleList: '/contractor/role/options',
    cityList: '/city/city/opened-list',
    list: 'contractor/contractor/contractor-filter'
  },
  salerManage: {
    list: '/contractor/contractor/contractor-list',
    export: '/contractor/contractor/contractor-export',
    addSaler: '/contractor/contractor/contractor-edit',
    getSalerDetail: 'contractor/contractor/contractor-detail'
  },
  visitRecord: {
    list: '/contractor/visit-records/records-list',
    export: '/contractor/visit-records/records-export'
  },
  roleResource: {
    list: '/contractor/role/list',
    addRole: '/contractor/role/add-or-update',
    removeRole: '/contractor/role/delete'
  },
  reportGoods: {
    list: '/contractor/report-product/list'
  },
  rolePermission: {
    list: '/contractor/permission/list',
    save: '/contractor/permission/edit'
  },
  // saler
  routes: {
    list: 'contractor/group-line/list',
    save: 'contractor/group-line/save',
    delete: 'contractor/group-line/delete',
    export: 'customers/customer/group-line-customer-export'
  },
  distributeRoute: {
    getStores: 'customers/customer/group-line-customers',
    addToRoute: 'customers/customer/add-customers-to-group-line',
    removeFromRoute: 'customers/customer/remove-customers-to-group-line',
    updateStores: 'customers/customer/group-line-customers-page',
    routeList: 'contractor/group-line/list-filter'
  },
  city: {
    list: 'contractor/contractor/manage-city-list'
  },
  area: {
    list: 'city/city/region-list'
  }
}

export default api
