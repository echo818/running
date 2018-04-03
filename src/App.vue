<template>
  <router-view />
</template>

<script>
import qs from 'qs'
import {loginUrl, clientId, clientSecret} from '@/data/url'

export default {
  name: 'app',
  watch: {
    '$route' (to) {
      if (window._hmt) {
        // 百度统计
        // window._hmt.push(['_trackPageview', '/#' + to.path])
      }
    }
  },
  created () {
    this.checkToken()
  },
  mounted () {
    // 加载百度统计js库
    this.$load('https://hm.baidu.com/hm.js?703a17a7530d6abbb65a56eec15e0f3d')
  },
  methods: {
    // 检查权限token
    checkToken () {
      let search = window.location.search
      let opts = qs.parse(search.slice(1))
      let code = opts.code
      // 检查code是否存在
      if (code) {
        this.getAuthToken({
          grant_type: 'authorization_code',
          code
        }, () => {
          window.location.href = '/'
        })
      } else {
        if (this.$cookie.get('access_token')) { // access token 是否存在
          this.getUserInfo()
        } else { // refresh token是否存在
          let refreshToken = this.$cookie.get('refresh_token')
          if (refreshToken) {
            this.getAuthToken({
              grant_type: 'refresh_token',
              refresh_token: refreshToken,
              client_secret: clientSecret
            })
          } else {
            this.redirectLogin()
          }
        }
      }
    },
    // 获取权限token
    getAuthToken (params, fn) {
      this.$ajax(
        'root/authToken',
        Object.assign(params, {
          response_type: 'token',
          client_id: clientId
        })
      ).then(data => {
        this.$cookie.set('access_token', data.access_token, 3.6e3)
        this.$cookie.set('refresh_token', data.refresh_token, 3.6e4)
        this.getUserInfo(fn)
      }, () => {
        this.redirectLogin()
      })
    },
    // 获取用户信息
    getUserInfo (fn) {
      this.$ajax('root/userInfo').then(data => {
        this.$cookie.set('username', data.username)
        fn && fn()
      }, () => {
        this.redirectLogin()
      })
    },
    // 跳转登录页
    redirectLogin () {
      window.location.href = loginUrl
    }
  }
}
</script>
