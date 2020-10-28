<template>
  <div class="drawer-page">
    <page-main :regionId = "regionId" :tableData="tableData" @refreshTable="getContent"></page-main>
    <drawer @data-response="getContent" @refresh="getType"></drawer>
  </div>
</template>

<script>
import PageMain from './components/Pagemain'
import Drawer from '@/components/drawer/Drawer'
import playApi from './play'
export default {
  name: 'index',
  data () {
    return {
      treeData: {},
      tableData: [],
      regionId: ''
    }
  },
  provide () {
    return {
      proObj: {
        treeData: this.treeData,
        tableData: this.tableData,
        regionId: this.regionId,
        treeType: 'play'
      }
    }
  },
  components: {
    Drawer,
    PageMain
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
      playApi.getContentType(postData).then(res => {
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
      playApi.getContent(postData).then(res => {
        // console.log(res)
        if (res.retcode === 0) {
          this.tableData = res.data.rows
          this._provided.proObj.regionId = id
          this.regionId = id
        } else {
          this.$message.warning(res.returnMsg)
        }
      })
    }
  },
  mounted () {
    this.getType()
  }
}
</script>

<style scoped>

</style>
