import Vue from 'vue'
import Vuex from 'vuex'
import state from './gather/state'
import mutations from './gather/mutations'
import actions from './gather/actions'
import getters from './gather/getters'
import app from './modules/app'
import user from './modules/user'
import permission from './modules/permission'
Vue.use(Vuex)

// const modulesFiles = require.context('./modules', true, /\.js$/)
//
// const modules = modulesFiles.keys().reduce((modules, modulePath) => {
//   const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
//   const value = modulesFiles(modulePath)
//   modules[moduleName] = value.default
//   return modules
// }, {})

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    app,
    user,
    permission
  }
})
