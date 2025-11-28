/**
 * 获取员工列表数据
 * ***/

import request from '@/utils/request'
export const getEmployeeList = (params) => {
  return request({
    url: '/sys/user',
    params
  })
}

/**
 * 将员工数据导出为excel
 * ***/

export const exportEmployeeExcel = () => {
  return request({
    url: '/sys/user/export',
    responseType: 'blob' // 因为该接口返回的不再是json字符串而是blob二进制对象所以需要通过responseType指定
  })
}

/**
 * 下载员工Excel模版接口
 * **/

export const DownLoadExcel = () => {
  return request({
    url: '/sys/user/import/template',
    responseType: 'blob'
  })
} // 该接口返回的是blob对象

/**
 * 上传Excel模版接口(2025-11-22接口无效)
 * **/
export const upLoadExcel = (data) => {
  return request({
    url: '/sys/user/import',
    method: 'POST',
    data
  })
} // 该接口接收一个文件对象,以multipart/form-data方式传输

/**
 * 删除员工接口
 * **/
export const deleteEmployee = (id) => {
  return request({
    url: `/sys/user/${id}`,
    method: 'DELETE'
  })
}
/**
 * 添加员工接口
 * **/
export const addEmployee = (data) => {
  return request({
    url: '/sys/user',
    method: 'POST',
    data
  })
}
/**
 * 获取员工信息接口接收员工Id
 * **/
export const getEmployeeInfo = (id) => {
  return request({
    url: `/sys/user/${id}`
  })
}
/**
 * 编辑员工接口
 * **/
export const updateEmployeeInfo = (data) => {
  return request({
    url: `/sys/user/${data.id}`,
    method: 'PUT',
    data
  })
}

/**
 * 为员工分配角色接口
 * **/
export const assignRoles = (data) => {
  return request({
    url: '/sys/user/assignRoles',
    method: 'PUT',
    data
  })
}
