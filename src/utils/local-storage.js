// localStorage缓存
const storage = {
  get: (key) => {
    let value = window.localStorage.getItem(key)
    try {
      return JSON.parse(value)
    } catch (e) {
      return value
    }
  },
  set: (key, value) => {
    if (typeof value === 'object') value = JSON.stringify(value)
    window.localStorage.setItem(key, value)
    return true
  },
  remove: (key) => {
    window.localStorage.removeItem(key)
    return true
  },
  keys: () => {
    return Object.keys(window.localStorage)
  },
  clear: () => {
    window.localStorage.clear()
    return true
  }
}

export default storage
