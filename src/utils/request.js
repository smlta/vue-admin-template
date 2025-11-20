import axios from 'axios'
import store from '@/store/index'
import { Message } from 'element-ui'
import router from '@/router'
const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 配置基地址
  timeout: 10000
}) // 创建axios实例
request.interceptors.request.use((config) => {
  const token = store.getters.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, (err) => {
  return Promise.reject(err) // 请求失败返回错误的promise实例
}) // 请求拦截器第二个回调执行的时机是,当第一个回调抛出错误,或出现语法错误

request.interceptors.response.use((response) => {
  // 当返回的响应状态码为2xx时说明请求成功,需要判断success(是否成功)
  const { data: { success, message, data }} = response // 解构
  if (success) {
    return data // 如果接口能正常返回响应(200),且接口调用成功
  } else {
    // 如果接口能够正常返回响应(200),但接口调用失败比如没传密码等参数 即success为false
    Message({
      type: 'error',
      message
    })
    return Promise.reject(new Error(message))
  }
}, async(error) => {
  if (error.response.status === 401) {
    Message({ type: 'warning', message: 'token过期请重新登录' })
    await store.dispatch('user/logout') // 等待登出异步完成
    router.push('/login')
    return Promise.reject(error)
  }

  Message({ type: 'error', message: error.message })
  return Promise.reject(error) // 当返回的响应状态码非2xx时,说明请求失败弹出错误提示框并返回reject的promise
})

export default request // 导出自定义axios实例
