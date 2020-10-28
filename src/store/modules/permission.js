import { asyncRoutesMap, commonRouterMap } from '@/router'

function hasPermission (roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}
export function filterAsyncRoutes (routes, roles) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      if (tmp.hidden && typeof tmp.hidden !== 'boolean') {
        tmp.hidden = !!tmp.hidden.includes(roles)
      }
      res.push(tmp)
    }
  })
  return res
}
const state = {
  routers: commonRouterMap,
  addRouters: []
}
const mutations = {
  SET_ROUTES: (state, routers) => {
    state.addRouters = routers
    state.routers = commonRouterMap.concat(routers)
  }
}
const getters = {
  getaddRouters: state => state.addRouters,
  getrouters: state => state.routers
}

const actions = {
  generateRoutes ({ commit }, roles) {
    return new Promise(resolve => {
      const accessedRoutes = filterAsyncRoutes(asyncRoutesMap, roles)
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
