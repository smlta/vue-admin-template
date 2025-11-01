<template>
  <div class="login-container">
    <div class="logo" />
    <div class="form">
      <h1>登录</h1>
      <el-card shadow="never" class="login-card">
        <!--登录表单-->
        <!-- el-form > el-form-item > el-input -->
        <el-form ref="form" :model="loginform" :rules="rules">
          <el-form-item prop="mobile">
            <el-input v-model="loginform.mobile" placeholder="请输入手机号" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginform.password" placeholder="请输入密码" show-password />
          </el-form-item>
          <el-form-item prop="isAgree">
            <el-checkbox v-model="loginform.isAgree">用户平台使用协议</el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="width:300px;" @click="login">登录</el-button>
          </el-form-item>
          <el-button type="primary" @click="testAPI">测试接口</el-button>
        </el-form>
      </el-card>
    </div>
  </div>
</template>
<script>
import request from '@/utils/request'
export default {
  name: 'Login',
  data() {
    return {
      loginform: {
        mobile: '',
        password: '',
        isAgree: false,
        form: {} // 表单DOM
      }, // 登录表单对象
      rules: {
        mobile: [{
          required: true,
          message: '手机号必须输入',
          trigger: 'blur' // 校验时机
        },
        {
          pattern: /^1[3-9]\d{9}$/,
          message: '手机号格式不正确',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '密码未输入',
          trigger: 'blur'
        },
        {
          min: 6,
          max: 16,
          message: '密码长度应为6-16位',
          trigger: 'blur'
        }],
        isAgree: [
          {
            validator: (rule, value, callback) => {
              value ? callback() : callback(new Error('您必须勾选用户协议'))
              // callback()通过校验 callback(new Error)校验失败
            }
          }
        ]
      } // 规则对象,每一个属性都是一个待校验的数据,它是一个对象数组,数组中的每一个元素都是一个规则对象
    } // 在使用el进行数据校验时还得给el-items 绑定prop属性,值为要校验的数据名
  },
  methods: {
    login() {
      this.$refs.form.validate(isOk => {
        if (isOk) {
          this.$store.dispatch('user/login', this.loginform) // 调用登录Action,传递表单数据发起请求
        }
      }) // 获取表单DOM调用validate方法对所有表单项进行校验,validate可以传一个callback参数,如果校验通过callback 的isOk参数为true
    },
    async  testAPI() {
      const res = await request.post('/sys/login', { mobile: '13800000002', password: 'itHeiMa@20251101' })
      console.log(res)
    }
  }

}
</script>
<style lang="scss">
.login-container {
  display: flex;
  align-items: stretch;
  height: 100vh;
  .logo {
    flex: 3;
    background: rgba(38, 72, 176) url(../../assets/common/login_back.png)
      no-repeat center / cover;
    border-top-right-radius: 60px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    padding: 0 100px;
    .icon {
      background: url(../../assets/common/logo.png) no-repeat 70px center /
        contain;
      width: 300px;
      height: 50px;
      margin-bottom: 50px;
    }
    p {
      color: #fff;
      font-size: 18px;
      margin-top: 20px;
      width: 300px;
      text-align: center;
    }
  }
  .form {
    flex: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 176px;
    .el-card {
      border: none;
      padding: 0;
    }
    h1 {
      padding-left: 20px;
      font-size: 24px;
    }
    .el-input {
      width: 350px;
      height: 44px;
      .el-input__inner {
        background: #f4f5fb;
      }
    }
    .el-checkbox {
      color:#606266;
    }
  }
}
</style>
