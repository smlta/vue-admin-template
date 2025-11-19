<template>
  <div class="container">
    <div class="app-container">
      <div class="left">
        <el-input style="margin-bottom:10px" type="text" prefix-icon="el-icon-search" size="small" placeholder="输入员工姓名全员搜索" />
        <!-- 树形组件 -->
        <el-tree
          ref="Tree"
          :data="organization"
          :props="defaultprops"
          :highlight-current="true"
          default-expand-all
          :expand-on-click-node="false"
          node-key="id"
          @current-change="selectNode"
        /> <!--highlight-current选中项高亮 expand-on-click-node点击节点时节点不折叠-->
        <!--node-key 指定树节点使用哪个字段作为唯一的身份标识 -->
        <!--current-change事件会在切换节点时触发,这里会向selectNode这个方法传递两个形参(当前节点的数据，当前节点的 Node 对象)-->
      </div>
      <div class="right">
        <el-row class="opeate-tools" type="flex" justify="end">
          <el-button size="mini" type="primary">添加员工</el-button>
          <el-button size="mini">excel导入</el-button>
          <el-button size="mini">excel导出</el-button>
        </el-row>
        <!-- 表格组件 -->
        <!-- 分页 -->
      </div>
    </div>
  </div>
</template>

<script>
import { getDepartmentList } from '@/api/department.js' // 导入获取组织数据API
import { transListToTreeData } from '@/utils/index.js' // 导入转换树型数据API
export default {
  name: 'Employee',
  data() {
    return {
      organization: [], // 组织数据
      defaultprops: {
        label: 'name',
        children: 'children'
      },
      queryParams: {
        departmentId: ''
      } // 获取员工查询参数对象
    }
  },
  created() {
    this.getOrganizationData()
  },
  methods: {
    async getOrganizationData() {
      this.organization = transListToTreeData(await getDepartmentList(), 0) // 将线性组织数据转为树型数据
      this.queryParams.departmentId = this.organization[0].id // 获取第一个节点id并记录下来
      this.$nextTick(() => {
        this.$refs.Tree.setCurrentKey(this.queryParams.departmentId) // 通过setCurrentKey节点默认选中第一个节点
      }) // 因为数据渲染是异步的,所以需要等节点树渲染完毕,后再去选中节点
    },
    selectNode(node) {
      this.queryParams.departmentId = node.id
    } // node为当前选中节点数据,当选择节点时自动记录节点id
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  background: #fff;
  display: flex;
  .left {
    width: 280px;
    padding: 20px;
    border-right: 1px solid #eaeef4;
  }
  .right {
    flex: 1;
    padding: 20px;
    .opeate-tools {
      margin:10px ;
    }
    .username {
      height: 30px;
      width: 30px;
      line-height: 30px;
      text-align: center;
      border-radius: 50%;
      color: #fff;
      background: #04C9BE;
      font-size: 12px;
      display:inline-block;
    }
  }
}

</style>
