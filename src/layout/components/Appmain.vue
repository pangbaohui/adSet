<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive>
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'Appmain',
  computed: {
    key () {
      return this.$route.path
    }
  }
}
</script>

<style lang="scss" scoped>
.app-main{
  width: 100%;
  height: 100%;
}
</style>
