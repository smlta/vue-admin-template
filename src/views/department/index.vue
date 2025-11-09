<template>
  <div class="container">
    <div class="app-container" />
    <el-tree :data="data" :props="defaultprops" default-expand-all> <!--data为数据数组,defaultsprops配置对象 default-expand-all默认展开所有节点-->
      <template v-slot="{data}">
        <el-row style="width:100%;height:40px" type="flex" justify="space-between" align="middle">
          <el-col>{{ data.label }}</el-col>
          <el-col :span="4">
            <span class="tree-manager">{{ data.managerName }}</span>
            <el-dropdown>
              <span class="el-dropdown-link">
                操作<i class="el-icon-arrow-down el-icon--right" />
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>添加子部门</el-dropdown-item>
                <el-dropdown-item>编辑</el-dropdown-item>
                <el-dropdown-item>删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
      </template>
    </el-tree> <!--el-tree内置了一个作用域插槽,作用域插槽渲染的次数取决于节点数也就是data中有几个对象-->
  </div>       <!--每次触发作用域插槽渲染这个作用域插槽会往父组件的template中传递一个叫slotprops的对象,对象的date属性(如果你:data传递的是xxx就是xxx属性)就是当前遍历到的节点(不包括子节点)-->
</template>

<script>
export default {
  name: 'Department',
  data() {
    return {
      data: [{
        label: '传智教育', // 值为被显示的内容
        managerName: '张三',
        children: [{ label: '总裁办', managerName: '王七' }, { label: '行政部', managerName: '绫地宁宁' }] // 显示内容的子项
      }, {
        label: '人事办',
        managerName: '李四',
        children: [{ label: '财务核算部', managerName: '丰川祥子' }, { label: '税务管理部', managerName: '水墨兰庭' }, { label: '薪资管理部', managerName: '千早爱音' }]
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
.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .tree-manager {
    margin: 10px;
    width: 50px;
    display: inline-block;
  }
</style>
