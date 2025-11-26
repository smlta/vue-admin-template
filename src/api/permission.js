import request from '@/utils/request'

// 获取权限点列表API
export const getPermissionList = () => {
  return request({
    url: '/sys/permission'
  })
}
