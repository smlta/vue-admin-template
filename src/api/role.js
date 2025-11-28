// 角色模块API
import request from '@/utils/request' // 导入自定义axios实例

export const getRoleList = (params) => {
  return request({
    url: '/sys/role',
    params
  })
} // 获取角色列表API

export const addRole = (data) => {
  return request({
    url: '/sys/role',
    method: 'POST',
    data
  })
} // 新增角色API

export const updateRole = (data) => {
  return request({
    url: `/sys/role/${data.id}`,
    method: 'PUT',
    data
  })
} // 修改角色API

export const deleteRole = (id) => {
  return request({
    url: `/sys/role/${id}`,
    method: 'DELETE'
  })
} // 删除角色方法

// 获取所有可用的角色列表
export const getAllEnableRoles = () => {
  return request({
    url: '/sys/role/list/enabled'
  })
}
