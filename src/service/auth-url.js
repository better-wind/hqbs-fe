//登录校验接口列表
const auth_urls = [
	//获取购物车数量信息
	`/ygg-hqbs/spcart/showcartcount`,
	//加入购物车
	`/ygg-hqbs/spcart/editscbsp`,
	//收藏
	`/ygg-hqbs/collect/add`,
	//取消收藏
	`/ygg-hqbs/collect/cancel`,
	//新增订阅
	`/ygg-hqbs/collect/addSubscription`,
	//获取订阅
	`/ygg-hqbs/collect/getSubscription`,
	//获取优惠券
	`/ygg-hqbs/goods/coupon`,
	//领取优惠券
	`/ygg-hqbs/coupon/receiveCoupon`,
	//获取环信用户信息
	`/ygg-hqbs/huanxin/user`,
]

let map = new Map()
auth_urls.forEach(url => {
  map.set(url, url)
})

export default map