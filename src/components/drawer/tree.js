import Vue from 'vue'

class FileTree {
  constructor (data, treeType) {
    this.data = data
    this.treeType = treeType
  }

  list (list) {
    let id = ''
    let name = ''
    if (this.treeType === 'source') {
      id = 'materialTypeId'
      name = 'materialName'
    } else if (this.treeType === 'template') {
      id = 'templateContentTypeId'
      name = 'templateContentTypeName'
    } else if (this.treeType === 'play') {
      id = 'machineTemplateTypeId'
      name = 'machineTemplateTypeName'
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
function addTree (id, type) {
  const postData = {
    method: 'addofUpdate',
    data: {
      id: id, // 父类id
      name: '新建文件',
      requestType: 3
    }
  }
  return getApi(postData, type)
}
function updateTree (id, name, type) {
  const postData = {
    method: 'addofUpdate',
    data: {
      id: id,
      name: name
    }
  }
  return getApi(postData, type)
}
function delTree (id, type) {
  const postData = {
    method: 'addofUpdate',
    data: {
      id: id,
      requestType: 2
    }
  }
  return getApi(postData, type)
}
function getApi (data, type) {
  const header = { TOKEN_TYPE: '1' }
  let url = ''
  if (type === 'source') {
    url = 'GET_MATERIAL_TYPE'
  } else if (type === 'template') {
    url = 'GET_TEMPLATE_CONTENT'
  } else if (type === 'play') {
    url = 'GET_CONTENT_TYPE'
  }
  return Promise.resolve(Vue.prototype.post(url, data, header, 1))
}

export default {
  loadingTree,
  addTree,
  updateTree,
  delTree,
  FileTree
}
