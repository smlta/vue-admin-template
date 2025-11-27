<template>
  <div class="container">
    <div class="app-container">
      <el-button type="primary" size="mini" class="btn-add" @click="alterAddParams(1,0)">添加权限</el-button>
      <el-table :data="list" default-expand-all row-key="id"> <!--row-key指定标识一行的字段-->
        <el-table-column label="名称" prop="name" />
        <el-table-column label="标识" prop="code" />
        <el-table-column label="描述" prop="description" />
        <el-table-column label="操作">
          <template #default="{row}">
            <el-button v-if="row.type === 1" type="text" size="mini" @click="alterAddParams(2,row.id)">添加</el-button> <!--二级项不显示添加-->
            <el-button type="text" size="mini" @click="edit(row.id)">编辑</el-button>
            <el-button type="text" size="mini" @click="deletePermission(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="新增权限点" :visible.sync="showDialog"> <!--点击x时会触发dialog内部的自定义事件传递false事件参数-->
        <el-form ref="form" label-width="120px" :model="formObj" :rules="rules">
          <el-form-item label="权限名称" prop="name"><el-input v-model="formObj.name" style="width:90%" /></el-form-item> <!--form-item分为label标签项和控件项当未给el-form的label-width指定标签宽度时-->
          <el-form-item label="权限标识" prop="code"><el-input v-model="formObj.code" style="width:90%" /></el-form-item><!--item的标签项在上控件项在下 也就是label-position:top-->
          <el-form-item label="权限描述"><el-input v-model="formObj.description" style="width:90%" /></el-form-item> <!--可以通过给input设置width控制input控件的宽度-->
          <el-form-item label="开启">
            <el-switch
              v-model="formObj.enVisible"
              inactive-value="0"
              active-value="1"
            />
          </el-form-item>
          <el-row type="flex" justify="center">
            <el-button type="primary" size="mini" @click="btnOk">确定</el-button>
            <el-button size="mini" @click="btnCancel">取消</el-button>
          </el-row>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { transListToTreeData } from '@/utils/index' // 导入转换树形数据工具函数
import { getPermissionList, addPermissionDot, getPermissionDetail, alterPermission, deletePermission } from '@/api/permission'
export default {
  name: 'Permission',
  data() { // 点击左上角添加时 type=1 pid = 0 行内添加时 type = 2 pid = 按钮权限点的pid
    return {
      list: [], // 权限点列表数组
      showDialog: false, // 控制是否显示弹层
      formObj: {
        name: '', // 权限点名称
        code: '', // 权限点标识
        description: '', // 权限点描述
        enVisible: '', // 权限点开启状态
        type: '', // 权限点类型
        pid: '' // 权限点父级id
      }, // 表单数据对象
      rules: {
        name: [{ required: true, message: '权限名称不能为空', trigger: 'blur' }],
        code: [{ required: true, message: '权限标识不能为空', trigger: 'blur' }]
      } // 规则对象
    }
  },
  created() {
    this.getPermissionList() // 进入页面获取权限点树形数据
  },
  methods: {
    async getPermissionList() {
      this.list = transListToTreeData(await getPermissionList(), 0)
    },
    btnCancel() {
      this.showDialog = false
      this.$refs.form.resetFields()
    }, // 取消
    btnOk() {
      this.$refs.form.validate(async isOk => {
        if (isOk) {
          if (this.formObj.id) {
            await alterPermission(this.formObj)
            this.$message.success('权限点信息修改成功') // 如果是编辑状态表单对象存在id字段
          } else {
            await addPermissionDot(this.formObj)
            this.$message.success('添加权限点成功!')
          }
          this.btnCancel()
          this.getPermissionList()
          // 重新拉取数据
        } // 校验通过
      })
    },
    alterAddParams(type, pid) {
      this.showDialog = true
      this.formObj.type = type
      this.formObj.pid = pid
    }, // 修改权限点参数
    async edit(id) {
      const res = await getPermissionDetail(id)
      this.formObj = res
      this.showDialog = true
    }, // 获取权限点信息回显
    deletePermission(id) { // 当调用confirm方法时会返回一个promise对象,当点击确定时会将promise的状态改为fulfilled从而触发then回调点击取消将promise状态改为rejected触发catch回调
      this.$confirm('您确定要删除该权限点吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(async() => {
        await deletePermission(id)
        this.$message.success('权限点删除成功!')
        this.getPermissionList() // 重新拉取权限点数据
      }).catch(() => {

      })
    } // 删除权限点
  }
}
</script>
<style scoped>
 .btn-add {
  margin: 10px;
 }
</style>

