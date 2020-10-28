<template>
    <div>
      <el-form :model="form" label-width="100px">
        <el-form-item label="素材名：">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item v-if="showMaskMain.label === '跑马灯'" label="内容：">
          <el-input v-model="form.content"></el-input>
        </el-form-item>
        <el-form-item v-if="showMaskMain.label === '天气'" label="地区：">
          <region-code ref="region" @handleChange = setRegionCode></region-code>
        </el-form-item>
        <el-form-item v-if="showMaskMain.label === '时间'" label="格式：">
          <el-select v-model="form.content" placeholder="时间格式">
            <el-option
              v-for="item in timeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="字体大小：">
          <el-select v-model="form.fontSize" placeholder="选择字体大小">
            <el-option
              v-for="item in fontSizeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value" :style="{'font-size': item.size}">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="字体颜色：">
          <el-color-picker v-model="form.fontColor" :predefine="predefineColors" show-alpha></el-color-picker>
        </el-form-item>
        <el-form-item label="背景颜色：">
          <el-switch
            style="display: block; margin: 10px 0"
            v-model="hasColor"
            active-color="#1890ff"
            inactive-color="#b0abab8c"
            active-text="选色"
            inactive-text="透明背景">
          </el-switch>
          <el-color-picker v-if="hasColor" v-model="form.backgroundColor" :predefine="predefineColors" show-alpha></el-color-picker>
        </el-form-item>
        <el-form-item v-if="showMaskMain.label !== '天气'"   label="示例：">
          <div class="div" :style="styles">
            {{form.content}}
          </div>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
import RegionCode from '../../../../../components/RegionCode'
import sourceService from '../../sourceService'
export default {
  name: 'TextSource',
  components: {
    RegionCode
  },
  props: {
    showMaskMain: [String, Object]
  },
  inject: {
    EditListData: {
      default: () => {}
    }
  },
  data () {
    return {
      hasColor: true,
      form: {
        name: '',
        fontSize: '',
        fontColor: '',
        backgroundColor: '',
        content: '',
        strFloat: 1
      },
      styles: {
        color: '',
        fontSize: '',
        backgroundColor: ''
      },
      fontSizeOptions: [{
        value: '24',
        label: '字体大小 12px',
        size: '12px'
      }, {
        value: '28',
        label: '字体大小 14px',
        size: '14px'
      }, {
        value: '32',
        label: '字体大小 16px',
        size: '16px'
      }, {
        value: '40',
        label: '字体大小 20px',
        size: '20px'
      }],
      timeOptions: [{
        value: 'yyyy-MM-dd HH:mm:ss',
        label: 'yyyy-MM-dd HH:mm:ss'
      }, {
        value: 'yyyy-MM-dd HH:mm',
        label: 'yyyy-MM-dd HH:mm'
      }, {
        value: 'yyyy-MM-dd HH',
        label: 'yyyy-MM-dd HH'
      }],
      predefineColors: [
        '#ff4500',
        '#ff8c00',
        '#ffd700',
        '#90ee90',
        '#00ced1',
        '#1e90ff',
        '#c71585'
      ]
    }
  },
  watch: {
    form: {
      handler (n, o) {
        this.styles.color = n.fontColor
        this.styles.fontSize = n.fontSize + 'px'
        this.styles.backgroundColor = n.backgroundColor
      },
      deep: true
    }
  },
  methods: {
    setRegionCode (data) {
      console.log(data)
      this.form.content = data
    },
    valBack () {
      this.$data.form.fontColor = this.colorRGBtoHex(this.form.fontColor)
      this.$data.form.backgroundColor = this.hasColor ? this.colorRGBtoHex(this.form.backgroundColor, 1) : '#fff0'
      const flag = sourceService.checkFormVal(this.$data.form)
      if (flag) {
        return this.$data.form
      } else {
        return false
      }
    },
    colorRGBtoHex (color, bg) {
      if (color.indexOf('#') === 0) {
        return color
      } else {
        var values = color
          .replace(/rgba?\(/, '')
          .replace(/\)/, '')
          .replace(/[\s+]/g, '')
          .split(',')
        var a = parseFloat(values[3] || 1),
          r = Math.floor(a * parseInt(values[0]) + (1 - a) * 255),
          g = Math.floor(a * parseInt(values[1]) + (1 - a) * 255),
          b = Math.floor(a * parseInt(values[2]) + (1 - a) * 255)
        if (bg) { this.$data.form.strFloat = a }
        // console.log(a, r, g, b)
        return '#' +
          ('0' + r.toString(16)).slice(-2) +
          ('0' + g.toString(16)).slice(-2) +
          ('0' + b.toString(16)).slice(-2)
      }
    },
    colorHextoRGB (sColor, opacity = 1) {
      let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
      // console.log(sColor)
      sColor = sColor.toLocaleLowerCase()
      if (sColor && reg.test(sColor)) {
        if (sColor.length === 4) {
          var sColorNew = '#'
          for (var i = 1; i < 4; i += 1) {
            sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1))
          }
          sColor = sColorNew
        }
        // 处理六位的颜色值
        var sColorChange = []
        for (let i = 1; i < 7; i += 2) {
          sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)))
        }
        return `rgba( ${sColorChange.join(',')}, ${opacity} )`
      } else {
        return sColor
      }
    },
    editInit (list) {
      this.form.strFloat = list.strFloat
      this.form.name = list.materialPriceName
      this.form.content = list.materialPriceUrl
      if (this.showMaskMain.label === '天气') {
        this.$refs.region.value = list.materialPriceUrl
      }
      this.form.fontSize = list.materialPriceStatus.toString()
      if (list.resolutionPower !== '') {
        this.hasColor = false
        this.form.fontColor = ''
      } else {
        this.hasColor = true
        this.form.fontColor = list.resolutionPower
      }
      this.form.fontColor = list.resolutionPower
      this.form.backgroundColor = this.colorHextoRGB(list.materialPriceSize, list.strFloat)
    }
  },
  mounted () {
    const list = this.EditListData.editList
    if (JSON.stringify(list) !== '{}') {
      this.editInit(list)
    }
  },
  beforeDestroy () {
    this.$parent.$emit('clearEditData')
  }
}
</script>

<style lang="scss" scoped>
  .div{
    width: 100%;
    height: 100px;
    overflow: hidden;
  }
</style>
