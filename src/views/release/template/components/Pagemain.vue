<template>
  <div class="drawer-page-main" :class="templateDrawerClass ? 'drawer-page-main-t-w':''">
    <div class="page-main-title"><div>模板管理<span v-if="templateName">------{{templateName}}</span></div></div>
    <div class="template-ope">
      <div class="template-info">
        <template-info ref="tpinfo" @set-floor='setFloor' :templateName="templateName"></template-info>
      </div>
      <div>
        <el-button class="save-btn" v-if="!isEdit" @click="submit"> <i class="el-icon-finished"></i>保存</el-button>
        <el-button class="save-btn" v-else @click="update"> <i class="el-icon-finished"></i>更新</el-button>
      </div>
    </div>
    <div class="template-ope">
      <div class="template-right">
        <el-form size="small" :inline="true" :model="form">
          <el-form-item label="当前模板：">
            <el-input v-model="form.mode" :disabled = true style="width: 200px"></el-input>
          </el-form-item>
          <el-form-item label="比例：">
            <div class="template-percentage">
              <el-slider @change="changePer" v-model="percentage" :format-tooltip="formatTooltip" :min="30" :step="10"></el-slider>
            </div>
          </el-form-item>
        </el-form>
        <div class="div-model" draggable="true" @ondragstart="drag($event)"></div>
      </div>
    </div>
    <div class="model-info">W: <span>{{Math.round(currentDiv.width)}}px</span>  H: <span>{{Math.round(currentDiv.height)}}px</span>
    X:  <span>{{Math.round(currentDiv.x)}} </span> Y:  <span>{{Math.round(currentDiv.y)}}</span>
  </div>
    <div class="main-bottom">
      <div class="story-wrapper" :style="{width:floorW + 'px', height:floorH + 'px'}" @drop="drop($event)" @dragover="allowDrop($event)">
        <story ref="story" @setModuleList="setModuleList" @currentDiv="setCurrentDiv" :percentage = "percentage"></story>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Story from './Story'
