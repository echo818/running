// sessionStorage缓存
const storage = {
  get: (key) => {
    let value = window.sessionStorage.getItem(key)
    try {
      return JSON.parse(value)
    } catch (e) {
      return value
    }
  },
  set: (key, value) => {
    if (typeof value === 'object') value = JSON.stringify(value)
    window.sessionStorage.setItem(key, value)
    return true
  },
  remove: (key) => {
    window.sessionStorage.removeItem(key)
    return true
  },
  keys: () => {
    return Object.keys(window.sessionStorage)
  },
  clear: () => {
    window.sessionStorage.clear()
    return true
  }
}

export default storage
