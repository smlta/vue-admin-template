import request from '@/utils/request'

// 获取权限点列表API
export const getPermissionList = () => {
  return request({
    url: '/sys/permission'
  })
}
// 添加权限点API
export const addPermissionDot = (data) => {
  return request({
    url: '/sys/permission',
    method: 'POST',
    data
  })
}

