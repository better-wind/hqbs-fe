import types from './types'
import config from '@/service/config'
import request from '@/service/request'

export default {
  /**
   * getAddress 获取区号信息
   * @param  {Function} options.commit [description]
   * @param  {Object} options        [description]
   * @return {Promise}                [description]
   */
  getAddress ({commit}, options={}) {
    const {data = null} = options
    let conf = new config()
    conf.data = data
    conf.url = `/ygg-hqbs/account/logadlist`
    return new request(conf).POST().then((data) => {
      commit(types.GET_ADDRS, { data: data })
    })
  },
  /**
   * 获取验证码
   * @param  {[type]} options.commit [description]
   * @param  {Object} options        [description]
   * @return {[type]}                [description]
   */
  getCode ({commit}, options={}) {
    const {data = null} = options
    let conf = new config()
    conf.data = data
    conf.url = `/ygg-hqbs/user/sendBoundCode`
    return new request(conf).POST()
  },
  /**
   * 登录
   * @param  {[type]} options.commit [description]
   * @param  {Object} options        [description]
   * @return {[type]}                [description]
   */
  goLogin ({commit}, options={}) {
    const {data = null} = options
    let conf = new config()
    conf.data = data
    conf.url = `/ygg-hqbs/account/loginAjax`
    return new request(conf).POST()
  },

  changeAddr ({commit}, addrNo='86') {
    commit(types.CHANGE_ADDRNO, { addrNo: addrNo })
  },
  /**
   * 获取用户信息
   * @param  {[type]} options.commit [description]
   * @param  {Object} options        [description]
   * @return {[type]}                [description]
   */
  getUserInfo ({commit}, options={}) {
    const {data = null} = options
    let conf = new config()
    conf.data = data
    conf.url = `/ygg-hqbs/account/getUserInfo`
    return new request(conf).POST().then((data) => {
      commit(types.GET_USERINFO, { data: data.userInfo })
      return Promise.resolve(data)
    })
  },
  /**
   * 设置推荐人
   * @param {[type]} options.commit [description]
   * @param {Object} options        [description]
   */
  setTid ({commit}, options={}) {
    const {data = null} = options
    let conf = new config()
    conf.data = data
    conf.url = `/ygg-hqbs/account/setTid`
    return new request(conf).POST()
  },
  /**
   * 绑定手机号
   * @param  {[type]} options.commit [description]
   * @param  {Object} options        [description]
   * @return {[type]}                [description]
   */
  boundMobile ({commit}, options={}) {
    const {data = null} = options
    let conf = new config()
    conf.data = data
    conf.url = `/ygg-hqbs/account/boundMobile`
    return new request(conf).POST()
  },
  /**
   * 获取账号信息
   * @param  {[type]} options.commit [description]
   * @param  {Object} options        [description]
   * @return {[type]}                [description]
   */
  getAccount ({commit}, options={}) {
    const {data = null} = options
    let conf = new config()
    conf.data = data
    conf.url = `/ygg-hqbs/account/bindAccount`
    return new request(conf).POST().then(data => {
      if(data.status==1){
        commit(types.GET_ACCOUNT, { data: data.accountInfo })
      }
    })
  },
  /**
   * 账户校验
   * @param  {[type]} options.commit [description]
   * @param  {Object} options        [description]
   * @return {[type]}                [description]
   */
  checkAccount ({commit}, options={}) {
    const {data = null} = options
    let conf = new config()
    conf.data = data
    conf.url = `/ygg-hqbs/account/checkAccount`
    return new request(conf).POST()
  },
  /**
   * 使用新账号登录
   * @param  {[type]} options.commit [description]
   * @param  {Object} options        [description]
   * @return {[type]}                [description]
   */
  loginDirect ({commit}, options={}) {
    const {data = null} = options
    let conf = new config()
    conf.data = data
    conf.url = `/ygg-hqbs/account/loginDirectAjax`
    return new request(conf).POST()
  },
}
