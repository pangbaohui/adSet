<template>
  <div>
    <el-form :model="form" label-width="100px">
      <el-form-item label="素材名：">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="上传视频：">
        <up-video ref="video"></up-video>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import UpVideo from '../../../../../components/UpVideo'
import sourceService from '../../sourceService'
export default {
  name: 'VideoSource',
  components: {
    UpVideo
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
        url: ''
      }
    }
  },

  methods: {
    valBack () {
      this.form.url = this.$refs.video.videoForm.showVideoPath
      console.log(this.form)
      const flag = sourceService.checkFormVal(this.$data.form)
      if (flag) {
        return this.$data.form
      } else {
        return false
      }
    }
  },
  mounted () {
    let list = this.EditListData.editList
    if (list !== {}) {
      this.form.name = list.materialPriceName
      this.$refs.video.openModal(list.imgurl)
    }
  },
  beforeDestroy () {
    this.$parent.$emit('clearEditData')
  }
}
</script>

<style scoped>

</style>
