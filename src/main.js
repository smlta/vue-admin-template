import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
/* if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
} */ // 打包时剔除mock模块

// set ElementUI lang to EN
Vue.use(ElementUI)
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)
Vue.directive('permission', {
  // el为当前绑定指令的元素,biding为指令对象,通过biding.value可以拿到当前元素绑定的指令值
  // 功能权限点即,有权限点才能点击对应的功能按钮或看见功能按钮
  inserted(el, binding) {
    const points = store.state.user.userinfo?.roles?.points || [] // 因为userinfo和roles可能为空,为了防止报错故使用可选链式当其中一个为空时链式返回undefined故而返回一个空功能点数组
    console.log(points)
    if (!points.includes(binding.value)) {
      // 如果按钮需要的功能权限点不在,用户功能权限点数组中则不显示或禁用功能
      el.remove() // 元素从DOM中移除
      // el.disabled = true 按钮按钮禁用
    }
  } // 当绑定指令的元素插入的DoM时触发
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
