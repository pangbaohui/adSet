import Vue from 'vue'

// 获取七牛的token
export function getUploadToken () {
  return Promise.resolve(Vue.prototype.get('GET_TOKEN_URL'))
}

//  file 对象上传七牛
export function httpUpOneImg (file) {
  // 生成随机字符串
  const url = 'http://up.qiniu.com/key/'
  return new Promise((resolve, reject) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('key', `AdSetting_${file.name}`)
    getUploadToken().then((res) => {
      formData.append('token', res.uptoken)// 七牛需要的token，叫后台给，是七牛账号密码等组成的hash
      Vue.prototype.post(url, formData).then(res => {
        resolve(res)
      })
    }).catch(err => {
      console.log(err)
    })
  })
}
// 图片分辨率
export function picturePixel (Curl) {
  const image = new Image()
  image.src = Curl
  return `${image.naturalWidth}*${image.naturalHeight}`
}
