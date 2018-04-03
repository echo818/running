import api from '@/data/api'
import {loginUrl} from '@/data/url'
import convert from '@/utils/convert-path'

/**
 * ajax网络请求
 * @param  {[type]} Vue   [description]
 * @param  {[type]} axios [description]
 * @param  {[type]} qs    [description]
 * @return {[type]}       [description]
 */
export default (Vue, axios, qs) => {
  Vue.prototype.$ajax = function (path, data = {}, options = {}) {
    axios.interceptors.request.use(config => {
      config.baseURL = '/api_group/'
      config.headers.common['Authorization'] = 'Bearer ' + this.$cookie.get('access_token')
      return config
    })

    let url = convert(path, api)
    let method = options['method'] || 'post'
    let params = {url, method}
    if (options['type'] === 'get') { // get方法传参
      Object.assign(params, {params: data})
    } else { // post方法传参
      Object.assign(params, {data: qs.stringify(data)})
    }

    return new Promise((resolve, reject) => {
      axios(params).then(res => {
        res = res.data
        if (res.code === 200) resolve(res.data || {})
        else resolve(res)
      }, error => {
        let data = error.response.data
        if (data.code === 401) window.location.href = loginUrl
        else reject(data)
      })
    })
  }
}
