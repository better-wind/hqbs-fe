<style scoped>
  .page { font-size: 12px; padding-bottom: 50px; background: #f0f0f0}
  .mt-50 { margin-top: 50px; }
  .dis-module { margin: 8px 0; }
  .gold { color: #C59F51 }
  .red { color: #ff0000; }
  /**********************banner*********************/
  .banner { width: 100%;}
  .sale-count { display: flex; align-items: center; height: 20px; background: #000; opacity: 0.6; border-radius: 10px; color: #fff; right: 6px; bottom: 6px; z-index: 9; font-size: 0; padding-right: 5px;}
  .sale-count i { display: inline-block; width: 10px; height: 8px; background: url('../../../assets/image/sale_icon.png') no-repeat; background-size: 100%; margin-left: 6px;}
  .sale-count span { font-size: 10px; margin-left: 3px; }

  .sale-rank { display: flex; align-items: center; height: 28px; left: 10px; bottom: 28px; z-index: 9; color: #fff; }
  .sale-rank i { display: inline-block; width: 28px; height: 28px; background: rgba(215,194,131,.8) url('../../../assets/image/cup_white.png') no-repeat center; background-size: 75%; }
  .sale-rank span { display: inline-block; height: 28px; line-height: 28px; text-align: center; font-size: 12px; background: #000; padding: 0 7px; opacity: .8;}
  /**********************product-info*********************/
  .product-info { background-color: #ffffff; padding: 0 0 0 0; box-sizing: border-box;}
  
  .coupon-tip { width: 355px; height: 25px; line-height: 25px; background-color: #F3F3F3; border-radius: 2px;color: #4D4D4D; font-size: 12px; margin: 14px 0; margin-left: 10px;margin-top: 3px;}
  .coupon-tip i { width: 16px; height: 10px; background: url('../../../assets/image/coupon_icon.png') no-repeat; background-size: 100%; margin-left: 8px; margin-right: 6px; vertical-align: middle;}
  .product-name { display: flex; min-height: 36px; font-size: 14px; color: #000; padding-left: 10px;}
  .product-name span { width: 80%; margin-right: 10px; }
  .w-h { width: 100%; }
  .pro-fav { height: 36px; border-left: 1PX solid #d9d9d9; margin-left: 10px; text-align: center; position: absolute; right: 0;}
  .pro-fav i { display: block ;width: 20px; height: 18px; background-size: 100%; margin: 0 20px;}
  .collected { background-image: url('../../../assets/image/heart-black-full.png'); }
  .uncollect { background-image: url('../../../assets/image/heart-black.png'); }
  .pro-fav em { font-size: 10px; margin-top: 3px; }
  .ggsay { box-sizing: border-box; margin-left: 10px; padding-right: 10px; margin-top: 6px; padding-bottom: 10px;}
  .ggsay p { color: #858585;}
  .msg-tip { box-sizing: border-box; height: 36.5px; line-height: 36.5px; border-top: 1PX solid #eeeeee; color: #000; margin: 0 10px; }
  /**********************activity*********************/
  .activity { width:100%; }
  .activity img { height: 80px; }
  /**********************promotion,desc,coupon,sku*********************/
  .zone-act { display: flex; align-items: center;  background: #ffffff; font-size: 14px; color: #000; padding: 13px 10px; box-sizing: border-box; position: relative;}
  .left-tip { color: #858585; align-self: flex-start; }
  .content { width: 286px; margin-left: 8px; }
  .content.ellipsis { overflow:hidden; text-overflow:ellipsis; white-space:nowrap }
  .content em { font-size: 12px; color: #858585; }
  .zone-act .icon{ display: inline-block; position: absolute; right: 10px; }
  .arrow {  width: 8px; height: 12px; background: url('../../../assets/image/right.png') no-repeat; background-size: 100%; }
  .open { width: 21px; height: 12px; background: url('../../../assets/image/open.png') no-repeat center; background-size: 100%; }
  .promotion { background: #ffffff; }
  .promotion li { border-bottom: 1PX solid #eeeeee; padding-left: 0; margin-left: 10px;}
  .promotion li:last-child { border-bottom: 0; }
  /**********************articles*********************/
  .articles { background: #ffffff; font-size: 15px; color: #000; }
  .articles ul li { display: flex; align-items: center; height: 72px; margin-left: 10px; border-bottom: 1PX solid #eeeeee; }
  .articles ul li:last-child { border-bottom: 0; }
  .articles ul li img { width: 65px; height: 52px; }
  .articles ul li i { display: inline-block; position: absolute; right: 10px; }
  .articles-middle { width: 260px; margin-left: 10px; }

  .pro-promise { width: 100%; height: 136px; }

  .fix-bottom { width: 100%;max-width: 750px; position: fixed; bottom: 0; z-index: 999; }

  .dialogs { }
  .dialogs-cover { position: fixed; width: 100%; height: 100%; top: 0; left: 0; background: rgba(1,1,1,0.2); z-index: 999; }

  .dhtx-cont { width: 300px; background: #fff; color: #000; border-radius: 6px; text-align: center; position: fixed; top: 30%; margin-left: 37.5px; z-index: 999 }
  .dhtx-cont h2 { font-size: 16px; font-weight: bold; margin-top: 30px; margin-bottom: 10px; }
  .dhtx-tip { font-size: 14px; color: #858585; }
  .dhtx-set { margin-top: 10px; position: relative; border: 1PX solid #ddd; margin-left: 20px; margin: 20px; text-align: left;}
  .dhtx-set input { width: 90%; height: 36px; line-height: 36px; padding: 0 5px; border: 0;}
  .dhtx-set i { display: inline-block; position: absolute; z-index: 5; top: 0; right: 0; width: 30px; height: 100%; background: url(../../../assets/image/clear_tb.jpg) no-repeat center; background-size: 15px auto; }
  .dhtx-btns { font-size: 0; border-top: 1px solid #e0e0e0; margin-top: 30px; }
  .dhtx-btns p { display: inline-block; width: 49%; height: 42px; line-height: 42px; font-size: 14px; }
  .dhtx-btns .cancel { border-right: 1PX solid #ddd; color: #858585 }

  .dialog-collect { width: 100%; height: 100%; position: fixed; top: 0; left: 0; background: rgba(0,0,0,.5); z-index: 999; text-align: center; }
  .dialog-collect:after{ display: inline-block; content: ''; height: 100%; vertical-align: middle; }
  .dialog-collect .tip-cont { display: inline-block; width: 75%; background: #fff; overflow: hidden; padding-top: 30px; border-radius: 5px; vertical-align: middle; }
  .dialog-collect .tip-cont .title { color: #000;font-size: 20px; }
  .dialog-collect .tip-cont .title p { color: #858585; font-size: 14px; margin-top: 10px; }
  .dialog-collect .tip-cont li.center { margin-top: 20px; padding: 0 20px; }
  .dialog-collect .tip-cont li.center img { width: 50%; }
  .dialog-collect .tip-cont .btns { margin-top: 20px; padding: 0 20px; font-size: 0; border-top: 1px solid #e0e0e0;}
  .dialog-collect .tip-cont .btns i { border-right: 1PX solid #e0e0e0; color: #858585 !important; }
  .dialog-collect .tip-cont .btns .btn { display: inline-block; font-style: normal; width: 50%; height: 42px; line-height: 42px; box-sizing: border-box; font-size: 14px; vertical-align: middle; }
  .dialog-collect .tip-cont .btns .btn { color: #000; }
</style>

<template>
  <div class="page" v-if="showPage">
    <Top :re-info="{reImage:productDetail.reImage,reNickName:productDetail.reNickName}"></Top>
    <div class="banner rela" v-if="productDetail.imageList&&productDetail.imageList.length>0" :class="{'mt-50': productDetail.reNickName}">
      <Banner :list="productDetail.imageList">
      </Banner>
      <div class="sale-rank abs" v-if="productDetail.salesRanking" @click="window.location.href=productDetail.salesRanking.webUrl">
        <i :style="{backgroundImage:`url(${productDetail.salesRanking.headImage})`}"></i>
        <span>{{productDetail.salesRanking.title}}</span>
      </div>
      <div class="sale-count abs" v-if="productDetail.sellCountInfo">
        <i></i>
        <span>{{productDetail.sellCountInfo}}</span>
      </div>
    </div>
    <div class="product-info rela">
      <Promotion :product="promotionPro" :promotion="productDetail.promotion" @refresh="getDetailOnly"></Promotion>
      <p class="coupon-tip" v-if="productDetail.couponTips&&productDetail.couponTips.length>0">
        <i class="inlbk"></i>
        {{productDetail.couponTips[0].content}}
      </p>
      <div class="product-name">
        <span :class="productDetail.productStatus=='4'?'w-h':''">
          {{productDetail.name}}
        </span>
        <div class="pro-fav" @click="collectToggle(productDetail.productId)" v-if="productDetail.productStatus!='4'">
          <i :class="productDetail.isCollect=='1'?'collected':'uncollect'"></i>
          <em>{{productDetail.isCollect=='1'?'已收藏':'收藏'}}</em>
        </div>
      </div>
      <div class="ggsay">
        <p>
          {{productDetail.gegeSay}}
        </p>
      </div>
      
      <p class="msg-tip" v-if="productDetail.notes&&productDetail.notes.length>0">{{productDetail.notes[0].tip}}</p>
    </div>
    <!-- 活动 -->
    <div class="activity dis-module" v-if="productDetail.activityBanner&&productDetail.activityBanner.length>0">
      <img :src="activity.image" v-for="activity in productDetail.activityBanner" @click="window.location.href=activity.url">
    </div>
    <!-- 促销 -->
    <div class="sales dis-module " v-if="productDetail.activitiesTips&&productDetail.activitiesTips.length>0">
      <div class="zone-act" v-for="tip in productDetail.activitiesTips" @click="window.location.href=tip.url">
        <span class="left-tip">促销</span>
        <span class="content red" :style="{color:tip.descColor}">{{tip.desc}}</span>
        <i class="icon arrow"></i>
      </div>
    </div>
    <!-- 说明，sku，配送，领券 -->
    <div class="promotion dis-module">
      <ul>
        <li class="zone-act" @click="showSkuSelector=true" v-if="skuInfo">
          <span class="left-tip">已选</span>
          <span class="content">{{selectedPropStr}}</span>
          <i class="icon open"></i>
        </li>
        <li class="zone-act" @click="showDialog(1)" v-if="productDetail.couponInfo&&productDetail.couponInfo.desc">
          <span class="left-tip">领券</span>
          <span class="content red">{{productDetail.couponInfo.desc}}</span>
          <i class="icon open"></i>
        </li>
        <li class="zone-act" @click="showDialog(2)">
          <span class="left-tip">配送</span>
          <span class="content ellipsis" v-if="toAddrs.province">{{productDetail.sendAddress}} 至 {{toAddrs.provinceName}}{{toAddrs.cityName}}{{toAddrs.districtName}} <br><em>{{deliveryInfo}}</em></span>
          <span class="content" v-else>请选择配送地区</span>
          <i class="icon open"></i>
        </li>
        <li class="zone-act" @click="showDialog(3)">
          <span class="left-tip">说明</span>
          <span class="content">{{productDetail.descriptionInfo&&productDetail.descriptionInfo.desc}}</span>
          <i class="icon open"></i>
        </li>
        <li class="zone-act" @click="window.location.href=productDetail.serviceInfo.webUrl" v-if="productDetail.serviceInfo">
          <span class="left-tip">服务</span>
          <span class="content">{{productDetail.serviceInfo.desc}}</span>
          <i class="icon arrow"></i>
        </li>
      </ul>
    </div>
    <!-- 关联文章 -->
    <div class="articles dis-module" v-if="productDetail.articleList">
      <ul>
        <li v-for="article in productDetail.articleList" @click="window.location.href=article.webUrl">
          <img :src="article.articleImage">
          <span class="articles-middle">{{article.articleTitle}}</span>
          <i class="arrow"></i>
        </li>
      </ul>
    </div>
    <!-- 捕手说 -->
    <div class="dis-module">
      <Bssay :bs-data="bsData" :sale-goods-id="saleGoodsId"></Bssay>
    </div>
    <!-- 品牌 -->
    <div class="dis-module">
      <BrandShow :brand-show-data="brandData"></BrandShow>
    </div>
    <!-- 热卖推荐，店主精选 -->
    <div class="dis-module">
      <HotPros :hot-recommends="productDetail.recommendProducts" :fav-list="productDetail.cpsFavoriteList"></HotPros>
    </div>
    <!-- 商品信息 -->
    <div class="dis-module">
      <ProDesc :summary-list="productDetail.summaryList"></ProDesc>
    </div>
    <!-- 品牌承诺 -->
    <div class="dis-module" v-if="productDetail.promiseImage" @click="window.location.href = productDetail.promiseUrl">
      <img :src="productDetail.promiseImage" class="pro-promise">
    </div>
    <!-- 商品详情 -->
    <div class="dis-module">
      <ProDetail :detail-list="productDetail.productDetailList" :detail-video="productDetail.detailVideo"></ProDetail>
    </div>

    <!-- 底部 -->
    <div class="fix-bottom">
      <Bottom :product="product" :callback="bottomSubmit" :count="cartCount" :go-kefu="kefu" :promotion="productDetail.promotion"></Bottom>
    </div>

    <div class="dialogs" >
      <div class="dialogs-cover" v-if="showDialogs"  @click="closeDialog"></div>
      <!-- 优惠券弹窗 -->
      <CouponDialog v-bind:ops="couponOps" :coupons="couponList"></CouponDialog>
      <!-- 配送地址弹窗 -->
      <AddrDialog v-bind:ops="addrOps" :addrs="addrList" :area-info="areaInfo"></AddrDialog>
      <!-- 说明弹窗 -->
      <DescDialog v-bind:ops="descOps" :description-list="productDetail.descriptionInfo&&productDetail.descriptionInfo.list"></DescDialog>
      <!-- sku选择器 -->
      <SkuSelector :sku-info="skuInfo" :sku-map="skuMap" :show-sku="showSkuSelector" :cb="skuCbs" ref="skuSelector" :collect-type="productDetail.isCollect" :is-limit="isLimitBuy" :type="btnType"></SkuSelector>
    </div>
    <!-- 到货提醒热卖弹窗 -->
    <PopHots :ops="popup" :hot-recommends="productDetail.recommendProducts"></PopHots>

    <div class="dialog-dhtx" v-if="dhtxShow">
      <div class="dialogs-cover" @click="dhtxClose"></div>
      <div class="dhtx-cont">
        <h2>设置到货提醒</h2>
        <span class="dhtx-tip">若该商品到货，捕手会第一时间通知您~</span>
        <div class="dhtx-set">
          <input type="tel" placeholder="请输入手机号" v-model.trim="dhtxPhone">
          <i @click="clearInput"></i>
        </div>
        <div class="dhtx-btns">
          <p class="cancel" @click="dhtxClose">取消</p>
          <p @click="setSubscription">确定</p>
        </div>
      </div>
    </div>

    <div class="dialog-collect" v-show="showCollectDialog">
      <ul class="tip-cont">
        <li class="title">
          <b>收藏成功</b>
          <p>下载APP订阅开售提醒</p>
        </li>
        <li class="center">
          <img src="http://yangege.b0.upaiyun.com/product/d6c62c0b288.png">
        </li>
        <li class="btns">
          <i class="btn" @click="showCollectDialog=false">继续浏览</i>
          <a class="btn" href="http://a.app.qq.com/o/simple.jsp?pkgname=com.globalscanner">立即下载</a>
        </li>
      </ul>
    </div>
  </div>
  <Loading v-else></Loading>
</template>

<script>
  import { mapState, mapActions, mapGetters} from 'vuex'
  import Banner from "./banner";
  import Bssay from "./bssay";
  import BrandShow from "./brandShow";
  import HotPros from "./hotPros";
  import ProDesc from "./proDesc";
  import ProDetail from "./proDetail";
  import Bottom from "./bottom";
  import CouponDialog from "./couponDialog";
  import DescDialog from "./descDialog";
  import AddrDialog from "./addrDialog";
  import Promotion from "./promotion";
  import SkuSelector from "./skuSelector";
  import PopHots from "./popHots";
  import Top from "./top";
  import { Dlg } from "@/assets/dialog/fm.dialog.min.js";
  import auth from "@/utils/auth";
  import ease from "@/utils/ease";
  import Tools from "@/utils/tools";
  import Loading from "@/components/loading";
  import scrollControllMixin from "@/mixin/scrollControll";
  import { Ganalytics } from "@/utils/ga";
  import '@/assets/css/styles.css'
  import '@/assets/css/LArea.css'
  import '@/assets/css/animate.css'

  export default {
    name: 'detail',
    data () {
      return {
        window:window,
        saleGoodsId:this.$route.params.id,
        showSkuSelector:false,
        skuCbs:{
          closeSku:this.closeSku,
          submitHandler:this.submitHandler,
        },
        area:undefined,
        couponOps:{
          showCoupon:false,
          close:this.closeDialog,
          receive:this.receiveCoupon,
        },
        addrOps:{
          showAddr:false,
          close:this.closeDialog,
          getAddr:this.getSelectedAddr,
        },
        descOps:{
          showDesc:false,
          close:this.closeDialog,
        },
        popup:{
          show:false,
          up:true,
          toggle:this.togglePop
        },
        dhtxPhone:'',
        dhtxShow:false,
        dhtxStatus:0,
        buyCount:1,
        toAddrs:{},
        btnType:1,
        showPage:false,
        showCollectDialog:false,
        ga:undefined
      }
    },
    mixins:[scrollControllMixin],
    computed: {
      ...mapState('modProduct', ['areaInfo', 'productDetail','cartCount','addrLocation','addrList','deliveryInfo','couponList']),
      ...mapGetters('modProduct', ['skuInfo', 'skuMap','bsData','brandData','selectedPropStr','promotionPro']),
      product(){
        const _promotion = this.productDetail.promotion
        let p = {}
        p.isSkuInfo = !!this.skuInfo
        p.status = this.productDetail.productStatus
        p.productId = this.productDetail.productId
        if(p.isSkuInfo&&p.status!='1'){
          p.selectType = 999
          p.seeMoreProps = true
        }
        if(p.isSkuInfo&&p.status=='1'&&!(_promotion.type=='2'&&_promotion.activityStatus=='2')){
          p.selectType = 998
          p.selectProps = true
        }
        if(_promotion.type=='2'&&_promotion.activityStatus=='2'&&p.status=='1'){
          p.selectType = 997
          p.buyNow = true
        }
        if((!p.isSkuInfo&&p.status=='1')||p.buyNow){
          p.selectType = 1
          p.addCart = true
        }
        if(!p.isSkuInfo&&p.status=='2'){
          p.selectType = 2
          p.hasChance = true
        }
        if(!p.isSkuInfo&&p.status=='3'&&this.productDetail.isCollect=='1'){
          p.selectType = 3
          p.collectCancel = true
        }
        if(!p.isSkuInfo&&p.status=='3'&&this.productDetail.isCollect=='0'){
          p.selectType = 3
          p.collectNow = true
        }
        if(!p.isSkuInfo&&p.status=='4'){
          p.selectType = 4
          p.subscriptionTip = true
        }
        if(p.addCart&&p.buyNow){
          p.selectType = 996
        }
        return p
      },
      isLimitBuy(){
        return (this.productDetail.promotion&&this.productDetail.promotion.type==2&&this.productDetail.promotion.activityStatus==2) || false
      },
      showDialogs(){
        return this.showSkuSelector||this.couponOps.showCoupon||this.addrOps.showAddr||this.descOps.showDesc
      }
    },
    watch:{
      '$route' (to, from) {
        this.showPage = false
        this.$router.go(0);
      },
      'showSkuSelector'(newV, oldV) {
        if(newV) {
          this.scrollForbidden() 
        }else{
          this.scrollLift()
        }
      }
    },
    route:{
      canActivate(){
      }
    },
    created () {
      this.getProDetail()
      if(auth.isLoggedIn()) this.getProCoupon()
    },
    mounted () {
      ease.config()
    },
    methods: {
      ...mapActions('modProduct', ['getDetailAction','editCartAction','showCartCountAction','collectAction','unCollectAction','subscriptionAction','getsubsAction','getLocationAction','getAddrListAction','getDeliveryInfoAction','getCouponAction','drawCouponAction']),
      getDelivery(){
        let opts = {};
        opts.data = {
          saleUnitId: this.product.productId,
          province: this.toAddrs.province,
          city: this.toAddrs.city,
          district: this.toAddrs.district
        };
       this.getDeliveryInfoAction(opts)
      },
      receiveCoupon(couponId){
        let opts = {};
        opts.data = {
          saleGoodsId: Number(this.saleGoodsId),
          couponId: Number(couponId),
          sourceType: 1,
        };
        this.drawCouponAction(opts).then((data) => {
          if(data.status=='1'){
            this.getProCoupon()
          }
        })
      },
      getProCoupon(){
        let opts = {};
        opts.data = {
          saleGoodsId: this.saleGoodsId
        };
        this.getCouponAction(opts)
      },
      getDetailOnly(id){
        let opts = {};
        opts.data = {
          saleGoodsId: this.saleGoodsId,
          saleUnitId: id
        };
        this.getDetailAction(opts).then(data => {
          this.showPage = true
        })
      },
      getProDetail(id){
        let opts = {};
        opts.data = {
          saleGoodsId: this.saleGoodsId,
          saleUnitId: id
        };
        this.getDetailAction(opts).then(data => {
          this.showPage = true
          if(data.productStatus=='4') this.popup.show=true
          if(auth.isLoggedIn()) {
            this.getCart()
            Promise.all([this.getAddrListAction(),this.getLocationAction()]).then(resList => {
              const aList = resList[0].addressList
              const aLocal = resList[1]
              if(aList&&aList.length>0) {
                for(let i=0 ; i<aList.length ; i++){
                  if(aList[i].isDefault=='1'){
                    this.toAddrs = aList[i]
                    break
                  }
                }
              }else if(aLocal){
                this.toAddrs = aLocal
              }
              this.getDelivery()
            })
          }else{
            this.getLocationAction().then(data => {
              this.toAddrs = data
              this.getDelivery()
            })
          }
          this.ga = new Ganalytics({targetType:'160', gpm:'160', targetId:this.productDetail.productId, productIdChain:this.productDetail.productId, tag:this.productDetail.productStatus})
        })
      },
      kefu(e){
        ease.bindEase(e)
      },
      getSelectedAddr(addr){
        this.toAddrs = addr
        this.getDelivery()
      },
      clearInput(){
        this.dhtxPhone = ''
      },
      dhtxClose(){
        this.dhtxShow = false
      },
      dhtxAdd(){
        let opts = {};
        opts.data = {
          subscriptionId:this.product.productId,
          mobileNumber:this.dhtxPhone
        };
        this.subscriptionAction(opts)
      },
      togglePop(){
        this.popup.up = !this.popup.up
      },
      closeSku(id){
        this.showSkuSelector = false
        if(id!=this.productDetail.productId) this.getDetailOnly(id)
      },
      addCart(id,count){
        let opts = {};
        opts.data = {
          productid: id,
          productcount:count
        };
        this.editCartAction(opts).then(data => {
          if(data.status==1) {
            this.showDlg('加入购物袋成功')
            this.getCart(id)
          }
        })
      },
      getCart(id){
        let opts = {};
        opts.data = {
          productid: id
        };
        this.showCartCountAction(opts)
      },
      collectToggle(id){
        let opts = {};
        opts.data = {
          type: 1,
          collectId:id
        };
        if(this.productDetail.isCollect=='0'){
          this.collectAction(opts).then(data => {
            if(data.status=='1'){
              let num = Tools.getCookie('collectNum') || 0
              Tools.setCookie('collectNum',++num,1)
              if(this.productDetail.productStatus=='3'&&(num==1||num==5)){
                console.log('cookie')
                this.showCollectDialog = true
              }else{
                this.showDlg('收藏成功')
              }
            }
          })
        }else{
          this.unCollectAction(opts).then(data => {
            if(data.status=='1') this.showDlg('取消收藏')
          })
        }
      },
      setSubscription(){
        let opts = {};
        opts.data = {
          mobileNumber: this.dhtxPhone,
          subscriptionId:this.product.productId
        };
        this.subscriptionAction(opts).then(data => {
          this.dhtxShow = false
          if(data.status==1) this.showDlg('到货提醒设置成功~')
        })
      },
      getSubscription(){
        let opts = {};
        opts.data = {
          type: 1,
          subscriptionId:this.product.productId
        };
        this.getsubsAction(opts).then(data => {
          if(data.status=='1') {
            this.dhtxPhone = data.mobileNumber||''
          }
        })
      },
      bottomSubmit(type,id){
        if(this.skuInfo){
          this.showSkuSelector = true
          this.btnType = type==5 ? 2 : 1
        }else{
          this.submitHandler(type,this.product.productId,1)
        }
      },
      submitHandler(status, id, count){
        this.product.productId = id
        this.showSkuSelector = false
        console.log(status)
        switch(Number(status)){
          case 1:
            //添加购物车
            this.addCart(id,count)
            break;
          case 2:
            //还有机会
            this.showDlg("此商品有人拍下未付款，还有机会购买，试着刷新页面看看吧～");
            break;
          case 3:
            //抢先收藏
            this.collectToggle(id)
            break;
          case 4:
            //收货提醒
            this.getSubscription()
            this.dhtxShow = true
            break;
          case 5:
            //立即购买
            if(auth.isLoggedIn()){
              window.location.href=`/ygg-hqbs/order/confirm/3?xsgParam=${id},${count}`;
            }else{
              auth.login(window.location.href)
            }
            break;
          default:
            break;
        }
      },
      showDialog(type){
        switch (type) {
          case 1:
            if(auth.isLoggedIn()){
              this.couponOps.showCoupon = true
            }else{
              auth.login()          
            }
            break
          case 2:
            this.addrOps.showAddr = true
            break
          case 3:
            this.descOps.showDesc = true
            break
        }
      },
      showDlg(content) {
        Dlg.msg({
          content: content,
          msgType: "inverse"
        });
      },
      closeDialog(){
        if(this.showSkuSelector) this.closeSku(this.$refs.skuSelector.product.productId)
        this.couponOps.showCoupon = false
        this.addrOps.showAddr = false
        this.descOps.showDesc = false
        this.showSkuSelector = false
      },
      stop(e){
        e.preventDefault()
      }
    },
    components: {
      Bssay,
      BrandShow,
      HotPros,
      ProDesc,
      ProDetail,
      Banner,
      Bottom,
      CouponDialog,
      DescDialog,
      AddrDialog,
      SkuSelector,
      PopHots,
      Promotion,
      Top,
      Loading
    },
  }
</script>

