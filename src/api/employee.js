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

