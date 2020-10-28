<template>
  <div class="items-wrapper">
    <span class="hoverColor" @click="delSelectItem"><i class="el-icon-circle-close"></i></span>
    <el-form  v-if="update" ref="form" size="mini" :model="form" label-width="80px">
      <el-form-item style="padding-top: 30px" label="素材名">
        <el-col :span="15">
          <span class="items-title">{{itemsInfo.materialPriceName}}</span>
        </el-col>
        <el-col :span="7" :offset="2">
          <span>类型:</span> <span v-for="item in sourceType" :key="item.typeId"  v-if="itemsInfo.materialPriceType === item.typeId" >{{item.label}}</span>
        </el-col>
      </el-form-item>
      <el-form-item label="播放日期">
        <el-col :span="24">
          <el-date-picker
            v-model="form.date"
            type="daterange"
            range-separator="至"
            value-format="yyyy-MM-dd"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="播放时间">
        <el-col :span="24">
          <el-time-picker
            is-range
            value-format="HH:mm:ss"
            v-model="form.time"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围">
          </el-time-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="播出类型">
        <el-radio-group v-model="form.detailType">
          <el-radio label="0">主播</el-radio>
          <el-radio label="1">定时插播</el-radio>
          <el-radio label="2">垫片</el-radio>
        </el-radio-group>
      </el-form-item>
      <div v-if="itemsInfo.materialPriceType === 3 || itemsInfo.materialPriceType === 4 || itemsInfo.materialPriceType === 5">
        <el-form-item label="播放音量">
          <el-col :span="21" :offset="1">
            <el-slider v-model="form.volValue" :min="1" :max="15" :format-tooltip="formatTooltip"></el-slider>
          </el-col>
        </el-form-item>
      </div>
      <div v-if="itemsInfo.materialPriceType===2 || itemsInfo.materialPriceType === 6">
        <el-form-item label="播放速度">
          <el-col :span="21" :offset="1">
            <el-slider v-model="form.speedValue" :min="1" :max="5" :format-tooltip="formatTooltip"></el-slider>
          </el-col>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'SelectItemsDetails',
  props: {
    itemsInfo: Object,
    index: Number
  },
  data () {
    return {
      update: true,
      form: {
        index: this.index,
        name: this.itemsInfo.materialPriceName,
        materialPriceId: this.itemsInfo.materialPriceId,
        time: ['08:00:00', '18:00:00'],
        date: [new Date(), new Date()],
        detailType: '',
        volValue: 1,
        speedValue: 1
      },
      sourceType: [
        { label: '图片', sign: 'img', typeId: 2 },
        { label: '视频', sign: 'video', typeId: 3 },
        { label: '网页', sign: 'web', typeId: 4 },
        { label: '直播流', sign: 'live', typeId: 5 },
        { label: '跑马灯', sign: 'text', typeId: 6 },
        { label: '天气', sign: 'text', typeId: 7 },
        { label: '时间', sign: 'text', typeId: 8 },
        { label: '二维码', sign: 'code', typeId: 9 }
      ]
    }
  },
  methods: {
    formatTooltip (val) {
      return val
    },
    delSelectItem () {
      this.$emit('delSelectedItems')
    },
    clearPageVal () {
      this.form = {
        time: [new Date(), new Date()],
        Date: [new Date(), new Date()],
        detailType: '',
        volValue: 1,
        speedValue: 1
      }
    }
  },
  mounted () {
    setTimeout(() => {
      this.update = false
      // 在组件移除后，重新渲染组件
      // this.$nextTick可实现在DOM 状态更新后，执行传入的方法。
      this.$nextTick(() => {
        this.update = true
      })
    }, 500)
  }
}
</script>

<style lang="scss" scoped>
.items-wrapper{
  width: 96%;
  border: 1px solid #cbcbcb;
  padding: 10px;
  margin-top: 15px;
  border-radius: 3px;
  /*border-bottom: 1px solid #cbcbcb;*/
  .hoverColor{
    display: none;
  }
}
.items-wrapper:hover{
  .hoverColor{
    display: inline-block;
    position: relative;
    float: right;
    font-size: 25px;
    color: #cbcbcb;
  }
}
.items-title{
  width: 100%;
  display: inline-block;
  border-bottom: 1px solid #cbcbcb;
  font-weight: bold;
}
.date-input{
  width: 100%;
}
.el-date-editor--daterange.el-input__inner,.el-date-editor--timerange.el-input__inner{
  width: 100%;
}
</style>
