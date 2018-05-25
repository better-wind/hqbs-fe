import types from './types'
import config from '@/service/config'
import request from '@/service/request'

export default {
  
  getDetailAction ({commit}, options={}) {
    const {data = null} = options
    let conf = new config()
    conf.data = data
    conf.url = `/ygg-hqbs/goods/info`
    return new request(conf).POST().then((data) => {
      if(data.status=='1'){
        if(data.skuInfo) data.skuInfo.defaultId = data.productId
        commit(types.GET_DETAIL, { data: data })
      }
      return Promise.resolve(data)
    })
  },

  editCartAction ({commit}, options={}) {
    const {data = null} = options
    let conf = new config()
    conf.data = data
    conf.url = `/ygg-hqbs/spcart/editscbsp`
    return new request(conf).POST()
  },
  collectAction ({commit}, options={}) {
    const {data = null} = options
    let conf = new config()
    conf.data = data
    conf.url = `/ygg-hqbs/collect/add`
    return new request(conf).POST().then((data) => {
      if(data.status=='1') commit(types.COLLECT, { data: '1' })
      return Promise.resolve(data)
    })
  },
  unCollectAction ({commit}, options={}) {
    const {data = null} = options
    let conf = new config()
    conf.data = data
    conf.url = `/ygg-hqbs/collect/cancel`
    return new request(conf).POST().then((data) => {
      if(data.status=='1') commit(types.UNCOLLECT, { data: '0' })
        return Promise.resolve(data)
    })
  },

  subscriptionAction ({commit}, options={}) {
    const {data = null} = options
    let conf = new config()
    conf.data = data
    conf.url = `/ygg-hqbs/collect/addSubscription`
    return new request(conf).POST()
  },

  getsubsAction ({commit}, options={}) {
    const {data = null} = options
    let conf = new config()
    conf.data = data
    conf.url = `/ygg-hqbs/collect/getSubscription`
    return new request(conf).POST()
  },

  showCartCountAction ({commit}, options={}) {
    const {data = null} = options
    let conf = new config()
    conf.data = data
    conf.url = `/ygg-hqbs/spcart/showcartcount`
    return new request(conf).POST().then((data) => {
      commit(types.CART_COUNT, { data: data })
    })
  },

  getLocationAction({commit}, options={}){
    const {data = null} = options
    let conf = new config()
    conf.data = data
    conf.url = `/ygg-hqbs/address/location`
    return new request(conf).POST().then((data) => {
      commit(types.ADDR_LOCATION, { data: data })
      return Promise.resolve(data)
    })
  },

  getAddrListAction({commit}, options={}){
    const {data = null} = options
    let conf = new config()
    conf.data = data
    conf.url = `/ygg-hqbs/address/jsonList`
    return new request(conf).POST().then((data) => {
      commit(types.ADDR_LIST, { data: data.addressList })
      return Promise.resolve(data)
    })
  },

  getDeliveryInfoAction({commit}, options={}){
    const {data = null} = options
    let conf = new config()
    conf.data = data
    conf.url = `/ygg-hqbs/goods/deliveryInfo`
    return new request(conf).POST().then((data) => {
      commit(types.DELIVERY_INFO, { data: data.deliveryInfo })
      return Promise.resolve(data)
    })
  },

  getCouponAction({commit}, options={}){
    const {data = null} = options
    let conf = new config()
    conf.data = data
    conf.url = `/ygg-hqbs/goods/coupon`
    return new request(conf).POST().then((data) => {
      commit(types.GET_COUPONS, { data: data.couponList })
    })
  },

  drawCouponAction({commit}, options={}){
    const {data = null} = options
    let conf = new config()
    conf.data = data
    conf.url = `/ygg-hqbs/coupon/receiveCoupon`
    return new request(conf).POST()
  },
}
