<template>
    <div class="wrapper">
      <div class="left">
        <show-model ref="model" :limitW = '720' :limitH = '600' ></show-model>
      </div>
      <div class="right">
        <nesting-tree :postData="treePostData" :treeType="'model'" @submit="selectModel"></nesting-tree>
      </div>
    </div>
</template>

<script>
import ShowModel from './ShowModel'
import NestingTree from '@/components/nesting-tree/NestingTree.vue'
import playApi from '../../play'
export default {
  name: 'SelectModel',
  components: { ShowModel, NestingTree },
  data () {
    return {
      treePostData: {}
    }
  },
  methods: {
    getTree () {
      const postData = {
        data: {
          requestType: 1,
          machineTemplateTypeId: 1
        },
        method: 'listByUser'
      }
      playApi.getModelTree(postData).then(res => {
        console.log(res)
        this.treePostData = res.data
      })
    },
    selectModel (data) {
      this.$emit('submit', data)
    },
    setModelData () {
      this.$refs.model.setModelDiv()
    },
    clearPageVal () {
      this.treePostData = {}
      this.$refs.model.init()
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper{
  width: 100%;
  display: inline-block;
  %lr{
    box-sizing: border-box;
  }
  .left{
    @extend %lr;
    float: left;
    width: 75%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .right{
    @extend %lr;
    float: right;
    width: 23%;
  }
}
</style>
