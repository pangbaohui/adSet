<template>
  <div>
    <template v-for="item in menu">
      <!-- 最后一级菜单 -->
      <el-menu-item
        v-if="!item.children && !item.hidden"
        :key="item.path"
        :index="parent ? parent + '/' + item.path : item.path"
      >
        <i :class="item.meta.icon"></i>
        <span slot="title">{{ item.meta.title }}</span>
      </el-menu-item>

      <!-- 此菜单下还有子菜单 -->
      <el-submenu
        v-if="item.children && !item.hidden"
        :key="item.path"
        :index="parent ? parent + '/' + item.path : item.path"
      >
        <template slot="title">
          <i :class="item.meta.icon"></i>
          <span v-if="!isCollapse">{{ item.meta.title }}</span>
        </template>
        <!-- 递归 -->
        <sidebar-item
          :menu="item.children"
          :parent="parent ? parent + '/' + item.path : item.path"
        />
      </el-submenu>
    </template>
  </div>
</template>

<script>
export default {
  name: 'SidebarItem',
  props: ['menu', 'parent', 'isCollapse'],
  // props: {
  // route object
  // item: {
  //   type: Object,
  //   required: true
  // },
  // isNest: {
  //   type: Boolean,
  //   default: false
  // },
  // basePath: {
  //   type: String,
  //   default: ''
  // }
  // },
  data () {
    return {
      // active: ''
    }
  },
  methods: {
    menuItem (index) {
      console.log(index)
      this.$data.active = index
    }
  },
  mounted () {
    // this.menuItem('index')
  }
}
</script>

<style scoped>
  .title {
    color: #fff;
  }
</style>
