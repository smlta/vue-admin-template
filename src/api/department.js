import request from '@/utils/request'
export const getDepartmentList = () => {
  return request({
    url: '/company/department'
  })
} // 获取部门列表数据
