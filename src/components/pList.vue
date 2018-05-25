<template>
  <div class="like-box bg-fff mt-10 pb-10" v-if="listData && listData.length > 0">
    <h1 class="f-18 fw-n t_c hot-title">猜你喜欢</h1>
    <ul class="like-list clearfix" ref="likeList">
      <li class="left" v-for="(list,dataInx) in listData" :key="dataInx" :class="{'like-border':list.contentType == 1}" :style="{width:likeListW+'px'}">
        <template v-if="list.contentType == 1">
          <a href="javascript:;" v-lazy:background-image="list.product.image" class="like-tu" @click="clickTurn(list.product.displayURL)">
          </a>
          <div class="like-list-info">
            <p class="like-desc mb-5 like-list-tag" v-if="list.product.saleGoodsTagList.length>0">
              <template v-for="data in list.product.saleGoodsTagList">
              <i style="margin: 0.1rem .3rem 0 0;background: #FFF0F0;" v-if="data.type==2">{{data.tag}}</i>
              <i style="margin: 0.1rem .3rem 0 0;" v-if="data.type==1">{{data.tag}}</i></template>{{list.product.name}}</p>
            <p class="like-desc mb-5" v-else>{{list.product.name}}</p>
            <p class="f-16">
              <template v-if="isMember == 1">
                ￥{{list.product.highPrice}}
                <em class="member-price col-gold f-12">￥{{list.product.lowPrice}}</em>
              </template>
              <template v-else>
                ￥{{list.product.lowPrice}}
                <del class="col-ccc f-14">￥{{list.product.highPrice}}</del>
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
</template>

<script>
import tool from "@/utils/tools";

export default {
  name: "prouduct-list",
  data() {
    return {
      likeListW: (window.screen.width - 30) / 2
    };
  },
  props: ["listData","isMember"],
  methods: {
    // pinterestFun: function() {
    //   //瀑布流计算
    //   var _this = this,
    //     _listBox = document.querySelectorAll(".like-list"),
    //     _list = document.querySelectorAll(".like-list li");

    //   //用于存储 每列中的所有块框相加的高度。
    //   var pinHArr = [];
      
    //     console.log(_list.length)
    //   _list.forEach(function(value, index) {
    //     console.log(value)
    //     var pinH = _list[index].offsetHeight,
    //       _activityW = _list[index].children[0].getAttribute("data-width"),
    //       _activityH = _list[index].children[0].getAttribute("data-height"),
    //       _currentW = _list[index].children[0].offsetWidth,
    //       _ratio = _activityW / _activityH;

    //     if (_activityH) {
    //       pinH = _currentW / _ratio;
    //     }

    //     if (index < 2) {
    //       pinHArr[index] = pinH;
    //     } else {
    //       //数组pinHArr中的最小值minH
    //       var minH = Math.min.apply(null, pinHArr);
    //       // var minHIndex = $.inArray(minH, pinHArr);
    //       console.log(pinHArr)
    //       var minHIndex = pinHArr.findIndex((value,index,arr)=>{
    //         return value > minH;
    //       })
    //       console.log(minHIndex)
    //       // 将瀑布流中的元素定位在上一行中高度最小的元素下方
    //       _list[index].style.position = "absolute";
    //       _list[index].style.top = minH + 10 + "px";
    //       _list[index].style.left = _list[minHIndex].offsetLeft - 10 + "px";
    //       // $(value).css({
    //       //   position: "absolute",
    //       //   top: minH + 10,
    //       //   left: _list[minHIndex].offsetLeft - 10
    //       // });
    //       //数组 最小高元素的高 + 添加上的aPin[i]块框高
    //       //更新添加了块框后的列高
    //       pinHArr[minHIndex] += pinH + 10;
    //     }
    //   });
    //   //                _listBox.style.height =  Math.max.apply('',pinHArr) + 'px'
    //   // $(".like-list").height(Math.max.apply("", pinHArr));
    // }
  },
  mounted() {
   console.log(this.listData)
  }
};
</script>

<style lang="scss" scoped>

.footer-bar {
  display: -webkit-box;
  display: -webkit-flex;
  position: fixed;
  z-index: 10;
  left: 0;
  bottom: 0;
  width: 100%;
  max-width: 750px;
  height: 50px;
  background: #fff;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.3);
  text-align: center;
}

.footer-bar a {
  position: relative;
  flex: 1;
  width: 25%;
  padding-top: 6px;
  font-size: 10px;
}

.footer-bar .on {
  color: #000
}

.footer-bar a:before {
  content: '';
  display: block;
  width: 30px;
  height: 26px;
  margin: 0 auto 3px;
  background: no-repeat center;
  background-size: contain;
}

.footer-bar .footer-bar-tb1:before {
  background-image: url(/static/image/bar_tb1_gray.png)
}

.footer-bar .footer-bar-tb1.on:before {
  background-image: url(/static/image/bar_tb1.png)
}

.footer-bar .footer-bar-tb2:before {
  background-image: url(/static/image/bar_tb2_gray.png)
}

.footer-bar .footer-bar-tb2.on:before {
  background-image: url(/static/image/bar_tb2.png)
}

.footer-bar .footer-bar-tb3:before {
  background-image: url(/static/image/bar_tb3_gray.png)
}

.footer-bar .footer-bar-tb3.on:before {
  background-image: url(/static/image/bar_tb3.png)
}

.footer-bar .footer-bar-tb4:before {
  background-image: url(/static/image/bar_tb4_gray.png)
}

.footer-bar .footer-bar-tb4.on:before {
  background-image: url(/static/image/bar_tb4.png)
}

.car-num {
  position: absolute;
  top: 5px;
  left: 50%;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  line-height: 16px;
  background: #f00;
  color: #fff;
  text-align: center;
  font-size: 12px;
}

</style>
