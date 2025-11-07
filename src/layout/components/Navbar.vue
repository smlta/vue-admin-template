<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img v-if="avatar" :src="avatar" class="user-avatar">
          <span v-else class="username">{{ name?.charAt(0) }}</span>
          <span class="name">{{ name }}</span>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>
              首页
            </el-dropdown-item>
          </router-link>
          <a target="_blank" href="https://github.com/smlta/vue-admin-template">
            <el-dropdown-item>项目地址</el-dropdown-item>
          </a>
          <a target="_blank" @click.prevent="alterPassword">
            <el-dropdown-item>修改密码</el-dropdown-item>
          </a>
          <el-dropdown-item @click.native="logout">
            <span style="display:block;">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-dialog title="修改密码" width="500px" :visible.sync="showDialog" append-to-body @close="cancel"> <!--监听dialog的close自定义事件该事件会在点击x时触发-->
      <el-form ref="form" label-width="120px" :model="passwordForm" :rules="rules"> <!--label-width为表单项宽度即item的宽度 label为item前面的文字-->
        <el-form-item label="旧密码" prop="oldPassword">
          <el-input v-model="passwordForm.oldPassword" show-password size="small" />
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="passwordForm.newPassword" show-password size="small" />
        </el-form-item>
        <el-form-item label="重复密码" prop="confirmPassword">
          <el-input v-model="passwordForm.confirmPassword" show-password size="small" />
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="primary" @click="isOk">确认</el-button>
          <el-button size="mini" @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import { alterPassword } from '@/api/user' // 导入修改密码接口
export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    return {
      showDialog: false,
      passwordForm: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      }, // 密码表单对象
      rules: {
        oldPassword: [{
          required: true,
          message: '旧密码必须输入',
          trigger: 'blur'
        }],
        newPassword: [{
          required: true,
          message: '新密码必须输入',
          trigger: 'blur'
        },
        {
          min: 6,
          max: 16,
          message: '新密码长度需在6-16位',
          trigger: 'blur'
        }
        ],
        confirmPassword: [
          {
            required: true,
            message: '重复密码必须输入',
            trigger: 'blur'
          },
          { trigger: 'blur',
            validator: (rules, value, callback) => {
              if (value !== this.passwordForm.newPassword) {
                callback(new Error('两次密码不一致'))
              } else {
                callback()
              }
            } // 校验函数rules为校验规则对象,value为当前要校验字段的值(confirmPassword),callback回调,callback()为校验通过,callback(new Error())为校验失败
          } // 在el-form的校验函数中this指向被校验字段的相关信息对象,所以要用箭头函数
        ]
      }, // 规则对象
      form: null // 表单DOM
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'name'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push('/login')
    },
    alterPassword() {
      this.showDialog = true
    },
    isOk() {
      this.$refs.form.validate(async isok => {
        if (isok) {
          await alterPassword(this.passwordForm)
          this.$message.success('修改密码成功')
          this.cancel()
        } // 如果校验通过
      }) // 点击确定先对表单进行一次整体校验
    },
    cancel() {
      this.$refs.form.resetFields() // 重置表单状态
      this.showDialog = false // 关闭dialog
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        display: flex;
        align-items: center;

        .user-avatar {
          cursor: pointer;
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }
        .name {
          font-size: 16px;
          margin-right: 10px;
        }
        .username {
          width: 30px;
          height: 30px;
          background: #04c9be;
          border-radius: 50%;
          line-height: 30px;
          color: #fff;
          text-align: center;
          margin-right: 4px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
