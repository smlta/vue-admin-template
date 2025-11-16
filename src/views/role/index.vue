<template>
  <div class="container">
    <div class="app-container">
      <div class="role-operate">
        <el-button type="primary" size="mini">添加角色</el-button>
      </div>
      <el-table :data="list">   <!--el-table的data属性为表格数据源,这里用的是获取的角色数组-->
        <el-table-column label="角色" align="center" prop="name" />
        <el-table-column label="启用" align="center" prop="state"> <!--column 的prop属性为设置填充列的字段,这里设置了state设置完后会对象数组中的每个对象都会用state这个字段填充该列-->
          <template #default="{row}">                 <!--el-table里面内置了循环插槽渲染数据源数组的长度为多少就会启动多少次作用域插槽渲染,每次会向父组件的template传递每一行的数据row通过解构获取-->
            <span>{{ row.state === 1 ? '已启用':row.state === 0 ? '未启用': '无' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="表述" align="center" prop="description" />
        <el-table-column label="操作" align="center"> <!--center为让表头内容居中-->
          <template>
            <el-button type="text" size="mini">分配权限</el-button>
            <el-button type="text" size="mini">编辑</el-button>
            <el-button type="text" size="mini">删除</el-button>
          </template> <!--默认插槽渲染次数取决于数据源数组长度-->
        </el-table-column>
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
