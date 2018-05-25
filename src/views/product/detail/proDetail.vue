
<style scoped>
  .detail-comp { background: #fff; color: #000; }
  .detail-header { display: flex; align-items: center; height: 47px; font-size: 14px; padding-left: 10px;border-bottom: 1PX solid #eee;}
  .detail-info {  }
  img { width: 100%; }
</style>
<template>
  <div class="detail-comp" v-if="detailList&&detailList.length>0">
    <div class="detail-header">商品详情</div>
    <detailVideo :index="1" :poster="detailVideo.videoImg" :url="detailVideo.videoUrl" v-if="detailVideo"></detailVideo>
    <div class="detail-info">
      <img src="https://yangege.b0.upaiyun.com/1794a971b4043.png" v-for="item in detailList" class="animated fadeIn" v-lazy="{src:item.content,error:'../../../static/image/rect_img.png',loading:'../../../static/image/rect_img.png'}">
    </div>
  </div>
</template>

<script>
  import detailVideo from "@/components/video";
  export default {
    name: 'hot-pros',
    data () {
      return {
        
      }
    },
    computed: {
      
    },
    props:['detailList','detailVideo'],
    created () {
    },
    mounted () {
    },
    methods: {
    },
    components: {
      detailVideo
    }
  }
</script>

