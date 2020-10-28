import Vue from 'vue'

function user (data) {
  const header = { 'TOKEN_TYPE': '1' }
  return Promise.resolve(Vue.prototype.post('USER', data, header))
}

export default {
  user: user
}
