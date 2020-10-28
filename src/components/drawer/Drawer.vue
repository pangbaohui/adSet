<template>
    <div class="drawer-side" :class="drawerClass ? 'drawer-side-t-w':''">
      <div class="drawer-top">
        <div class="drawer-title">{{title}}</div>
      </div>
      <div class="drawer-tg-btn">
        <div  @click="leanRight"><svg-icon :icon-class="drawerClass?'drawer': 'fork'"></svg-icon></div>
      </div>
      <div class="drawer-tree-wrapper">
        <drawer-tree ref="tree"></drawer-tree>
      </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import DrawerTree from './DrawerTree'
import tree from './tree'
export default {
  name: 'Drawer',
  components: {
    DrawerTree
  },
  inject: {
    proObj: {
      default: () => {}
    }
  },
  data () {
    return {
      title: '',
      drawerClass: false,
      currentDrawer: ''
    }
  },
  computed: {
    ...mapState({
      sourceDrawerClass: state => state.app.sourceDrawerClass,
      templateDrawerClass: state => state.app.templateDrawerClass,
      playDrawerClass: state => state.app.playDrawerClass,
      terminalDrawerClass: state => state.app.terminalDrawerClass
    })
  },
  methods: {
    leanRight () {
      const pageName = this.$route.path.split('/')[2]
      const x = `${pageName}DrawerClass`
      const val = !this[x]
      const storeX = `app/${pageName.toUpperCase()}_DRAWER_CLASS`
      this.currentDrawer = x
      this.$store.commit(storeX, val)
      this.drawerClass = val
    }
  },
  mounted () {
    this.leanRight()
    setTimeout(() => {
      if (this.proObj) {
        this.title = new tree.FileTree(this.proObj.treeData, this.proObj.treeType).firstList[0].label
      }
    }, 1000)
  },
  destroyed () {
    this.drawerClass = false
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/drawer";
.drawer-top{
  height: 50px;
  box-shadow:  0 1px 3px #c5c5c5;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  background-color: #a7ca6d;
  color: white;
}
.drawer-tg-btn{
  position: fixed;
  top: 35%;
  margin-left: -50px;
}
/*抽屉图标样式*/
.drawer-tg-btn > div{
  width: 50px;
  height: 50px;
  font-size: 30px;
  line-height: 50px;
  text-align: center;
  border: none;
  outline: none;
  background-color: #a7ca6d;
  color: white;
  box-shadow: 0 0 3px #96b662;
  border-radius: 10px 0 0 10px;
}
.drawer-title{
  height: 22px;
  font-weight: bold;
  overflow: hidden;
  margin-left: 10px;
  margin-bottom: 10px;
  font-size: 15px;
}
.drawer-tree-wrapper{
  padding: 10px 20px;
}
</style>
