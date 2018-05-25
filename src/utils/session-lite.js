const sessionStorage = window.sessionStorage

export default {
  name: 'session-storage',

  /**
   * 设置 localStorage
   * @param {string} key 键
   * @param {Object} value 值
   */
  set(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value))
  },

  /**
   * 获取 localStorage
   * @param {string} key 键
   * @return {Object}
   */
  get(key) {
    return JSON.parse(sessionStorage.getItem(key)) || null
  },

  /**
   * 移除 localStorage
   * @param {string} key 键
   */
  remove(key) {
    sessionStorage.removeItem(key)
  }
}
