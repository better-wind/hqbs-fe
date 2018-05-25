<template>
  <swiper :options="swiperOption" ref="mySwiper" v-if="list">
    <swiper-slide v-for="(slide,index) in list" :key="index">
      <a :style="'background-image:url('+slide.maxUrl+')'" class="swiper-infos animated aFadeIn" ></a>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination" v-if="list.length > 1"></div>
  </swiper>
</template>
<script>

  import { swiper, swiperSlide } from "vue-awesome-swiper"
  import('swiper/dist/css/swiper.css')

  export default {
    name: 'banner',
    data () {
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
    computed: {
    },
    created () {
    },
    mounted () {
    },
    methods: {
      
    },
    props: ['list'],    
    components: {
      swiper,
      swiperSlide
    },
  }
</script>
<style>
  .swiper-infos {
    width: 100%;
    height: 375px;
    background:no-repeat center;
    background-size:cover;  
    vertical-align: top;
    padding-top: 0;
  }
  
</style>
