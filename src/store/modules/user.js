import { getToken, setToken, removeToken } from '@/utils/auth' // 导入Token相关的API
import { login, getUserInfo } from '@/api/user' // 导入登录API
const state = {
  token: getToken(), // token的值从本地储存读取
  userinfo: {} // 用户基本信息对象
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
  } // 用户用户基本信息状态
}
const actions = {
  async login(context, data) {
    const token = await login(data)
    context.commit('setToken', token) // 调用mutation回调保存token,异步函数无return默认返回fulfilled状态的promise,也就是该action如果正常执行完,会返回一个fulfill状态的promise
  }, // login异步获取表单数据发起请求,回调保存token(mutation)

  async getUserInfo(context) {
    const res = await getUserInfo() // 调用获取用户信息接口
    context.commit('setUserInfo', res)
  }
}
export default {
  namespaced: true, // 开启命名空间
  state,
  mutations,
  actions
} // 导出user模块
