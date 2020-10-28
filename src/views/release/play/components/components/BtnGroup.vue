<template>
    <div class="wrapper">
      <el-button :disabled="$attrs.regionId === ''? true : false" class="items" @click="add"><i class="el-icon-circle-plus-outline"></i>新增</el-button>
      <el-divider direction="vertical"></el-divider>
      <el-button :disabled="!$attrs.allowReleaseVal" class="items" @click="release"><i class="el-icon-position"></i>发布</el-button>
      <el-divider direction="vertical"></el-divider>
      <el-button :disabled="!$attrs.allowReleaseVal" class="items" @click="defaultSet"><i class="el-icon-star-off"></i>设置默认</el-button>
    </div>
</template>

<script>
export default {
  name: 'BtnGroup',
  inject: {
    proObj: {
      default: () => {}
    }
  },
  methods: {
    add () {
      this.$emit('add-play-ope')
    },
    release () {
      this.$emit('release')
    },
    defaultSet () {
      this.$emit('defaultSet')
    }
  }
}
</script>

<style lang="scss" scoped>
  %btn{
    color: white;
    padding: 4px 15px;
    border-radius: 3px;
    font-weight: 600;
    cursor: pointer;
    background-color: #a7ca6d;
  }
  %btn:active{
    opacity: 0.5;
  }
  .wrapper{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    button.items {
      @extend %btn;
      font-size: 15px;
      border: none;
      outline: none;
    }
  }

.green{
  @extend %btn;
  background-color: #8cbfb0;
}
.red{
  @extend %btn;
  background-color: #f0ae00;
}
.h{
  @extend %btn;
  background-color: #a7ca6d;
}
</style>
