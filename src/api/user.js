import request from '@/utils/request' // 导入自定义axios实例
export const login = (data) => {
  return request({
    url: '/sys/login',
    method: 'POST',
    data
  }) // 调用时即刻返回pending状态的promise对象,当异步任务(请求)完成后,更改promise的状态,然后通过await获取promise的值
} // 导出登录接口

export const getUserInfo = () => {
  return request({
    url: '/sys/profile'
  })
} // 获取用户信息接口
