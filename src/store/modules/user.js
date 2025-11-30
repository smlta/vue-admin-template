import { getToken, setToken, removeToken } from '@/utils/auth' // 导入Token相关的API
import { login, getUserInfo } from '@/api/user' // 导入登录API
import { constantRoutes } from '@/router/index' // 导入静态路由
const state = {
  token: getToken(), // token的值从本地储存读取
  userinfo: {}, // 用户基本信息对象
  routes: constantRoutes// 用户路由数组(默认为静态路由)
}
const mutations = {
  setToken(state, token) {
    state.token = token // 设置token
    setToken(token) // 将最新的token储存到本地
  },
  clearToken() {
    state.token = null
    removeToken() // 移除token
  },
  setUserInfo(state, data) {
    state.userinfo = data
  }, // 用户用户基本信息状态
  setUserAsyncRoutes(state, asyncarr) {
    state.routes = [...constantRoutes, ...asyncarr]
  } // 为用户路由数组添加动态路由,用户路由数组(即用户可以访问的页面 = 静态路由数组 + 动态路由数组)
}
const actions = {
  async login(context, data) {
    const token = await login(data)
    context.commit('setToken', token) // 调用mutation回调保存token,异步函数无return默认返回fulfilled状态的promise,也就是该action如果正常执行完,会返回一个fulfill状态的promise
  }, // login异步获取表单数据发起请求,回调保存token(mutation)

  async getUserInfo(context) {
    const res = await getUserInfo() // 调用获取用户信息接口
    context.commit('setUserInfo', res)
    return res // 相当于return Prmomise.resolve(res),这里返回用户个人信息方便后面筛选用户拥有的动态路由
  },
  async logout(context) {
    context.commit('clearToken')
    context.commit('setUserInfo', {})
  }
}
export default {
  namespaced: true, // 开启命名空间
  state,
  mutations,
  actions
} // 导出user模块
