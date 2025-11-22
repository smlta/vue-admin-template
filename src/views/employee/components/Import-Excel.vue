<template>
  <el-dialog
    width="500px"
    title="员工导入"
    :visible="showExcelDialog"
    @close="$emit('update:showExcelDialog', false)"
  > <!-- 通过showExcelDialog控制弹层的显示和隐藏,点击关闭时通过emit让父组件把值该为false-->
    <el-row type="flex" justify="center">
      <div class="upload-excel">
        <input
          ref="excel-upload-input"
          class="excel-upload-input"
          type="file"
          accept=".xlsx, .xls"
          @change="fileChange"
        > <!-- file类型的input它的change事件会在选择文件时触发,事件对象.target.files中保存着文件对象 -->
        <div class="drop">
          <i class="el-icon-upload" />
          <el-button type="text" @click="downloadTemplate">下载导入模板</el-button>
          <span>将文件拖到此处或
            <el-button type="text" @click="upload">点击上传</el-button>
          </span>
        </div>
      </div>
    </el-row>
    <el-row type="flex" justify="end">
      <!-- update:props属性名，值 直接修改 .sync修饰符的属性值 -->
      <el-button size="mini" type="primary" @click="$emit('update:showExcelDialog', false)">取消</el-button> <!--点击取消关闭弹层-->
    </el-row>
  </el-dialog>
</template>
<script>
import { DownLoadExcel, upLoadExcel } from '@/api/employee' // 导入下载Excel模版接口
import FileSaver from 'file-saver' // 导入下载工具包
export default {
  props: {
    showExcelDialog: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    async downloadTemplate() {
      const res = await DownLoadExcel()
      FileSaver.saveAs(res, '员工Excel模版')
    }, // 下载Excel模版方法
    upload() {
      this.$refs['excel-upload-input'].click()
    }, // 点击"上传文件时",触发文件选择器,获取input Dom后调用click方法即可实现
    async fileChange(event) {
      const filelist = event.target.files // 获取上传的文件数组
      if (filelist.length > 0) {
        const file = filelist[0] // 获取上传的文件对象
        const data = new FormData() // 创建FormData对象封装文件对象
        data.append('file', file) // 将文件对象封装进Formdata表单的file字段
        try {
          await upLoadExcel(data)
          this.$emit('uploadsuccess') // 触发上传成功事件,让父组件重新拉取数据
          this.$emit('update:showExcelDialog', false) // 关闭弹层
        } catch (error) {
          console.log(error)
        } finally {
          this.$refs['excel-upload-input'].value = '' // 清空文件选择器
        }
      }
    } // 文件已选择开始调用接口上传Excel
  }
}
</script>

<style scoped lang="scss">
    .upload-excel {
      display: flex;
      justify-content: center;
      margin: 20px;
      width: 360px;
      height: 180px;
      align-items: center;
      color: #697086;
      .excel-upload-input {
        display: none;
        z-index: -9999;
      }
      .btn-upload,
      .drop {
        border: 1px dashed #dcdfe6;
        width: 100%;
        height: 100%;
        text-align: center;
        line-height: 160px;
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
      .drop {
        line-height: 40px;
        color: #bbb;
        i {
          font-size: 60px;
          display: block;
          color: #c0c4cc;
        }
      }
    }
</style>
