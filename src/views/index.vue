<style lang='scss' scoped>
@import "../assets/css/index.scss";
</style>
<style>
.swiper-info {
  padding-top: 40%;
}
</style>
<template>
    <div class="body-auto f-14 home-box pb-50 pt-76" ref="homeBox">     
      <template v-if="!isLoad">
        <div class="home-top-box" :class="{'top-change':(indexData.reNickName && indexData.bannerImage)}" ref="topBox">
            <!--头部店招-->
            <template v-if="indexData.reNickName">
                <template v-if="indexData.bannerImage">
                  <a :href="'/h5/search'" class="home-search col-888 t-c" ref="homeSearch">
                    搜索喜欢的宝贝
                  </a>                    
                    <div class="top-store" :style="{backgroundImage:'url('+indexData.bannerImage+')'}">
                    <span class="store-info f-16 col-fff">
                        <em :style="{backgroundImage:'url('+indexData.reImage+')'}"></em>
                        <i class="ml-5">{{indexData.reNickName}}</i><b class="fw-n">的捕手店</b>
                    </span>
                    </div>
                </template>
                <template v-else>
                    <div class="top-store-mesg" :style="{backgroundImage:'url('+indexData.bannerImage+')'}"  ref="homeSearch">
                        <img :src="indexData.reImage">
                        <span>{{indexData.reNickName}}</span><b>的捕手店</b>
                        <i @click="clickTurn('/h5/search')" append class="right search-btn"></i>
                    </div>
                </template>
            </template>
            <!--没有店招显示默认顶部bar-->
            <template v-else>
                <ul class="home-top clearfix col-fff t_c"  ref="homeSearch">
                    <li @click="clickTurn('/h5/search')" class="right search-btn" ></li>
                    <li class="logo">
                        <img src="../assets/image/logo.png">
                    </li>
                </ul>
            </template>

            <!--导航-->
            <swiperNav :nav-data="navData" :nav-fixed="navFixed" :show-type="showType" v-if="navData"></swiperNav>           
        </div>
        <div v-for="(info,index) in infoData" v-show="showType == index" ref="homeInfo">
            <!-- 首页内容块 -->
            <template v-if="index === 0">
                <!--轮播图-->
                <SwiperBanner :list-img="indexData.bannerList" v-if="indexData.bannerList.length > 0"></SwiperBanner>

                <!-- 通知 -->
                <div class="notice-wrapper" v-if="indexData.homePageNotice && indexData.homePageNotice.homePageNoticeView.length > 0">
                    <p class="notice-img"><img :src="indexData.homePageNotice.image"></p>
                    <div class="swiper-notice">
                      <div class="swiper-wrapper">
                        <div class="swiper-slide" @click="clickTurn(info.url)" v-for="info in indexData.homePageNotice.homePageNoticeView">
                          <p>
                            <span class="notice-tip" v-if="info.tag">{{info.tag}}</span>
                            {{info.title}}
                          </p>
                        </div>
                      </div>
                    </div>
                </div>

                <!--动态模块-->
                <div class="dong-box">
                    <template v-for="(obj,objIndex) in dynamicData">
                        <template v-if="obj.contentType == 1">
                            <!--icon导航-->
                            <p class="icon-nav t-c f-12" v-if="obj.iconDetail" :style="{backgroundImage:'url('+obj.iconDetail.backImage+')'}" :class="{'mb-8':obj.isSpacing == 1}" v-bind:data-index="objIndex">
                              <span v-for="(info,i) in obj.iconDetail.dataList" :key="i" :style="{color:info.color}" @click="clickTurn(info.url)">
                                <i :style="{backgroundImage:'url('+info.image+')'}"></i>
                                <em>{{info.title}}</em>
                              </span>
                            </p>
                        </template>
                        <template v-else-if="obj.contentType == 2">
                            <!--今日爆款/下期预告-->
                            <div class="bao-info bg-fff pb-10" v-if="obj.hotDetail && (obj.hotDetail.nowList || obj.hotDetail.laterList)" :class="{'mb-8':obj.isSpacing == 1}"  v-bind:data-index="objIndex">
                                <p class="t-c bao-title col-aaa">
                                    <i :class="{'col-000':!baoKType}" v-if="obj.hotDetail.nowList.length > 0" @click="baoKType = false,baoKStatus = true,baoFun(objIndex,obj.hotDetail.nowList.length,0)">今日爆款</i>
                                    <i :class="{'col-000':baoKType}" v-if="obj.hotDetail.laterList.length > 0" @click="baoKType = true,baoKStatus = true,baoFun(objIndex,obj.hotDetail.nowList.length)">下期预告</i>
                                </p>
                                <section class="swiper-container bao-swiper f-12" :class="'bao-swiper'+objIndex">
                                    <ul class="swiper-wrapper">
                                        <template  v-for="(list,i) in obj.hotDetail.nowList" v-if="obj.hotDetail.nowList">
                                            <li class="swiper-slide" @click="clickTurn(list.webUrl)">
                                                <a href="javascript:;" class="bao-tu mb-8" v-lazy:background-image="list.image"></a>
                                                <p class="bao-text mb-5" v-text="list.name"></p>
                                                <p class="col-f00">
                                                    ￥{{list.lowPrice}}
                                                    <del class="f-10 col-ccc">￥{{list.highPrice}}</del>
                                                </p>
                                            </li>
                                        </template>
                                        <template  v-for="(list,laterIndex) in obj.hotDetail.laterList" v-if="obj.hotDetail.laterList">
                                            <li class="swiper-slide" @click="clickTurn(list.webUrl)" :class="{'notice-product':laterIndex == 0}">
                                                <a href="javascript:;" class="bao-tu mb-8" v-lazy:background-image="list.image">
                                                    <i class="notice-line" v-if="laterIndex == 0" ref="nextProduct">下期预告</i>
                                                </a>
                                                <p class="bao-text mb-5" v-text="list.name"></p>
                                                <p class="col-f00">
                                                    ￥{{list.lowPrice}}
                                                    <del class="f-10 col-ccc">￥{{list.highPrice}}</del>
                                                </p>
                                            </li>
                                        </template>
                                    </ul>
                                </section>
                            </div>
                        </template>
                        <template v-else-if="obj.contentType == 3">
                            <!--综合入口-->
                            <div class="zong-box bg-fff pt-10 pb-10" :class="{'mb-8':obj.isSpacing == 1}">
                                <!--单品-->
                                <template v-if="obj.normalDetail.dataType == 1">
                                    <a href="javascript:;" class="zong-banner" v-lazy:background-image="obj.normalDetail.image" @click="clickTurn(obj.normalDetail.webUrl)"></a>
                                    <section class="swiper-container zong-swiper f-12" :class="'zong-swiper'+objIndex" v-if="obj.normalDetail.productList">
                                        <ul class="swiper-wrapper" v-if="obj.normalDetail.productList.length > 0">
                                            <li class="swiper-slide" v-for="(list,pIdx) in obj.normalDetail.productList" @click="clickTurn(list.webUrl)">
                                                <a href="javascript:;" class="bao-tu zong-dtu mb-8" v-lazy:background-image="list.image"></a>
                                                <p class="bao-text mb-5" v-text="list.name"></p>
                                                <p class="col-f00">
                                                    ￥{{list.lowPrice}}
                                                    <del class="f-10 col-ccc">￥{{list.highPrice}}</del>
                                                </p>
                                            </li>
                                            <li class="swiper-slide" v-if="obj.normalDetail.productList.length >= 6 && obj.normalDetail.webUrl">
                                                <a :href="obj.normalDetail.webUrl?obj.normalDetail.webUrl:'javascript:;'" class="bao-tu mb-8 more-tu f-14" >
                                                    <i>查看全部</i>
                                                </a>
                                            </li>
                                        </ul>
                                    </section>
                                </template>
                                <!--活动-->
                                <template v-if="obj.normalDetail.dataType == 2">
                                    <a href="javascript:;" class="zong-banner" v-lazy:background-image="obj.normalDetail.image" @click="clickTurn(obj.normalDetail.webUrl)"></a>
                                    <section class="swiper-container zong-swiper f-12" :class="'zong-swiper'+objIndex">
                                        <ul class="swiper-wrapper">
                                            <li class="swiper-slide" v-for="(list,aIdx) in obj.normalDetail.activityList" @click="clickTurn(list.webUrl)">
                                                <a href="javascript:;" class="bao-tu" v-lazy:background-image="list.image"></a>
                                            </li>
                                            <li class="swiper-slide" v-if="obj.normalDetail.activityList.length >= 6 && obj.normalDetail.webUrl">
                                                <a :href="obj.normalDetail.webUrl?obj.normalDetail.webUrl:'javascript:;'" class="bao-tu mb-8 more-tu f-14">
                                                    <i>查看全部</i>
                                                </a>
                                            </li>
                                        </ul>
                                    </section>
                                </template>
                            </div>
                        </template>
                        <template v-else-if="obj.contentType == 4">
                            <!--自定义模块-->
                            <div class="custom-box" :class="{'mb-8':obj.isSpacing == 1}" v-if="obj.plateActivity.length > 0"  v-bind:data-index="objIndex">
                                <p v-for="imgList in obj.plateActivity">
                                    <a href="javascript:;" v-for="(imgInfo,i) in imgList.plateActivityRowView" :style="{width:imgInit(imgList.plateActivityRowView,imgInfo.width)}" @click="clickTurn(imgInfo.url)">
                                        <img src="https://yangege.b0.upaiyun.com/1794a971b4043.png" v-lazy="imgInfo.image">
                                    </a>
                                </p>
                            </div>
                        </template>
                        <template v-else-if="obj.contentType == 5">
                            <!--每日疯抢-->
                            <div class="day-berserk-wrap" :class="{'mb-8':obj.isSpacing == 1}" v-if="obj.dailyBerserk">
                                <div class="day-berserk-tlt">
                                    <span class="tlt-con">每日疯抢</span>
                                    <p class="cuntdown f-12">
                                        <span>{{berserkHour}}</span> :
                                        <span>{{berserkMin}}</span> :
                                        <span>{{berserkSec}}</span>
                                    </p>
                                    <a class="nextGame f-12" :href="obj.dailyBerserk.url">
                                        <span>{{obj.dailyBerserk.display}}</span>
                                    </a>
                                </div>
                                <div class="berserk-swiper-container">
                                    <div class="swiper-wrapper">
                                        <div class="swiper-slide" v-for="bList in obj.dailyBerserk.productInfos" @click="clickTurn(bList.webUrl)">
                                            <a href="javascript:;">
                                                <p class="productImg">
                                                    <img :src="bList.image">
                                                    <span v-if="bList.status == 4">已抢完</span>
                                                </p>
                                                <p class="productName">{{bList.name}}</p>
                                            </a>
                                            <p class="productPrice">
                                                ￥{{bList.lowPrice}}
                                                <del>￥{{bList.highPrice}}</del>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </template>
                </div>

                <!--超值热卖-->
                <div class="hot-box bg-fff mt-10" v-if="hotData && hotData.length > 0">
                  <h1 class="f-18 fw-n t_c hot-title">超值热卖</h1>
                  <ul class="hot-list">
                    <li v-for="hotList in hotData" v-lazy:background-image = "hotList.image" @click="clickTurn(hotList.url)">
                      <span class="hot-info col-fff">
                        <p class="f-18" v-text="hotList.leftDesc"></p>
                        <p class="mb-15 col-e0" v-text="hotList.rightDesc"></p>
                        <p v-text="hotList.lowPrice"></p>
                      </span>
                    </li>
                  </ul>
                </div>

                <!--猜你喜欢-->
                <div class="like-box bg-fff mt-10 pb-10" v-if="likeData && likeData.length > 0">
                    <h1 class="f-18 fw-n t_c hot-title">猜你喜欢</h1>
                    <ul class="like-list clearfix" ref="likeList" :style="{height:likeBoxH+'px'}">
                        <li class="left" v-for="(list,dataInx) in likeData" :class="{'like-border':list.contentType == 1}" :style="{width:likeListW+'px'}">
                            <template v-if="list.contentType == 1">
                                <a href="javascript:;" v-lazy:background-image="list.product.image" class="like-tu" @click="clickTurn(list.product.displayURL)">
                                </a>
                                <div class="like-list-info">
                                    <p class="like-desc mb-8 like-list-tag" v-if="list.product.saleGoodsTagList.length>0">
                                        <template v-for="data in list.product.saleGoodsTagList">
                                        <i style="margin: 0 3px 2px 0;background: #FFF0F0;" v-if="data.type">{{data.tag}}</i></template>{{list.product.name}}</p>
                                    <p class="like-desc mb-8" v-else>{{list.product.name}}</p>
                                    <p class="f-16">
                                        <template v-if="isMember == 1">
                                            <b>&yen;{{list.product.highPrice}}</b>
                                            <em class="member-price col-gold f-14">¥{{list.product.lowPrice}}</em>
                                        </template>
                                        <template v-else>
                                            <b>&yen;{{list.product.lowPrice}}</b>
                                            <del class="col-ccc f-14">&yen;{{list.product.highPrice}}</del>
                                        </template>
                                    </p>
                                    <p class="like-list-tag f-0" v-if="list.product.activityTagList.length > 0">
                                        <i v-for="tagList in list.product.activityTagList" v-text="tagList.tag" :class="{'tag-red':tagList.type == 2}"></i>
                                    </p>
                                </div>
                            </template>
                            <template v-if="list.contentType == 2">
                                <a href="javascript:;" class="like-tu" :data-width ="list.activity.width" :data-height ="list.activity.height" @click="clickTurn(list.activity.webUrl)">
                                    <img src="https://yangege.b0.upaiyun.com/1794a971b4043.png" v-lazy="list.activity.image">
                                </a>
                            </template>
                        </li>
                    </ul>
                </div>

                <p class="list-end t_c" v-if="listEnd">已显示全部内容</p>
            </template>

            <!-- 分类模块 -->
            <template v-else>
                <!-- 轮播图 -->
                <div class="swiper-container class-swiper" :class="'class-swiper'+index">
                    <ul class="swiper-wrapper clearfix">
                        <li class="swiper-slide" v-for="list in info.bannerList">
                            <a :href="list.url?list.url:'javascript:;'" :style="{backgroundImage:'url('+list.image+')'}" v-if="list.url"></a>
                        </li>
                    </ul>
                    <div class="pagination-class" :class="'pagination-class'+index"></div>
                </div>

                <!-- 内容块 -->
                <div class="class-list f-14" v-for="list in info.themeList" v-if="list.productInfos.length > 0">
                    <h2 class="t_c f-18 mb-5"><span v-text="list.mainTitle"></span></h2>
                    <p class="t_c f-14 col-888" v-if="list.subTitle" v-text="list.subTitle"></p>
                    <ul class="class-info-list mt-30">
                        <li v-for="pList in list.productInfos">
                            <a :href="pList.url" class="mb-5"><img :src="pList.image"></a>
                            <p class="product-desc" v-text="pList.leftDesc"></p>
                            <p>￥{{pList.salesPrice}}</p>
                        </li>
                    </ul>
                </div>
            </template>
        </div>
      </template>
      <div class="back-top" v-if="backTop" @click="backTopFun">
          <img src="../assets/image/back_top.png">
      </div>

      <footBar bar-tag='home'></footBar>
      <p class="load" v-if="isLoad">正在加载中<span class="dotting"></span></p>
      <p class="list-loading t_c" v-if="loading">努力加载中…</p>
      <p class="list-error t_c" v-if="requestError">请求出错，请稍候再试~</p>
      <input type="hidden" vlaue="0" ref="historyScroll">
      <input type="hidden" vlaue="0" ref="historyPage">
      <input type="hidden" value="0" ref="historyNav">
    
      <!--广告图活动弹框-->
      <!-- <div class="activity-tan t_c" v-for="(info,index) in advertised" v-if="advertised && index == 0 && advertisedType">
          <i class="close-tb" @click="advertisedType = false"></i>
          <img :src="info.image"  @click="clickTurn(info.url)">
      </div> -->
      <!--黑色半透明层-->
      <!-- <div class="layer-full" v-if="advertisedType"></div> -->
    </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex";
