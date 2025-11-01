import { getToken, setToken, removeToken } from '@/utils/auth' // 导入Token相关的API
const state = {
  token: getToken() // token的值从本地储存读取
}
const mutations = {
  setToken(state, token) {
    state.token = token // 设置token
    setToken(token) // 将最新的token储存到本地
  },
  clearToken() {
    state.token = null
    removeToken() // 移除token
  }
}
const actions = {
  login(context, data) {
    console.log(data)
    // 发起请求
    context.commit('setToken', 'caisjdoasijdo') // 调用mutation回调保存token
  } // login异步获取表单数据发起请求,回调保存token(mutation)
}
export default {
  namespaced: true, // 开启命名空间
  state,
  mutations,
  actions
} // 导出user模块
