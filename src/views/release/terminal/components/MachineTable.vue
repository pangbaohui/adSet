<template>
  <div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      class="table"
      size="mini"
      :header-cell-style="{color:'#000', fontSize: '13px'}"
      >
      <template v-for="(item) in table_title">
        <el-table-column :key="item.id" :label="item.label" :prop="item.prop" :width="item.width">
        </el-table-column>
      </template>
<!--      <el-table-column label="操作" width="120">-->
<!--        <template slot-scope="scope">-->
<!--          <el-button size="mini" type="text" @click="handleDelete(scope.row)"><i class="el-icon-delete"></i>删除</el-button>-->
<!--        </template>-->
<!--      </el-table-column>-->
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'MachineTable',
  props: {
    tableData: { type: Array }
  },
  data () {
    return {
      table_title: [
        { label: '机器编号', prop: 'materialMachineId' },
        { label: '站点编号', prop: 'stationId' },
        { label: '机器状态', prop: 'materialMachineStatus' }
      ],
      selectedData: []
    }
  },
  methods: {
    handleDelete (row) {
      this.$confirm('此操作将永久删除该内容下的机器, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(row)
        // this.$emit('delTableItems', row)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.table{
  width: 94%;
  margin: 0 auto;
}
</style>
