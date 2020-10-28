<template>
  <div class="drawer-page">
    <page-main :tableData="tableData" :allMachineData="allMachineData" :regionId = "regionId.toString()" @refreshPage="getContent"></page-main>
    <drawer @data-response="getContent" @refresh="getType"></drawer>
  </div>
</template>

<script>
import Drawer from '@/components/drawer/Drawer'
import PageMain from '../terminal/components/Pagemain'
import terminalApi from './teminal'
export default {
  name: 'index',
  components: {
    Drawer,
    PageMain
  },
  data () {
    return {
      treeData: {},
      tableData: [],
      allMachineData: [],
      regionId: ''
    }
  },
  provide () {
    return {
      proObj: {
        treeData: this.treeData,
        regionId: this.regionId,
        treeType: 'play'
      }
    }
  },
  methods: {
    // 获取右边树的节点
    getType () {
      const postData = {
        method: 'listByUser',
        data: {
          requestType: 1,
          machineTemplateTypeId: 1
        }
      }
      terminalApi.getContentType(postData).then(res => {
        this._provided.proObj.treeData = res.data
      }).catch((err) => {
        this.$message.warning(err)
      })
    },
    getContent (data) {
      let id = ''
      if (!data) { id = this.regionId } else { id = data.id }
      const postData = {
        method: 'listByPage',
        data: {
          regionId: id
        }
      }
      terminalApi.getMachine(postData).then(res => {
        // console.log(res)
        if (res.retcode === 0) {
          this.tableData = res.data.data
          this._provided.proObj.regionId = id
          this.regionId = id
        } else {
          this.$message.warning(res.returnMsg)
        }
      })
    },
    getAllMachine () {
      const postData = {
        method: 'listByPage',
        data: { page: -10001 }
      }
      terminalApi.getMachine(postData).then(res => {
        // console.log(res)
        if (res.retcode === 0) {
          this.allMachineData = res.data
        } else {
          this.$message.warning(res.returnMsg)
        }
      })
    }
  },
  mounted () {
    this.getType()
    this.getAllMachine()
  }
}
</script>

<style scoped>

</style>
