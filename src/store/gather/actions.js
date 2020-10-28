import Vue from 'vue'
function deep (obj) {
  var objClone = Array.isArray(obj) ? [] : {}
  if (obj && typeof obj === 'object') {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (obj[key] && typeof obj[key] === 'object') {
          if (key === 'regionAmps') {
            objClone.children = deep(obj[key])
          } else {
            objClone[key] = deep(obj[key])
          }
        } else {
          if (key === 'regionAmpId') {
            objClone.value = obj[key].toString()
          }
          if (key === 'regionAmpName') {
            objClone.label = obj[key]
          }
          // objClone[key] = obj[key]
        }
      }
    }
  }
  return objClone
}
const actions = {
  getRegionCode ({ commit }) {
    const postData = {
      data: {
        page: -10001
      },
      method: 'listByPage'
    }
    return new Promise((resolve, reject) => {
      Vue.prototype.post('GET_REGION_CODE', postData).then(res => {
        resolve(res.data)
        const data = deep(res.data)
        commit('setRegionCode', data)
      }).catch(err => {
        reject(err)
      })
    })
  }
}
export default actions
