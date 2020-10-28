import Vue from 'vue'

class NestingTree {
  constructor (data, treeType) {
    this.data = data
    this.treeType = treeType
  }

  list (list) {
    let id = ''
    let name = ''
    if (this.treeType === 'model') {
      id = 'templateContentTypeId'
      name = 'templateContentTypeName'
    } else if (this.treeType === 'items') {
      id = 'materialTypeId'
      name = 'materialName'
    }
    list.filter((value, arr) => {
      value.id = value[id]
      value.label = value[name]
      if (value.isParent === 1) {
        value.isleaf = true
      } else {
        value.isleaf = false
      }
    })
    return list
  }

  get firstList () { // 文件树
    if (this.data) {
      let list = [this.data]
      list = this.list(list)
      return list
    }
  }

  get children () {
    let child = this.data.rows
    child = this.list(child)
    return child
  }
}
function loadingTree (id, type) {
  const postData = {
    method: 'listByUser',
    data: {
      id: id
    }
  }
  return getApi(postData, type)
}
function getApi (data, type) {
  const header = { TOKEN_TYPE: '1' }
  let url = ''
  if (type === 'model') {
    url = 'GET_TEMPLATE_CONTENT'
  } else if (type === 'items') {
    url = 'GET_MATERIAL_TYPE'
  }
  return Promise.resolve(Vue.prototype.post(url, data, header, 1))
}
export default {
  NestingTree,
  loadingTree
}
