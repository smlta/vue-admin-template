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
// 获取权限点详情
export const getPermissionDetail = (id) => {
  return request({
    url: `/sys/permission/${id}`
  })
}

// 修改权限点API
export const alterPermission = (data) => {
  return request({
    url: `/sys/permission/${data.id}`,
    method: 'PUT',
    data
  })
}

// 删除权限点
export const deletePermission = (id) => {
  return request({
    url: `/sys/permission/${id}`,
    method: 'DELETE'
  })
}

// 为角色分配权限点
export const assignPermissionDot = (data) => {
  return request({
    url: '/sys/role/assignPrem',
    method: 'PUT',
    data
  })
}

