import Cookies from 'js-cookie'

const state = {
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    withoutAnimation: false
  },
  sourceDrawerClass: false,
  templateDrawerClass: false,
  playDrawerClass: false,
  terminalDrawerClass: false
}

const mutations = {
  TOGGLE_SIDEBAR: state => {
    // !state.sidebar.opened
    state.sidebar.opened = true
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0)
    // state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  SOURCE_DRAWER_CLASS: (state, drawerClass) => {
    state.sourceDrawerClass = drawerClass
  },
  TEMPLATE_DRAWER_CLASS: (state, drawerClass) => {
    state.templateDrawerClass = drawerClass
  },
  PLAY_DRAWER_CLASS: (state, drawerClass) => {
    state.playDrawerClass = drawerClass
  },
  TERMINAL_DRAWER_CLASS: (state, drawerClass) => {
    state.terminalDrawerClass = drawerClass
  }
}

const actions = {
  toggleSideBar ({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar ({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
