import storage from './storage-lite'

const AUTH_DATA = 'authData'

export default {
  name: 'auth',

  /**
   * getUserInfo
   * @return {Object} [description]
   */
  getAuthData() {
    return storage.get(AUTH_DATA)
  },

  /**
   * setAuthData
   * @param  {String} options.userName        [description]
   * @param  {String} options.accessToken     [description]
   * @param  {String} options.refreshToken    [description]
   */
  setAuthData(value) {
    storage.set(AUTH_DATA, value)
  },

  /**
   * logout
   */
  logout() {
    storage.remove(AUTH_DATA)
  },

  /**
   * isLoggedIn
   * @return {Boolean} [description]
   */
  isLoggedIn() {
    return !!storage.get(AUTH_DATA)
  }
}
