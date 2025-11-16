<template>
  <div class="container">
    <div class="app-container">
      <div class="role-operate">
        <el-button type="primary" size="mini">添加角色</el-button>
      </div>
      <el-table :data="list">   <!--el-table的data属性为表格数据源,这里用的是获取的角色数组-->
        <el-table-column label="角色" align="center" prop="name" />
        <el-table-column label="启用" align="center" prop="state" /> <!--column 的prop属性为设置填充列的字段,这里设置了state设置完后会对象数组中的每个对象都会用state这个字段填充该列-->
        <el-table-column label="表述" align="center" prop="description" />
        <el-table-column label="操作" align="center" /> <!--center为让表头内容居中-->
      </el-table>
      <el-row style="height:60px" type="flex" justify="end" align="middle">
        <el-pagination layout="prev,pager,next" /> <!--layout属性用配置分页器显示的内容,注意内容之间用逗号分隔-->
      </el-row>
    </div>
  </div>
</template>
<script>
import { getRoleList } from '@/api/role'
export default {
  name: 'Role',
  data() {
    return {
      list: [] // 角色列表数组
    }
  },
  created() {
    this.getrolelist()
  },
  methods: {
    async  getrolelist() {
      const { rows } = await getRoleList() // 不传参数默认获取第一页的十条数据
      this.list = rows // 将获取的角色数组赋值
    }
  }
}
</script>
<style scoped>
.role-operate {
 padding: 10px;
}

</style>
