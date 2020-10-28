<template>
    <div class="drawer-page-main" :class="sourceDrawerClass ? 'drawer-page-main-t-w':''">
      <div class="page-main-title"><div>素材管理</div></div>
      <div class="page-main-title ope-btns">
        <title-btn @openMask=openMask :addBtn=addBtn></title-btn>
      </div>
      <div class="table-wrapper">
        <el-collapse v-model="activeNames">
          <el-collapse-item :title="`图片(共${tableData.length !== 0 ?tableData.imgList.length:0}个)`" name="5" v-if="tableData.imgList">
            <source-table :tableData="tableData.imgList" :tableInfo="addBtn[0]"  @changeStatus = beforeEdit></source-table>
          </el-collapse-item>
          <el-collapse-item :title="`视频(共${tableData.length !== 0 ?tableData.videoList.length:0}个)`" name="2" v-if="tableData.videoList">
            <source-table :tableData="tableData.videoList" :tableInfo="addBtn[1]"  @changeStatus = beforeEdit></source-table>
          </el-collapse-item>
          <el-collapse-item :title="`网页素材(共${tableData.length !== 0 ?tableData.webList.length:0}个)`" name="3" v-if="tableData.webList">
            <source-table :tableData="tableData.webList" :tableInfo="addBtn[2]"  @changeStatus = beforeEdit></source-table>
          </el-collapse-item>
          <el-collapse-item :title="`直播流素材(共${tableData.length !== 0 ?tableData.liveList.length:0}个)`" name="4" v-if="tableData.liveList">
            <source-table :tableData="tableData.liveList" :tableInfo="addBtn[3]"  @changeStatus = beforeEdit></source-table>
          </el-collapse-item>
          <el-collapse-item :title="`跑马灯(共${tableData.length !== 0 ?tableData.lampList.length:0}个)`" name="6" v-if="tableData.lampList">
            <source-table :tableData="tableData.lampList" :tableInfo="addBtn[4]"  @changeStatus = beforeEdit></source-table>
          </el-collapse-item>
          <el-collapse-item :title="`天气(共${tableData.length !== 0 ?tableData.weatherList.length:0}个)`" name="7" v-if="tableData.weatherList">
            <source-table :tableData="tableData.weatherList" :tableInfo="addBtn[5]"  @changeStatus = beforeEdit></source-table>
          </el-collapse-item>
          <el-collapse-item :title="`时间(共${tableData.length !== 0 ?tableData.timeList.length:0}个)`" name="8" v-if="tableData.timeList">
            <source-table :tableData="tableData.timeList" :tableInfo="addBtn[6]"  @changeStatus = beforeEdit></source-table>
          </el-collapse-item>
          <el-collapse-item :title="`二维码(共${tableData.length !== 0 ?tableData.codeList.length:0}个)`" name="9" v-if="tableData.codeList">
            <source-table :tableData="tableData.codeList" :tableInfo="addBtn[7]"  @changeStatus = beforeEdit></source-table>
          </el-collapse-item>
        </el-collapse>
        <div v-if="tableData.showCollapse">暂无数据</div>
      </div>
      <page-mask
        :showMask = showMask
        :showMaskMain = showMaskMain
        :btnLoading = btnLoading
        :isEdit = isEdit
        @clearEditData = clearEditData
        @closeMask = closeMask
        @submit = submit>
      </page-mask>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import SourceTable from './SourceTable'
