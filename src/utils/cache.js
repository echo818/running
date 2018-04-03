// 内存缓存
let store = Object.create(null)

const cache = {
  get: (key) => {
    return store[key]
  },
  set: (key, value) => {
    store[key] = value
    return true
  },
  remove: (key) => {
    delete store[key]
    return true
  },
  keys: () => {
    return Object.keys(store)
  },
  clear: () => {
    store = Object.create(null)
    return true
  }
}

export default cache
