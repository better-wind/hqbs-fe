<template>
<div class="box" id="berserk-box">
    <div class="berserk-time" v-cloak>
        <div class="swiper-wrapper">
            <div class="swiper-slide" :data-index="data.timeIndex" v-for="(data,index) in rankProduct.timeLine" @click="tabclickFun(index,$event)">
                <p><b>{{data.timeDate}}</b><span>{{data.timeType}}</span></p>
                <span class="timeStstus">{{data.timeStatus}}</span>
            </div>
        </div>
    </div>
    <div class="remaining-time" v-show="rankProduct.endSeconds" v-cloak>
        <span>{{rankProduct.endSecondsType}}</span>
        <p v-show="countDown.isShow">
            <span>{{countDown.changetime[0]}}</span><b>:</b><span>{{countDown.changetime[1]}}</span><b>:</b><span>{{countDown.changetime[2]}}</span>
        </p>
    </div>
    <div class="berserk-product-wrapper" v-cloak>
        <div class="berserk-product" v-for="(data,index) in rankProduct.dailyBerserk" @click="turnLink(data.url)">
            <div class="berserk-product-img" v-lazy:background-image="data.image"></div>
            <div class="berserk-product-mesg">
								<section class="berserk-product-name">
                    <b>{{data.title}}</b>
                    <i>{{data.salePoint}}</i>
                    <p class="free-post">
                        <span v-if="data.freeShipping">{{data.freeShipping}}</span>
                        <span v-if="data.directMail">{{data.directMail}}</span>
                        <span v-if="data.bondedDelivery">{{data.bondedDelivery}}</span>
                    </p>
                </section>
                <p class="berserk-product-price clearfix">
                    <a href="javascript:;" class="berserk-product-btn" :data-id="data.id" :class="data.status | getclassName">{{data.statusName}}</a>
                    <b>￥{{data.lowPrice}}</b><br>
                    <del>￥{{data.highPrice}}</del>
                </p>
                <!-- @click="collectFun($event,index)" -->
            </div>
        </div>
        <div class="berserk-product text-center" v-if="isHaveProduct">暂无商品</div>
    </div>
    <div class="load" v-show="isLoad">正在加载中...</div>
    <input type="hidden" id="turnid" value="0">
	<input type="hidden" id="turnheight" value="0">
	<input type="hidden" id="turntype" value="">
