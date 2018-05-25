import Qs from 'qs'
import consts from '@/config/consts'
import auth from '@/utils/auth'

export default class {
  constructor() {
    this.baseURL = consts.API_URL
    this.url = ''
    this.method = 'GET'
    /*this.transformRequest = [
      function(data) {
        return JSON.stringify(data);
      }
    ]*/

    this.transformResponse = [
      function(data) {
        return data;
      }
    ]

    this.authData = auth.getAuthData()

    this.headers = {
      'Authorization': !!this.authData && !!this.authData.accessToken ? 'bearer ' + this.authData.accessToken : '',
      'Accept': 'application/json,text/html',
      'Content-Type': 'application/json;charset=UTF-8'
    }

    this.params = {} //GET 参数
    this.paramsSerializer = function(params) {
      return Qs.stringify(params)
    }
    this.data = {} //POST/PUT/DELETE 参数

    this.timeout = 10000
    this.withCredentials = false // default
    this.responseType = 'json' // default

    this.maxContentLength = 2000
    this.validateStatus = function(status) {
      return status >= 200 && status < 500; // default
    }
    this.maxRedirects = 5 // default

    /*********自定义************/
    /**
     * 添加 headers
     * @param  {Object} headers
     */
    this.addHeaders = (headers) => {
        this.headers = {
          ...this.headers,
          ...headers
        }
      }
      /**
       * [description]
       * @param  {String} path
       */
    this.addPath = (path = '') => {
      this.url = this.url + '/' + path
    }
    this.isTakeQueryString = true
  }

}
