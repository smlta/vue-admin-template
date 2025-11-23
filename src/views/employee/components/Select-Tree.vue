<template>
  <!--部门选择级联组件-->
  <el-cascader size="mini" :options="TreeData" :props="props" separator="-" /> <!--通过options设置选项数组,separator配置部门之间的分隔符-->
</template>

<script>
import { getDepartmentList } from '@/api/department' // 导入获取部门数据API
import { transListToTreeData } from '@/utils/index' // 导入转换树型数据方法
export default {
  data() {
    return {
      TreeData: [], // 级联组件树型数组
      props: {
        label: 'name', // 配置级联选项文本使用选择对象的哪个字段的值
        value: 'id' // 配置选择了选项使用选择对象的哪个字段作为值
      }
    }
  },
  created() {
    this.getDepartmentList()
  },
  methods: {
    async  getDepartmentList() {
      this.TreeData = transListToTreeData(await getDepartmentList(), 0)
    }
  }
}
</script>

<style>

</style>
