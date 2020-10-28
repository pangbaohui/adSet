<template>
    <div>
      <div class="wrapper">
        <div class="left">
          <show-model ref="model" :limitW = '400' :limitH = '600'></show-model>
        </div>
        <div class="right">
          <el-form ref="form" size="mini" :model="form" label-width="80px">
            <el-form-item label="节目名称">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item v-for="(item, index) in modelList" :key="item.systemTemplateDetailId" :label= "'视图'+ (index + 1)">
              <el-button type="primary" size="mini" @click="addDialog(item, index)">添加素材</el-button>
              <select-items-details v-if="hackReset" ref="itemsoption" v-for="items in selectedItemsList[index]"
                                    :key="items.materialPriceId" :itemsInfo = items :index = index
              @delSelectedItems = "delSelectedItems(index, items.materialPriceName)">
              </select-items-details>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <el-dialog width="800px" title="模板内容选择" :visible.sync="grandsonDialogFormVisible">
        <select-items ref="items" @findAllItem = "findItems" @submitSelectItems="submitSelectItems"></select-items>
        <div slot="footer" class="dialog-footer">
          <el-button @click="grandsonDialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="selected">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
import ShowModel from './ShowModel'
import playApi from '../../play'
import SelectItems from './SelectItems'
import SelectItemsDetails from './SelectItemsDetails'
export default {
  name: 'SelectModelItem',
  components: { ShowModel, SelectItems, SelectItemsDetails },
  inject: {
    model: {
      default: () => {}
    },
    edit: {
      default: () => {}
    }
  },
  provide () {
    return {
      items: {
        itemsList: this.itemsList,
        itemsOptions: this.itemsOptions
      }
    }
  },
  data () {
    return {
      form: {
        name: ''
      },
      hackReset: true,
      grandsonDialogFormVisible: false,
      modelList: [],
      // 一下三个记得操作完后清除
      currentItems: [],
      currentIndex: '',
      currentModel: {},
      selectedItemsList: {}
    }
  },
  methods: {
    itemSetDiv () {
      if (this.model.modelData) {
        this.modelList = this.model.modelData.systemTemplateDetails
      }
      this.$refs.model.setModelDiv()
    },
    // 选择素材后根据ID查询素材内容
    findItems (data) {
      const postData = {
        method: 'listByPage',
        data: {
          materialTypeId: data.id
        }
      }
      playApi.getItemsList(postData).then((res) => {
        if (res.data.rows !== '[]') {
          this._provided.items.itemsList = res.data.rows
          setTimeout(() => {
            this.$refs.items.setItemsList()
          })
        } else {
          this.$message.error(res.returnMsg)
        }
      })
    },
    // 每次选择了素材后
    submitSelectItems (data) {
      this.currentItems = data
    },
    // 打开选择素材对话框
    addDialog (model, index) {
      this.grandsonDialogFormVisible = true
      setTimeout(() => {
        this.$refs.items.getTree()
        // 让选项回显
        this.$refs.items.echoSelectedTableOptions()
      })
      this.currentIndex = index
      this.currentModel = model
      if (this.selectedItemsList[this.currentIndex]) {
        this._provided.items.itemsOptions = this.selectedItemsList[this.currentIndex]
      } else {
        this._provided.items.itemsOptions = []
      }
    },
    // 选择了素材后
    selected () {
      this.grandsonDialogFormVisible = false
      console.log(this.currentItems)
      this.selectedItemsList[this.currentIndex] = this.currentItems
    },
    // 删除已经选择的素材
    delSelectedItems (index, data) {
      console.log(index)
      console.log(data)
      let list = this.selectedItemsList[index]
      for (let x in list) {
        if (list[x].materialPriceName === data) {
          list.splice(x, 1)
        }
      }
      this.selectedItemsList[index] = list
      this.hackReset = false
      this.$nextTick(() => {
        this.hackReset = true
      })
    },
    pageClear () {
      this.currentItems = []
      this.currentIndex = ''
      this.currentModel = {}
      this.selectedItemsList = {}
      this.modelList = []
      // this.$refs.itemsoption.clearPageVal()
      // console.log(this.selectedItemsList)
    },
    // 提交整个表单数据
    submit () {
      let templateDetailList = []
      if (this.$refs.itemsoption && this.$refs.itemsoption.length === this.modelList.length) {
        this.modelList.filter((value, index) => {
          let obj = {}
          obj.materialXPosition = value.systemXPosition
          obj.materialYPosition = value.systemYPosition
          obj.materialHeight = value.systemHeight
          obj.materialWidth = value.systemWidth
          obj.templateDetailPriceList = []
          for (let i = 0; i < this.$refs.itemsoption.length; i++) {
            let form = this.$refs.itemsoption[i].form
            if (form.index === index) {
              let child = {}
              child.materialPriceId = form.materialPriceId
              child.detailType = form.detailType
              child.templateStart = form.time[0]
              child.templateEnd = form.time[1]
              child.templateStatus = form.interval
              child.startTime = form.date[0]
              child.endTime = form.date[1]
              child.templateContentSpeed = form.speedValue
              child.templateMaxVolumne = form.volValue
              obj.templateDetailPriceList.push(child)
            }
          }
          templateDetailList.push(obj)
          if (index === this.modelList.length - 1) {
            const name = this.form.name
            if (name.trim() !== '') {
              this.$emit('submitModel', templateDetailList, this.form.name)
            } else {
              this.$message.warning('请填写播出项目名称')
            }
          }
        })
      } else {
        this.$message.warning('请给每个视图加上内容')
      }
    },
    // 设置编辑时的初始值
    editInit () {
      this.form.name = this.edit.editData.materialTemplateContentName
      this.findSelectedModel(this.edit.editData.templateDetailList)
    },
    // 根据编辑初始值数据获取已选的模板
    findSelectedModel (data) {
      console.log(data)
      let formArr = []
      for (let x = 0; x < data.length; x++) {
        let arr = []
        for (let y = 0; y < data[x].templateDetailPriceList.length; y++) {
          formArr.push(data[x].templateDetailPriceList[y])
          this.findItemsById(data[x].templateDetailPriceList[y].materialPriceId).then(res => {
            arr.push(res)
          })
        }
        this.selectedItemsList[x] = arr
      }
      setTimeout(() => {
        let form = this.$refs.itemsoption
        form.filter((value, index) => {
          let p = value.form
          p.detailType = formArr[index].detailType ? formArr[index].detailType.toString() : ''
          p.date[0] = this.formatDayTime(formArr[index].startTime)
          p.date[1] = this.formatDayTime(formArr[index].endTime)
          p.time[0] = formArr[index].templateStart
          p.time[1] = formArr[index].templateEnd
          p.speedValue = formArr[index].templateContentSpeed
          p.volValue = formArr[index].templateMaxVolumne
        })
      }, 500)
    },
    formatDayTime (val) {
      const date = new Date(val)
      const Y = date.getFullYear()
      let M = date.getMonth() + 1
      let D = date.getDate()

      if (M < 10) {
        M = '0' + M
      }
      if (D < 10) {
        D = '0' + D
      }
      return Y + '-' + M + '-' + D
    },
    // 发送查找编辑时小项目请求
    async findItemsById (id) {
      const postData = {
        method: 'get',
        data: {
          entityId: id
        }
      }
      let res = await playApi.getItemsList(postData)
      if (res.retcode === 0) {
        return res.data
      }
    }
  },
  watch: {
    selectedItemsList: {
      handler (n, o) {
        this.selectedItemsList = n
      },
      deep: true
    }
  },
  mounted () {
    this.pageClear()
  },
  destroyed () {
    this.pageClear()
  }
}
</script>

<style lang="scss" scoped>
  .wrapper{
    width: 100%;
    display: inline-block;
    %lr{
      box-sizing: border-box;
      width: 50%;
      float: left;
    }
    .left{
      @extend %lr;
      display: flex;
      justify-content: center;
      align-items: center;
      /*float: left;*/
    }
    .right{
      @extend %lr;
      /*float: right;*/
    }
  }
</style>
