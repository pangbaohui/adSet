<template>
  <el-upload action="http://up.qiniu.com/key"
             :data= "data"
             :on-progress="uploadVideoProcess"
             :before-upload="beforeUploadVideo"
             :on-success="handleVideoSuccess"
             :show-file-list="false">
    <video v-if="videoForm.showVideoPath !=='' && !videoFlag"
           v-bind:src="videoForm.showVideoPath"
           class="avatar video-avatar"
           controls="controls">
      您的浏览器不支持视频播放
    </video>
    <i v-else-if="videoForm.showVideoPath ==='' && !videoFlag"
       class="el-icon-plus avatar-uploader-icon"></i>
    <el-progress v-if="videoFlag === true"
                 type="circle"
                 v-bind:percentage="videoUploadPercent"
                 style="margin-top:7px;"></el-progress>
  </el-upload>
</template>

<script>
import { getUploadToken } from '../utils/uploadimg'
export default {
  name: 'UpVideo',
  data () {
    return {
      data: {
        key: '',
        token: ''
      },
      videoFlag: false,
      // 是否显示进度条
      videoUploadPercent: '',
      // 进度条的进度，
      isShowUploadVideo: false,
      // 显示上传按钮
      videoForm: {
        showVideoPath: ''
      }
    }
  },

  methods: {
    // 上传前回调
    beforeUploadVideo (file) {
      this.data.key = `AdSetting_${file.name}`
      // var fileSize = file.size / 1024 / 1024 < 50
      if (['video/mp4', 'video/ogg', 'video/flv', 'video/avi', 'video/wmv', 'video/rmvb', 'video/mov'].indexOf(file.type) === -1) {
        this.$message.warning('请上传正确的视频格式')
        return false
      }
      // if (!fileSize) {
      //   this.$message.warning('视频大小不能超过50MB')
      //   return false
      // }
      this.isShowUploadVideo = false
    },
    // 进度条
    uploadVideoProcess (event, file, fileList) {
      this.videoFlag = true
      this.videoUploadPercent = file.percentage.toFixed(0) * 1
    },
    handleChange (response, file) {
      console.log(file)
    },
    getToken () {
      getUploadToken().then(res => {
        this.data.token = res.uptoken
      })
    },
    handleVideoSuccess (res, file) {
      this.isShowUploadVideo = true
      this.videoFlag = false
      this.videoUploadPercent = 0
      this.videoForm.showVideoPath = `http://cdn.szpuze.com/${res.key}`
    },
    // 回显
    openModal (urls) {
      if (urls) {
        this.videoForm.showVideoPath = urls
      }
    }
  },
  mounted () {
    this.getToken()
  },
  beforeDestroy () {
    this.videoForm.showVideoPath = ''
  }
}
</script>

<style lang="scss" scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
    border: 1px dashed #dedede;
    border-radius: 5px;
  }

  .video-avatar{
    width: 80%;
    height: 200px;
  }
</style>
