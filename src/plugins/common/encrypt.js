// SHA256 加密密码
import SHA256 from 'crypto-js/sha256'
export default (Vue) => {
  Vue.prototype.$encrypt = (str) => {
    return SHA256(str).toString()
  }
}
