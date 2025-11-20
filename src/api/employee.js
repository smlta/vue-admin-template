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
