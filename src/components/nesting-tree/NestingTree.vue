<template>
    <div>
      <el-tree :data="data" :props="defaultProps" default-expand-all @node-click="handleNodeClick"
               lazy highlight-current
               :load="loadNode"
      ></el-tree>
    </div>
</template>

<script>
import neatClass from './nestingtree'
export default {
  name: 'NestingTree',
  props: {
    postData: Object,
    treeType: String
  },
  data () {
    return {
      data: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    loadNode (node, resolve) {
      const id = node.data.id ? node.data.id : ''
      if (node.data.isParent === 0) {
        this.loadNodeData(resolve, id)
      }
      if (node.data.isParent !== 0) return resolve([])
    },
    loadNodeData (resolve, id) {
      neatClass.loadingTree(id, this.treeType).then(res => {
        const data = new neatClass.NestingTree(res.data, this.treeType)
        resolve(data.children)
      })
    },
    handleNodeClick (data) {
      this.$emit('submit', data)
    }
  },
  mounted () {
    setTimeout(() => {
      this.data = new neatClass.NestingTree(this.postData, this.treeType).firstList
    }, 500)
  }
}
</script>

<style scoped>

</style>
