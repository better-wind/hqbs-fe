import config from './config'
import request, { httpRequest } from './request'
let conf

export default {
  getFirstCategoryList (options = {}) {
    // options.method = 'POST'
    // options.url = '/ygg-hqbs/mall/firstCategory'
    // return httpRequest(options)
    const {id = ''} = options
    conf = new config()
    conf.url = '/ygg-hqbs/mall/firstCategory'
    return new request(conf).POST()
  },
  getFirstCategoryDetail (options = {}) {
    // options.method = 'POST'
    // options.url = '/ygg-hqbs/mall/firstCategory'
    // return httpRequest(options)
    const {id = ''} = options
    conf = new config()
    conf.url = '/ygg-hqbs/mall/firstCategoryDetail?id='+id
    return new request(conf).POST()
  },
  getBrandDetail (options = {}) {
    // options.method = 'POST'
    // options.url = '/ygg-hqbs/mall/firstCategory'
    // return httpRequest(options)
    const {id = ''} = options
    conf = new config()
    conf.url = '/ygg-hqbs/mall/firstCategoryBrandDetail?id='+id
    return new request(conf).POST()
  },
  getSecondCategoryList (options = {}) {
    const {id='',type='',fId=''} = options
    conf = new config()
    conf.url = '/ygg-hqbs/mall/secondCategory?id='+id+'&type='+type+'&fId='+fId
    return new request(conf).POST()
  },
  getProductList (options = {}) {
    options.method = 'POST'
    options.url = '/ygg-hqbs/mall/productMallList'
    options.headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    options.data = options.data
    return httpRequest(options)
  }
}
