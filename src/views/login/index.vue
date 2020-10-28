<template>
    <div class="login-wrapper">
      <div class="login-form-wrapper">
        <login-form @login="submit"></login-form>
      </div>
    </div>
</template>

<script>
import LoginForm from './components/loginForm'
export default {
  name: 'index',
  components: {
    LoginForm
  },
  methods: {
    submit (e) {
      const postData = {
        method: 'login',
        data: {
          userName: e.username,
          userPass: e.password
        }
      }
      this.$store.dispatch('user/login', postData).then(() => {
        this.$router.push({ path: '/' })
        this.$store.dispatch('getRegionCode')
      }).catch((err) => {
        this.$message.error(err)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login-wrapper{
  width: 100%;
  height: 100vh;
  display: flex;
}
.login-form-wrapper{
  margin: auto;
  width: 300px;
  height: 280px;
  padding: 70px 10px 0 10px;
  /*background-color: #7a7a7a;*/
  /*border: 1px solid #7a7a7a;*/
  box-shadow: 0 0 10px #7a7a7a;;
  border-radius: 3px;
}
</style>
