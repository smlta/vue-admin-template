<template>
  <!--部门选择级联组件-->
  <el-cascader size="mini" :options="TreeData" :props="props" separator="-" :value="value" @change="changevalue" /> <!--通过options设置选项数组,separator配置部门之间的分隔符-->
</template>
<!--el-cascader组件的value props接收到id后会根据id选择找到所有父选项并选择-->
<!--级联组件的change事件会在选择完所有级联选项时触发,它对应的事件处理函数的第一个参数是id数组
 保存了你选择节点的Id,这里需要拿到最后一个节点的Id然后传递给父组件让父组件修改
 级联组件接收到的props-->
<script>
import { getDepartmentList } from '@/api/department' // 导入获取部门数据API
import { transListToTreeData } from '@/utils/index' // 导入转换树型数据方法
export default {
  props: {
    value: {
      type: Number,
      default: null
    } // 该props用来控制部门级联的选择
  },
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
    },
    changevalue(id) {
      if (id.length > 0) {
        this.$emit('input', id[id.length - 1]) // 传递最后一个子部门的Id
      } else {
        this.$emit('input', null)
      }
    }
  }
}
</script>

<style>

</style>
