<template>
  <div class="login">
    <div class="login_box">
      <div class="avatar_box">
        <img src="../assets/logo.png" alt="">
      </div>
      <el-form :rules="rules" :model="loginForm" ref="loginForm" label-width="0px" class="login_form">
        <el-form-item prop="account">
          <el-input prefix-icon="el-icon-user" v-model="loginForm.account"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input prefix-icon="el-icon-key" v-model="loginForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="login('loginForm')">登录</el-button>
          <el-button type="info" @click="restLoginForm('loginForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        account: 'admin',
        password: '123456'
      },
      rules: {
        account: [
          {
            required: true,
            message: '请输入账号',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 10,
            message: '长度在 3 到 10 个字符',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 10,
            message: '长度在 3 到 10 个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    restLoginForm (formName) {
      this.account = ''
      this.password = ''
      this.$refs[formName].resetFields()
    },
    login (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http({
            url: '/auth/token',
            method: 'post',
            params: this.loginForm
          }).then(res => {
            window.sessionStorage.setItem('token', res.data.data.token)
            this.$router.push('/home')
            this.$message.success(res.data.msg)
          }).catch(res => {
            if (res.code !== 200) {
              this.$message.error(res.message)
            }
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="less">

.login {
  height: 100%;
  background-color: #2b4b6b;
  width: 100%;
}

.login_box {
  width: 450px;
  height: 300px;
  background-color: #ffffff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.avatar_box {
  height: 130px;
  width: 130px;
  border: 1px solid #eeeeee;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #dddddd;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ffffff;

  img {
    height: 100%;
    width: 100%;
    border-radius: 50%;
    background-color: #eeee;
  }
}

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.btns {
  display: flex;
  justify-content: flex-end;
}

</style>
