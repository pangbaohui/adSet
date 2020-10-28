import Vue from 'vue'

function getRandomColor () {
  return '#' +
    (function fn (color) {
      return (color += '0123456789abcdef'[Math.floor(Math.random() * 16)]) &&
      (color.length === 6) ? color : fn(color)
    })('')
}
function getTemplateContentType (data) {
  const header = { TOKEN_TYPE: '1' }
  return Promise.resolve(Vue.prototype.post('GET_TEMPLATE_CONTENT', data, header, 1))
}
function getTemplateContent (data) {
  const header = { TOKEN_TYPE: '1' }
  return Promise.resolve(Vue.prototype.post('GET_SYSTEM_TEMPLATE', data, header, 1))
}
function getTemplateTypeDetail (data) {
  const header = { TOKEN_TYPE: '1' }
  return Promise.resolve(Vue.prototype.post('GET_TEMPLATE_DETAIL', data, header, 1))
}
export default {
  getRandomColor,
  getTemplateContent,
  getTemplateTypeDetail,
  getTemplateContentType
}
