<template>
  <el-upload
    class="avatar-uploader"
    action=""
    :show-file-list="false"
    :before-upload="beforeAvatarUpload"
    :http-request="uploadImage"
  > <!--action指定文件的上传路径,当选择了文件后文件会立刻以http请求(post,multipart/form-data)的形式发向指定的链接-->
    <!--这里不需要自动上传因为我们要校验,不用自动上传不能去除action而是要给它赋空字符串-->
    <!--show-file-list是否展示文件列表,before-upload的事件处理函数会在我们现在文件后触发-->
    <!--当文件校验通过后会触发http-request属性绑定的方法,该方法的第一个参数.file就是上传的文件对象-->
    <img v-if="value" :src="value" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon" />
  </el-upload>
</template>

<script>
import COS from 'cos-js-sdk-v5' // 导入腾讯云储存桶包
export default {
  props: {
    value: {
      type: String,
      default: ''
    } // value为头像链接有就显示头像没有就显示+图标
  },
  methods: {
    beforeAvatarUpload(file) {
      const isJPG = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp'].includes(file.type) // 上传的文件要是这五种之一
      const isLt2M = file.size / 1024 / 1024 < 10 // file.size返回的是文件大小单位是B(字节)但我们这里需要的是字节所以除2次1024

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG,Png,Gif,Bmp格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 10MB!')
      }
      return isJPG && isLt2M
    }, // 该函数用来对上传的文件进行校验,返回true表示校验通过继续上传,false为校验失败停止上传
    uploadImage(res) {
      const file = res.file // 待上传的文件对象
      const cos = new COS({
        SecretId: process.env.VUE_APP_COS_SECRET_ID, // 储存桶标识
        SecretKey: process.env.VUE_APP_COS_SECRET_KEY // 储存桶秘钥
      })
      cos.putObject({
        Bucket: process.env.VUE_APP_COS_BUCKET, // 储存桶名称
        Region: process.env.VUE_APP_COS_REGION, // 储存桶地域
        Key: file.name, // 文件名
        StorageClass: 'STANDARD', // 固定写法
        Body: file // 文件对象
      }, (err, data) => {
        console.log(err, data)
        if (data.statusCode === 200 && data.Location) {
          this.$emit('input', 'http://' + data.Location) // 回传图片地址
        } else {
          this.$message.error(err.Message)
        }
      }) // data.statusCode响应状态码,data.Location为图片地址,这里需要响应成功并且有图片地址时才回传
    }
  }
}
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
