<template>
  <div class="container">
    <div class="app-container">
      <div class="role-operate">
        <el-button type="primary" size="mini">添加角色</el-button>
      </div>
      <el-table>
        <el-table-column label="角色" align="center" />
        <el-table-column label="启用" align="center" />
        <el-table-column label="表述" align="center" />
        <el-table-column label="操作" align="center" /> <!--center为让表头内容居中-->
      </el-table>
      <el-row style="height:60px" type="flex" justify="end" align="middle">
        <el-pagination layout="prev,pager,next" /> <!--layout属性用配置分页器显示的内容,注意内容之间用逗号分隔-->
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Role'
}
</script>
<style scoped>
.role-operate {
 padding: 10px;
}

</style>
