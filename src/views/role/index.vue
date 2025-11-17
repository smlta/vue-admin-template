<template>
  <div class="container">
    <div class="app-container">
      <div class="role-operate">
        <el-button type="primary" size="mini" @click="showdialog = true">添加角色</el-button>
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
        <el-pagination layout="prev,pager,next" :page-size="pageParams.pagesize" :current-page="pageParams.page" :total="pageParams.total" @current-change="pageChange" /> <!--layout属性用配置分页器显示的内容,注意内容之间用逗号分隔-->
      </el-row>   <!--通过current-change事件监听页码的变化-->
      <el-dialog title="新增角色" :visible.sync="showdialog" width="500px" @close="btnCancel"> <!--点击关闭时会触发dialog组件的update:visible事件,并向父级传递事件参数值为false   点击x关闭弹层会触发dialog的close事件-->
        <el-form ref="role" label-width="120px" :model="formParams" :rules="rules">
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="formParams.name" style="width:300px" size="mini" /></el-form-item>
          <el-form-item label="启用" prop="state">
            <el-switch v-model="formParams.state" :active-value="1" :inactive-value="0" /> <!-- active-value属性用来设置打开开关时v-model绑定变量的值 inactive-value则是关闭时变量的值 -->
          </el-form-item>
          <el-form-item label="角色描述" prop="description">
            <el-input v-model="formParams.description" type="textarea" style="width:300px" size="mini" :rows="3" />
          </el-form-item>
          <el-form-item>
            <el-row type="flex" justify="center">
              <el-col :span="12">
                <el-button type="primary" size="mini" @click="btnOk">确定</el-button>
                <el-button size="mini" @click="btnCancel">取消</el-button>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { getRoleList, addRole } from '@/api/role'
export default {
  name: 'Role',
  data() {
    return {
      list: [], // 角色列表数组
      pageParams: {
        page: 1, // 当前页码
        pagesize: 5, // 每页条数
        total: 0 // 数据条数默认为0,条数通过API获取
      }, // 分页信息对象
      showdialog: false, // 是否显示弹层
      formParams: {
        name: '', // 角色名称
        description: '', // 角色描述
        state: 0 // 角色是否启用,默认为未启用
      }, // 表单数据对象
      rules: {
        name: [{ required: true, message: '角色名称不能为空', trigger: 'blur' }],
        description: [{ required: true, message: '角色描述不能为空', trigger: 'blur' }]
      } // 规则对象
    }
  },
  created() {
    this.getrolelist()
  },
  methods: {
    async  getrolelist() {
      const { rows, total } = await getRoleList(this.pageParams) // 进入页面获取第一页数据,每页5条
      this.pageParams.total = total // 将获取到的数据总数赋值给分页对象的total
      this.list = rows // 将获取的角色数组赋值
    },
    pageChange(page) {
      this.pageParams.page = page // 切换页码时给params的page重新赋值,然后重新拉取数据
      this.getrolelist()
    }, // page为当前切换到的页码
    btnOk() {
      this.$refs.role.validate(async isok => {
        if (isok) {
          await addRole(this.formParams)
          this.$message.success('添加角色成功!')
          this.getrolelist() // 重新拉取角色数据
          this.btnCancel() // 重置表单关闭弹层
        }
      })
    }, // 确定
    btnCancel() {
      this.$refs.role.resetFields()
      this.showdialog = false // 需要注意的是如果有表单项(el-item)没有加prop属性则该表单项不会被重置
    } // 取消
  }
}
</script>
<style scoped>
.role-operate {
 padding: 10px;
}

</style>
