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
export const addDepartment = (data) => {
  return request({
    url: '/company/department',
    method: 'post',
    data
  })
} // 添加子部门
export const GetDepartmentDetail = (id) => {
  return request({
    url: `/company/department/${id}`
  })
}
export const editDepartment = (data) => {
  return request({
    url: `/company/department/${data.id}`,
    method: 'PUT',
    data
  })
} // 编辑部门API

export const deleteDepartment = (id) => {
  return request({
    url: `/company/department/${id}`,
    method: 'DELETE'
  })
} // 删除部门API
