<template>
  <div class="container">
    <div class="app-container">
      <div class="left">
        <el-input v-model="queryParams.keyword" style="margin-bottom:10px" type="text" prefix-icon="el-icon-search" size="small" placeholder="输入员工姓名全员搜索" @input="vagueSearch" />
        <!-- 树形组件 -->
        <el-tree
          ref="Tree"
          :data="organization"
          :props="defaultprops"
          :highlight-current="true"
          default-expand-all
          :expand-on-click-node="false"
          node-key="id"
          @current-change="selectNode"
        /> <!--highlight-current选中项高亮 expand-on-click-node点击节点时节点不折叠-->
        <!--node-key 指定树节点使用哪个字段作为唯一的身份标识 -->
        <!--current-change事件会在切换节点时触发,这里会向selectNode这个方法传递两个形参(当前节点的数据，当前节点的 Node 对象)-->
      </div>
      <div class="right">
        <el-row class="opeate-tools" type="flex" justify="end">
          <el-button size="mini" type="primary">添加员工</el-button>
          <el-button size="mini" @click="showExcelDialog = true">excel导入</el-button>
          <el-button size="mini" @click="exportExcel">excel导出</el-button>
        </el-row>
        <!-- 表格组件 -->
        <el-table :data="employeeList">
          <el-table-column label="头像" width="80" align="center" prop="staffPhoto">
            <template #default="{ row }">
              <el-avatar v-if="row.staffPhoto" :src="row.staffPhoto" :size="30" />
              <span v-else class="username">{{ row.username.charAt(0) }}</span> <!--用头像用头像没有则用名字的第一个字-->
            </template>
          </el-table-column>
          <el-table-column label="姓名" prop="username" />
          <el-table-column label="手机号" prop="mobile" />
          <el-table-column label="工号" sortable prop="workNumber" />
          <el-table-column label="聘用形式" prop="formOfEmployment">
            <template #default="{row}">
              <span v-if="row.formOfEmployment === 1">正式</span>
              <span v-else-if="row.formOfEmployment === 2">非正式</span>
              <span v-else>无</span>
            </template>
          </el-table-column>
          <el-table-column label="部门" prop="departmentName" />
          <el-table-column label="入职时间" sortable prop="timeOfEntry" />
          <el-table-column width="280" label="操作">
            <template>
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button slot="reference" type="text" size="mini">删除</el-button>
            </template>
          </el-table-column>
        </el-table> <!--align:center表头文字居中 sortable该列可排序-->
        <!-- 分页 -->
        <el-row type="flex" style="height:60px" justify="end" align="middle">
          <el-pagination layout="total, prev, pager, next" :total="total" :page-size="queryParams.pagesize" :current-page="queryParams.page" @current-change="updatePage" />
        </el-row> <!--分页组件必须要配置total属性要不然不会显示-->
      </div>
    </div>
    <ImportExcel :show-excel-dialog.sync="showExcelDialog" @uploadsuccess="getemployeelist" />
  </div>
</template>

<script>
import { getDepartmentList } from '@/api/department.js' // 导入获取组织数据API
import { transListToTreeData } from '@/utils/index.js' // 导入转换树型数据API
import { getEmployeeList, exportEmployeeExcel } from '@/api/employee' // 获取员工数据API
import FileSaver from 'file-saver' // 导入下载Excel文件方法
import ImportExcel from './components/Import-Excel.vue'
export default {
  name: 'Employee',
  components: { ImportExcel },
  data() {
    return {
      organization: [], // 组织数据
      defaultprops: {
        label: 'name',
        children: 'children'
      },
      queryParams: {
        departmentId: '', // 部门id
        pagesize: 8, // 每页条数
        page: 1, // 当前页码
        keyword: ''
      }, // 获取员工查询参数对象
      employeeList: [], // 员工数组列表,
      total: null, // 员工数量
      showExcelDialog: false // 是否显示导入Excel弹框
    }
  },
  created() {
    this.getOrganizationData()
  },
  methods: {
    async getOrganizationData() {
      this.organization = transListToTreeData(await getDepartmentList(), 0) // 将线性组织数据转为树型数据
      this.queryParams.departmentId = this.organization[0].id // 获取第一个节点id并记录下来
      this.$nextTick(() => {
        this.$refs.Tree.setCurrentKey(this.queryParams.departmentId) // 通过setCurrentKey节点默认选中第一个节点
      }) // 因为数据渲染是异步的,所以需要等节点树渲染完毕,后再去选中节点

      // 此时第一个部门的Id已获取到params中去在这里发起请求而不是在methods中
      this.getemployeelist()
    },
    selectNode(node) {
      this.queryParams.departmentId = node.id
      this.queryParams.page = 1 // 当选中一个部门时默认获取该部门第一页的员工数据
      this.getemployeelist()
    }, // node为当前选中节点数据,当选择节点时自动记录节点id,记录节点id后再用该id发起请求获取该部门下的所有员工
    async  getemployeelist() {
      const { rows, total } = await getEmployeeList(this.queryParams)
      this.employeeList = rows
      this.total = total
    }, // 获取员工数据
    updatePage(newpage) {
      this.queryParams.page = newpage
      this.getemployeelist()
    }, // 当页码变化时改变查询的页面重新获取数据
    vagueSearch() {
      clearTimeout(this.timer) // 在单位时间内如果再次输入清除定时器
      this.timer = setTimeout(() => {
        this.queryParams.page = 1
        this.getemployeelist()
      }, 300)
    }, // 当输入框值改变时,页码改为1,重新获取数据,需要做防抖处理,这里需要注意要用箭头函数因为普通函数回调this指向window
    async exportExcel() {
      const res = await exportEmployeeExcel()
      FileSaver.saveAs(res, '员工信息表')
      // FileSaver.saveAs(blob对象,文件名),该方法用来将blob对象中的二进制文件写入一个文件,(这里指定名字为员工信息表)然后浏览器下载该文件
    } // 将员工数据导出为Excel表格
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  background: #fff;
  display: flex;
  .left {
    width: 280px;
    padding: 20px;
    border-right: 1px solid #eaeef4;
  }
  .right {
    flex: 1;
    padding: 20px;
    .opeate-tools {
      margin:10px ;
    }
    .username {
      height: 30px;
      width: 30px;
      line-height: 30px;
      text-align: center;
      border-radius: 50%;
      color: #fff;
      background: #04C9BE;
      font-size: 12px;
      display:inline-block;
    }
  }
}

</style>
