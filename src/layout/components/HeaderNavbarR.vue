<template>
    <div>
      <div class="right-menu-item">
        <svg-icon :icon-class="isFullscreen?'exit-fullscreen':'fullscreen'" @click='clickFullscreen'></svg-icon>
      </div>
      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <svg-icon icon-class="login-head" style="font-size: 40px;color: #a7ca6d" ></svg-icon>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="logout">
            <span style="display:block;">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
</template>

<script>
import screenfull from 'screenfull'
export default {
  name: 'HeaderNavbar',
  components: {
    // ScreenFull
  },
  data () {
    return {
      isFullscreen: false
    }
  },
  mounted () {
    this.init()
  },
  beforeDestroy () {
    this.destroy()
  },
  methods: {
    clickFullscreen () {
      if (!screenfull.isEnabled) {
        this.$message({
          message: 'you browser can not work',
          type: 'warning'
        })
        return false
      }
      screenfull.toggle()
      this.isFullscreen = !this.isFullscreen
    },
    change () {
      this.isFullscreen = screenfull.isFullscreen
    },
    init () {
      if (screenfull.enabled) {
        screenfull.on('change', this.change)
      }
    },
    destroy () {
      if (screenfull.enabled) {
        screenfull.off('change', this.change)
      }
    },
    logout () {
      this.$store.dispatch('user/logout').then(() => {
        this.$router.push('/login')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .right-menu-item {
    display: inline-block;
    padding: 0 8px;
    height: 100%;
    font-size: 20px;
    color: #cbcac2;
    vertical-align: text-bottom;

    &.hover-effect {
      cursor: pointer;
      transition: background .3s;

      &:hover {
        background: rgba(0, 0, 0, .025)
      }
    }
  }
</style>
