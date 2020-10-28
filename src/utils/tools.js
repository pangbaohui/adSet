import Moment from 'moment'
// 时间戳转日期
export function getLocalTime (nS) {
  // 1970/1/1 上午8:00
  return new Date(parseInt(nS)).toLocaleString().replace(/:\d{1,2}$/, ' ')
}

export function getFullTime (timeStamp) {
  console.log(timeStamp)
  const stamp = new Date(timeStamp)
  const time = Moment(stamp).format('YYYY-MM-DD HH:mm:ss')
  return time
}

export function getYMDHMS (timestamp) {
  const time = new Date(timestamp)
  const year = time.getFullYear()
  let month = time.getMonth() + 1
  let date = time.getDate()
  let hours = time.getHours()
  let minute = time.getMinutes()
  let second = time.getSeconds()

  if (month < 10) { month = '0' + month }
  if (date < 10) { date = '0' + date }
  if (hours < 10) { hours = '0' + hours }
  if (minute < 10) { minute = '0' + minute }
  if (second < 10) { second = '0' + second }
  return year + '-' + month + '-' + date + ' ' + hours + ':' + minute + ':' + second
}
