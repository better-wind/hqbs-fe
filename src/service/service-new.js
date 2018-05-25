import config from './config'
import request, { httpRequest } from './request'
let conf

export default {
  getNewItemList (options = {}) {
  	options.method = 'POST'
    options.url = '/ygg-hqbs/hqbsHomeInfo/editList'
    options.headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    options.data = options.data
    return httpRequest(options)
  },
}
