import config from './config'
import request, { httpRequest } from './request'
let conf

export default {
  getQuizzesInfo (options = {}) {
    conf = new config()
    conf.url = '/ygg-hqbs/lottery/answer/info'
    return new request(conf).POST()
  },
  startQuizzes (options = {}) {
    conf = new config()
    conf.url = '/ygg-hqbs/lottery/answer/doDraw'
    return new request(conf).POST()
  },
  getQuizzesSuccess (options = {}) {
    const {sign = ''} = options
    conf = new config()
    conf.url = '/ygg-hqbs/lottery/answer/success?signAnswer='+sign
    return new request(conf).POST()
  },
}
