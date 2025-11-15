<template>
  <el-dialog title="添加子部门" :visible="showDialog" @close="close"> <!--通过showDialog prop动态控制弹框的显示隐藏-->
    <el-form ref="form" label-width="120px" :model="formdata" :rules="rules"> <!--label-width属性用来控制表单域的宽度-->
      <el-form-item label="部门名称" prop="name"><el-input v-model="formdata.name" placeholder="2-10个字符" size="mini" style="width:80%" /></el-form-item>
      <el-form-item label="部门编码" prop="code"><el-input v-model="formdata.code" placeholder="2-10个字符" size="mini" style="width:80%" /></el-form-item>
      <el-form-item label="部门负责人" prop="managerId">
        <el-select v-model="formdata.managerId" placeholder="请选择负责人" size="mini" style="width:80%">
          <el-option v-for="item in chargePersonList" :key="item.id" :label="item.username" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce"><el-input v-model="formdata.introduce" placeholder="2-10个字符" type="textarea" size="mini" style="width:80%" /></el-form-item>
      <el-form-item>
        <el-row type="flex" justify="center"> <!--justify center 可以让弹性容器的文字居中-->
          <el-col :span="12">
            <el-button type="primary" size="mini" @click="confirm">确定</el-button>
            <el-button size="mini" @click="close">取消</el-button>
          </el-col> <!--使用el-row时会把行分成24份,表示列占行的12份-->
        </el-row>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { getDepartmentList, getDepartmentPerson, addDepartment, GetDepartmentDetail } from '@/api/department'
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    currentNode: {
      type: Number,
      default: null
    } // 当前操作的节点id
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
          { min: 2, max: 10, message: '部门编码长度为2-10个字符', trigger: 'blur' },
          { validator: async(rules, value, callback) => {
            const depts = await getDepartmentList()
            if (depts.some(item => item.code === value)) {
              callback(new Error('部门编号已存在'))
            } else {
              callback()
            }
          },
          trigger: 'blur'
          }
        ],
        introduce: [{ required: true, message: '部门介绍不能为空', trigger: 'blur' },
          { min: 1, max: 100, message: '部门介绍应为1-100个字符', trigger: 'blur' }
        ],
        managerId: [{ required: true, message: '部门负责人名字不能为空', trigger: 'blur' }],
        name: [{ required: true, message: '部门名称不能为空', trigger: 'blur' },
          { min: 2, max: 10, message: '部门名称应为2-10个字符', trigger: 'blur' },
          { validator: async(rules, value, callback) => {
            const depts = await getDepartmentList()
            if (depts.some(item => item.name === value)) {
              callback(new Error('该部门名称已存在'))
            } else {
              callback()
            }
          },
          trigger: 'blur'
          }]
      },
      chargePersonList: [] // 负责人数组
    }
  },
  created() {
    this.getPerson()
  },
  methods: {
    close() {
      this.$emit('update:showDialog', false)
      this.$refs.form.resetFields() // 重置表单
    }, // 关闭弹层,重置表单
    async getPerson() {
      const res = await getDepartmentPerson()
      this.chargePersonList = res
    }, // 获取负责人列表
    confirm() {
      this.$refs.form.validate(async isok => {
        await addDepartment({ ...this.formdata, pid: this.currentNode })
        this.$emit('updepartmentTree') // 更新部门树数据
        this.$message({
          message: '添加子部门成功',
          type: 'success'
        })
        this.close()
      }) // 对表单整体校验
    }, // 添加子部门方法,点击确定先对表单进行整体校验,通过后调用新增部门接口,接口调用完成后通知父组件重新获取部门数据,然后重置表单,关闭弹层
    async getDepartmentDetail() {
      const res = await GetDepartmentDetail(this.currentNode) // 调用获取部门详情API
      this.formdata = res // 更新表单数据,这里表单数据和输入框双向绑定所以也是在回填表单
    } // 获取部门详细信息
  }
}
</script>

<style scoped>

</style>
