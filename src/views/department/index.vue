<template>
  <div class="container">
    <div class="app-container">
      <el-tree :data="data" :props="defaultprops" default-expand-all :expand-on-click-node="false"> <!--data为数据数组,defaultsprops配置对象 default-expand-all默认展开所有节点-->
        <template v-slot="{data}"> <!--expand-on-click-node属性用来控制点击节点是是否折叠其子节点 false为否 -->
          <el-row style="width:100%;height:40px" type="flex" justify="space-between" align="middle">
            <el-col>{{ data.name }}</el-col>
            <el-col :span="4">
              <span class="tree-manager">{{ data.managerName }}</span>
              <el-dropdown @command="operateDept($event,data.id)">
                <span class="el-dropdown-link">
                  操作<i class="el-icon-arrow-down el-icon--right" />                 <!--当点击el-dropdown-item也就是下拉项时,会触发el-dropdown的command自定义事件-->
                </span>                                                               <!--然后向父组件传递事件参数,参数的值就是你当前点击item command绑定的值 $event可以用来接收事件参数-->
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="add">添加子部门</el-dropdown-item>
                  <el-dropdown-item command="edit">编辑</el-dropdown-item>
                  <el-dropdown-item command="dele">删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
        </template>
      </el-tree> <!--el-tree内置了一个作用域插槽,作用域插槽渲染的次数取决于节点数也就是data中有几个对象-->
    </div>
    <add-dept ref="addDept" :show-dialog.sync="showdialog" :current-node="currentNode" @updepartmentTree="getdepartmentList" /></div>       <!--每次触发作用域插槽渲染这个作用域插槽会往父组件的template中传递一个叫slotprops的对象,对象的date属性(如果你:data传递的是xxx就是xxx属性)就是当前遍历到的节点(不包括子节点)-->
</template>            <!-- :showDialog = "showdialog", @update:showDialog = " showdialog = $event" -->

<script>
import { getDepartmentList, deleteDepartment } from '@/api/department'
import { transListToTreeData } from '@/utils/index' // 导入工具函数
import addDept from './components/add-dept.vue' // 导入添加部门弹层
export default {
  name: 'Department',
  components: {
    addDept
  },
  data() {
    return {
      data: [{
        name: '传智教育', // 值为被显示的内容
        managerName: '张三',
        children: [{ name: '总裁办', managerName: '王七' }, { name: '行政部', managerName: '绫地宁宁' }] // 显示内容的子项
      }, {
        label: '人事办',
        managerName: '李四',
        children: [{ name: '财务核算部', managerName: '丰川祥子' }, { name: '税务管理部', managerName: '水墨兰庭' }, { name: '薪资管理部', managerName: '千早爱音' }]
      }], // 数据数组每个对象都可以理解为树中的一条分支
      defaultprops: {
        label: 'name', // 设置显示内容的字段名,也就是哪个字段的内容要被读取显示
        children: 'children' // 设置子节点的字段名,设置后会去对象里的children字段读取分支的子节点
      },
      showdialog: null, // 是否显示弹框
      currentNode: '' // 当前操作的节点
    }
  },
  created() {
    this.getdepartmentList()
  },
  methods: {
    async  getdepartmentList() {
      const result = await getDepartmentList()
      this.data = transListToTreeData(result, 0)
    }, // 获取部门树数据
    operateDept(type, id) {
      if (type === 'add') {
        this.showdialog = true
        this.currentNode = id
      } else if (type === 'edit') {
        this.showdialog = true
        this.currentNode = id
        this.$nextTick(() => {
          this.$refs.addDept.getDepartmentDetail() // vue采取异步更新DOM策略,即数据更新后不会立刻更新该数据相关的Dom而是等所有数据都修改完后,再统一更新DOM
        }) // 这里用nextTick的原因是因为,子组件的currentNode(props)更新虽然是同步的,但DOM更新却是异步的简单来说就是子组件的props更新后,DOM不会立刻更新,如果不加nextTick会导致子组件DOM没更新完
      } else {
        this.$confirm('您确定要删除该部门吗?', '删除部门', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(async() => {
          await deleteDepartment(id)
          this.$message.success('删除成功')
          this.getdepartmentList() // 重新拉取部门数据
        }) // 点击确定会返回fulfilled状态的promise从而调用then回调
      } // 从而获取到旧的组件实例而旧组件实例的props还没赋值
      // 编辑思路点击编辑获取该节点id,用id调用API获取部门数据,然后赋值
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
    margin-right: 35px;
    width: 50px;
    display: inline-block;
  }
</style>
