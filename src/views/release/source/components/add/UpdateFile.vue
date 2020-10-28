<template>
  <div>
    <el-form :model="form" label-width="100px">
      <el-form-item label="素材名：">
        <el-input size="small" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="上传图片：">
        <update-img ref="upimg" @submit="setFile"></update-img>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import UpdateImg from '@/components/UpImg'
import sourceService from '../../sourceService'

export default {
  name: 'UpdateFile',
  components: {
    UpdateImg
  },
  inject: {
    EditListData: {
      default: () => {}
    }
  },
  data () {
    return {
      form: {
        name: '',
        files: []
      }
    }
  },
  methods: {
    setFile (data) {
      this.form.files = data
    },
    valBack () {
      let child = this.$refs.upimg
      let change = child.isChange
      let del = child.isDelete
      if (!change && !del) {
        this.form.files = child.showFiles
      }
      const flag = sourceService.checkFormVal(this.$data.form)
      if (flag) {
        return this.$data.form
      } else {
        return false
      }
    }
  },
  mounted () {
    this.form.name = this.EditListData.editList.materialPriceName
    this.$refs.upimg.openModal(this.EditListData.editList.imgurl)
  },
  beforeDestroy () {
    this.$parent.$emit('clearEditData')
  }
}
</script>

<style lang="scss" scoped>

</style>
