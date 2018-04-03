// cookie缓存
const cookie = {
  get: (key) => {
    /* eslint-disable */
    return unescape(document.cookie.replace(new RegExp('(?:(?:^|.*;)\\s*' + escape(key).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=\\s*([^;]*).*$)|^.*$'), '$1')) || null
  },
  set: (key, value, expire) => {
    expire = expire ? new Date(Date.now() + expire * 1000).toGMTString() : 'Tue, 19 Jan 2038 03:14:07 GMT'
    document.cookie = escape(key) + '=' + escape(value) + '; expires=' + expire + '; path=/'
    return true
  },
  remove: (key) => {
    document.cookie = escape(key) + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'
    return true
  },
  keys: () => {
    let keys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/)
    keys.map(key => escape(key))
    return keys
  },
  clear: () => {
    let keys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/)
    keys.forEach(key => document.cookie = escape(key) + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/')
    return true
  }
}

export default cookie
