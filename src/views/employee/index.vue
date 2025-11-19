<template>
  <div class="container">
    <div class="app-container">
      <div class="left">
        <el-input style="margin-bottom:10px" type="text" prefix-icon="el-icon-search" size="small" placeholder="输入员工姓名全员搜索" />
        <!-- 树形组件 -->
        <el-tree
          :data="organization"
          :props="defaultprops"
          :highlight-current="true"
          default-expand-all
          :expand-on-click-node="false"
        /> <!--highlight-current选中项高亮 expand-on-click-node点击节点时节点不折叠-->
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
      }
    }
  },
  created() {
    this.getOrganizationData()
  },
  methods: {
    async getOrganizationData() {
      this.organization = transListToTreeData(await getDepartmentList(), 0) // 将线性组织数据转为树型数据
    }
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
