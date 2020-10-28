<template>
  <div>
<!--    <el-button  size="mini" class="items"><i class="el-icon-circle-plus-outline"></i> 刷新</el-button>-->
<!--    <el-divider direction="vertical"></el-divider>-->
    <el-dropdown>
      <el-button class="items" size="mini" placement="bottom-end"><i class="el-icon-circle-plus-outline"></i> 添加<i class="el-icon-arrow-down el-icon--right"></i></el-button>
      <el-dropdown-menu slot="dropdown" hide-on-click>
        <el-dropdown-item v-for="(item, index) in addBtn" :key="index" :icon= item.icon  @click.native="setStatus(item)">{{item.label}}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: 'TitleBtn',
  props: {
    addBtn: { type: Array, require: true }
  },
  inject: {
    proObj: {
      default: () => {}
    }
  },
  data () {
    return {
    }
  },
  methods: {
    setStatus (data) {
      if (this.proObj.materialTypeId !== '') {
        this.$emit('openMask', data)
      } else {
        this.$message.warning('请先选择素材目录')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  %btn{
    color: white;
    padding: 5px 20px;
    border-radius: 3px;
    font-weight: 600;
    cursor: pointer;
    font-size: 15px;
    outline: none;
    background-color: #a7ca6d;
  }
  %btn:active{
    opacity: 0.5;
  }
  button.items {
    @extend %btn;
    font-size: 15px;
    border: none;
    outline: none;
  }
</style>
