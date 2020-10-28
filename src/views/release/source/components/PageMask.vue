<template>
    <div v-if="showMask" class="page-body">
      <div class="page-main">
        <header>
          <div class="mask-title">
            {{isEdit?'编辑--':''}}{{showMaskMain.label}}
          </div>
          <div class="mask-close" @click="toEmit()">
            <i class="el-icon-close"></i>
          </div>
        </header>
        <section>
          <update-file ref="img" v-if="showMaskMain.sign === 'img'"></update-file>
          <web-source ref="web" v-if="showMaskMain.sign === 'web'"></web-source>
          <live-source ref="live" v-if="showMaskMain.sign === 'live'"></live-source>
          <video-source ref="video" v-if="showMaskMain.sign === 'video'"></video-source>
          <text-source ref="text" :showMaskMain="showMaskMain" v-if="showMaskMain.sign === 'text'"></text-source>
          <code-source ref="code" v-if="showMaskMain.sign === 'code'"></code-source>
        </section>
        <div>
          <footer>
            <el-button class="btn" @click="add()" :loading="btnLoading">{{isEdit?'更新':'添加'}}</el-button>
            <el-button @click="toEmit()" >取消</el-button>
          </footer>
        </div>
      </div>
    </div>
</template>

<script>
import UpdateFile from './add/UpdateFile'
import WebSource from './add/WebSource'
import VideoSource from './add/VideoSource'
import LiveSource from './add/LiveSource'
import TextSource from './add/TextSource'
import CodeSource from './add/CodeSource'
export default {
  name: 'PageMask',
  props: {
    showMask: { type: Boolean, require: true },
    showMaskMain: [String, Object],
    btnLoading: { type: Boolean, require: true },
    isEdit: { type: Boolean, require: true }
  },
  components: {
    UpdateFile,
    WebSource,
    VideoSource,
    LiveSource,
    TextSource,
    CodeSource
  },
  data () {
    return {
    }
  },
  methods: {
    toEmit () {
      const data = { closeWindow: false }
      this.$emit('closeMask', data)
    },
    add () {
      const v = this.$props.showMaskMain.sign
      const data = this.$refs[v].valBack()
      if (data) {
        this.$emit('submit', data)
      } else {
        this.$message.warning('请完善素材信息')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.page-body{
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(157,157,157,0.59);
  z-index: 2;
  display: flow-root;
}
.page-main{
  margin-left: 20%;
  margin-top: 5%;
  width: 550px;
  min-height: 200px;
  padding: 0 0 50px 0;
  border-radius: 5px;
  background-color: white;
}
section{
  margin: 0 30px;
}
header,footer{
  width: 100%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}
header{
  height: 40px;
  justify-content: space-between;
  margin: 0 auto 20px auto;
  border-bottom: 1px solid #dcdcdc;
  box-shadow: 0 0 8px 0 #dcdcdc;
}
footer{
  margin: 50px auto 0 auto;
}
header div.mask-title{
  font-weight: bold;
  font-size: 15px;
  margin-left: 15px;
}
header div.mask-close{
  font-size: 20px;
  margin-right: 15px;
}
header div.mask-close:hover{
  color: rgba(255, 203, 0, 0.59);
}
.el-button:hover, .el-button:focus{
  color: rgba(255, 203, 0, 0.59);
  background-color: #fdf8ed;
  border-color: rgba(255,184,0,0.59);
}
.btn{
  color: white;
  background-color: rgba(255,184,0,0.74);
  border-color: rgba(255,184,0,0.59);
}
.el-radio__input.is-checked .el-radio__inner{
  border-color: #ffb800;
  background: #ffb800;
}
</style>
