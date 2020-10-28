<template>
  <div class="drawer-page">
    <page-main @add-template = "addTemplate" :templateName="currentTreeNodeName"></page-main>
    <drawer @data-response="getTemplate" @refresh="getType"></drawer>
  </div>
</template>

<script>
import Drawer from '@/components/drawer/Drawer'
import PageMain from './components/Pagemain'
import tpApi from './template'

export default {
  name: 'index',
  provide () {
    return {
      proObj: {
        treeData: this.treeData,
        treeType: 'template',
        currentTreeNode: this.currentTreeNode,
        templateSpecs: this.templateSpecs,
        templateContent: this.templateContent
      }
    }
  },
  data () {
    return {
      treeData: {},
      templateSpecs: [],
      currentTreeNode: {},
      templateContent: {},
      currentTreeNodeName: ''
    }
  },
  components: {
    Drawer,
    PageMain
  },
  methods: {
    // 获取模板底板的规格
    getTemplateSpecs () {
      const postData = {
        method: 'listByPage',
        data: {}
      }
      tpApi.getTemplateTypeDetail(postData).then(res => {
        this._provided.proObj.templateSpecs = res.data.data
      }).catch((err) => {
        this.$message.warning(err)
      })
    },
    // 获取所选ID的模板信息
    getTemplate (data) {
      let id = ''
      const selectTreeId = localStorage.getItem('templateTypeId')
      if (!data) { id = selectTreeId } else { id = data.id }
      const postData = {
        method: 'listByPage',
        data: {
          templateContentTypeId: id
        }
      }
      tpApi.getTemplateContent(postData).then(res => {
        if (res.retcode === 0) {
          this._provided.proObj.templateContent = res.data.rows[0]
          this._provided.proObj.currentTreeNode = data
          this.currentTreeNodeName = data.label
          localStorage.setItem('templateTypeId', data.id)
        } else {
          this.$message.error(res.returnMsg)
        }
      }).catch((err) => {
        this.$message.warning(err)
      })
    },
    // 获取右边树状结构
    getType () {
      const postData = {
        method: 'listByUser',
        data: {
          templateContentTypeId: 1,
          requestType: 1
        }
      }
      tpApi.getTemplateContentType(postData).then(res => {
        this._provided.proObj.treeData = res.data
      }).catch((err) => {
        this.$message.warning(err)
      })
    },
    addTemplate (data) {
      data.data.templateContentTypeId = this._provided.proObj.currentTreeNode.id
      data.data.systemTemplateName = this._provided.proObj.currentTreeNode.label
      tpApi.getTemplateContent(data).then((res) => {
        this.$message.success(res.returnMsg)
      }).catch((err) => {
        this.$message.warning(err)
      })
    }
  },
  mounted () {
    this.getType()
    this.getTemplateSpecs()
  }
}
</script>

<style scoped>

</style>
