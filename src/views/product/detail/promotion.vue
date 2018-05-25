
<style scoped>
  .product-info-title {display: flex; height: 42px; align-items: center; background-color: #fff; padding-left: 10px;}
  .between { justify-content: space-between; }
  .low-price { font-size: 24px; margin-right: 9px;}
  .price-icon { border-radius: 2px; border: 1PX solid #ff0000;font-size: 10px; color: #ff0000; padding: 0 1px; line-height: normal; margin-right: 12px; align-self: flex-start;margin-top: 12px;}
  .high-price { color: #858585; margin-right: 12px; align-self: flex-start;margin-top: 12px;}
  .high-price i { text-decoration: line-through; }
  .vip-icon { font-size: 7px; background: #D5AD5B; color: #fff; padding: 0 1PX; border-radius: 1PX; margin-left: 4px; align-self: flex-start; vertical-align: top;margin-top: 5px;}
  .vip-price { font-size: 16px; align-self: flex-start; vertical-align: top; margin-top: 9px; color: #C59F51;}
  .time-count { color: #858585; font-size: 11px; right: 10px;}
  .product-intro { color: #4D4D4D; padding-left: 10px; margin-bottom: 14px;}
  .promotion-price { color: #ff0000; margin-left: 12px; margin-bottom: 14px; }
  .promotion-zone { display: inline-block; font-size: 0; }
  .promotion-low-price{ font-size: 32px; margin-right: 6px; }
  .promotion-tip { font-size: 10px;  }
  .promotion-high-price { font-size: 12px; }
  .promotion-count { color: #fff; font-size: 11px; margin-right: 5px;}
  .promotion-count i { display: inline-block; width: 20px; height: 18px; line-height: 19px;;background: #fff; color: #000; vertical-align: middle;margin: 0 5px; text-align: center;}
  .normal-top { top: 12px; }
  /*.promotion-top { top: 16px; }*/
</style>

<template>
  <div class="promotion" v-if="promotion">

    <!-- 日常无活动 -->
    <div class="product-info-title " v-if="promotion.type=='0'">
      <span class="low-price">￥{{product.lowPrice}}</span>
      <span class="high-price" v-if="product.isMb=='0'">市场价<i>￥{{product.highPrice}}</i></span>
      <span class="gold vip-price " v-else>￥{{product.memberPrice}}<i class="vip-icon">会员价</i></span>
      <!-- <span class="inlbk time-count abs">距活动开始<i></i></span> -->
    </div>

    <!-- 日常促销 -->
    <div class="product-info-title " v-if="promotion.type=='1'">
      <span class="low-price">￥{{promotion.activityPrice}}</span>
      <i class="inlbk price-icon" v-if="promotion.name">{{promotion.name}}</i>
      <span class="high-price" v-if="product.isMb=='0'">原价<i>￥{{product.lowPrice}}</i></span>
      <span class="gold vip-price" v-else>￥{{product.memberPrice}}<i class="vip-icon">会员价</i></span>
      <span class="inlbk time-count abs normal-top" v-if="promotion.second>0">距结束剩<i>{{time.nH}}:{{time.nM}}:{{time.nS}}</i></span>
    </div>
    <!-- 限时购 -->
    <div class="product-info-title between" v-if="promotion.type=='2'" :style="{backgroundImage:`url(${promotion.imageUrl})`,color:'#fff',marginBottom:'14px',height:'50px'}">
      <div>
        <span class="promotion-low-price">￥{{promotion.activityPrice}}</span>
        <div class="promotion-zone" >
          <span class="promotion-tip" v-if="promotion.name">{{promotion.name}}</span><br>
          <span class="promotion-high-price" v-if="product.isMb=='0'"><del>￥{{product.lowPrice}}</del></span>
          <span class="promotion-high-price" v-else>会员价￥{{product.memberPrice}}</span>
        </div>
      </div>
      <span class="inlbk time-count promotion-count" v-if="showStart">距开始剩<i>{{time.nH}}</i>:<i>{{time.nM}}</i>:<i>{{time.nS}}</i></span>
      <span class="inlbk time-count promotion-count" v-if="showEnd">距结束剩<i>{{time.nH}}</i>:<i>{{time.nM}}</i>:<i>{{time.nS}}</i></span>
    </div>
    <!-- 大促 -->
    <div class="product-info-title between" v-if="promotion.type=='3'" :style="{backgroundImage:`url(${promotion.imageUrl})`,color:'#fff',marginBottom:'14px',height:'50px'}">
      <div>
        <span class="promotion-low-price" v-if="promotion.activityStatus=='2'">￥{{promotion.activityPrice}}</span>
        <span class="promotion-low-price" v-if="promotion.activityStatus=='1'">￥{{product.lowPrice}}</span>
        <div class="promotion-zone" >
          <span class="promotion-tip" v-if="promotion.name">{{promotion.name}}</span><br>
          <span class="promotion-high-price" v-if="product.isMb=='0'"><del>￥{{product.highPrice}}</del></span>
          <span class="promotion-high-price" v-else>会员价￥{{product.memberPrice}}</span>
        </div>
      </div>
      <span class="inlbk time-count promotion-count" v-if="showStart">距开始剩<i>{{time.nH}}</i>:<i>{{time.nM}}</i>:<i>{{time.nS}}</i></span>
      <span class="inlbk time-count promotion-count" v-if="showEnd">距结束剩<i>{{time.nH}}</i>:<i>{{time.nM}}</i>:<i>{{time.nS}}</i></span>
    </div>

    <span class="product-intro" v-if="product.isMb=='1'">{{product.shareProfit}}</span>
    <span class="promotion-price" v-if="promotion.type=='3'&&promotion.activityStatus=='1'&&product.isMb=='1'">{{promotion.name}}会员价￥{{promotion.activityPrice}}</span>
    <span class="promotion-price" v-if="promotion.type=='3'&&promotion.activityStatus=='1'&&product.isMb!='1'">{{promotion.name}}￥{{promotion.activityPrice}}</span>
  </div>
</template>

<script>
  import Tlite from '@/utils/time-lite'
  import Tools from '@/utils/tools'
  export default {
    name: 'promotion',
    data () {
      return {

      }
    },
    computed: {
      time(){
        return this.getTime(this.promotion.second)
      },
      showStart(){
        return (this.promotion.activityStatus=='1' && this.promotion.second>0) || false
      },
      showEnd(){
        return (this.promotion.activityStatus=='2' && this.promotion.second>0) || false
      }
    },
    created () {
    },
    mounted () {
      this.timeCount()
    },
    props: {
      product:{
        type:Object
      },
      promotion:{
        type:Object
      }
    },
    methods: {
     timeCount(){
      Tools.timeCount(this.promotion.second, data => {
        this.promotion.second = data
      },() => {
        this.$emit('refresh')
      })
     },
     getTime(seconds){
      let nH = this.formate(seconds / (60 * 60));
      let nM = this.formate(seconds /  60 % 60);
      let nS = this.formate(seconds % 60);
      return {nH,nM,nS}
     },
     formate(num){
      let n = Math.floor(num)+''
      if(n.length==1){
        return '0' + n
      }
      return n
     }
    }
  }
</script>
