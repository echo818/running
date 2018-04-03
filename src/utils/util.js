// 判断数据类型
export const typeOf = val => {
  return Object.prototype.toString.call(val).slice(8, -1)
}
// 检查数组中是否存在某个元素
export const inArray = (arr, key) => {
  return arr.indexOf(key) > -1
}
