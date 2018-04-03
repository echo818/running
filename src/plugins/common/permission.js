import { inArray } from '@/utils/util'

// 检查页面权限
export default (Vue) => {
  Vue.prototype.$permission = function (fn) {
    if (this.$cookie.get('access_token')) {
      let permission = this.$cache.get('permission')
      if (permission) {
        fn(inArray.bind(null, permission))
      } else {
        this.$ajax('root/permission').then(data => {
          fn(inArray.bind(null, data))
          this.$cache.set('permission', data)
        })
      }
    }
  }
}
