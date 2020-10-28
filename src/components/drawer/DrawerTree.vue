<template>
  <div>
    <el-input
      placeholder="输入关键字进行过滤"
      v-model="filterText">
    </el-input>
    <div class="tree-ope">
      <el-row>
        <el-tooltip class="item" effect="light" content="为选择节点添加子项" placement="top">
          <el-button size="mini" type="warning" plain icon="el-icon-plus" circle  @click="append"></el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="light" content="删除选择节点" placement="top">
          <el-button size="mini" type="danger" plain icon="el-icon-delete" circle @click="remove"></el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="light" content="刷新" placement="top">
          <el-button size="mini" type="primary" plain icon="el-icon-refresh" circle @click="refresh"></el-button>
        </el-tooltip>
      </el-row>
    </div>
    <el-tree
      :data="data"
      node-key="id"
      default-expand-all
      @node-click = "onselect"
      @node-drop="handleDrop"
      draggable
      :filter-node-method="filterNode"
      ref="tree"
      lazy
      :load="loadNode"
      :allow-drop="allowDrop"
      :allow-drag="allowDrag"
      highlight-current
    >
      <div @dblclick.stop="requireP()" class="custom-tree-node"  slot-scope="{ node }">
        <div>
          <input class="file-name-input" @click.stop="focus()" v-if="editFile && currentData.id ===node.key" v-model="fileName" size="mini"  maxlength="10" style="width: 120px"/>
          <span v-else><i  style="color: #ffb800" class="el-icon-folder-opened"></i>{{ node.label }}</span>
        </div>
        <div>
          <i v-if="currentData.id ===node.key && !editFile" class="el-icon-edit" @click.stop="editFileName()"></i>
          <span class="tree-text-btn" v-if="editFile && currentData.id ===node.key" @click.stop="updateFileName(node.data)">保存</span>
        </div>
      </div>
    </el-tree>
  </div>

</template>

<script>
import tree from './tree'
export default {
  name: 'DrawerTree',
  watch: {
    filterText (val) {
      this.$refs.tree.filter(val)
    }
  },
  inject: {
    proObj: {
      default: () => {}
    }
  },
  data () {
    return {
      title: '',
      fileName: '',
      editFile: false,
      currentData: '',
      currentNodeData: '',
      filterText: '',
      data: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      treeType: ''
    }
  },
  methods: {
    // 节点选择
    onselect (data, node) {
      this.currentData = data
      this.currentNodeData = node
      this.editFile = false
      this.fileName = data.label
    },
    requireP () {
      // console.log(this.currentData)
      this.$parent.$emit('data-response', this.currentData)
    },
    // true节点会被隐藏
    filterNode (value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    handleDrop (draggingNode, dropNode, dropType, ev) {

      console.log('tree drop: ', dropNode.label, dropType)
    },
    // 判断是否能放置
    allowDrop (draggingNode, dropNode, type) {
      if (dropNode.data.label === '') {
        return type !== 'inner'
      } else {
        return true
      }
    },
    // 编辑文件名
    editFileName (data) {
      this.editFile = true
      console.log(data)
    },
    // 更新树的文件名
    updateFileName (data) {
      this.editFile = false
      tree.updateTree(data.id, this.fileName, this.treeType).then(res => {
        if (res.retcode === 0) {
          this.currentData.label = this.fileName
          this.$message.success('修改成功')
        } else {
          this.$message.warning(res.returnMsg)
        }
      })
    },
    // 是否允许移动
    allowDrag (draggingNode) {
      console.log(draggingNode)
      return draggingNode.data.label.indexOf('一级') === -1
    },
    // 创建子节点
    append () {
      const data = this.currentData
      console.log(data)
      if (data) {
        tree.addTree(data.id, this.treeType).then(res => {
          console.log(res)
          const newChild = { id: res.data, label: '新建文件', isleaf: true, children: [] }
          if (!data.children) {
            this.$set(data, 'children', [])
          }
          console.log(newChild)
          data.children.push(newChild)
        })
      } else {
        this.$message.warning('请选择节点后在进行添加')
      }
    },
    focus () {
      console.log('input聚焦')
    },
    // 删除节点
    remove () {
      const data = this.currentData
      const node = this.currentNodeData
      console.log(data.id)
      const parent = node.parent
      console.log(parent)
      if (data) {
        this.$confirm('此操作将永久删除该节点下的所有内容, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          tree.delTree(data.id, this.treeType).then(res => {
            if (res && res.retcode === 0) {
              const children = parent.childNodes
              const index = children.findIndex(d => d.data.id === data.id)
              children.splice(index, 1)
            }
          }).catch(err => {
            this.$message.error(err)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      } else {
        this.$message.warning('请选择要删除的节点')
      }
    },
    loadNode (node, resolve) {
      const id = node.data.id ? node.data.id : ''
      if (node.data.isParent === 0) {
        this.loadNodeData(resolve, id)
      }
      if (node.data.isParent !== 0) return resolve([])
    },
    loadNodeData (resolve, id) {
      tree.loadingTree(id, this.treeType).then(res => {
        const data = new tree.FileTree(res.data, this.treeType)
        resolve(data.children)
      })
    },
    refresh () {
      this.$parent.$emit('refresh')
      this.data = new tree.FileTree(this.proObj.treeData, this.proObj.treeType).firstList
      this.treeType = this.proObj.treeType
    }
  },
  mounted () {
    this.currentData = ''
    this.currentNodeData = ''
    setTimeout(() => {
      if (this.proObj) {
        this.refresh()
      }
    }, 1000)
  },
  destroyed () {
    this.currentData = ''
    this.currentNodeData = ''
  }
}
</script>

<style lang="scss" scoped>
  .tree-ope{
    margin: 10px auto;
    width: 100%;
    height: 30px;
    overflow: hidden;
  }
  .el-button--warning.is-plain {
    color: #a0d654;
    background: #fafff3;
    border-color: #6dac5e;
  }
  .el-button--warning.is-plain:hover {
    color: #fff;
    background: #a0d654;
    border-color: #6dac5e;
  }
  .custom-tree-node{
    width: 80%;
    display: inline-flex;
    justify-content: space-between;
  }
  .tree-text-btn{
    font-size: 12px;
  }
  .file-name-input{
    outline: none;
    background-color: rgba(255,255,255,0);
    border: none;
  }
</style>
