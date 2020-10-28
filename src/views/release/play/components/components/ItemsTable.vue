<template>
    <div class="table-wrapper">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        size="mini"
        :row-key="getRowKeys"
        :header-cell-style="{color:'#000', fontSize: '15px'}"
        @select = "selectOption"
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
      </el-table>
    </div>
</template>

<script>
export default {
  name: 'ItemsTable',
  props: {
    tableType: Number
  },
  inject: {
    items: {
      default: () => {}
    }
  },
  data () {
    return {
      tableData: [],
      table_title: [
        { id: 1, label: '素材名称', prop: 'materialPriceName', width: 120 },
        { id: 2, label: '素材内容', prop: 'materialPriceUrl', width: 340 }
      ],
      multipleSelection: []
    }
  },
  methods: {
    tableInit (data) {
      this.tableData = data
      setTimeout(() => {
        this.showOption()
      }, 500)
    },
    selectOption (selection, row) {
    },
    getRowKeys (row) {
      return row.materialPriceId
    },
    setTableData () {
      this.tableInit(this.items.itemsList)
    },
    handleSelectionChange (val) {
      let a = this.deteleObject(val)
      this.multipleSelection = a
      this.$parent.$emit('submitSelectItems', a)
    },
    // 回显已选选项
    showOption () {
      setTimeout(() => {
        let rows = this.items.itemsOptions
        if (rows.length === 0) {
          this.clearSelection()
        } else {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row, true)
          })
          this.multipleSelection = rows
        }
      }, 500)
    },
    // 清空已选
    clearSelection () {
      this.$refs.multipleTable.clearSelection()
    },
    // 除去重复项 只针对'materialPriceId'相等
    deteleObject (obj) {
      var uniques = []
      var stringify = {}
      for (var i = 0; i < obj.length; i++) {
        var keys = Object.keys(obj[i])
        let str = ''
        for (var j = 0; j < keys.length; j++) {
          if (keys[j] === 'materialPriceId') {
            str += JSON.stringify(keys[j])
            str += JSON.stringify(obj[i][keys[j]])
          }
        }
        if (!stringify.hasOwnProperty(str)) {
          uniques.push(obj[i])
          stringify[str] = true
        }
      }
      return uniques
    }
  },
}
</script>

<style lang="scss" scoped>
.table-wrapper{
  width: 100%;
}
</style>
