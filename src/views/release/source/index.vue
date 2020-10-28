<template>
    <div class="drawer-page">
      <page-main ref="table" @refresh-price="getPrice" @deletePrice = handleDeletePrice></page-main>
      <drawer @data-response="getPrice" @refresh="getType"></drawer>
    </div>
</template>

<script>
import Drawer from '@/components/drawer/Drawer'
import PageMain from './components/Pagemain'
import sourceApi from './sourceService'
export default {
  name: 'index',
  data () {
    return {
      treeData: {},
      tableData: {},
      materialTypeId: ''
    }
  },
  provide () {
    return {
      proObj: {
        treeData: this.treeData,
        treeType: 'source',
        tableData: this.tableData,
        materialTypeId: this.materialTypeId
      }
    }
  },
  components: {
    Drawer,
    PageMain
  },
  methods: {
    // 获取文件树
    getType () {
      const postData = {
        method: 'listByUser',
        data: {
          requestType: 1
        }
      }
      sourceApi.getMaterialType(postData).then(res => {
        console.log(res)
        this._provided.proObj.treeData = res.data
      }).catch((err) => {
        this.$message.warning(err)
      })
    },
    // 选取节点后获取该节点的页面表格
    getPrice (data) {
      let id = ''
      if (data) { id = data.id } else { id = '1' }
      console.log(id)
      const postData = {
        method: 'listByPage',
        data: {
          materialTypeId: id || '1'
        }
      }
      sourceApi.getMaterialPrice(postData).then(res => {
        this._provided.proObj.tableData = res.data
        this._provided.proObj.materialTypeId = id
        this.$refs.table.setData()
      }).catch((err) => {
        this.$message.warning(err)
      })
    },
    handleDeletePrice (id) {
      console.log(id)
      const postData = {
        method: 'delete',
        data: {
          entityId: id
        }
      }
      const that = this
      sourceApi.getMaterialPrice(postData).then(res => {
        console.log(res)
        const data = {
          id: that.proObj.materialTypeId
        }
        this.getPrice(data)
      }).catch((err) => {
        this.$message.warning(err)
      })
    }
  },
  mounted () {
    this.getType()
  }
}
</script>

<style lang="scss" scoped>

</style>