</div>
</template>
<script>
import tools from "@/utils/tools";
import "../../../static/js/zepto.min.js";
import Swiper from "swiper";
import "swiper/dist/css/swiper.css";
import config from "@/service/config";
import request, { httpRequest } from "@/service/request";
export default {
  name: "berserk",
  data() {
    return {
      rankProduct: [],
      isLoad: true,
      isHaveProduct: false,
      timePlay: [],
      swipeIndex: 0,
      countDown: {
        activeindex: 0,
        startOrEnd: "距开始",
        changetime: ["00", "00", "00"],
        isShow: true,
        timer: null
      },
      urlParam: "",
      initScroll: true
    };
  },
  filters: {
    isaddclass: function(value) {
      if (value < 4) {
        return "icon-" + value;
      }
    },
    getclassName: function(value) {
      var classNameArr = ["", "black-bg", "gray-bg", "black-bg"];
      var index = parseInt(value) - 1;
      return classNameArr[index];
    }
  },
  methods: {
    turnLink: function(url) {
      var sTop = $(window).scrollTop();
      $("#turnheight").val(sTop);
      $("#turnid").val(this.swipeIndex);
      var sturntype = $(".berserk-time .swiper-slide")
        .eq(this.swipeIndex)
        .attr("data-index");
      $("#turntype").val(sturntype);
      setTimeout(function() {
        window.location.href = url;
      }, 600);
    },
    addZero: function(value) {
      return value < 10 ? "0" + value : value;
    },
    getProData: function(data) {
      var _this = this;
      let conf = new config();
      conf.url = "/ygg-hqbs/dailyBerserk/dailyBerserkInfo";
      conf.data = data;
      return new request(conf).POST().then(response => {
        if (response.status == 4) {
          //处理微信调用接口缓存授权问题
          var _link = window.location.href;

          if (_link.indexOf("?") > -1) {
            window.location.href =
              _link + "&cache=" + Math.round(Math.random() * 100);
          } else {
            window.location.href =
              _link + "?cache=" + Math.round(Math.random() * 100);
          }
        }
        _this.rankProduct = response;
        this.getDataReset;
        _this.isLoad = false;
      });
    },
    collectPost: function(callback) {
      this.$http
        .post("/hqbs-h5/collect/add?type=1&collectId")
        .then(
          function(response) {
            console.log(response.body);
          },
          function(response) {
            alert("收藏失败");
          }
        )
        .then(function() {
          callback();
        });
    },
    canclePost: function(callback) {
      this.$http
        .post("/hqbs-h5/collect/cancle?type=1&collectId")
        .then(
          function(response) {
            console.log(response.body);
          },
          function(response) {
            alert("取消收藏失败");
          }
        )
        .then(function() {
          callback();
        });
    },
    collectFun: function(e, index) {
      var sHtml = $(".berserk-product-btn")
        .eq(index)
        .html();
      function cancelBubble() {
        if (e.stopPropagation) {
          e.stopPropagation();
        } else {
          e.cancelBubble = true;
        }
      }
      if (sHtml == "抢先收藏") {
        cancelBubble();
        this.collectPost(function() {
          $(".berserk-product-btn")
            .eq(index)
            .html("取消收藏");
        });
      } else if (sHtml == "取消收藏") {
        cancelBubble();
        $(".berserk-product-btn")
          .eq(index)
          .html("抢先收藏");
      }
    },
    tabclickFun: function(index, e) {
      e.preventDefault();
      if (this.swipeIndex == index) {
        return false;
      }
      var _this = this;
      this.isLoad = true;
      this.swipeIndex = index;
      this.isHaveProduct = false;
      var timeType = $(".swiper-slide")
        .eq(index)
        .attr("data-index");
      var _this = this;
      this.rankProduct.dailyBerserk = []; //清空列表数据
      $(".berserk-time .swiper-slide")
        .eq(index)
        .addClass("active")
        .siblings()
        .removeClass("active");
      var sindex = index - 2 > 0 ? index - 2 : 0;
      this.swiper.slideTo(sindex, 1000, false);
      let data = {
        timeType: timeType
      };
      this.getProData(data).then(function() {
        _this.timeFun(index);
      });
    },
    timeFun: function(num) {
      this.timeStatus();
    },
    formatSeconds: function(value) {
      var theTime = parseInt(value); // 秒
      var mins = 0; // 分
      var hour = 0; // 小时
      if (theTime >= 60) {
        mins = parseInt(theTime / 60);
        theTime = theTime % 60;
        if (mins >= 60) {
          hour = parseInt(mins / 60);
          mins = mins % 60;
        }
      }
      return (
        this.addZero(hour) +
        ":" +
        this.addZero(mins) +
        ":" +
        this.addZero(theTime)
      );
    },
    timeStatus: function() {
      var _this = this;
      var totalSncond = this.rankProduct.endSeconds;
      //totalSncond=10;
      function countDown() {
        if (totalSncond < 0) {
          clearInterval(_this.countDown.timer);
          totalSncond = 0;
          _this.getProData({}).then(function() {
            var sindex = _this.swipeIndex - 2 > 0 ? _this.swipeIndex - 2 : 0;
            _this.swiper.slideTo(sindex, 1000, false);
            $(".berserk-time .swiper-slide")
              .eq(_this.swipeIndex)
              .addClass("active")
              .siblings()
              .removeClass("active");
            _this.timeFun();
          });
        }
        _this.countDown.changetime = _this
          .formatSeconds(totalSncond)
          .split(":");
        totalSncond--;
      }
      if (totalSncond) {
        clearInterval(this.countDown.timer);
        countDown();
        this.countDown.timer = setInterval(countDown, 1000);
      }
    }
  },
  computed: {
    getDataReset: function() {
      var timeStaArr = ["抢购中", "即将开始"],
        countDownStatus = ["距开始", "距结束", "已结束"],
        productSatus = ["立即抢购", "还有机会", "已抢完", "抢先收藏"],
        timeArr = [
          "10:00",
          "14:00",
          "20:00",
          "10:00",
          "14:00",
          "20:00",
          "10:00",
          "14:00",
          "20:00"
        ];
      var _this = this;
      this.rankProduct.timeLine.forEach(function(value, index) {
        _this.rankProduct.timeLine[index].timeStatus =
          timeStaArr[value.timeStatus - 1];
        _this.rankProduct.timeLine[index].timeIndex = value.timeType;
        _this.rankProduct.timeLine[index].timeType =
          timeArr[value.timeType - 1];
        if (
          _this.rankProduct.timeLine[index].timeIndex ==
          _this.rankProduct.timeType
        ) {
          _this.swipeIndex = index;
        }
      });
      if (this.rankProduct.dailyBerserk) {
        this.isHaveProduct = false;
        this.rankProduct.dailyBerserk.forEach(function(value, index) {
          _this.rankProduct.dailyBerserk[index].statusName =
            productSatus[value.status - 1];
        });
      } else {
        this.isHaveProduct = true;
        this.rankProduct.dailyBerserk = [];
      }
      this.rankProduct.endSecondsType =
        countDownStatus[this.rankProduct.endSecondsType - 1];
      if (this.rankProduct.endSecondsType == 1) {
        this.countDown.isShow = false;
      }
    }
  },
  mounted: function() {
    var odiv = $(".berserk-time");
    $(window).scroll(function() {
      var top = $(window).scrollTop();
      if (top > 0) {
        odiv.addClass("active1");
        $(".remaining-time").css({
          marginTop: "1.33333333rem"
        });
      } else {
        odiv.removeClass("active1");
        $(".remaining-time").css({ marginTop: "0" });
      }
    });
  },
  watch: {},
  created: function() {
    //var locationUrl=window.location.href;
    var _this = this;
    var sTimeType = "",
      surltype = "";
    //导航栏选中
    //if(_this.initScroll){
    //sTimeType=$('#turntype').val();
    //console.log(sTimeType)
    //}
    var _url = "/ygg-hqbs/dailyBerserk/dailyBerserkInfo";

    this.getProData({}).then(function() {
      _this.swiper = new Swiper(".berserk-time", {
        slidesPerView: "auto",
        grabCursor: true,
        freeMode: true
      });
      /*if($('#turnid').val()==0){
				$('#turnid').val(_this.swipeIndex);
			}*/
      //导航栏选中
      //if(_this.initScroll){
      var activeIndex = _this.swipeIndex;
      //alert(activeIndex)
      var sindex = activeIndex - 2 > 0 ? activeIndex - 2 : 0;
      _this.swiper.slideTo(sindex, 1000, false);
      $(".berserk-time .swiper-slide")
        .eq(activeIndex)
        .addClass("active")
        .siblings()
        .removeClass("active");
      //$('body').scrollTop($('#turnheight').val());
      _this.timeFun(activeIndex);
      //_this.initScroll = false;
      //}
    });
  }
};
</script>
<style lang="scss" >
.mar-top {
  margin-top: 1.33333333rem;
}
.load {
  text-align: center;
  font-size: 0.4rem;
  margin-top: 1.33333333rem;
}
.berserk-time {
  width: 100%;
  overflow: hidden;
  background: #fff;
}
.active1 {
  position: fixed;
  left: 50%;
  top: 0;
  z-index: 10;
  max-width: 750px;
  -webkit-transform: translate(-50%, 0);
}
.berserk-time .swiper-slide {
  width: 21%;
  height: 1.33333333rem;
  background: #f3f3f3;
  text-align: center;
  color: #4d4d4d;
  /*padding-bottom: 1%;*/
  -webkit-tap-highlight-color: transparent;
}
.berserk-time .swiper-slide p {
  font-size: 0.42666667rem;
  margin: 7% 0 -4px 0;
  overflow: hidden;
}
.berserk-time .swiper-slide p b {
  font-size: 0.29333333rem;
  font-weight: bold;
  margin: 0 6px 0 0;
}
.berserk-time .swiper-slide p span {
  vertical-align: middle;
  font-weight: bold;
}
.berserk-time .swiper-slide .timeStstus {
  font-size: 0.29333333rem;
}
.berserk-time .swiper-slide .tomorrow {
  /*width:1.8rem;
            margin: 7% auto 2px auto;*/
}
.berserk-time .active {
  color: #ff0000;
  background: #fff;
}
.remaining-time {
  color: #000;
  overflow: hidden;
  text-align: center;
  padding: 0.33333333rem 0;
  font-weight: bold;
  background:#fff;
}
.remaining-time > span {
  /*float:left;*/
  display: inline-block;
  height: 0.48rem;
  line-height: 0.48rem;
}
.remaining-time p {
  display: inline-block;
}
.remaining-time p span {
  display: inline-block;
  width: 0.56rem;
  height: 0.48rem;
  line-height: 0.48rem;
  background: #000;
  text-align: center;
  color: #fff;
  font-size: 0.32rem;
  font-weight: bold;
}
.remaining-time p b {
  margin: 0 0.13333333rem;
  font-weight: bold;
}
.berserk-product {
  width: 92%;
  padding: 4%;
  border-top: 1px solid #f3f3f3;
  overflow: hidden;
  background: #fff;
}
.berserk-product .berserk-product-img {
  float: left;
  width: 140px;
  height: 140px;
  background: no-repeat center;
  background-size: cover;
}
// .berserk-product .berserk-product-img img {
//   width: 100%;
//   height: 3.73333333rem;
// }
.berserk-product .berserk-product-mesg {
  position: relative;
  margin-left: 150px;
}
.berserk-product .berserk-product-mesg .berserk-product-name {
  color: #000;
  font-size: 0.42666667rem;
  margin-top: 0.16rem;
  min-height: 90px;
}
.berserk-product-mesg .berserk-product-name b {
  font-size: 18px;
  font-weight: normal;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  width: 100%;
}

