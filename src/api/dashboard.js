import request from '@/utils/request'
// 获取首页项目数据
export const getHomeData = () => {
  return request({
    url: '/home/data'
  })
}
