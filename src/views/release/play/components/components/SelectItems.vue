<template>
  <div class="wrapper">
    <div class="left">
      <items-table ref="itemstable" :tableType = "tableType"></items-table>
    </div>
    <div class="right">
      <nesting-tree :postData="treePostData" :treeType="'items'" @submit="selectItem"></nesting-tree>
    </div>
  </div>
</template>

<script>
import NestingTree from '@/components/nesting-tree/NestingTree.vue'
import ItemsTable from './ItemsTable'
import playApi from '../../play'
export default {
  name: 'SelectItems',
  components: { ItemsTable, NestingTree },
  data () {
    return {
      treePostData: {},
      tableType: 0
    }
  },
  methods: {
    getTree () {
      const postData = {
        data: {
          requestType: 1
        },
        method: 'listByUser'
      }
      playApi.getItemTree(postData).then(res => {
        console.log(res)
        this.treePostData = res.data
      })
    },
    selectItem (data) {
      this.tableType = data.id
      this.$emit('findAllItem', data)
    },
    setItemsList () {
      this.$refs.itemstable.setTableData()
    },
    // 回显已选的选项
    echoSelectedTableOptions () {
      this.$refs.itemstable.clearSelection()
      this.$refs.itemstable.showOption()
    }
  },
  mounted () {

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
    width: 70%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .right{
  @extend %lr;
    float: right;
    width: 30%;
  }
}
</style>
