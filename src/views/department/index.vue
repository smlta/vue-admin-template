<template>
  <div class="container">
    <div class="app-container" />
    <el-tree :data="data" :props="defaultprops" default-expand-all /> <!--data为数据数组,defaultsprops配置对象 default-expand-all默认展开所有节点-->
  </div>
</template>

<script>
export default {
  name: 'Department',
  data() {
    return {
      data: [{
        label: '传智教育', // 值为被显示的内容
        children: [{ label: '总裁办' }, { label: '行政部' }] // 显示内容的子项
      }, {
        label: '人事办',
        children: [{ label: '财务核算部' }, { label: '税务管理部' }, { label: '薪资管理部' }]
      }], // 数据数组每个对象都可以理解为树中的一条分支
      defaultprops: {
        label: 'label', // 设置显示内容的字段名,也就是哪个字段的内容要被读取显示
        children: 'children' // 设置子节点的字段名,设置后会去对象里的children字段读取分支的子节点
      }
    }
  }
}
</script>

<style scoped>

</style>
