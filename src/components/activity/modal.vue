<style scoped lang="less">
  .custom-modal-wrap {
  	width: 100%;
  	height: 100%;
  	position: absolute;
  	top: 0;
  	left: 0;
  	background-color: rgba(0,0,0,0.5);
    >div {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate3d(-50%,-50%,0);
      .close-btn {
        width: 38px;
        position: absolute;
        top: -60px;
        right: 0;
        z-index: -1
      }
      .modal-content {
        width: 315px;
        box-sizing: border-box;
        padding: 0 20px 30px;
        background-color: #EAECFF;
        border-radius: 8px;
        overflow: hidden;    
        .btns {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .btn {
            line-height: 50px;
            text-align: center;
            border-radius: 100px;
          }
        }
      }
    }
  }
</style>
<template>
  <div class="custom-modal-wrap">
    <div>
      <img class="close-btn" :src="closeBtnIcon" v-if="closeBtnShow" @click="handleCloseBtn" />
      <div class="modal-content">
        <slot name="ct"></slot>
        <div class="btns">
          <div class="btn" :style="item.style" v-for="(item,index) in btnList" @click="handleBtn(item.cb)">{{item.text}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
	import closeBtnIcon from '@/assets/image/activity/quizzes/modal-close-icon.png'
  export default {
    props: {
      closeBtnShow: {
      	type: Boolean,
      	default: true
      },
      btnList: {
      	type: Array
      }
    },
    data (){
    	return {
    		closeBtnIcon: closeBtnIcon
    	}
    },
    computed: {
      
    },
    mounted: function () {
    },
    methods: {
      handleBtn(cb){
        cb&&cb.call(this)
      },
      handleCloseBtn(){
        this.$emit('closeModalCb')
      }
    }
  }
</script>
