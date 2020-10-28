import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../layout'
import { getToken } from '../utils/auth'
import store from '../store'
import login from '../views/login/index'

Vue.use(VueRouter)

export const commonRouterMap = [
  {
    path: '/login',
    name: 'login',
    component: login,
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    // name: 'Home',
    hidden: true,
    children: [
      {
        path: 'home',
        component: () => import('../views/home/index')
      }
    ]
  }
]

export const asyncRoutesMap = [
  {
    path: '/home',
    component: Layout,
    meta: { title: '主页', icon: 'el-icon-menu' }
  },
  {
    path: '/release',
    component: Layout,
    redirect: '/release',
    // name: 'Release',
    meta: {
      title: '发布模块',
      icon: 'el-icon-position',
      role: ['1']
    },
    children: [
      {
        path: 'source',
        // name: 'Source',
        component: () => import('../views/release/source/index'),
        meta: { title: '素材管理', role: ['1'] }
      },
      {
        path: 'template',
        // name: 'Template',
        component: () => import('../views/release/template/index'),
        meta: { title: '模板管理', role: ['1'] }
      },
      {
        path: 'play',
        // name: 'Play',
        component: () => import('../views/release/play/index'),
        meta: { title: '播出管理', role: ['1'] }
      },
      {
        path: 'terminal',
        // name: 'Play',
        component: () => import('../views/release/terminal/index'),
        meta: { title: '终端管理', role: ['1'] }
      }
    ]
  },
  {
    path: '/error',
    // name: 'Error',
    component: () => import('@/views/error-page/index'),
    hidden: true
  },
  { path: '*', redirect: '/error', hidden: true }
]
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
const createRouter = () => new VueRouter({
  mode: 'hash',
  routes: getToken() ? commonRouterMap.concat(asyncRoutesMap) : commonRouterMap
})
const router = createRouter()

const LOGIN_PAGE_NAME = '/login'
router.beforeEach((to, from, next) => {
  const token = getToken()
  if (token && to.path === LOGIN_PAGE_NAME) {
    next({ path: '/home' })
  } else if (token && to.path !== LOGIN_PAGE_NAME) {
    if (router.options.routes.length === 2 || store.getters.getaddRouters.length === 0) {
      const roles = '1'
      store.dispatch('generateRoutes', { roles }).then(res => {
        router.options.routes = res
        router.addRoutes(store.getters.getaddRouters)
        next({ ...to, replace: true })
      })
    } else {
      next()
    }
  } else if (!token && to.path === LOGIN_PAGE_NAME) {
    next()
  } else {
    next({
      path: LOGIN_PAGE_NAME
    })
  }
})

export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}
export default router
