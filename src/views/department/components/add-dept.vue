<template>
  <el-dialog title="添加子部门" :visible="showDialog" @close="close"> <!--通过showDialog prop动态控制弹框的显示隐藏-->
    <el-form label-width="120px" :model="formdata" :rules="rules"> <!--label-width属性用来控制表单域的宽度-->
      <el-form-item label="部门名称" prop="name"><el-input v-model="formdata.name" placeholder="2-10个字符" size="mini" style="width:80%" /></el-form-item>
      <el-form-item label="部门编码" prop="code"><el-input v-model="formdata.code" placeholder="2-10个字符" size="mini" style="width:80%" /></el-form-item>
      <el-form-item label="部门负责人" prop="managerId"><el-select v-model="formdata.managerId" placeholder="请选择负责人" size="mini" style="width:80%" /></el-form-item>
      <el-form-item label="部门介绍" prop="introduce"><el-input v-model="formdata.introduce" placeholder="2-10个字符" type="textarea" size="mini" style="width:80%" /></el-form-item>
      <el-form-item>
        <el-row type="flex" justify="center"> <!--justify center 可以让弹性容器的文字居中-->
          <el-col :span="12">
            <el-button type="primary" size="mini">确定</el-button>
            <el-button size="mini">取消</el-button>
          </el-col> <!--使用el-row时会把行分成24份,表示列占行的12份-->
        </el-row>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formdata: {
        code: '', // 部门编码
        introduce: '', // 部门介绍
        managerId: '', // 部门负责人名字
        name: '', // 部门名称
        pid: '' // 父部门id
      },
      rules: {
        code: [{ required: true, message: '部门编码不能为空', trigger: 'blur' },
          { min: 2, max: 10, message: '部门编码长度为2-10个字符', trigger: 'blur' }
        ],
        introduce: [{ required: true, message: '部门介绍不能为空', trigger: 'blur' },
          { min: 1, max: 100, message: '部门介绍应为1-100个字符', trigger: 'blur' }
        ],
        managerId: [{ required: true, message: '部门负责人名字不能为空', trigger: 'blur' }],
        name: [{ required: true, message: '部门名称不能为空', trigger: 'blur' },
          { min: 2, max: 10, message: '部门名称应为2-10个字符', trigger: 'blur' }]
      }
    }
  },
  methods: {
    close() {
      this.$emit('update:showDialog', false)
    }
  }
}
</script>

<style scoped>

</style>
