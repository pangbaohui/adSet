<template>
    <div class="wrapper">
        <vdr v-for="(item, index) in divList" :key="item.color"  :parent="true" class="story"
          :w="item.width*(percentage/100)" :h="item.height*(percentage/100)" :x="item.x*(percentage/100)" :y="item.y*(percentage/100)" v-on:dragging="onDrag" v-on:resizing="onResize" :snap="true"
             :snap-tolerance="20" @refLineParams="getRefLineParams" @activated="onActivated(item, item.index)"
             @deactivated="onDeactivated" :style="{'background-color': item.color}" >
          <i class="el-icon-close close" @click="removeDiv(item, index)"></i>
          {{item.label}}
        </vdr>
        <span class="ref-line v-line"
              v-for="item in vLine"
              v-show="item.display"
              :style="{ left: item.position, top: item.origin, height: item.lineLength}"
        />
        <span class="ref-line h-line"
              v-for="item in hLine"
              v-show="item.display"
              :style="{ top: item.position, left: item.origin, width: item.lineLength}"
        />
    </div>
</template>

<script>
import vdr from 'vue-draggable-resizable-gorkys'
import 'vue-draggable-resizable-gorkys/dist/VueDraggableResizable.css'
import tpApi from '../template'
class Adjust {
  constructor (data) {
    this.data = data
  }

  get list () {
    let list = []
    this.data.filter((item, index) => {
      let obj = {}
      obj.width = item.systemWidth
      obj.height = item.systemHeight
      obj.x = item.systemXPosition
      obj.y = item.systemYPosition
      obj.color = item.systemBackground
      obj.label = '视 图' + (index + 1)
      obj.index = index + 1
      list.push(obj)
    })
    return list
  }
}
export default {
  name: 'Story',
  components: { vdr },
  props: {
    percentage: Number || String
  },
  data: function () {
    return {
      active: false,
      currentDiv: {},
      vLine: [],
      hLine: [],
      divList: []
    }
  },
  methods: {
    // 回显div
    setEditDiv (list) {
      let div = []
      div = new Adjust(list).list
      this.divList = []
      setTimeout(() => {
        this.divList = div
        this.$emit('setModuleList', this.divList)
      }, 500)
    },
    // 新增div
    creteDiv () {
      const color = tpApi.getRandomColor()
      const num = this.divList.length > 0 ? this.divList[this.divList.length - 1].index : 0
      const newDiv = {
        index: num + 1,
        label: '视 图' + (num + 1),
        width: 100,
        height: 100,
        x: 0,
        y: 0,
        color
      }
      this.divList.push(newDiv)
      this.$emit('setModuleList', this.divList)
    },
    // 大小变化
    onResize (x, y, width, height) {
      const div = this.currentDiv
      const percentage = (this.percentage / 100)
      div.x = x / percentage
      div.y = y / percentage
      div.width = width / percentage
      div.height = height / percentage
      this.$emit('currentDiv', div)
    },
    // 拖動
    onDrag (x, y) {
      const percentage = (this.percentage / 100)
      const div = this.currentDiv
      div.x = x / percentage
      div.y = y / percentage
      this.$emit('currentDiv', div)
    },
    // 輔助綫
    getRefLineParams (params) {
      const { vLine, hLine } = params
      this.vLine = vLine
      this.hLine = hLine
    },
    // 激活
    onActivated (item, index) {
      this.currentDiv = item
      this.active = true
      this.$emit('currentDiv', item)
    },
    // 取消激活
    onDeactivated () {
      this.currentDiv = {}
      this.active = false
      this.$emit('currentDiv', this.currentDiv)
    },
    // 移除DIV
    removeDiv (item, index) {
      this.divList.splice(index, 1)
      this.currentDiv = {}
      this.$emit('setModuleList', this.divList)
      this.$emit('currentDiv', this.currentDiv)
    },
    // 刷新DIV
    refreshDiv (list) {
      let div = []
      list.filter((item) => {
        item.width = parseInt(item.width.toString())
        item.height = parseInt(item.height.toString())
        item.x = parseInt(item.x.toString())
        item.y = parseInt(item.y.toString())
        div.push(item)
      })
      this.divList = []
      setTimeout(() => {
        this.divList = div
      }, 500)
    },
    // 清除Div
    clearDiv () {
      this.divList = []
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper{
  width: 100%;
  height: 100%;
}
.story{
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}
.close{
  position: fixed;
  top: 0;
  right: 0;
}
</style>
