import { getToken, setToken, removeToken } from '../../utils/auth'
import userApi from '@/views/login/loginService'
import Vue from 'vue'
const state = {
  token: getToken(),

  roles: [],
  nickName: '',
  userId: '',
  userName: '',
  userPass: '',
  userStatus: ''
}
const mutations = {
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USER_NAME: (state, userName) => {
    state.userName = userName
  },
  SET_NICK_NAME: (state, nickName) => {
    state.nickName = nickName
  },
  SET_USER_PASS: (state, userPass) => {
    state.userPass = userPass
  },
  SET_USER_STATUS: (state, userPass) => {
    state.userPass = userPass
  }
}

const actions = {
  login ({ dispatch, commit }, userInfo) {
    return new Promise((resolve, reject) => {
      userApi.user(userInfo).then(res => {
        const { data } = res
        commit('SET_TOKEN', data.token)
        commit('SET_NICK_NAME', data.nickName)
        commit('SET_USER_NAME', data.userName)
        commit('SET_USER_PASS', data.userPass)
        setToken(data.userToken)
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },
  logout ({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      // logout(state.token).then(() => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      localStorage.clear()
      sessionStorage.clear()
      resolve()
      // }).catch(error => {
      //   reject(error)
      // })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
