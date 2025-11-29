import layout from '@/layout'
export default {
  path: '/employee',
  name: 'employee',
  component: layout,
  children: [{
    path: '',
    name: 'employee',
    component: () => import('@/views/employee'),
    meta: {
      title: '员工',
      icon: 'people'
    }
  },
  {
    path: '/employee/detail/:id?', // 配置id动态路由参数,访问该组件可以传也可以不传id参数
    component: () => import('@/views/employee/emoloyeeDetail.vue'),
    hidden: true,
    meta: {
      title: '员工详情'
    }

  }]
}
