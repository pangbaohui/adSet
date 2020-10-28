<template>
  <div>
    <el-upload
      action="#"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-change="handleChange"
      :file-list="showFiles"
      :auto-upload="false">
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
      <span></span>
    </el-dialog>
  </div>
</template>

<script>
class Photo {
  constructor (name, url, index) {
    this.name = name
    this.url = url
    this.index = index
  }
}
export default {
  name: 'UpImg',
  data () {
    return {
      dialogVisible: false,
      dialogImageUrl: '',
      showFiles: [],
      deleteFile: [],
      isChange: false,
      isDelete: false
    }
  },
  methods: {
    handleRemove (file) {
      this.isDelete = true
      if (file.status === 'success') {
        this.deleteFile.push(file)
      }
      this.submit()
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleChange (response, file) {
      this.isChange = true
      this.showFiles = file
      this.submit()
    },
    submit () {
      let list = this.showFiles.filter(items => {
        if (!this.deleteFile.includes(items)) return items
      })
      console.log(this.showFiles)
      this.$emit('submit', list)
    },
    // 回显
    openModal (urls) {
      let showFiles = []
      for (let x in urls) {
        showFiles.push(new Photo('图片' + (parseInt(x) + 1), urls[x], x))
      }
      this.showFiles = showFiles
    }
  }
}
</script>

<style scoped>

</style>
