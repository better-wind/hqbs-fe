import {TESTAPPID, APPID, COOKIEKEY} from './constants'
import storage from './storage-lite'
import router from '../router'
import Tools from './tools'
import config from '@/service/config'
import request from '@/service/request'

const AUTH_DATA = 'authData'
const location = window.location

const getCookie = name => {
  let arr = document.cookie.match(new RegExp('(^| )' + name + '=([^;]*)(;|$)'))
  if (arr != null) return unescape(arr[2])
  return null
}
const ua = navigator.userAgent.toLowerCase();
export const isWx = (/MicroMessenger/i).test(window.navigator.userAgent.toLowerCase())

export default {
  name: 'auth',
  /**
   *
   * @return {[type]} [description]
   */
  getAuthData () {
    return storage.get(AUTH_DATA)
  },
  /**
   * isLoggedIn
   * @return {Boolean} [description]
   */
  isLoggedIn () {
    return getCookie(COOKIEKEY) === '1'
  },
  /**
   * 微信授权
   * @return {[type]} [description]
   */
  wxLogin () {
    const appid = location.hostname.startsWith('test') ? TESTAPPID : APPID
    storage.set('HQBSREDIRECT',window.location.pathname)
    const url = encodeURIComponent(`${location.origin}${window.routerPrefix}/wxauth`)
    window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${url}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
  },
  /**
   * 登录
   * @return {[type]} [description]
   */
  login (redirectUrl) {
    if (!this.isLoggedIn()) {
      if (isWx) {
        this.wxLogin()
      } else if (Tools.isApp) {
        window.location.href = 'ggj://redirect/typeCommon/{"type":6}'
      } else {
        let _query = redirectUrl ? '?redirect_url=' + encodeURIComponent(redirectUrl) : ''
        router.push(
          {
            path: window.routerPrefix + '/login' + _query
          }
        )
      }
    }
  },

  loginByCode (code) {
    let _this = this
    let conf = new config()
    conf.data = {code:code}
    conf.url = '/ygg-hqbs/account/separateLoginByCode'
    new request(conf).POST().then((data) => {
      const _redirect = storage.get('HQBSREDIRECT')
      storage.remove('HQBSREDIRECT')
      switch (Number(data.status)) {
        case 1:
          router.push(
            {
              path: _redirect
            }
          )
          break
        case 5:
          router.push(
            {
              path: '/'
            }
          )
          // window.location.href = '/'
          break
        case 7:
          router.push(
            {
              path: window.routerPrefix + '/login/bound?redirect_url=' + _redirect
            }
          )
          // window.location.href = window.routerPrefix + '/login/bound?redirect_url=' + _redirect
          break
        case 8:
          if (data.tid) {
            _this.setTid(data.tid, _redirect)
          } else {
            router.push(
              {
                path: window.routerPrefix + '/login/introducer?redirect_url=' + _redirect
              }
            )
            // window.location.href = window.routerPrefix + '/login/introducer?redirect_url=' + _redirect
          }
          break
        default:
          router.push(
            {
              path: '/'
            }
          )
          // location.replace(router.fullPath + '&stamp=' + new Date().getTime())
      }
    })
  },

  setTid (id,redirect) {
    let conf = new config()
    conf.data = {tid: id}
    conf.url = '/ygg-hqbs/account/setTid'
    new request(conf).POST().then((data) => {
      if (data.status === 1) {
        router.push(
          {
            path: redirect
          }
        )
        // location.replace(router.fullPath + '&stamp=' + new Date().getTime())
      } else {
        router.push(
          {
            path: window.routerPrefix + '/login/introducer?redirect_url=' + redirect
          }
        )
        // window.location.href = window.routerPrefix + '/login/introducer?redirect_url=' + router.fullPath
      }
    })
  }
}
