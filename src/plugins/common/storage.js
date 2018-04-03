import cache from '@/utils/cache'
import cookie from '@/utils/cookie'
import local from '@/utils/local-storage'
import session from '@/utils/session-storage'

/**
 * 浏览器缓存
 * @param  {[type]} Vue    [description]
 * @param  {[type]} engine [description]
 * @return {[type]}        [description]
 */
export default (Vue, engine) => {
  let storage = {}
  switch (engine) {
    case 'cache':
      storage = cache
      break
    case 'cookie':
      storage = cookie
      break
    case 'local':
      storage = local
      break
    case 'session':
    default:
      storage = session
      break
  }

  Object.assign(Vue.prototype, {
    '$cache': cache,
    '$cookie': cookie,
    '$localStorage': local,
    '$sessionStorage': session,
    '$storage': storage
  })
}
