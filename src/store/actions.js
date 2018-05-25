import types from './types'
import Config from '@/service/config'
import Request from '@/service/request'
import tools from '@/utils/tools'
let conf

export default {
  /**
   * getHomeData 首页数据
   */
  getHomeData ({commit}, options) {
    let {data = null} = options
    conf = new Config()
    conf.data = data
    conf.url = tools.linkHeader + '/homePage/homeInfo30'

    return new Request(conf).POST().then((data) => {
      commit(types.GET_HOME, {data: data})
    })
  },
  /**
   * getHomeData 首页超值热卖
   */
  getHomeHotData ({commit}, options) {
    let {data = null} = options
    conf = new Config()
    conf.data = data
    conf.url = tools.linkHeader + '/homePage/greateSale30'

    return new Request(conf).POST().then((data) => {
      commit(types.GET_HOT, {data: data})
    })
  },
  /**
   * getHomeData 首页猜你喜欢
   */
  getHomeLikeData ({commit}, options) {
    let {data = null} = options
    conf = new Config()
    conf.data = data
    conf.url = tools.linkHeader + '/homePage/recommend'
    return new Request(conf).POST().then((data) => {
      commit(types.GET_LIKE, {data: data})
    })
  }
}
