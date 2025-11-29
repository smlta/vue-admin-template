import layout from '@/layout'
export default {
  path: '/department',
  name: 'department',
  component: layout,
  children: [{
    path: '', // 二级路由为''时/department表示显示一级和二级路由组件
    component: () => import('@/views/department'),
    meta: {
      icon: 'tree', // icon图标
      title: '组织' // 标题
    } // 路由元信息,这些信息会被加载到侧边栏形成该路由的菜单
  }]
} // 默认导出路由模块
// 更多理解当输入/department时会先匹配一级路由 'department'匹配了layout 然后''匹配了department组件
