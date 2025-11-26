<template>
  <div class="container">
    <div class="app-container">
      <el-button type="primary" size="mini" class="btn-add">添加权限</el-button>
      <el-table :data="list" default-expand-all row-key="id"> <!--row-key指定标识一行的字段-->
        <el-table-column label="名称" prop="name" />
        <el-table-column label="标识" prop="code" />
        <el-table-column label="描述" prop="description" />
        <el-table-column label="操作">
          <template #default="{row}">
            <el-button v-if="row.type === 1" type="text" size="mini">添加</el-button> <!--二级项不显示添加-->
            <el-button type="text" size="mini">编辑</el-button>
            <el-button type="text" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { transListToTreeData } from '@/utils/index' // 导入转换树形数据工具函数
import { getPermissionList } from '@/api/permission'
export default {
  name: 'Permission',
  data() {
    return {
      list: [] // 权限点列表数组
    }
  },
  created() {
    this.getPermissionList() // 进入页面获取权限点树形数据
  },
  methods: {
    async getPermissionList() {
      this.list = transListToTreeData(await getPermissionList(), 0)
    }
  }
}
</script>
<style scoped>
 .btn-add {
  margin: 10px;
 }
</style>

