// 异步加载js库
export default (Vue) => {
  Vue.prototype.$load = link => {
    var script = document.createElement('script')
    script.src = link
    document.body.appendChild(script)
  }
}
