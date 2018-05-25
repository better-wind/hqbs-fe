<style lang="less" scoped>
	.top-nav-wrap {
		width: 100%;
		// position: fixed;
		// top: 0;
		// left: 0;
		height: 44px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 12px 0 16px;
		box-sizing: border-box;
		background-color: #000;
    >div {
      display: flex;
      align-items: center;
      min-width: 30px;
      height: 100%;
    }
		.icon-back,.blank{
			width: 12px;
		}
		.icon-share {
			width: 22px;
		}
		.title {
			color: #fff;
			font-size: 18px;
		}
	}
</style>
<template>
  <div class="top-nav-wrap" ref="nav" v-show="wxShow">
    <div v-for="(item,index) in items" @click="handleClick(item.cb)">
    	<img v-if="item.type==='back'" :src="item.src" class="icon-back" />
    	<span v-if="item.type==='title'" class="title">{{item.text}}</span>
    	<img v-if="item.type==='share'" :src="item.src" class="icon-share" />
    	<span v-if="item.type==='blank'" class="blank"></span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      wxShow: true
    };
  },
  props: {
  	items: Array,
  	//displayType
  	//1  左边返回，中间标题(可有可无)，右边分享
  	//2  左边返回，中间标题
  	// displayType: {
  	// 	type: Number,
  	// 	default: 1
  	// }
  },
  methods: { 
    handleClick(cb){
      cb&&cb.call(this)
    }
  },
  mounted() {
    let ua = navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i)=="micromessenger") {
      this.wxShow = false
    }
  },
};
</script>