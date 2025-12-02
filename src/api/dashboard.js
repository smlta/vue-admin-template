import request from '@/utils/request'
// 获取首页项目数据
export const getHomeData = () => {
  return request({
    url: '/home/data'
  })
}
// 获取首页消息数据
export const getNoticeData = () => {
  return request({
    url: '/home/notice'
  })
}