import sourceService from '../sourceService'
import PageMask from './PageMask'
import TitleBtn from './TitleBtn'
export default {
  name: 'Pagemain',
  components: {
    SourceTable,
    PageMask,
    TitleBtn
  },
  provide () {
    return {
      EditListData: {
        editList: this.editList
      }
    }
  },
  inject: {
    proObj: {
      default: () => {}
    }
  },
  computed: {
    ...mapState({
      sourceDrawerClass: state => state.app.sourceDrawerClass
    })
  },
  data () {
    return {
      btnLoading: false,
      activeNames: ['2', '3', '4', '5', '6', '7', '8', '9'],
      tableData: [],
      showMask: false,
      showMaskMain: '',
      fileData: {},
      addBtn: [
        { icon: 'el-icon-picture', label: '图片上传', sign: 'img', typeId: 2 },
        { icon: 'el-icon-video-camera-solid', label: '视频上传', sign: 'video', typeId: 3 },
        { icon: 'el-icon-s-platform', label: '网页素材', sign: 'web', typeId: 4 },
        { icon: 'el-icon-s-platform', label: '直播流素材', sign: 'live', typeId: 5 },
        { icon: 'el-icon-s-opportunity', label: '跑马灯', sign: 'text', typeId: 6 },
        { icon: 'el-icon-sunrise-1', label: '天气', sign: 'text', typeId: 7 },
        { icon: 'el-icon-alarm-clock', label: '时间', sign: 'text', typeId: 8 },
        { icon: 'el-icon-s-grid', label: '二维码', sign: 'code', typeId: 9 }
      ],
      editList: {},
      isEdit: false
    }
  },
  methods: {
    beforeEdit (listData, status) {
      // console.log(listData)
      const container = sourceService.addData.postData
      this.isEdit = true
      this._provided.EditListData.editList = listData
      this.openMask(status)
      container.method = 'updateEntity'
      container.data.materialPriceId = listData.materialPriceId
    },
    clearEditData () {
      const container = sourceService.addData.postData
      this.isEdit = false
      container.method = 'add'
      container.materialPriceId = ''
      this.editList = {}
      this._provided.EditListData.editList = {}
    },
    refresh () {
      const data = {
        id: this.proObj.materialTypeId
      }
      this.$emit('refresh-price', data)
    },
    setData () {
      const container = sourceService.addData.postData.data
      this.tableData = new sourceService.TableData(this.proObj.tableData)
      container.materialTypeId = this.proObj.materialTypeId
    },
    openMask (status) {
      this.showMask = true
      this.showMaskMain = status
    },
    closeMask (data) {
      this.btnLoading = false
      this.showMask = data.closeWindow
    },
    submit (data) {
      console.log(data)
      this.btnLoading = true
      const winType = this.showMaskMain.sign
      const winTypeId = this.showMaskMain.typeId
      const editList = this._provided.EditListData.editList
      const container = sourceService.addData.postData.data
      container.materialPriceName = data.name
      container.materialPriceType = winTypeId
      if (winType === 'img') {
        this.fileData = data
        data.funcName = 'upImgRes'
        if (data.files.length > 0) {
          sourceService.loopUp(data)
        } else if (this.isEdit && editList.materialPriceName === data.name) {
          this.$message.warning('请做出修改后才能保存')
          this.btnLoading = false
        } else {
          container.materialPriceUrl = editList.imgurl.join(',')
          this.upImgRes()
        }
      } else if (winType === 'web') {
        this.addWebSource(data)
      } else if (winType === 'live') {
        this.addLiveSource(data)
      } else if (winType === 'text') {
        this.addTextSource(data)
      } else if (winType === 'code') {
        const isArr = data.files.length > 0
        this.fileData = data
        data.funcName = 'addCodeSource'
        if (isArr) {
          sourceService.loopUp(data)
        } else if (this.isEdit && editList.materialPriceName === data.name) {
          this.$message.warning('请做出修改后才能保存')
          this.btnLoading = false
        } else {
          container.materialPriceUrl = editList.imgurl.join(',')
          this.addCodeSource()
        }
      } else if (winType === 'video') {
        console.log(data)
        this.addVideoSource(data)
      }
    },
    upImgRes () {
      const container = sourceService.addData.postData.data
      const editL = this._provided.EditListData.editList
      const file = this.fileData.files
      const isFileArr = file.length > 0
      const imgSize = isFileArr ? Math.ceil(file[file.length - 1].size / 1024) + 'kb' : editL.materialPriceSize
      let url = isFileArr ? file[file.length - 1].url : false
      url = url || editL.imgurl[editL.imgurl.length - 1]
      container.materialPriceSize = imgSize
      container.resolutionPower = sourceService.picturePixel(url)
      const postData = sourceService.addData.postData
      console.log(postData)
      this.postApi(postData)
    },
    addWebSource (data) {
      const container = sourceService.addData.postData.data
      container.materialPriceUrl = 'http://' + data.url
      const postData = sourceService.addData.postData
      this.postApi(postData)
    },
    addLiveSource (data) {
      const container = sourceService.addData.postData.data
      container.materialPriceUrl = data.url
      const postData = sourceService.addData.postData
      this.postApi(postData)
    },
    addTextSource (data) {
      const container = sourceService.addData.postData.data
      container.materialPriceUrl = data.content
      container.resolutionPower = data.fontColor
      container.materialPriceSize = data.backgroundColor
      container.strFloat = data.strFloat
      container.materialPriceStatus = data.fontSize
      const postData = sourceService.addData.postData
      this.postApi(postData)
    },
    addCodeSource () {
      const container = sourceService.addData.postData.data
      container.resolutionPower = this.fileData.content
      const postData = sourceService.addData.postData
      this.postApi(postData)
    },
    addVideoSource (data) {
      console.log(data)
      const container = sourceService.addData.postData.data
      container.materialPriceUrl = data.url
      const postData = sourceService.addData.postData
      this.postApi(postData)
    },
    postApi (postData) {
      sourceService.getMaterialPrice(postData).then(res => {
        this.btnLoading = false
        console.log(res)
        if (res.retcode === 0) {
          this.$message.success(res.returnMsg)
          this.refresh()
          const data = { closeWindow: false }
          this.closeMask(data)
        } else {
          this.$message.error(res.returnMsg)
        }
      })
    }
  },
  mounted () {
    window.upImgRes = this.upImgRes
    window.addCodeSource = this.addCodeSource
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/drawer";
  .ope-btns{
    width: 94%;
    border:none;
    justify-content: space-between;
  }
  .table-wrapper{
    width: 94%;
    height: calc(100% - 150px);
    margin: 0 auto;
    overflow: auto;
  }

  .table-wrapper::-webkit-scrollbar{/*滚动条整体样式*/
    width:4px;/*高宽分别对应横竖滚动条的尺寸*/
    height:4px;
  }
  .table-wrapper::-webkit-scrollbar-thumb{/*滚动条里面小方块*/
    border-radius:5px;
    -webkit-box-shadow:inset 0 0 5px rgba(0, 0, 0, 0.1);
    background:rgba(0,0,0,0.1);
  }
  .table-wrapper::-webkit-scrollbar-track{/*滚动条里面轨道*/
    -webkit-box-shadow:inset 0 0 5px rgba(0, 0, 0, 0);
    border-radius:0;
    background: rgba(0, 0, 0, 0);
  }
</style>
