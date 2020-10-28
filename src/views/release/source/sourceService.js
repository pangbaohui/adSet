import Vue from 'vue'
import { getYMDHMS } from '@/utils/tools.js'
import { httpUpOneImg, picturePixel, getUploadToken } from '../../../utils/uploadimg'
class TableData {
  constructor (data) {
    this.data = data
  }

  get showCollapse () {
    return this.data.total === 0
  }

  get imgList () { // 图片
    return this.screenList(2)
  }

  get videoList () { // 视频
    return this.screenList(3)
  }

  get webList () { // 网页
    return this.screenList(4)
  }

  get liveList () { // 直播
    return this.screenList(5)
  }

  get lampList () { // 跑马灯
    return this.screenList(6)
  }

  get weatherList () { // 天气
    return this.screenList(7)
  }

  get timeList () { // 时间
    return this.screenList(8)
  }

  get codeList () { // 二维码
    return this.screenList(9)
  }

  screenList (status) {
    const arr = Object.values(this.data.rows)
    var list = []
    arr.filter(value => {
      if (value.materialPriceType === status) {
        if (value.materialMdstring === '1') {
          value.materialMdstring = 'el-icon-warning-outline'
        } else if (value.materialMdstring === '0') {
          value.materialMdstring = 'el-icon-circle-check'
          value.iconColor = '#6dac5e'
        }
        if (status !== 6 && status !== 7 && status !== 8) {
          value.imgurl = value.materialPriceUrl.split(',')
        }
        value.registerTime = getYMDHMS(value.registerTime)
        list.push(value)
      }
    })
    return list.length > 0 ? list : false
  }
}

function getMaterialType (data) {
  const header = { TOKEN_TYPE: '1' }
  return Promise.resolve(Vue.prototype.post('GET_MATERIAL_TYPE', data, header, 1))
}
function getMaterialPrice (data) {
  const header = { TOKEN_TYPE: '1' }
  return Promise.resolve(Vue.prototype.post('GET_MATERIAL_PRICE', data, header, 1))
}
// 校验表单是否为空
function checkFormVal (data) {
  let l = Object.keys(data).length
  for (const [k, v] of Object.entries(data)) {
    console.log(v)
    console.log(typeof v)
    if (!v) {
      return false
    } else if (JSON.stringify(v) === '[]') {
      return false
    } else {
      l--
      console.log(l)
      if (l <= 0) {
        return true
      }
    }
  }
}
function * beforeLoopUp (data) {
  var imgUrl = []
  for (const [k, v] of Object.entries(data.files)) {
    if (v.raw) {
      yield httpUpOneImg(v.raw).then(res => {
        imgUrl.push(`http://cdn.szpuze.com/${res.key}`)
        if (parseInt(k) === (data.files.length - 1)) {
          isBack()
        }
      })
    } else {
      imgUrl.push(v.url)
      if (parseInt(k) === (data.files.length - 1)) {
        isBack()
      }
    }
  }
  function isBack () {
    addData.postData.data.materialPriceUrl = imgUrl.join(',')
    const func = data.funcName
    // eslint-disable-next-line no-eval
    eval(`${func}()`)
  }
}

function loopUp (data) {
  const l = beforeLoopUp(data)
  let count = data.files.length
  const countdown = setInterval(countDown, 500)
  function countDown () {
    if (count === 0) {
      clearInterval(countdown)
    }
    count--
    l.next()
  }
}

var o = {
  postData: {
    method: 'add',
    data: {
      materialPriceName: '', // 素材名称
      materialPriceUrl: '', // 素材路径
      materialTypeId: '', // 素材分类标识
      materialPriceSize: '', // 图片大小 多少kb
      resolutionPower: '', // 图片分辨率
      materialPriceStatus: '', // 字体大小
      materialPriceId: '', // 更新时需要的ID
      strFloat: '', // 设置颜色的透明度
      materialPriceType: 2 // （图片2、视频3、网页4、直播为5、跑马灯6、天气7、时间8、二维码9）
    }
  }
}
var addData = new Proxy(o, {
  get (target, key) {
    return target[key]
  }
})

export default {
  getMaterialType,
  TableData,
  getMaterialPrice,
  loopUp,
  addData,
  picturePixel,
  getUploadToken,
  checkFormVal
}
