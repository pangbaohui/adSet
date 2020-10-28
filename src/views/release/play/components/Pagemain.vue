<template>
  <div class="drawer-page-main" :class="playDrawerClass ? 'drawer-page-main-t-w':''">
    <div class="page-main-title"><div>播出管理</div></div>
    <div class="page-main-title ope-btns">
      <btn-group v-bind="$attrs" :allowReleaseVal="allowReleaseVal" @add-play-ope="changeDialogVisible" @release = "release" @defaultSet = "defaultSet"></btn-group>
    </div>
    <div class="table-wrapper">
      <main-table ref="maintable" @editInit="editInit"  @delTableItems="delTableItems" @allowRelease="allowRelease" :tableData="tableData"></main-table>
    </div>

    <el-dialog @close="closedDialog" width="1000px" title="模板选择" :visible.sync="dialogFormVisible">
      <select-model ref="selectmodel" @submit="selectModel"></select-model>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="firstNext">下一步</el-button>
      </div>
    </el-dialog>
    <el-dialog @close="closedChild" width="1000px" title="模板节目单" :visible.sync="childDialogFormVisible">
      <select-model-item ref="modelitem" @submitModel = "submitModel"></select-model-item>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closedChild">取 消</el-button>
        <el-button type="primary" @click="saveModel">{{isEdit? '修改' : '保存'}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import MainTable from './components/MainTable'
import BtnGroup from './components/BtnGroup'
import SelectModel from './components/SelectModel'
import SelectModelItem from './components/SelectModelItem'
import playApi from '../play'
export default {
  name: 'Pagemain',
  inheritAttrs: false,
  props: {
    tableData: { type: Array }
  },
  provide () {
    return {
      model: {
        modelData: this.modelData
      },
      edit: {
        editData: this.editData,
        isEdit: this.isEdit
      }
    }
  },
  inject: {
    proObj: {
      default: () => {}
    }
  },
  data () {
    return {
      dialogFormVisible: false,
      childDialogFormVisible: false,
      modelData: {},
      allowReleaseVal: false,
      editData: {},
      isEdit: false,
      editTemplateContentId: ''
    }
  },
  methods: {
    // 关闭第一个对话框
    closedDialog () {
      this.$refs.selectmodel.clearPageVal()
    },
    // 关闭第二个对话框
    closedChild () {
      this.childDialogFormVisible = false
      this.submitAfter()
    },
    // 选择模板后查询模板
    selectModel (data, showDialog = true) {
      const postData = {
        method: 'listByPage',
        data: {
          templateContentTypeId: data.id
        }
      }
      playApi.getModelDivList(postData).then(res => {
        if (res.retcode === 0) {
          if (res.data.rows[0] !== '[]') {
            this._provided.model.modelData = res.data.rows[0]
            if (showDialog) {
              this.$refs.selectmodel.setModelData()
            } else {
              this.$refs.modelitem.editInit()
            }
          }
        } else {
          this.$message.error(res.returnMsg)
        }
      })
    },
    // 打开第一个对话框
    changeDialogVisible () {
      this.dialogFormVisible = !this.dialogFormVisible
      this.isEdit = false
      setTimeout(() => {
        this.$refs.selectmodel.getTree()
      })
    },
    // 打开第二个对话框
    firstNext () {
      const that = this
      const isModel = this._provided.model.modelData
      if (this.isEdit) {
        open()
      } else {
        if (JSON.stringify(isModel) !== '{}') {
          open()
        } else {
          this.$message.warning('请先选择模板')
        }
      }
      function open () {
        that.childDialogFormVisible = true
        setTimeout(() => {
          if (!that.isEdit) {
            that.$refs.modelitem.pageClear()
          }
          that.$refs.modelitem.itemSetDiv()
        }, 500)
      }
    },
    // 获取模板排版的内容
    saveModel () {
      this.$refs.modelitem.submit()
    },
    // 提交添加内容
    submitModel (data, title) {
      const postData = {
        method: 'add',
        data: {
          materialTemplateContentWidth: this._provided.model.modelData.systemTemplateWidth,
          materialTemplateContentHeight: this._provided.model.modelData.systemTemplateHeight,
          templateContentTypeId: this._provided.model.modelData.templateContentTypeId,
          regionId: this.proObj.regionId,
          materialTemplateContentName: title,
          templateDetailList: data
        }
      }
      if (this.isEdit) {
        postData.method = 'update'
        postData.data.materialTemplateContentId = this.editTemplateContentId
      }
      playApi.postTemplateContent(postData).then(res => {
        if (res.retcode === 0) {
          this.$message.success(res.returnMsg)
          this.submitAfter()
          this.$emit('refreshTable')
        } else {
          this.$message.error(res.returnMsg)
        }
      }).catch((err) => {
        this.$message.error(err)
      })
    },
    // 提交添加或者删除后清除数据
    submitAfter () {
      this.editTemplateContentId = ''
      this.isEdit = false
      this.dialogFormVisible = false
      this.childDialogFormVisible = false
      this.modelData = {}
      this.allowReleaseVal = false
      this.editData = {}
      this.$refs.modelitem.grandsonDialogFormVisible = false
      this.$refs.modelitem.pageClear()
      this._provided.model.modelData = {}
    },
    // 发布
    release () {
      const arr = this.extractContentId(this.$refs.maintable.selectedData).join(',')
      const postData = {
        method: 'pustTemplate',
        data: {
          materialTemplateContentId: arr,
          regionId: this.proObj.regionId
        }
      }
      playApi.postTemplateContent(postData).then(res => {
        if (res.retcode === 0) {
          console.log(res)
          this.$refs.maintable.clearSelect()
          this.$message.success(res.returnMsg)
        } else {
          this.$message.error(res.returnMsg)
        }
      })
    },
    // 默认
    defaultSet () {
      if (this.$refs.maintable.selectedData.length === 1) {
        const id = this.extractContentId(this.$refs.maintable.selectedData).join(',')
        const postData = {
          method: 'updateEntity',
          data: {
            materialTemplateContentId: id,
            templateUseed: '1'
          }
        }
        playApi.postTemplateContent(postData).then(res => {
          if (res.retcode === 0) {
            console.log(res)
            this.$refs.maintable.clearSelect()
            this.$message.success(res.returnMsg)
          } else {
            this.$message.error(res.returnMsg)
          }
        })
      } else {
        this.$message.warning('默认模板只有一个')
      }
    },
    // 筛选将要发布的ID
    extractContentId (data) {
      let arr = []
      data.filter((value) => {
        arr.push(value.materialTemplateContentId)
      })
      return arr
    },
    // 发布内容
    allowRelease (data) {
      if (data.length > 0) {
        this.allowReleaseVal = true
      }
    },
    // 开启编辑
    editInit (row) {
      const postData = {
        method: 'listByPageWith',
        data: {
          templateContentId: row.materialTemplateContentId
        }
      }
      playApi.getDetail(postData).then(res => {
        if (res.retcode === 0) {
          this._provided.edit.editData = res.data
          this._provided.edit.isEdit = true
          this.isEdit = true
          this.editTemplateContentId = row.materialTemplateContentId
          let findTemplate = {}
          findTemplate.id = res.data.templateContentTypeId
          this.selectModel(findTemplate, false)
          this.firstNext()
        } else {
          this.$message.error(res.returnMsg)
        }
      })
    },
    // 删除表格的数据
    delTableItems (row) {
      const postData = {
        method: 'delete',
        data: {
          entityId: row.materialTemplateContentId
        }
      }
      playApi.postTemplateContent(postData).then((res) => {
        if (res.retcode === 0) {
          this.$message.success(res.returnMsg)
          // 刷新表格
          this.$emit('refreshTable')
        } else {
          this.$message.error(res.returnMsg)
        }
      })
    }
  },
  components: {
    MainTable, BtnGroup, SelectModel, SelectModelItem
  },
  computed: {
    ...mapState({
      playDrawerClass: state => state.app.playDrawerClass
    })
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
</style>
