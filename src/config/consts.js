import ENV, { DEV, TEST, PROD } from './env'

// HOST
const HOST = window.location.host
// HOSTNAME
const HOSTNAME = window.location.hostname
// BASE_URL
const BASE_URL = (() => {
  switch (ENV) {
    case TEST:
      return ''
    case PROD:
      return '' // '//wx.51bushou.com';//
    case DEV:
      return ''
    default:
      return ''
  }
})()

// 接口地址
const API_URL = BASE_URL + ''
// 分页大小
const PAGE_SIZE = 10
// 网站标题
const TITLE = '环球捕手'

export default {
  BASE_URL,
  API_URL,
  PAGE_SIZE,
  TITLE
}
