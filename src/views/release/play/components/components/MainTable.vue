<template>
    <div>
      <el-table
        ref="mainTableC"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        size="mini"
        :row-key="getRowKeys"
        :header-cell-style="{color:'#000', fontSize: '13px'}"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          :reserve-selection="true"
          width="55">
        </el-table-column>
        <template v-for="(item) in table_title">
          <el-table-column :key="item.id" :label="item.label" :prop="item.prop" :width="item.width">
          </el-table-column>
        </template>

        <el-table-column label="分辨率" >
          <template slot-scope="scope">
            <span>{{scope.row.materialTemplateContentWidth}}*{{scope.row.materialTemplateContentHeight}}</span>
          </template>
        </el-table-column>
        <el-table-column label="设置默认" width="120">
          <template slot-scope="scope">
            <div class="default-div" v-if="scope.row.templateUseed===1"></div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-button size="mini" type="text"
                       @click="handleEdit(scope.row)"><i class="el-icon-edit"></i>编辑</el-button>
            <el-button size="mini" type="text"
                       @click="handleDelete(scope.row)"><i class="el-icon-delete"></i>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
import Vue from 'vue'
var Event = new Vue()
export default {
  name: 'MainTable',
  props: {
    tableData: { type: Array, require: true }
  },
  data () {
    return {
      value: true,
      table_title: [
        { id: 1, label: '模板名称', prop: 'materialTemplateContentName', width: '200' }
      ],
      selectedData: []
    }
  },
  methods: {
    handleSelectionChange (item) {
      this.selectedData = item
      this.$emit('allowRelease', item)
    },
    getRowKeys (row) {
      return row.materialTemplateContentId
    },
    handleEdit (row) {
      this.$emit('editInit', row)
    },
    handleDelete (row) {
      this.$confirm('此操作将永久删除该播出内容, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$emit('delTableItems', row)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 清空已选
    clearSelect () {
      console.log(11)
      this.$refs.mainTableC.clearSelection()
      this.selectedData = []
    }
  }
}
</script>

<style lang="scss" scoped>
.default-div{
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: #9cd458;
}
</style>
