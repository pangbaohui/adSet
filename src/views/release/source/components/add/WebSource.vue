<template>
  <div>
    <el-form :model="form" label-width="100px">
      <el-form-item label="素材名：">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="链接地址：">
        <el-input v-model="form.url"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import sourceService from '../../sourceService'

export default {
  name: 'WebSource',
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
    this.form.url = this.EditListData.editList.materialPriceUrl
  },
  beforeDestroy () {
    this.$parent.$emit('clearEditData')
  }
}
</script>

<style lang="scss" scoped>

</style>
