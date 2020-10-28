import Vue from 'vue'

function getContentType (data) {
  return total('GET_CONTENT_TYPE', data)
}
function getMachine (data) {
  return total('GET_MACHINE', data)
}
function total (url, data) {
  const header = { TOKEN_TYPE: '1' }
  return Promise.resolve(Vue.prototype.post(url, data, header, 1))
}
export default {
  getContentType,
  getMachine
}
