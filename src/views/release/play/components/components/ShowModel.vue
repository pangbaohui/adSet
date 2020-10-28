<template>
    <div :style="{width:floorW+ 'px', height:floorH + 'px'}"> {{modelName}}
      <vdr v-for="(item) in divList" :key="item.color"  :parent="true" class="story"
           :w="item.width*percentage" :h="item.height*percentage" :x="item.x*percentage" :y="item.y*percentage" :snap="true"
           :snap-tolerance="20"  @activated="onActivated(item, item.index)"  :draggable="false" :resizable="false"
           @deactivated="onDeactivated" :style="{'background-color': item.color}" >
        {{item.label}}
      </vdr>
    </div>
</template>

<script>
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
      obj.label = '视图' + (index + 1)
      obj.index = index + 1
      list.push(obj)
    })
    return list
  }
}
export default {
  inject: {
    model: {
      default: () => {}
    }
  },
  name: 'ShowModel',
  props: {
    limitW: Number,
    limitH: Number
  },
  data () {
    return {
      floorW: 0,
      floorH: 0,
      percentage: 0,
      currentDiv: {},
      divList: [],
      modelName: ''
    }
  },
  methods: {
    // 回显div
    setEditDiv (data) {
      let p = 0
      let d = 0
      p = (this.limitW / data.systemTemplateWidth).toFixed(2)
      d = (this.limitH / data.systemTemplateHeight).toFixed(2)
      this.percentage = p > d ? d : p
      this.floorW = data.systemTemplateWidth * this.percentage
      this.floorH = data.systemTemplateHeight * this.percentage
      this.modelName = data.systemTemplateName
      const list = data.systemTemplateDetails
      let div = []
      div = new Adjust(list).list
      this.divList = []
      setTimeout(() => {
        this.divList = div
      }, 500)
    },
    // 激活
    onActivated (item, index) {
      this.currentDiv = item
      // console.log(item.label)
      // this.$emit('currentDiv', item)
    },
    // 取消激活
    onDeactivated () {
      this.currentDiv = {}
      // this.$emit('currentDiv', this.currentDiv)
    },
    setModelDiv () {
      if (this.model.modelData) {
        this.setEditDiv(this.model.modelData)
      }
    },
    init () {
      this.floorW = 0
      this.floorH = 0
      this.percentage = 0
      this.currentDiv = {}
      this.divList = []
      this.modelName = ''
    }
  }
}
</script>

<style lang="scss" scoped>
  .story{
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
