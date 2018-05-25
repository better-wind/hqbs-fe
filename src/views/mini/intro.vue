<style scoped>
  .intro {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .intor-bg{
    background-color: #2B1756;
  }
  .intro img{
    margin: 0;
    padding: 0;
    width: 100%;
    border:0 none;
  }
  .intro-foot {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1.6rem;
    line-height: 1.6rem;
    background-color: #fff;
    z-index: 99;

  }
  .intro-foot-btn {
    margin:7px 10px;
    height: 1.227rem;
    line-height: 1.227rem;
    text-align: center;
    background-color: #000;
    color: #fff;
    font-size: .427rem;
    z-index: 99;
  }
</style>
<template>
  <div v-if="isApp">
    <div class="intro intor-bg">
      <img src="../../assets/image/mini/bg_01.jpg"/>
      <img src="../../assets/image/mini/bg_02.jpg"/>
      <img src="../../assets/image/mini/bg_03.jpg"/>
      <div class="intro-foot">
        <div class="intro-foot-btn" @click="share">转发至捕手群，培育群果树领大奖</div>
      </div>
    </div>
  </div>
  <div v-else >
    <div class="intro">
      <img src="../../assets/image/mini/wx_bg_01.jpg"/>
      <img src="../../assets/image/mini/wx_bg_02.jpg"/>
      <img src="../../assets/image/mini/wx_bg_03.jpg"/>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'intro',
    data () {
      return {
        isApp: !!this.$route.query.isApp && this.$route.query.isApp == 1
      }
    },
    computed: {
    },
    created () {
    },
    mounted () {
    },
    methods: {
      share () {
        window.location.href = 'ggj://redirect/typeCommon/{"type":"30","id":"1734","shareInfoType":"3"}'
        // window.location.href = 'ggj://redirect/typeCommon/{"type":7}'
      }
    }
  };
</script>
