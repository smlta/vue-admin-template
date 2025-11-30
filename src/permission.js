import router from './router' // 导入路由实例
import store from './store' // 导入vuex仓库实例
import nProgress from 'nprogress' // 导入页面导航栏进度条插件
import 'nprogress/nprogress.css' // 导入进度条样式
import { asyncroutes } from '@/router/index' // 导入动态路由
const whiteList = ['/login', '/404'] // 白名单页面(访问不需要token)
router.beforeEach(async(to, from, next) => {
  nProgress.start() // 开启进度条
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/') // 当next()里面写了路径就不会执行后置守卫,所以跳回dashboard页后需要手动关闭进度条
      nProgress.done()
    } else {
      if (!store.getters.userId) {
        const { roles: { menus }} = await store.dispatch('user/getUserInfo') // 获取并设置个人用户信息并解构用户拥有的权限
        const filterasync = asyncroutes.filter(item => {
          return menus.includes(item.name) // 遍历动态路由如果当前遍历到的动态路由在用户权限数组中,则筛选出来
        }) // 用户能访问的权限页
        store.commit('user/setUserAsyncRoutes', filterasync) // 在vuex仓库中添加用户拥有的动态路由
        router.addRoutes([...filterasync, { path: '*', redirect: '/404', hidden: true }])
        next(to.path) // 解决router缺陷,添加的动态路由不会立即生效,需要重新路由导航一次
      } else {
        next()
      }// 如果有token但访问的不是登录页,判断是否获取过用户个人信息没获取过就发起请求获取
      // 通过user模块中userinfo userId字段值的有无判断是否获取过数据
      // addRoutes接收一个路由数组用来动态添加路由,这里因为404路由必须在所有路由的最后面,所以把它从静态路由中剔除,在这里添加即可保障404路由在所有路由的最后面
    } // 如果有token判断要去的是不是登录页,如果是拦截回主页,不是则直接放行
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
      nProgress.done()
    }
  } // 如果无token,先判断访问的页面是否在白名单如果在直放行,不在拦截回登录页
})

router.afterEach(() => {
  nProgress.done() // 关闭进度条
}) // 后置路由守卫会在路由跳转完成,页面内容渲染完成时触发
