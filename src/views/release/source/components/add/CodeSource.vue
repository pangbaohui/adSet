<template>
    <div>
      <el-form :model="form" label-width="100px">
        <el-form-item label="素材名：">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="二维码内容：">
          <el-input v-model="form.content"></el-input>
        </el-form-item>
        <el-form-item label="上传LOGO：">
          <update-img ref="upimg" @submit="setFile"></update-img>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
import UpdateImg from '@/components/UpImg'
import sourceService from '../../sourceService'
export default {
  name: 'CodeSource',
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
        files: [],
        content: ''
      }
    }
  },
  methods: {
    setFile (data) {
      console.log(data)
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
    this.form.content = this.EditListData.editList.resolutionPower
    this.$refs.upimg.openModal(this.EditListData.editList.imgurl)
  },
  beforeDestroy () {
    this.$parent.$emit('clearEditData')
  }
}
</script>

<style scoped>

</style>
