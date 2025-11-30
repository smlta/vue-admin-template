const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.userinfo.staffPhoto, // 获取用户头像
  name: state => state.user.userinfo.username, // 获取用户名
  userId: state => state.user.userinfo.userId, // 获取用户Id
  routes: state => state.user.routes // 返回用户路由数组
}
export default getters
