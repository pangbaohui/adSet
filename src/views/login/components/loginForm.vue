<template>
<div class="login-form">
  <el-form ref="form" :model="form" label-width="60px">
    <el-form-item label="用户名">
      <el-input placeholder="请输入用户名" v-model="form.username"></el-input>
    </el-form-item>
    <el-form-item label="密码">
      <el-input placeholder="请输入密码" show-password v-model="form.password"></el-input>
    </el-form-item>
  </el-form>
  <div class="loginWrap">
    <button class="loginBtn" @click="onSubmit">登陆</button>
  </div>
</div>
</template>

<script>
export default {
  name: 'loginForm',
  data () {
    return {
      form: {
        username: 'user',
        password: 'user'
      }
    }
  },
  methods: {
    onSubmit () {
      const data = this.form
      this.$emit('login', data)
    }
  }
}
</script>

<style lang="scss" scoped>
label.el-form-item__label{
  color: white;
}
.login-form{
  padding: 0 15px;
}
.loginWrap{
  width: 100%;
  display: flex;
  justify-content: center;
}
.loginBtn{
  width: 100%;
  height: 38px;
  background-color: #ffb800;
  color: white;
  border: none;
  border-radius: 3px;
  outline: none;
  margin-top: 30px;
}
.loginBtn:active{
  background-color: #ffd979;
}
</style>
