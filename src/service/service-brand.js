import config from './config'
import request, { httpRequest } from './request'
let conf

export default {
  /**
   * [getBrands description]
   * @param  {Object} options [description]
   * @return {[type]}         [description]
   */
  getBrands: function(options = {}) {
    const {params = null} = options
    conf = new config()
    conf.params = params
    conf.url = `/static/mock/car/car-brand.json`
    return new request(conf).GET()
  },
  /**
   * [getBrand description]
   * @param  {Object} options [description]
   * @return {[type]}         [description]
   */
  getBrand: function(options = {}) {
    const {id = ''} = options
    conf = new config()
    conf.url = `/static/mock/car/car-brand.json`
    return new request(conf).GET()
  },
  /**
   * [postBrand description]
   * @param  {Object} options [description]
   * @return {[type]}         [description]
   */
  postBrand: function(options = {}) {
    const {data = null} = options
    conf = new config()
    conf.data = data
    conf.url = `Brand`
    return new request(conf).POST()
  },
  /**
   * [putBrand description]
   * @param  {Object} options [description]
   * @return {[type]}         [description]
   */
  putBrand: function(options = {}) {
    const {id = '', data = null} = options
    conf = new config()
    conf.data = data
    conf.url = `Brand/${id}`
    return new request(conf).PUT()
  },
  /**
   * [deleteBrand description]
   * @param  {Object} options [description]
   * @return {[type]}         [description]
   */
  deleteBrand: function(options = {}) {
    const {id = '', data = null} = options
    conf = new config()
    conf.data = data
    conf.url = `Brand/${id}`
    return new request(conf).DELETE()
  },

  /**
   * [getBrandsList description]
   * @param  {Object} options [description]
   * @return {[type]}         [description]
   * 暂不使用
   */
  getBrandsList (options = {}) {
    options.method = 'GET'
    options.url = '/static/mock/car/car-brand.json'
    return httpRequest(options)
  }

}
