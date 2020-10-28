<template>
  <div class="Echarts">
    <dynamic class="item"></dynamic>
    <mix-line-bar class="item"></mix-line-bar>
    <share-dataset class="item"></share-dataset>
  </div>
</template>

<script>
import Dynamic from './chart/Dynamic'
import MixLineBar from './chart/MixLineBar'
import ShareDataset from './chart/ShareDataset'
export default {
  name: 'MapChart',
  components: {
    ShareDataset,
    Dynamic,
    MixLineBar
  },
  data () {
    return {
    }
  }
}
</script>
<style lang="scss" scoped>
  .Echarts{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    background-color: #fff;
    overflow-x: hidden;
    overflow-y: auto;
  }
  .item{
    margin: 50px 0;
  }
  .Echarts::-webkit-scrollbar{/*滚动条整体样式*/
    width:4px;/*高宽分别对应横竖滚动条的尺寸*/
    height:4px;
  }
  .Echarts::-webkit-scrollbar-thumb{/*滚动条里面小方块*/
    border-radius:5px;
    -webkit-box-shadow:inset 0 0 5px rgba(0, 0, 0, 0.1);
    background:rgba(0,0,0,0.1);
  }
  .Echarts::-webkit-scrollbar-track{/*滚动条里面轨道*/
    -webkit-box-shadow:inset 0 0 5px rgba(0, 0, 0, 0);
    border-radius:0;
    background: rgba(0, 0, 0, 0);
  }
</style>
