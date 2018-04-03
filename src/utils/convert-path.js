/**
 * 将path对象路径转化为对象值
 * @param  {[String]} path [路径字符串]
 * @param  {[Object]} obj  [路径对象]
 * @return {[String]}      [路径值]
 */
/**
 * obj:
 * {
 *   a: {
 *     b: {
 *       c: 'test'
 *     }
 *   }
 * }
 *
 * path: 'a/b/c'
 *
 * return 'test'
 */
export default (path, obj) => {
  return path.split('/').reduce((o, k) => {
    return o[k]
  }, obj) || path
}
