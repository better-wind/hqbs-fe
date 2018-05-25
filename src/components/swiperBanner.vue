<template>
  <swiper :options="swiperOption" ref="mySwiper" v-if="listImg">
    <swiper-slide v-for="(slide,index) in listImg" :key="index">
      <a :href="slide.url" class="swiper-info" v-lazy:background-image="slide.image"></a>
    </swiper-slide>
    <div class=" f-0 swiper-pagination" slot="pagination" v-if="listImg.length > 1"></div>
  </swiper>
</template>

<script>
  import Vue from "vue"
  import tool from '@/utils/tools'
  import { swiper, swiperSlide } from "vue-awesome-swiper"
  import ('swiper/dist/css/swiper.css')

  export default {
    data() {
      return {
        swiperOption: {
          notNextTick: false,
          autoplay: {
            delay:4000,
            disableOnInteraction: false
          },
          direction:'horizontal',
          pagination: {
            el: '.swiper-pagination',
            clickable :true
          },
          observer:true,
          observeParents:true,
          loop:true
        }
      }
    },
    props: ['listImg'],    
    components: {
      swiper,
      swiperSlide
    },
    updated(){      
    },
    mounted(){     
    
    }
  }
</script>

<style lang="scss">
.f-0 {
  font-size:0
}
.swiper-info {
  width: 100%;
  background:no-repeat center;
  background-size:cover;  
  vertical-align: top;
}
.swiper-container {
  .swiper-pagination-bullet{
    width: 15px;
    height: 3px;
    border-radius: 0;
    background:rgba(255,255,255,.4);
    opacity: 1;
  }
  .swiper-pagination-bullet-active{
    background:#fff
  }
}
.swiper-container-horizontal > .swiper-pagination-bullets .swiper-pagination-bullet{  
    margin:0 2px;
}
</style>
