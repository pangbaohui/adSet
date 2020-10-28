<template>
  <el-container>
    <el-aside :width="!isCollapse? '220px':'65px'">
      <sidebar :isCollapse="isCollapse"></sidebar>
    </el-aside>
    <el-container>
      <el-header>
        <div><svg-icon style="font-size: 30px" @click="collapse" :icon-class="isCollapse ? 'hamburger-open' : 'hamburger-close'"></svg-icon></div>
        <header-navbar-r></header-navbar-r>
      </el-header>
      <el-main>
        <app-main></app-main>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Sidebar from './components/Sidebar/index.vue'
import AppMain from './components/Appmain'
import HeaderNavbarR from './components/HeaderNavbarR'
import { mapState } from 'vuex'
export default {
  name: 'index',
  data () {
    return {
      isCollapse: false
    }
  },
  methods: {
    collapse () {
      this.isCollapse = !this.isCollapse
    }
  },
  components: {
    Sidebar,
    AppMain,
    HeaderNavbarR
  },
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar
    })
  }
}
</script>

<style lang="scss" scoped>
  .el-header {
    background-color: #fff;
    color: #333;
    text-align: center;
    line-height: 60px;
    display: flex;
    justify-content: space-between;
  }

  .el-aside {
    background-color: #545c64;
    overflow-y: hidden;
  }

  .el-main {
    height: 100%;
    width: 100%;
    background-color: #eef0f3;
    color: #333;
    padding: 10px;
    min-width: 1100px;
  }

  .el-container {
    height: 100%;
  }
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
