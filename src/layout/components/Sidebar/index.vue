<template>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="$route.path"
        :collapse="isCollapse"
        :unique-opened="false"
        :collapse-transition="false"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        router
        mode = 'vertical'
        :active-text-color="variables.menuActiveText">
        <SidebarItem :isCollapse="isCollapse" :menu="getrouters"></SidebarItem>
      </el-menu>
    </el-scrollbar>
</template>
<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 220px;
    min-height: 400px;
  }
</style>
<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'
export default {
  name: 'index',
  data () {
    return {
      R: this.$router.options.routes
    }
  },
  props: {
    isCollapse: Boolean
  },
  components: {
    SidebarItem
  },
  computed: {
    ...mapGetters([
      'getrouters',
      'sidebar'
    ]),
    // isCollapse () {
    //   return !this.sidebar.opened
    // },
    variables () {
      return variables
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-menu{
    border: 0;
  }
 .el-header {
 }
</style>
