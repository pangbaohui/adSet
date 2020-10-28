<template>
  <div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      size="mini"
      row-key="id"
      :header-cell-style="{color:'#7a7a7a'}"
      @selection-change="handleSelectionChange">
      <el-table-column
        label="状态"
        prop="materialMdstring"
        width="50">
        <template slot-scope="scope">
          <i style="font-size: 20px" :style="{color:scope.row.iconColor}" :class="scope.row.materialMdstring"></i>
        </template>
      </el-table-column>
      <el-table-column
        label="素材名"
        prop="materialPriceName"
        width="120">
      </el-table-column>
      <el-table-column v-if="tableInfo.sign!== 'text'"
        label="网址"
        prop="materialPriceUrl"
      >
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <template v-if="tableInfo.sign === 'img'||tableInfo.sign === 'code'">
              <img class="hover-img" v-for="item in scope.row.imgurl" @click="newWindow(item)"  :key="item" :src="item" />
            </template>
            <template v-else-if="tableInfo.sign === 'video'">
              <video class="hover-img" v-for="item in scope.row.imgurl" @click="newWindow(item)"  :key="item" :src="item" ></video>
            </template>
            <template v-else>
              <div @click="newWindow(scope.row.imgurl)">去往该网站</div>
            </template>
            <div slot="reference" class="name-wrapper">
              <span size="medium">{{ scope.row.materialPriceUrl }}</span>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <template v-for="(item) in table_title">
        <el-table-column :key="item.id" v-if="item.type === 'normal'|| item.type === tableInfo.sign"
                         :label="item.label" :prop="item.prop" :width="item.width">
        </el-table-column>
      </template>
      <el-table-column label="操作" width="120">
        <template slot-scope="scope">
          <el-button size="mini" type="text"
            @click="handleEdit(scope.$index, scope.row)"><i class="el-icon-edit"></i>编辑</el-button>
          <el-button size="mini" type="text"
            @click="handleDelete(scope.$index, scope.row)"><i class="el-icon-delete"></i>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'SourceTable',
  props: {
    tableData: { type: Array, require: true },
    tableInfo: Object
  },
  data () {
    return {
      table_title: [
        { label: '分辨率', prop: 'resolutionPower', type: 'img', width: '100' },
        { label: '大小', prop: 'materialPriceSize', type: 'img', width: '60' },
        { label: '使用次数', prop: 'useCount', type: 'img', width: '80' },
        { label: '格式/内容/区域', prop: 'materialPriceUrl', type: 'text' },
        { label: '字体大小', prop: 'materialPriceStatus', type: 'text', width: '80' },
        { label: '字体颜色', prop: 'resolutionPower', type: 'text', width: '80' },
        { label: '背景颜色', prop: 'materialPriceSize', type: 'text', width: '80' },
        { label: '二维码内容', prop: 'resolutionPower', type: 'code' },
        { label: '上传人', prop: 'nickName', type: 'normal', width: '80' },
        { label: '上传时间', prop: 'registerTime', type: 'normal', width: '150' }
      ],
      multipleSelection: []
    }
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    newWindow (url) {
      window.open(url, '_blank')
    },
    handleEdit (index, row) {
      this.$emit('changeStatus', row, this.$props.tableInfo)
    },
    handleDelete (index, row) {
      console.log(row)
      this.$confirm('此操作将永久删除该素材, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$parent.$parent.$parent.$emit('deletePrice', row.materialPriceId)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
  .hover-img{
    width: 200px;
    height: 120px;
  }
</style>
