<template>
  <div>
    <el-form :model="form" label-width="100px">
      <el-form-item label="素材名">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="链接地址：">
        <el-input v-model="form.url">
<!--          <template slot="prepend">{{form.type}}://</template>-->
        </el-input>
      </el-form-item>
      <el-form-item label="特殊资源">
        <el-radio-group text-color="#fff" fill="#000" v-model="form.type" @change="setType">
          <el-radio label="rtsp"></el-radio>
          <el-radio label="mms"></el-radio>
          <el-radio label="http"></el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import sourceService from '../../sourceService'

export default {
  name: 'LiveSource',
  inject: {
    EditListData: {
      default: () => {}
    }
  },
  data () {
    return {
      form: {
        name: '',
        url: '',
        type: ''
      }
    }
  },
  methods: {
    setType () {
      this.form.url = this.form.type + '://'
    },
    valBack () {
      let data = {
        name: this.$data.form.name,
        url: this.$data.form.url
      }
      const flag = sourceService.checkFormVal(data)
      if (flag) {
        return data
      } else {
        return false
      }
    },
    editInit (list) {
      this.form.name = list.materialPriceName
      this.form.url = list.materialPriceUrl
      if (list.materialPriceUrl.indexOf('http://') === 0) {
        this.form.type = 'http'
      } else if (list.materialPriceUrl.indexOf('rtsp://') === 0) {
        this.form.type = 'rtsp'
      } else if (list.materialPriceUrl.indexOf('mms://') === 0) {
        this.form.type = 'mms'
      }
    }
  },
  mounted () {
    let list = this.EditListData.editList
    if (JSON.stringify(list) !== '{}') {
      this.editInit(list)
    }
  },
  beforeDestroy () {
    this.$parent.$emit('clearEditData')
  }
}
</script>

<style scoped>

</style>