.berserk-product .berserk-product-mesg .berserk-product-name i {
  font-size: 14px;
  color: #4d4d4d;
  display: block;
  margin-top: 0.10666667rem;
  width: 100%;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.berserk-product .berserk-product-mesg .free-post {
  // margin-top: 0.10666667rem;
  // overflow: hidden;
}
.berserk-product .berserk-product-mesg .free-post span {
  display: inline-block;
  height: 15px;
  line-height: 15px;
  padding: 0rem 3px;
  margin: 0 0.16rem 0.1rem 0;
  color: #ff0000;
  font-size: 10px;
  border: 1px solid #ff0000;
}
.berserk-product .berserk-product-mesg .berserk-product-price {
  margin-top: 5px;
}
.berserk-product .berserk-product-mesg .berserk-product-price b {
  color: #ff0000;
  font-size: 0.48rem;
  line-height: 0.48rem;
}
.berserk-product .berserk-product-mesg .berserk-product-price del {
  font-size: 10px;
  color: #858585;
  display: block;
  margin-left: 0.1rem;
  line-height: 0.35rem;
}
.berserk-product .berserk-product-mesg .berserk-product-btn {
  float: right;
  width: 2rem;
  height: 0.72rem;
  line-height: 0.72rem;
  color: #fff;
  text-align: center;
  font-size: 0.32rem;
  // position: absolute;
  // bottom: 2%;
  // right: 0;
  margin-top: 5px;
  background: #ff0000;
}
.berserk-product .berserk-product-mesg .black-bg {
  background: #000;
}
.berserk-product .berserk-product-mesg .gray-bg {
  background: #858585;
}
@media only screen and (max-width: 320px) {
  .berserk-product-mesg .berserk-product-name b {
    font-size: 14px;
  }
  .berserk-product .berserk-product-mesg .berserk-product-name span {
    font-size: 12px;
  }
  .berserk-product .berserk-product-mesg .free-post span {
    font-size: 12px;
  }
  .berserk-product .berserk-product-mesg .berserk-product-btn {
    font-size: 12px;
  }
}
</style>