import TemplateInfo from './Template-Info'
export default {
  name: 'Pagemain',
  computed: {
    ...mapState({
      templateDrawerClass: state => state.app.templateDrawerClass
    })
  },
  inject: {
    proObj: {
      default: () => {}
    }
  },
  props: {
    templateName: String
  },
  watch: {
    templateName: {
      handler (n, o) {
        if (this.proObj.templateContent) {
          let editData = this.proObj.templateContent
          this.isEdit = true
          this.$refs.tpinfo.setEditFloor(editData.machineTemplateTypeDetailId)
          this.$refs.story.setEditDiv(editData.systemTemplateDetails)
        } else {
          this.init()
        }
        if (n !== o) {
          this.$refs.story.clearDiv()
        }
      },
      deep: true
    }
  },
  components: { Story, TemplateInfo },
  data: function () {
    return {
      isEdit: false,
      percentage: 50,
      currentFloorModel: {},
      floorW: 0,
      floorH: 0,
      currentDiv: {},
      form: {
        mode: ''
      },
      currentModuleList: []
    }
  },
  methods: {
    init () {
      this.isEdit = false
      this.$refs.tpinfo.setEditFloor('')
      this.floorW = 0
      this.floorH = 0
      this.currentModuleList = []
      this.percentage = 50
      this.currentFloorModel = {}
    },
    formatTooltip (val) {
      return val / 100
    },
    setModuleList (list) {
      this.currentModuleList = list
    },
    setCurrentDiv (div) {
      this.currentDiv = div
      // this.form.mode = div.index
      this.form.mode = div.label
    },
    changePer () {
      const percentage = this.percentage / 100
      this.floorW = this.currentFloorModel.templateWidth * percentage
      this.floorH = this.currentFloorModel.templateHeight * percentage
      this.$refs.story.refreshDiv(this.currentModuleList)
    },
    setFloor (data) {
      this.currentFloorModel = data
      const percentage = this.percentage / 100
      this.floorW = data.templateWidth * percentage
      this.floorH = data.templateHeight * percentage
      this.$refs.story.refreshDiv([])
    },
    drag (ev) {
      console.info('tuo', ev)
      this.dom = ev.currentTarget.cloneNode(true)
    },
    drop (ev) {
      this.$refs.story.creteDiv()
    },
    allowDrop (ev) {
      ev.preventDefault()
    },
    submit () {
      let data = this.getPostdata()
      data.method = 'add'
      console.log(data)
      if (data.data.systemTemplateDetails.length > 0) {
        this.$emit('add-template', data)
      } else {
        this.$message.warning('请填充模板内容')
      }
    },
    update () {
      let data = this.getPostdata()
      data.data.systemTemplateId = this.proObj.templateContent.systemTemplateId
      data.method = 'update'
      console.log(data)
      if (data.data.systemTemplateId) {
        if (data.data.systemTemplateDetails.length > 0) {
          this.$emit('add-template', data)
        } else {
          this.$message.warning('请填充模板内容')
        }
      } else {
        this.$message.warning('请选择右边树节点')
      }
    },
    getPostdata () {
      let postData = {
        data: {
          machineTemplateTypeDetailId: this.$refs.tpinfo.form.specs,
          systemTemplateDetails: this.clone(this.currentModuleList)
        },
        method: 'add'
      }
      return postData
    },
    clone (obj) {
      var objClone = Array.isArray(obj) ? [] : {}
      if (obj && typeof obj === 'object') {
        for (let [k, v] of Object.entries(obj)) {
          let item = {}
          item.systemWidth = v.width
          item.systemHeight = v.height
          item.systemXPosition = v.x
          item.systemYPosition = v.y
          item.systemBackground = v.color
          objClone[k] = item
        }
      }
      return objClone
    }
  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/drawer";
  .main-bottom {
    position: relative;
    height: calc(100% - 200px);
    width: auto;
    overflow: auto;
    margin: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #dedede;
  }
  .main-bottom::-webkit-scrollbar{/*滚动条整体样式*/
    width:4px;/*高宽分别对应横竖滚动条的尺寸*/
    height:4px;
  }
  .main-bottom::-webkit-scrollbar-thumb{/*滚动条里面小方块*/
    border-radius:5px;
    -webkit-box-shadow:inset 0 0 5px rgba(0, 0, 0, 0.1);
    background:rgba(0,0,0,0.1);
  }
  .main-bottom::-webkit-scrollbar-track{/*滚动条里面轨道*/
    -webkit-box-shadow:inset 0 0 5px rgba(0, 0, 0, 0);
    border-radius:0;
    background: rgba(0, 0, 0, 0);
  }
  .story-wrapper {
    border: 1px solid #dedede;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #fffaf1;
  }
  .page-main-title{
    background-color: #545c64;
    color: #fff;
  }
  .template-ope{
    height: 45px;
    padding: 0 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fbfbfb;
    border-bottom: 1px solid #ebebeb;
  }
  .template-right{
    display: flex;
    justify-content: flex-start;
    margin-top: 18px;
  }
  .div-model{
    width: 60px;
    height: 30px;
    border: 2px solid #ebebeb;
    background-color: rgba(222, 237, 255, 0.64);
  }
  .template-info{
    margin-top: 15px;
  }
  .save-btn{
    background-color: #a7ca6d;
    color: white;
    border: 1px solid #a7ca6d;
    padding: 8px 16px;
    border-radius: 5px;
    outline: none;
    box-shadow: 1px 1px 2px #c8bfbf;
  }
  .save-btn:active{
    background-color: #96b662;
    border: 1px solid #96b362;
  }
  .model-info{
    font-weight: bold;
    font-size: 14px;
    color: #616058;
    margin-left: 20px;
    margin-top: 10px;
  }
  .model-info span{
    font-weight: 500;
    margin-right: 15px;
    color: #cbcac2;
    font-size: 14px;
  }
  .template-percentage{
    width: 200px;
  }
</style>
