
<style scoped>
  .bottom { width: 100%; height: 50px; background: #fff; z-index: 999;padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);}
  .part { display: flex; width: 50%; height: 100%; float: left; box-sizing: border-box; text-align: center; }
  .left { height: 49px; border-top: 1PX solid #d9d9d9; padding-top: 8px; padding-bottom: 5px; }
  .left>div { display: inline-block; width: 33%; border-right: 1PX solid #e0e0e0; font-size: 0; }
  .left>div:last-child { border-right: 0; }
  .icon { width: 22px; height: 23px; background: url('../../../assets/image/home.png') no-repeat; background-size: 100%; }
  .cart { background: url('../../../assets/image/cart.png') no-repeat; background-size: 100%; }
  .kefu { background: url('../../../assets/image/kefu.png') no-repeat; background-size: 100%; }
  .desc { font-size: 10px; margin-top: 3px; }
  .cart-num { display: block; width: 14px; height: 14px; line-height: 14px; font-size: 10px; background: #ff1919; color: #fff; border-radius: 50%; top: -2px; right: 10px;}

  .right p { height: 50px; line-height: 50px; flex-grow: 1; background: #000; color: #fff; font-size: 16px; text-align: center; }
  .right p i { display: inline-block; width: 18px; height: 18px; background: url('../../../assets/image/chance.png') no-repeat; background-size: 100%; vertical-align: middle; margin-right: 5px;}
  .graybg { background: #858585!important; }
  .redbg { background: #D50000!important; }
  .f-14 { font-size: 14px !important;}
</style>

<template>
  <div class="bottom">
    <div class="part left">
      <div @click="goHome">
        <i class="icon"></i><br>
        <span class="desc">首页</span>
      </div>
      <div class="rela" @click="goCart">
        <i class="icon cart"></i><br>
        <span class="desc">购物袋</span>
        <em class="cart-num abs" v-if="count.cartCount>0">{{count.cartCount}}</em>
      </div>
      <div >
        <a href="javascript:;" @click="goKefu()">
          <i class="icon kefu"></i><br>
          <span class="desc">客服</span>
        </a>
      </div>
    </div>
    <div class="part right">
      <p v-if="product.seeMoreProps" @click="submit">查看更多规格</p>
      <p v-if="product.selectProps" @click="submit">选择规格</p>
      <p v-if="product.addCart" @click="submit(1)" :class="{'f-14':product.buyNow}">加入购物袋</p>
      <p v-if="product.hasChance" @click="submit(2)"><i></i>还有机会</p>
      <p v-if="product.collectNow" @click="submit(3)">抢先收藏</p>
      <p v-if="product.collectCancel" @click="submit(3)">取消收藏</p>
      <p v-if="product.subscriptionTip" class="graybg" @click="submit(4)">到货提醒</p>
      <p v-if="product.buyNow" @click="submit(5)" class="redbg f-14">立即抢购</p>
    </div>
  </div>
</template>

<script>
import auth from "@/utils/auth";
  export default {
    name: 'bottom',
    data () {
      return {
        window:window
      }
    },
    computed: {

    },
    created () {
    },
    mounted () {
      console.log(this.product)
    },
    props:['product', 'callback', 'count', 'goKefu','promotion'],
    methods: {
      submit(type){
        this.callback(type,this.product.productId,1)
      },
      buy(){
        this.callback(this.product.selectType,this.product.productId,1,2)
      },
      goHome(){
        this.$router.push("/");
      },
      goCart(){
        if (auth.isLoggedIn()){
          window.location.href = '/ygg-hqbs/spcart/listsc'
        } else {
          auth.login(window.location.href)
        }
      }
    }

  }
</script>
