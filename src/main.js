// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'es6-promise/auto'
import Vue from 'vue'
import App from './App'
import router from './router'

// 引用全局组件
import components from '@/components'

// 引用过滤器
import filters from '@/filters'

// 引用插件
import plugins from '@/plugins'

// 引用样式
import '@/assets/theme/index.css'
import '@/assets/css/style.less'

// 使用全局组件
components.forEach(Comp => Vue.component(Comp.name, Comp))

// 使用过滤器
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]))

// 使用插件
plugins.forEach(args => Vue.use.apply(Vue, args))

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
