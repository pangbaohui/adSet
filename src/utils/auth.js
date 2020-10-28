import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const UpTokenKey = 'Up-Token'

export function getToken () {
  return Cookies.get(TokenKey)
}
export function getUpToken () {
  return Cookies.get(UpTokenKey)
}

export function setToken (token) {
  return Cookies.set(TokenKey, token)
}
export function setUpToken (token) {
  return Cookies.set(UpTokenKey, token)
}

export function removeToken () {
  return Cookies.remove(TokenKey)
}