import tool from "@/utils/tools";
import Swiper from 'swiper'
import ('swiper/dist/css/swiper.css')
import swiperNav from "@/components/swiperNav"
import SwiperBanner from "@/components/swiperBanner";
import footBar from "@/components/footBar"
import { Ganalytics } from "@/utils/ga";

var _page = 1,
  _pageSize = 10,
  _totalCount = 0,
  _win = window,
  _bodyH = 0,
  _arrType = false;

export default {
  name: "index",
  data() {
    return {
      accoutId: tool.queryStringToObject.accountId,
      indexData: "",
      navData: [],
      infoData: [],
      dynamicData: [],
      advertised: [],
      hotData: [],
      likeData: [],      
      showType: 0,
      advertisedType: false,      
      baoKType: false,
      baoKStatus: false,
      isLoad: true,
      backTop: false,
      navFixed: false,
      request: false,
      requestError: false,
      loading: false,
      listEnd: false,
      listTip: false,
      isMember: 0,
      baoSwiper: [],
      likeListW: (document.body.clientWidth - 30) / 2,
      likeBoxH:0,
      ga:undefined
    };
  },
  components: {   
    swiperNav,
    SwiperBanner,
    footBar
  },
  computed: {
    ...mapState(["homeData","homeHotData","homeLikeData"])
  },
  methods: {
    ...mapActions(["getHomeData","getHomeHotData","getHomeLikeData"]),       
    clickTurn: function(url, position, index, id, type) {
      if (!url) return;
      window.location.href = url;
    },
    topBanner: function() {
      var _this = this;
      if (_this.indexData.reNickName && _this.indexData.bannerImage) {
        const _nav = document.querySelector(".home-nav");
        const _navTH =  _nav ? _nav.offsetTop : 0,
          _box = _this.$refs.homeBox;

        //topBar 高度处理
        var _topH = _this.$refs.topBox.offsetHeight,
          _storeH = _this.$refs.homeSearch.offsetHeight;

        if (_this.indexData.reNickName && _this.indexData.bannerImage) {
          _box.style.paddingTop = _storeH + "px";
          document.onscroll = () => {
            var _scrollH = window.scrollY;

            if (_navTH <= _scrollH + _storeH) {
              _this.navFixed = true;
              _box.style.paddingTop =
                _storeH + _nav.offsetHeight + "px";
            } else {
              _this.navFixed = false;
              _box.style.paddingTop = _storeH + "px";
            }
          };
        } else {
          _box.style.paddingTop = _topH + "px";
        }
      }
    },    
    noticeSwiper: function() {
      //通知
      var _noticeSw = new Swiper(".swiper-notice", {
        autoplayDisableOnInteraction: false,
        loop: true,
        autoplay: 4000,
        direction: "vertical"
      });
    },
    /*
    *左右滑动（今日、综合、疯抢等模块）
    *绑定模块  name
    * len=今日.length 主要处理明日预告的切换
    */
    slideModule: function(name, len) {
      var _this = this;      
      var _slideSwiper = new Swiper(name, {
        slidesPerView: "auto",
        spaceBetween: 10,
        freeMode: true,
        on:{
          slideChangeTransitionEnd: function(){
             if(this.activeIndex >= len){
                _this.baoKType = true
              }else{
                _this.baoKType = false
              }
          },
          setTranslate: function(){
            let $this = this
           
            if (name.indexOf("bao-swiper") > -1) {
              //滑动到屏幕中间切换今日、下期
              if (_this.baoKStatus) {
                _this.baoKStatus = false;
                return false;
              }
              try{
                var _leftW = _this.$refs.nextProduct[0].offsetParent.offsetParent.offsetLeft,
                  _boxW = window.screen.width / 2 + 12;

                if (Math.abs($this.translate) >= _leftW - _boxW) {
                  _this.baoKType = true;
                } else {
                  _this.baoKType = false;
                }
              }catch(err){}              
            }
          }
        }        
      });
      if (name.indexOf("bao-swiper") > -1) {
        _this.baoSwiper.map(function(item, i) {
          if (item.name == name) {
            _this.baoSwiper[i].swiper = _slideSwiper;
          }
        });
      }
    },
    imgInit: function(obj, w) {
      //初始化自定义模块图片大小
      var _winW = window.screen.width > 750 ? 750 : window.screen.width,
        _countW = 0,
        _imgW = 0;

      obj.map(function(item) {
        _countW = _countW + Number(item.width);
      });
      _imgW = _winW / _countW * w;

      return _imgW + "px";
    },
    berserkTime: function(second) {
      //疯抢倒计时
      var _this = this,
        endSecond = second;
      var timer = setInterval(function() {
        if (endSecond <= 0) {
          endSecond = 0;
          clearInterval(timer);
        } else {
          endSecond--;
          var endtime = formatSeconds(endSecond);
          _this.berserkHour = endtime.split(":")[0];
          _this.berserkMin = endtime.split(":")[1];
          _this.berserkSec = endtime.split(":")[2];
        }
      }, 1000);
    },
    pinterestFun: function() {
      //瀑布流计算
      var _this = this,
        _listBox = document.querySelectorAll(".like-list"),
        _list = document.querySelectorAll(".like-list li");

      //用于存储 每列中的所有块框相加的高度。
      var pinHArr = [];   
            
      _list.forEach(function(value, index) {   
        var pinH = _list[index].offsetHeight,
          _activityW = _list[index].children[0].getAttribute("data-width"),
          _activityH = _list[index].children[0].getAttribute("data-height"),
          _currentW = _list[index].children[0].offsetWidth,
          _ratio = _activityW / _activityH;

        if (_activityH) {
          pinH = _currentW / _ratio;
        }

        if (index < 2) {
          pinHArr[index] = pinH;
        } else {

          //数组pinHArr中的最小值minH
          var minH = Math.min.apply(null, pinHArr);       
          var pinIndex = pinHArr.findIndex((value,index,arr)=>{            
            return value > minH;//<= minH return -1, > return 索引 
          })        
          var minHIndex = 0;

          if(pinIndex > -1){
            minHIndex = pinIndex > 0 ? (pinIndex - 1) : (pinIndex + 1)
          }   
         
          // 将瀑布流中的元素定位在上一行中高度最小的元素下方
          _list[index].style.position = "absolute";
          _list[index].style.top = minH + 10 + "px";
          _list[index].style.left = _list[minHIndex].offsetLeft - 10 + "px";          
        
          //更新添加了块框后的列高
          pinHArr[minHIndex] += pinH + 10;
        }
      });
     
      this.likeBoxH = Math.max.apply('',pinHArr)    
    },
    scrollPage: function() {
      var _this = this;

      if (tool.bottomVisible() && !_this.request) {
        if (_page * 10 < _totalCount) {
          _this.loading = true;
          _this.request = true;
          _this.requestError = false;
          _page += 1;
          _this.likeDataGet(1);
        } else {
          _this.listEnd = true;
        }
      }      
    },    
    activityTan: function(id, repeat) {
      //广告图
      var _id = id,
        _repeat = repeat,
        _this = this;

      if (localStorage.activityId) {
        //不同id（说明换商品了）-----更新缓存数据
        var _activityId = localStorage.activityId;

        if (_id != _activityId) {
          _this.advertisedType = true;
          localStorage.activityId = _id;
          localStorage.activityRepeat = _repeat;
        } else {         
          if (_repeat == 1) {
            _this.advertisedType = true;
          } else {
            _this.advertisedType = false;
          }
        }
      } else {
        //首次进入记录id、repeat
        _this.advertisedType = true;
        window.localStorage.setItem("activityId", _id);
        window.localStorage.setItem("activityRepeat", _repeat);
      }
    },
    baoFun: function(i, len, index) {
      //爆款、预告模块切换
      var _this = this,
        _name = ".bao-swiper" + i,
        _initIndex = len;

      if (index == 0) {
        _initIndex = 0;
      }
      _this.baoSwiper.map(function(item, i) {
        if (item.name == _name) {
          _this.baoSwiper[i].swiper.slideTo(_initIndex, 800);
        }
      });
    },
    likeDataGet:function(type){
      var _this = this
      this.getHomeLikeData({data:{page:_page}}).then(()=>{     
        var _data = this.homeLikeData
        if (_data.status == 1) {
            if (type == 1) {
              _this.likeData = _this.likeData.concat(_data.recommendList);
            } else {
              _this.likeData = _data.recommendList;       
              _this.scrollPage();
            }
            _totalCount = _data.totalCount;
            _this.isMember = _data.isMember;           

            _this.$nextTick(()=>{   
              _this.pinterestFun();         
              // _bodyH = document.body.clientHeight - window.screen.height;
              // window.scrollTo(0, _this.$refs.historyScroll.value);
            });
          }
          _this.loading = false;
          _this.request = false;
      })
    },
    backTopFun:function (){
      window.scrollTo(0,0)
    }
  },
  mounted: function() {
    this.ga = new Ganalytics({targetType:'121',gpm:'121'})
    let _param = "";

    if (this.accoutId && this.accoutId != "") {
      _param = {
        accountId: this.accoutId
      };
    }

    this.getHomeData({ data: _param }).then(() => {
      var _this = this;

      if (this.homeData.status == 4) {
        //处理微信调用接口缓存授权问题
        let _link = window.location.href;

        if (_link.indexOf("?") > -1) {
          window.location.href =
            _link + "&cache=" + Math.round(Math.random() * 100);
        } else {
          window.location.href =
            _link + "?cache=" + Math.round(Math.random() * 100);
        }
      }


      this.indexData = this.homeData;
      this.navData = this.homeData.navigationBarList;
      this.dynamicData = this.homeData.dynamicContentList;
      this.advertised = this.homeData.homeAdvertised;
      this.isLoad = false;

      
      // if(this.homeData.homeAdvertised && this.homeData.homeAdvertised.length > 0){
      //   _this.activityTan(_this.advertised[0].id,_this.advertised[0].isRepeat)
      // }

      _this.navData.map(function(i) {
        //初始化tab页
        _this.infoData.push("");
      });

      _this.$nextTick(()=>{
        _this.topBanner();        

        if (
          this.homeData.homePageNotice &&
          this.homeData.homePageNotice.homePageNoticeView.length > 0
        ) {
          _this.noticeSwiper();
        }

        this.homeData.dynamicContentList.map(function(item, i) {
          if (item.contentType == 2) {
            var _name = ".bao-swiper" + i,
              _len = item.hotDetail.nowList.length;
            var _baoObj = {
              name: _name,
              swiper: ""
            };
            _this.baoSwiper.push(_baoObj);
            _this.slideModule(_name, _len);
          }
          if (item.contentType == 3) {
            var _name = ".zong-swiper" + i;
            _this.slideModule(_name);
          }
          // if (item.contentType == 5) {
          //   var _name = ".berserk-swiper-container";
          //   _this.slideModule(_name);
          //   _this.berserkTime(item.dailyBerserk.endSecond);
          // }
        });
        if (_this.$refs.historyNav.value > 0) {
          _this.$refs.nav.children[0].children[
            _this.$refs.historyNav.value
          ].click();
        }
      });

      this.getHomeHotData({data:''}).then(()=>{  
        this.hotData = this.homeHotData.greatSale;
      })      
      this.likeDataGet()     
    });
    window.onscroll = () => { 
      var _scrollH = window.scrollY,
          _this = this
      if(_scrollH > 500){
          _this.backTop = true
      }else{
          _this.backTop = false
      }

      this.scrollPage()

      // _this.$refs.historyPage.value = _page;
    };
  }
};
</script>
