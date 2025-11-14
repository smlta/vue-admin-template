import request from '@/utils/request'
export const getDepartmentList = () => {
  return request({
    url: '/company/department'
  })
} // 获取部门列表数据

export const getDepartmentPerson = () => {
  return request({
    url: '/sys/user/simple'
  })
} // 获取部门负责人列表
