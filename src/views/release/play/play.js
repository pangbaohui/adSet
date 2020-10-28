import Vue from 'vue'

function getContentType (data) {
  return total('GET_CONTENT_TYPE', data)
}
function getContent (data) {
  return total('GET_PLAY_CONTENT', data)
}
function getModelTree (data) {
  return total('GET_TEMPLATE_CONTENT', data)
}
function getItemTree (data) {
  return total('GET_MATERIAL_TYPE', data)
}
function getModelDivList (data) {
  return total('GET_SYSTEM_TEMPLATE', data)
}
function getItemsList (data) {
  return total('GET_MATERIAL_PRICE', data)
}
function getItems (data) {
  return total('GET_ONE_PRICE', data)
}
function postTemplateContent (data) {
  return total('GET_PLAY_CONTENT', data)
}
function getDetail (data) {
  return total('GET_PLAY_DETAIL', data)
}
function total (url, data) {
  const header = { TOKEN_TYPE: '1' }
  return Promise.resolve(Vue.prototype.post(url, data, header, 1))
}
export default {
  getContentType,
  getContent,
  getModelTree,
  getModelDivList,
  getItemTree,
  getItemsList,
  postTemplateContent,
  getDetail,
  getItems
}
