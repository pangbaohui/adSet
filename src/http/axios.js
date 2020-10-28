import axios from 'axios'
import Message from 'element-ui/packages/message/src/main'
import * as API from '@/http/allPaths'
import { getToken } from '../utils/auth'

axios.defaults.timeout = 60 * 1000

axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8'

// 请求
axios.interceptors.request.use(
  config => {

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应
axios.interceptors.response.use(
  res => {
    if (res.data.retcode === 0) {
      return res.data
    } else if (res.data.retcode === 10001) {
      Message.warning(res.data.returnMsg)
    } else {
      return res.data
    }
  },
  error => {
    console.log(error)
    if (error && error.response) {
      httpStatus(error)
    } else {
      Message.warning('未能与服务器连接')
    }
  }
)

// post
export function post (urlName, data, header, token) {
  return new Promise((resolve, reject) => {
    const url = urlName.length > 20 ? urlName : API[urlName]
    if (token) {
      header.CLIENT_TOKEN = getToken()
    }
    axios.post(url, data,
      { headers: header })
      .then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
  })
}

// get
export function get (urlName) {
  const url = API[urlName]
  return new Promise((resolve, reject) => {
    axios.get(url)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

// http状态处理
const httpStatus = (error) => {
  switch (error.response.status) {
    case 400:
      Message.warning('语义有误，当前请求无法被服务器理解')
      break
    case 401:
      Message.warning('未授权，请重新登录')
      break
    case 403:
      Message.warning('拒绝访问')
      break
    case 404:
      Message.warning('请求的资源未找到')
      break
    case 500:
      Message.warning('服务器遇到了一个未曾预料的状况，导致了它无法完成对请求的处理')
      break
    case 501:
      Message.warning('服务器不支持当前请求所需要的某个功能')
      break
    case 502:
      Message.warning('作为网关或者代理工作的服务器尝试执行请求时，从上游服务器接收到无效的响应')
      break
    case 503:
      Message.warning('由于临时的服务器维护或者过载，服务器当前无法处理请求')
      break
    default:
      Message.warning(`${error.response.status}`)
  }
}
