<template>
  <el-cascader
    v-model="value"
    :options="options"
    :props="{ expandTrigger: 'hover' }"
    @change="handleChange"></el-cascader>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'RegionCode',
  computed: {
    ...mapState({
      regionArr: state => state.regionCode
    })
  },
  data () {
    return {
      value: '',
      options: []
    }
  },
  methods: {
    handleChange (value) {
      this.$emit('handleChange', value[value.length - 1])
    }
  },
  mounted () {
    this.options = this.regionArr[0].children
  }
}
</script>

<style scoped>

</style>
