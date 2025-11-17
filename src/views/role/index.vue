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
      <el-dialog title="新增角色" :visible.sync="showdialog" width="500px"> <!--点击关闭时会触发dialog组件的update:visible事件,并向父级传递事件参数值为false-->
        <el-form label-width="120px">
          <el-form-item label="角色名称">
            <el-input style="width:300px" size="mini" /></el-form-item>
          <el-form-item label="启用">
            <el-switch />
          </el-form-item>
          <el-form-item label="角色描述">
            <el-input type="textarea" style="width:300px" size="mini" :rows="3" />
          </el-form-item>
          <el-form-item>
            <el-row type="flex" justify="center">
              <el-col :span="12">
                <el-button type="primary" size="mini">确定</el-button>
                <el-button size="mini">取消</el-button>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { getRoleList } from '@/api/role'
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
      showdialog: false // 是否显示弹层
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
    } // page为当前切换到的页码
  }
}
</script>
<style scoped>
.role-operate {
 padding: 10px;
}

</style>
