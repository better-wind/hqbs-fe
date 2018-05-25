import Qs from 'qs'
import config from './config'
import request from './request'
let conf

export default {
  login: function(options = {}) {
    const {data = null} = options
    /*let loginModel = {
      client_id: 'h5',
      grant_type: 'password',
      username: data.username,
      password: data.password
    }
    conf = new config()
    conf.headers = {
      'Accept': 'application/json,text/html',
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    conf.data = Qs.stringify(loginModel)
    conf.url = `login`
    return new request(conf).POST()*/

    return new Promise((resolve, reject) => {
      resolve({
        username: data.username,
        access_token: '123456'
      })
    })
  }

}
