import axios from 'axios'
import Qs from 'qs'
import config from './config'
import tools from '@/utils/tools'
import auth from '@/utils/auth'
import uriMap from './auth-url'

export default class HTTP {
  /**
   * [constructor description]
   * @param  {Object} conf [description]
   */
  constructor (conf) {
    const methods = ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
    methods.forEach((method) => {
      this[method] = () => this.request(method, conf)
    })
  }

  /**
   * [request description]
   * @param  {String}   method  [description]
   * @param  {Object}   conf    [description]
   * @return {Promise}          [description]
   */
  request (method, conf) {
    if (conf.isTakeQueryString) {
      if (method === 'GET') {
        conf.params = { ...conf.params, ...tools.queryStringToObject() }
      } else {
        conf.data = { ...conf.data, ...tools.queryStringToObject() }
      }
    }
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    conf.cancelToken=source.token
    conf.method = method
    conf.headers = {'Content-Type': 'application/x-www-form-urlencoded'}
    conf.transformRequest = [function (data) {
      data = Qs.stringify(data)
      return data
    }]

    return new Promise((resolve, reject) => {
      urlInterceptors(conf, source)
      axios(conf).then((res) => {
        let r = res.data
        if (r) {
          if (r.status === 1) {
            r && resolve(r)
          } else {
            r && resolve(r)
          }
        } else {
          res && resolve({
            status: 0,
            code: 500,
            error: '未知错误'
          })
        }
      }).catch((err) => {
        this.errorHandler(resolve, err)
      })
    })
  }

  /**
   * [errorHandler description]
   * @param  {Object} resolve [description]
   * @param  {Object} err     [description]
   */
  errorHandler (resolve, err) {
    console.error(err)
    resolve({
      status: 0,
      code: 500,
      error: err.message || err
    })
  }
}

export {
  httpRequest
}


let httpRequest = (options) => {
  options.method = options.method ? options.method : 'GET'
  options.url = options.url ? options.url : ''
  options.headers = options.headers ? options.headers : {
    'Content-Type': 'application/json;charset=UTF-8'
    /* 'Content-Type': 'application/x-www-form-urlencoded' */
  }
  if (options.method === 'GET') {
    options.params = options.params || {}
    options.params = { ...options.params, ...tools.queryStringToObject() }
  } else {
    
    options.data = options.data || {}
    options.data = { ...options.data, ...tools.queryStringToObject() }
    options.data = Qs.stringify(options.data)
  }
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();
  options.cancelToken=source.token
  return new Promise((resolve, reject) => {
    urlInterceptors(options, source)
    axios(options).then(response => {
      if (response.data) {
        resolve && resolve(response.data)
      }
    }).catch((err) => {
      console.log(err)
      resolve({
        status: 0,
        code: 500,
        msg: err.message || err,
        data: null
      })
    })
  })
}

const urlInterceptors = (conf, source) => {
  axios.interceptors.request.use(conf => {
    if(uriMap.get(conf.url)&&!auth.isLoggedIn()) {
      source.cancel("该请求需登录");
      auth.login(window.location.href)
      return conf
    }else{

    return conf
    }
  })
}