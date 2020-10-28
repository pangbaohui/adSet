<template>
  <el-form size="small" :inline="true" :model="form" label-width="82px">
    <el-form-item label="模板名：">
      <el-input v-model="templateName" :disabled="true" show-word-limit style="width: 200px"></el-input>
    </el-form-item>
    <el-form-item label="模板规格：">
      <el-select v-model="form.specs" :disabled="isSelectModel" placeholder="请选择规格" style="width: 200px">
        <el-option
          v-for="item in specsList"
          :key="item.machineTemplateTypeDetailId"
          :label="item.templateTypeDetailName"
          :value="item.machineTemplateTypeDetailId">
          <span class="specs" @click="changeSpecs(item)">{{ item.templateTypeDetailName }}</span>
        </el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'Template-Info',
  props: {
    templateName: String
  },
  watch: {
    templateName: {
      handler (n, o) {
        if (n) {
          this.isSelectModel = false
        }
      },
      deep: true
    }
  },
  inject: {
    proObj: {
      default: () => {}
    }
  },
  data () {
    return {
      isSelectModel: true,
      form: {
        specs: ''
      },
      specsList: []
    }
  },
  methods: {
    changeSpecs (item) {
      this.$emit('set-floor', item)
    },
    setEditFloor (id) {
      if (id) {
        this.isSelectModel = false
        this.specsList.filter(value => {
          if (value.machineTemplateTypeDetailId === id) {
            this.form.specs = id
            this.changeSpecs(value)
          }
        })
      } else {
        this.form.specs = ''
      }
    }
  },
  mounted () {
    setTimeout(() => {
      if (this.proObj) {
        this.specsList = this.proObj.templateSpecs
      }
    }, 500)
  },
  destroyed () {
    this.form.specs = ''
  }
}
</script>

<style lang="scss" scoped>
.specs{
  display: block;
  width: 100%;
  height: 100%
}
</style>
