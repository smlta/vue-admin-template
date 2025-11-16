// 角色模块API
import request from '@/utils/request' // 导入自定义axios实例

export const getRoleList = (params) => {
  return request({
    url: '/sys/role',
    params
  })
} // 获取角色列表API
