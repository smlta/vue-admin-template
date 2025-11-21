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
