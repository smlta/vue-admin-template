<template>
  <div class="container">
    <div class="app-container">
      <div class="role-operate">
        <el-button type="primary" size="mini" @click="showdialog = true">添加角色</el-button>
      </div>
      <el-table :data="list">   <!--el-table的data属性为表格数据源,这里用的是获取的角色数组-->
        <el-table-column label="角色" align="center" prop="name">
          <template #default="{row}">
            <el-input v-if="row.isedit" v-model="row.editrow.name" size="mini" /> <!-- el-table-column中可以通过template解构接收行数据 -->
            <span v-else>{{ row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="启用" align="center" prop="state"> <!--column 的prop属性为设置填充列的字段,这里设置了state设置完后会对象数组中的每个对象都会用state这个字段填充该列-->
          <template #default="{row}">
            <el-switch v-if="row.isedit" v-model="row.editrow.state" :active-value="1" :inactive-value="0" />              <!--el-table里面内置了循环插槽渲染数据源数组的长度为多少就会启动多少次作用域插槽渲染,每次会向父组件的template传递每一行的数据row通过解构获取-->
            <span v-else>{{ row.state === 1 ? '已启用':row.state === 0 ? '未启用': '无' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="表述" align="center" prop="description">
          <template #default="{row}">
            <el-input v-if="row.isedit" v-model="row.editrow.description" type="textarea" />
            <span v-else>{{ row.description }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center"> <!--center为让表头内容居中-->
          <template #default="{row}">
            <template v-if="row.isedit">
              <el-button type="primary" size="mini" @click="editOk(row.id)">确定</el-button>
              <el-button size="mini" @click="row.isedit = false">取消</el-button>
            </template>
            <template v-else>
              <el-button type="text" size="mini" @click="assignpermission(row.id)">分配权限</el-button>
              <el-button type="text" size="mini" @click="edit(row)">编辑</el-button> <!--模版中可以嵌套模版,这里的意思是操作列,根据不同情况使用不同的模版内容如果编辑状态就显示编辑模版反之-->
              <el-popconfirm title="确定删除该角色吗?" @onConfirm="isdelete(row.id)">
                <el-button slot="reference" type="text" size="mini">删除</el-button> <!--通过slot reference指定触发弹层的元素,点击弹层的确定会触发onConfirm事件 -->
              </el-popconfirm>
            </template>
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
      <el-dialog title="分配权限" :visible.sync="showPermissionDialog">
        <el-tree
          ref="tree"
          :data="permissionList"
          :props="props"
          show-checkbox
          default-expand-all
          node-key="id"
          :default-checked-keys="permIds"
        /> <!--show-checkbox节点是否可勾选-->
        <el-row type="flex" justify="center">
          <el-col :span="6">
            <el-button type="primary" size="mini" @click="assignPermission">确定</el-button>
            <el-button size="mini" @click="showPermissionDialog = false">取消</el-button>
          </el-col>
        </el-row>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { getRoleList, addRole, updateRole, deleteRole, getRoleDetail } from '@/api/role'
import { getPermissionList, assignPermissionDot } from '@/api/permission'
import { transListToTreeData } from '@/utils/index'
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
      }, // 规则对象
      showPermissionDialog: false, // 是否展示分配权限弹层
      permissionList: [], // 权限点列表数据
      props: {
        label: 'name', // 使用节点的哪个字段的值作为节点显示的内容
        children: 'children' // 指定子节点字段
      }, // 节点树配置对象
      currentRoleId: '', // 当前要分配权限的角色Id
      permIds: [] // 角色权限点键值数组
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
      this.list.forEach(item => {
        this.$set(item, 'isedit', false) // 这里设置响应式属性,因为vue中对象手动添加的属性不具备响应式,故需要通过该方法添加属性
        this.$set(item, 'editrow', { name: item.name,
          state: item.state,
          description: item.description
        }) // 给每一个角色数据项添加一个缓存表单信息对象,编辑时的表单信息从该缓存对象的字段读取
      }) // 给角色对象数组中的每一个对象都添加编辑标记
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
    }, // 取消
    edit(row) {
      row.isedit = true // 将当前编程行的编辑状态改为true
      row.editrow.name = row.name
      row.editrow.state = row.state
      row.editrow.description = row.description // 点击编辑时重新给数据项的缓存对象赋值,值为最新获取的数据,目的是当编辑当一半点击取消再点击编辑时编辑表单的数据应该是请求的最新数据
    },
    async editOk(row) {
      if (row.editrow.name && row.editrow.description) {
        await updateRole({ ...row.editrow, id: row.id })
        this.$message.success('更新角色成功')
        Object.assign(row, { ...row.editrow, isedit: false }) /* 行内编辑思路,点击确定时先校验表单,name 和description字段必须输入通过后调用API
                                                               然后弹出成功提示框,最后让该行更新显示,并关闭编辑状态,更新显示需要通过Object.assign方法
                                                               否则eslint会报错,将通过assign方法将用eidtrow中的数据将row的状态覆盖 */
      } else {
        this.$message.warning('角色名称和描述不能为空')
      }
    },
    async isdelete(id) {
      await deleteRole(id) // 调用删除角色API
      this.$message.success('删除角色成功!')
      if (this.list.length === 1) {
        this.pageParams.page-- // 页码减1
      } // 如果删除的角色是该页的最后一个
      this.getrolelist() // 重新拉取角色数据
    },
    async assignpermission(id) {
      this.permissionList = transListToTreeData(await getPermissionList(), 0)
      const { permIds } = await getRoleDetail(id) // 该角色拥有的权限点键值数组
      this.permIds = permIds // 勾选该角色拥有的权限点
      this.currentRoleId = id // 记录当前要分配角色的Id
      this.showPermissionDialog = true
    }, // 分配权限
    async assignPermission() {
      await assignPermissionDot({ id: this.currentRoleId, permIds: this.$refs.tree.getCheckedKeys() })
      // el-tree组件实例的getCheckedKeys方法可以获得当前选中的所有树节点的键数组
      this.$message.success('权限分配成功')
      this.showPermissionDialog = false
    }
  }
}
</script>
<style scoped>
.role-operate {
 padding: 10px;
}

</style>
