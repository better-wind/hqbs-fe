<style lang="less" scoped>
	strong {
		color: #FCCE72;
		font-weight: normal;
	}
	.quizzes-index-wrap {
		position: absolute;
		width: 100%;
		min-height: 100%;
		overflow: hidden;
		background: url('') no-repeat 0 0;
		background-size: cover;
		.intro {
			width: 333px;
			height: 164px;
			margin: 128px auto 16px;
			border-radius: 6px;
			border: 1PX solid #5E6291;
			background-color: rgba(255,255,255,0.2);
			padding: 15px;
			box-sizing: border-box;
			font-size: 14px;
			.rules {
				display: flex;
				color: #8C90C0;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 14px;
			}
			.awards {
				display: flex;
				align-items: center;
				justify-content: space-around;
				margin-bottom: 6px;
				>div {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					font-size: 15px;
					>span {
						color: #fff;				
					}
				}
			}
			.desc {
				width: 100%;
				margin-bottom: 14px;
				text-align: center;
				color: #fff;
			}
			.result {
				display: flex;
				align-items: center;
				justify-content: space-between;
				width: 100%;
				color: #8C90C0;
			}
		}
		.countdown {
			width: 100%;
			height: 20px;
			color: #D40459;
			font-size: 16px;
			text-align: center;
			margin-bottom: 20px;
		}
		.start-btn {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100px;
			height: 100px;
			line-height: 1.2;
			border-radius: 50%;
			background-color: #D40459;
			margin: 0 auto;
			box-shadow: 0 0 0 6px rgba(193,3,80,0.26);
			margin-bottom: 8px;
			font-size: 22px;
			color: #fff;
		}
		.over {
			color: #2A2254;
			background-color: #4A4A6F;
			box-shadow: 0 0 0 6px rgba(3,2,33,0.15);
		}
		.btns {
			font-size: 16px;
			overflow: hidden;
			div,a {
				display: block;
				width: 335px;
				line-height: 40px;
				margin: 20px auto;
				border: 1PX solid #FCCE72;
				border-radius: 100px;
				text-align: center;
			}
			.type1 {
				background-color: #FCCE72;
				color: #2B1676;
			}
			.type2 {
				width: 333px;
				color: #FCCE72;
			}
			strong {
				color: #D40459;
			}
		}
	}
	.wxBg {
		background-position: 0 -44px;
	}
	.modal-rules {
		color: #2B1676;
		font-size: 14px;
		>h1 {
			margin-top: 24px;
			margin-bottom: 16px;
			font-size: 18px;
			position: relative;
			text-align: center;
			&:after,&:before {
				position: absolute;
				top: 50%;
				display: inline-block;
				content: '';
				width: 100px;
				height: 2px;
			}
			&:after {
				left: 50%;
				background-image: linear-gradient(-90deg, rgba(86,49,174,0.00) 0%, #2B1676 100%);
				transform: translate3d(40%,0,0);
			}
			&:before {
				right: 50%;
				transform: translate3d(-40%,0,0);
				background-image: linear-gradient(90deg, rgba(86,49,174,0.00) 0%, #2B1676 100%);
			}
		}
		>p {
			margin-bottom: 20px;
			line-height: 1.5;
			font-size: 14px;
			>strong {
				font-weight: 800;
				color: currentColor;
			}
		}
	}
	.modal-out,.modal-chance {
		width: 100%;
		height: 52px;
		text-align: center;
		color: #2C1776;
		font-size: 16px;
		line-height: 1.7;
		margin: 40px 0;
		>strong {
			color: #D40459;
		}
	}
</style>
<template>
	<div class="quizzes-index-wrap" :style="{'backgroundImage':'url('+ day[dayIndex].bg +')'}" :class="{'wxBg':isWx}">
		<TopNav :items="navItems" :style="{'backgroundColor':'transparent'}"></TopNav>
	  <div class="intro">
	  	<p class="rules">
	  		<span>答题闯关成功即可瓜分奖金</span>
	  		<span @click="handleRulesBtn"> 规则 > </span>
	  	</p>
	  	<div class="awards">
	  		<div v-for="(item,index) in day[dayIndex].awardList" :key="index">
	  			<span v-if="index===0">一等奖</span>
	  			<span v-else-if="index===1">二等奖</span>
	  			<span v-else-if="index===2">三等奖</span>
	  			<strong>{{item}}G币</strong>
	  		</div>
	  	</div>
	  	<p class="desc">普天同庆奖：随机数额G币</p>
	  	<p class="result">
	  		<span>已获得：<strong>{{sQuizzesInfo.amount}}</strong> G币</span>
	  		<span>答题剩余：<strong>{{sQuizzesInfo.leftTimes}}</strong> 次</span>
	  	</p>
	  </div>
	  <Countdown v-if="sQuizzesInfo.activityStatus==1" :endTime="sQuizzesInfo.endTime/1000" endText="活动已结束"></Countdown>
	  <div class="countdown" :style="{'color': '#fff'}" v-else-if="sQuizzesInfo.activityStatus==0">活动将于晚上21:00开始</div>
	  <div class="countdown" :style="{'color': '#fff'}" v-else>{{dayIndex==0?'活动已结束，下场明天21:00开始':'活动已结束'}}</div>
	  <div class="start-btn" :class="{over:sQuizzesInfo.activityStatus!=1}" @click="handleStartBtn(sQuizzesInfo.activityStatus)">开始<br/>答题</div>
	  <div class="btns">
	  	<!-- <div :class="day[dayIndex].btn.type" @click="handleLink">{{day[dayIndex].btn.text}}</div> -->
	  	<a :href="sQuizzesInfo.mainUrl" class="type1" v-if="textShow">9号23:00开抢优惠券</a>
	  	<a :href="sQuizzesInfo.answerUrl" class="type2" v-else>查看答题攻略，80%的答题都在这里</a>
	  	<div class="type1" v-if="sQuizzesInfo.shareNum==0" @click="handleShareCb">分享即可 <strong>+1</strong> 次答题机会</div>
	  	<div class="type1" v-else @click="handleShareCb">邀请好友，参与瓜分</div>
	  </div>
	  <Modal :btnList="modalData.btnList" :closeBtnShow="modalData.closeBtnShow" @closeModalCb="closeModal" v-show="modalData.type>0">
	  	<div slot="ct" class="modal-out" v-show="modalData.type==4">今日答题次数已用完<br /><strong>9号23:00主会场开抢优惠券</strong><br/>快去主会场逛逛吧</div>
	  	<div slot="ct" class="modal-out" v-show="modalData.type==3">今日答题次数已用完<br />记得明天再来参与哦</div>
	  	<div slot="ct" class="modal-chance" v-show="modalData.type==2">活动次数已用完<br />邀请好友参与即可获得<strong>+1</strong>次答题机会</div>
	  	<div slot="ct" class="modal-rules" v-show="modalData.type==1">
	  		<h1>规则</h1>
	  		<p>1）每人可直接参与一次答题，分享答题活动后可获得一次答题机会，每人每天最多参与2次答题</p>
	  		<p>2）答对5道题即闯关成功，可获得G币。每人每天最多可获得2次G币</p>
	  		<p>3）抽奖所得G币将在活动结束后24小时内发送，G币将直接打入捕手账户</p>
	  		<p>4）活动时间：<strong>5月8日-5月9日</strong>两天晚上<strong>21:00-22:00</strong>进行答题，答题活动持续时间为1小时</p>
	  		<p>5）G币购物时，1G币=1RMB，G币最多可抵扣订单应付金额的50%，红包G币有效期为15天</p>
	  	</div>
	  </Modal>
	  <!-- <WxShare></WxShare> -->
	</div>
</template>
<script>
	import { mapState, mapActions } from 'vuex'
	import auth from '@/utils/auth'
	import bg100 from '@/assets/image/activity/quizzes/bg-100.jpg'
	import bg150 from '@/assets/image/activity/quizzes/bg-150.jpg'
	import navBackIcon from '@/assets/image/arrow-left-white.png'
	import navShareIcon from '@/assets/image/activity/quizzes/share-icon.png'
	import Modal from '@/components/activity/modal'
	import TopNav from '@/components/activity/topNav'
	import Countdown from '@/components/activity/countdown'
	// import WxShare from '@/components/activity/wxShare'
	import '@/assets/dialog/fm.dialog.min.css'
	import { Dlg } from '@/assets/dialog/fm.dialog.min.js'
  export default {
    name: 'quizzesIndex',
    components: {
      Modal,
      TopNav,
      Countdown,
      //WxShare
    },
    computed:{
      ...mapState('modActivityQuizzes',['sQuizzesInfo','sStartQuizzes'])
    },
    data () {
      return {
      	isWx: false,
      	textShow: false,
      	endTime: +new Date('2018 5 8')/1000,
      	modalData: {
      		type: 0,  //1规则 2用完一次机会 3第一天用完两次机会 4第二天用完两次机会 5返回确认弹窗
      		btnList: [
      			{
	      			text: '确定',
		      		style: {
		      			'width': '100%',
		      			'color': '#2B1676',
		      			'background-color': '#FCCE72',
		      			'font-size': '20px'
		      		},
		      		cb: this.closeModal
		      	},
      		],
	      	closeBtnShow: true
      	},
      	navItems: [
      		{
      			type: 'back',
      			src: navBackIcon,
      			cb: this.handleBackCb
      		},
      		{
      			type: 'share',
      			src: navShareIcon,
      			cb: this.handleShareCb
      		}
      	],
      	dayIndex: 0,
        day: [
        	{
        		bg: bg100,
        		awardList: [66,15,2],
        		btn: {
        			text: '查看答题攻略，80%的答题都在这里',
        			type: 'type2'
        		},
        		modalText: '确定'
        	},
        	{
        		bg: bg150,
        		awardList: [88,20,2],
        		btn: {
        			text: '9号23:00开抢优惠券',
        			type: 'type1'
        		},
        		modalText: '去主会场'
        	}
        ]
      }
    },
    mounted () {
    	let ua = navigator.userAgent.toLowerCase();
	    if(ua.match(/MicroMessenger/i)=="micromessenger") {
	      this.isWx = true
	    }
    	this.quizzesInfoAction().then(()=>{
    		//activityStatus 0 未开始 1 进行中 2 活动结束 
				//isEndDay 1 第二天 0 第一天 
				this.dayIndex = this.sQuizzesInfo.isEndDay
				if(this.dayIndex == 1){
					if(this.sQuizzesInfo.activityStatus == 2){
						this.textShow = true
					}
					if(this.sQuizzesInfo.shareNum>0&&this.sQuizzesInfo.leftTimes==0){
						this.textShow = true
					}
				}
    	})
    },
    methods: {
      ...mapActions('modActivityQuizzes',['quizzesInfoAction','startQuizzesAction']),
      closeModal(){
      	this.modalData.type = 0
      },
      handleBackCb(){
      	location.href = 'ggj://redirect'
      	//location.href = this.sQuizzesInfo.mainUrl
      },
      handleShareCb(){
      	if(this.isWx){
      		if(!auth.isLoggedIn()){
      			auth.login()
      		}else{
      			Dlg.msg({
						  content: '请点击右上角分享',
						  msgType: "inverse"
						});
      		}
      	}else{
      		location.href='ggj://redirect/typeCommon/{"type":30,"id":2882,"shareInfoType":3}'
      	}
      },
      handleStartBtn(status){
      	if(status==1){
      		this.startQuizzesAction().then(()=>{
      			//1[未登录] 2[活动未开始] 3[活动已结束] 4[答题机会已用完] 5[可以答题]
      			switch(this.sStartQuizzes.status){
      				case '1':
      					//去登陆
      					auth.login()
      					break;
      				case '2':
      					//活动未开始
      					break;
      				case '3':
      					//活动已结束
      					break;
      				case '4':
      					//机会用完
      					//第一天和第二天的第一次机会用完
      					let _this = this
      					if(this.sQuizzesInfo.shareNum == 0){
      						this.modalData.type = 2
					      	this.modalData.btnList[0].text = '邀请好友'
					      	this.modalData.btnList[0].cb = this.handleShareCb
      						//第一天第二次机会用完
      					}else if(this.dayIndex == 0 && this.sQuizzesInfo.shareNum > 0){
      						this.modalData.type = 3
      						//第二天第二次机会用完
      					}else if(this.dayIndex == 1 && this.sQuizzesInfo.shareNum > 0){
      						this.modalData.type = 4
      						this.modalData.btnList[0].text = '去主会场'
					      	this.modalData.btnList[0].cb = function(){
					      		location.href = _this.sQuizzesInfo.mainUrl
					      	}
      					} 					
      					break;
      				case '5':
      					//可以答题
      					setTimeout(function(){
			    				this.$router.push({
					      		name: 'quizzesMain'
					      	})
			    			}.bind(this),100)
      					break;
      			}
      		}) 		
      	}
      },
      handleRulesBtn() {
      	this.modalData.type = 1
      	this.modalData.closeBtnShow = false
      	this.modalData.btnList[0].text = '知道了'
      	this.modalData.btnList[0].style.fontSize = '16px'
      	this.modalData.btnList[0].style.lineHeight = '40px'
      }
    }
  };
</script>

