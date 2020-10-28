<template>
    <div></div>
</template>

<script>
export default {
  name: 'index',
  created () {
    // 重定向
    const { params, query } = this.$router
    console.log(this.$router)
    const { path } = params
    this.$router.replace({ path: '/' + path, query })
  },
  render: function (h) {
    return h()
  }
}
</script>

<style scoped>

</style>
