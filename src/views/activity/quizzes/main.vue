<style lang="less" scoped>
	@keyframes circleProgressLoad_right {   
	  0%{   
	    transform: rotate(45deg);   
	  }   
	  50%{   
	    transform: rotate(225deg);   
	  }   
	  100%{   
	    transform: rotate(225deg);   
	  }   
	}   
	@keyframes circleProgressLoad_left {   
	  0%{   
	    transform: rotate(45deg);   
	  }   
	  50%{   
	    transform: rotate(45deg);   
	  }   
	  100%{   
	    transform: rotate(225deg);   
	  }   
	} 
	.quizzes-main-wrap {
		width: 100%;
		min-height: 100%;
		overflow: hidden;
		position: absolute;
		background-image: linear-gradient(-180deg, #4041A5, #090820);
		.user-info {
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 14px;
			padding: 15px 20px 8px;
			//margin-top: 44px;
			>div {
				display: flex;
				align-items: center;
				justify-content: center;
				>img {
					width: 24px;
					height: 24px;
					border-radius: 50%;
					margin-right: 8px;
				}
				>span {
					color: #ABAFD7;
				}
			}
			>p {
				color: #B0B4DA;
				>strong {
					color: #FCCE72;
					font-weight: normal;
				}
			}
		}
		.progress-wrap {
			width: 335px;
			height: 9px;
			border-radius: 100px;
			margin: 0 auto 34px;
			background-color: #252565;
			position: relative;
			.inner {
				width: 0%;
				height: 9px;
				border-radius: 100px;
				background-color: #FCCE72;
			}
			>span {
				position: absolute;
				left: 50%;
				top: 0;
				text-align: center;
				color: #fff;
				font-size: 10px;
				line-height: 10px;
				transform: translate3d(-50%,0,0);
			}
		}
		.countdown {
			width: 54px;
			height: 54px;
			font-size: 22px;
			color: #fff;
			margin: 0 auto 12px;
			position: relative;
			>span {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate3d(-50%,-50%,0);
				font-size: 22px;
				color: #fff;
				font-weight: bold;
			}
			>div {
				width: 50%;  
			  height: 100%;
			  position: absolute;   
			  top: 0;   
			  overflow: hidden;   
			  .circle-progress{   
				  width: 44px;   
				  height: 44px;   
				  border: 5px solid #1F1F59;   
				  border-radius: 50%;   
				  position: absolute;   
				  top: 0;   
				  transform: rotate(45deg);   
				}   
				.right-circle {
					border-top: 5px solid #D40459;   
				  border-right: 5px solid #D40459;   
				  right: 1PX;   
				  animation: circleProgressLoad_right 15s linear forwards;   
				}
				.left-circle{   
				  border-bottom: 5px solid #D40459;   
				  border-left: 5px solid #D40459;   
				  left: 0;   
				  animation: circleProgressLoad_left 15s linear forwards;   
				}   
			}
			.right {   
			  right: 0;   
			}   
			.left{   
			  left: 0;   
			}  
		}
		.qa-wrap {
			.question-wrap {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 100%;
				height: 170px;
				color: #fff;
				.type1 {
					width: 275px;
					height: 60px;
					line-height: 1.8;
					text-align: center;
					font-size: 18px;
				}
				.type2 {
					width: 100%;
					padding: 16px 30px;
					box-sizing: border-box;
					color: #fff;
					>div {
						display: flex;
						align-items: center;
						width: 100%;
						height: 90px;
						font-size: 0;
						margin-bottom: 22px;
						>img {
							width: 90px;
							height: 100%;
							margin-right: 16px;
						}
						>div {
							width: 210px;
							height: 100%;
							>h1 {
								width: 100%;
								height: 18px;
								font-size: 16px;
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: nowrap;
								margin-bottom: 5px;
								font-weight: normal;
							}
							>h2 {
								width: 100%;
								min-height: 36px;
								font-weight: normal;
								margin-bottom: 10px;
								>p {
									width: 100%;
									font-size: 14px;
									line-height: 1.3;
									display: -webkit-box;
									-webkit-box-orient: vertical;
									-webkit-line-clamp: 2;
									overflow: hidden;
								}
							}
							>h3 {
								font-size: 16px;
								font-weight: normal;
							}
						}
					}
					>p {
						display: flex;
						align-items: center;
						justify-content: center;
						font-size: 18px;
						color: #FCCE72;
						font-weight: 800;
						>span {
							width: 100px;
							border-bottom: 1PX solid rgba(252,206,114,0.5);
							text-align: center;
						}
					}
				}
			}
			.answer-wrap {
				width: 100%;
				padding: 20px;
				box-sizing: border-box;
				>div {
					width: 100%;
					line-height: 50px;
					text-align: center;
					border-radius: 100px;
					background-color: #E0E3FF;
					color: #000;
					margin-bottom: 10px;
					font-size: 20px;
					&:last-child {
						margin: 0;
					}
				}
				.right {
					background: url('../../../assets/image/activity/quizzes/right-icon.png') #06C088 no-repeat 20px center;
					background-size: 22px 22px;
				}
				.wrong {
					background: url('../../../assets/image/activity/quizzes/wrong-icon.png') #D40459 no-repeat 20px center;
					background-size: 22px 22px;
				}
			}
		}
	}
	.quizzes-result-wrap {
		width: 100%;
		min-height: 100%;
		overflow: hidden;
		position: absolute;
		background: url('../../../assets/image/activity/quizzes/result-bg.jpg') no-repeat 0 0;
		background-size: cover;
		box-sizing: border-box;
		.content-wrap {
			position: relative;
			overflow: hidden;
			.entry-btn {
				position: absolute;
				top: 16px;
				right: -16px;
				width: 140px;
				line-height: 30px;
				font-size: 16px;
				color: #fff;
				padding-left: 16px;
				box-sizing: border-box;
				border-radius: 100px;
				background-color: rgba(255,255,255,0.1);
			}
			.user-info {
				width: 100%;
				margin-top: 56px;
				text-align: center;
				margin-bottom: 35px;
				>img {
					width: 60px;
					height: 60px;
					margin-bottom: 10px;
					border-radius: 50%;
				}
				>p {				
					color: #fff;
					font-size: 16px;
				}
			}
			.result {
				width: 333px;
				height: 168px;
				margin: 0 auto 40px;
				background-color: rgba(255,255,255,0.13);
				border-radius: 8px;
				border: 1PX solid #5E6291;
				>div {
					width: 100%;
					height: 100%;
					position: relative;
					text-align: center;
					color: #fff;
					display: flex;
					align-items: center;
					justify-content: center;
					flex-direction: column;
					img {
						width: 235px;
						position: absolute;
						left: 50%;
						top: -24px;
						transform: translate3d(-50%,0,0);
					}
					h2 {
						font-size: 20px;
						font-weight: normal;
					}
					h1 {
						color: #FCCE72;
						font-size: 30px;
						margin: 6px 0;
						font-weight: normal;
					}
					p {
						width: 223px;
						font-size: 16px;
					}
				}
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
					color: #FCCE72;
				}
				strong {
					color: #D40459;
				}
			}
		}
	}
	.modal-back {
		width: 100%;
		text-align: center;
		margin: 53px 0;
		font-size: 16px;
		color: #2C1776;
	}
</style>
<template>
	<div>
		<div class="quizzes-main-wrap" v-show="!showResult">
			<TopNav :items="navItems"></TopNav>
			<div class="user-info">
				<div>
					<img :src="sStartQuizzes.headImage" />
					<span>{{sStartQuizzes.nikeName}}</span>
				</div>
				<p>累计答对 <strong>{{rightNum}}</strong> 题</p>
			</div>
			<div class="progress-wrap">
				<div class="inner" :style="{'width': (currentQIndex/5)*100+'%'}"></div>
				<span>{{currentQIndex}}/5</span>
			</div>
			<div class="countdown" v-show="currentQIndex==1">
				<div class="right">  
	        <div class="circle-progress right-circle"></div>  
	      </div>  
	      <div class="left">  
	        <div class="circle-progress left-circle"></div>  
	      </div>  
	      <span>{{countNum}}</span>
			</div>
			<div class="countdown" v-show="currentQIndex==2">
				<div class="right">  
	        <div class="circle-progress right-circle"></div>  
	      </div>  
	      <div class="left">  
	        <div class="circle-progress left-circle"></div>  
	      </div>  
	      <span>{{countNum}}</span>
			</div>
			<div class="countdown" v-show="currentQIndex==3">
				<div class="right">  
	        <div class="circle-progress right-circle"></div>  
	      </div>  
	      <div class="left">  
	        <div class="circle-progress left-circle"></div>  
	      </div>  
	      <span>{{countNum}}</span>
			</div>
			<div class="countdown" v-show="currentQIndex==4">
				<div class="right">  
	        <div class="circle-progress right-circle"></div>  
	      </div>  
	      <div class="left">  
	        <div class="circle-progress left-circle"></div>  
	      </div>  
	      <span>{{countNum}}</span>
			</div>
			<div class="countdown" v-show="currentQIndex==5">
				<div class="right">  
	        <div class="circle-progress right-circle"></div>  
	      </div>  
	      <div class="left">  
	        <div class="circle-progress left-circle"></div>  
	      </div>  
	      <span>{{countNum}}</span>
			</div>
			<div class="qa-wrap">
				<div class="question-wrap">
					<div class="type1" v-show="currentQA.type==2">{{currentQA.q}}</div>
					<div class="type2" v-show="currentQA.type==1">
						<div>
							<img :src="currentQA.img" />
							<div>
								<h1>{{currentQA.title}}</h1>
								<h2><p>{{currentQA.desc}}</p></h2>
								<h3>日常价：￥{{currentQA.price}}</h3>
							</div>	
						</div>
						<p>510活动价:<span>?</span></p>
					</div>
				</div>
				<div class="answer-wrap">
					<div :class="{ right: item.rightClass,wrong: item.wrongClass }" v-for="(item,index) in currentQA.a" :key="index" @click="handleAnswer(item.right,index)">{{item.text}}</div>
				</div>
			</div>
			<Modal :btnList="modalData.btnList" :closeBtnShow="modalData.closeBtnShow" @closeModalCb="closeModal" v-show="modalData.type>0">
				<p slot="ct" class="modal-back">是否放弃答题</p>
			</Modal>
		</div>
		<div class="quizzes-result-wrap" v-show="showResult">
			<TopNav :items="navItems"></TopNav>
			<div class="content-wrap">
				<a class="entry-btn" :href="sQuizzesInfo.mainUrl">进入主会场 > </a>
				<div class="user-info">
					<img :src="sStartQuizzes.headImage" />
					<p>{{sStartQuizzes.nikeName}}</p>
				</div>
				<div class="result">
					<div class="success" v-if="sRightNum==5">
						<img src="../../../assets/image/activity/quizzes/success-bg.png" />
						<h2>恭喜答对五题</h2>
						<h1>{{rankText}}</h1>
						<p>{{sQuizzesSuccess.amount}}G币将在活动结束24小时内存入您的账户</p>
					</div>
					<div class="fail" v-else>
						<h2>答对{{sRightNum}}题</h2>
						<h1>闯关失败</h1>
						<!-- <p>{{day[dayIndex]['failText'][dayTimes]}}</p> -->
						<p>{{failText}}</p>
					</div>
				</div>
				<div class="btns">
					<div class="type1" @click="handleShareCb" v-if="sStartQuizzes.shareNum==0">分享即可<strong>+1</strong>次答题机会</div>
					<div class="type1" @click="handleShareCb" v-else>邀请好友，参与瓜分</div>
					<div class="type1" @click="confirmModal">答题首页</div>
					<a :href="sQuizzesInfo.mainUrl" class="type1" v-if="sStartQuizzes.shareNum>0&&dayIndex==1" :style="{color:'#D40459'}">9号23:00开抢优惠券</a>
			  	<a :href="sQuizzesInfo.answerUrl" class="type2" v-else>查看答题攻略，80%的答题都在这里</a>  
				</div>		
			</div>
		</div>
	</div>
	
</template>
<script>
	import { mapState, mapActions } from 'vuex'
	import TopNav from '@/components/activity/topNav'
	import Modal from '@/components/activity/modal'
	import navBackIcon from '@/assets/image/arrow-left-white.png'
	import navShareIcon from '@/assets/image/activity/quizzes/share-icon.png'
	import q1 from '@/assets/data/q1.json'
	import q2 from '@/assets/data/q2.json'
	import MD5 from '@/utils/md5'
	function getRandomArrayElements(arr, count) {
    var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
    while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(min);
	}
  export default {
    name: 'quizzesMain',
    components: {
      TopNav,
      Modal
    },
    computed:{
      ...mapState('modActivityQuizzes',['sStartQuizzes','sQuizzesSuccess','sRightNum','sQuizzesInfo'])
    },
    data () {
      return {
      	showResult: false,
      	isClick: true,
      	modalData: {
      		type: 0,  //1规则 2用完一次机会 3第一天用完两次机会 4第二天用完两次机会 5返回确认弹窗
      		btnList: [
      			{
	      			text: '取消',
		      		style: {
		      			'width': '100%',
		      			'color': '#2B1676',
		      			'background-color': '#FCCE72',
		      			'font-size': '20px',
		      			'margin-right': '20px'
		      		},
		      		cb: this.closeModal
		      	},
		      	{
	      			text: '确认',
		      		style: {
		      			'width': '100%',
		      			'color': '#2B1676',
		      			'background-color': '#FCCE72',
		      			'font-size': '20px'
		      		},
		      		cb: this.confirmModal
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
      			type: 'title',
      			text: '疯狂答题',
      		},
      		{
      			type: 'blank',
      		}
      	],
      	countNum: 15,
      	currentQIndex: 1,
      	currentAIndex: -1,
      	rightNum: 0,
      	qList: [],
      	currentQA: {},
      	rankText: '',
      	// navItems: [
      	// 	{
      	// 		type: 'back',
      	// 		src: navBackIcon,
      	// 		cb: this.handleBackCb
      	// 	},
      	// 	{
      	// 		type: 'title',
      	// 		text: '疯狂答题'
      	// 	},
      	// 	{
      	// 		type: 'share',
      	// 		src: navShareIcon,
      	// 		cb: this.handleShareCb
      	// 	}
      	// ],
      	failText: '',
      	dayTimes: 0, 
      	dayIndex: 0,
        day: [
        	{
        		'failText': [
        			'别气馁，分享答题活动即可再玩一次哦！',
        			'别气馁，明天还能参与哦！'
        		],
        	},
        	{
        		'failText': [
        			'别气馁，分享答题活动即可再玩一次哦！',
        			'别气馁，23:00还有一大波优惠券等你来抢哦!'
        		]
        	}
        ]
      }
    },
    mounted () {
    	this.qList = getRandomArrayElements(q2,2).concat(getRandomArrayElements(q1,3))
    	this.currentQA = this.qList[0]
    	let _this = this
    	function interval(){
    		if(_this.currentQIndex==6){
    			clearTimeout(interval)
    			return false
    		}
		    if(_this.countNum>0){
		       setTimeout(interval,1000);
		       _this.countNum--;
		    }else{
		    	let _a = _this.currentQA.a
      		let _rightIndex = _this.currentQA.rightIndex
		    	_a[_rightIndex].rightClass = true
		    	_this.isClick = false
		    	_this.countNum = 16
		    	setTimeout(function(){
		    		_this.isClick = true
		    		// _this.currentQIndex++
			    	// _this.currentQA = _this.qList[_this.currentQIndex-1]
			    	// _this.countNum = 15
			    	_this.nextQ()
			    	interval()
		    	},1000) 	
		    }    
			}
			interval()
    },
    methods: {
      ...mapActions('modActivityQuizzes',['rightNumAction','quizzesSuccessAction']),
      closeModal(){
      	this.modalData.type = 0
      },
      confirmModal(){
      	this.$router.back()
      },
      handleBackCb(){
      	this.modalData.type = 5
      },
      handleShareCb(){
      	location.href='ggj://redirect/typeCommon/{"type":30,"id":2882,"shareInfoType":3}'
      },
      showResultPage(){
      	this.navItems = [
      		{
      			type: 'back',
      			src: navBackIcon,
      			cb: this.confirmModal
      		},
      		{
      			type: 'title',
      			text: '疯狂答题',
      		},
      		{
      			type: 'share',
      			src: navShareIcon,
      			cb: this.handleShareCb
      		}
      	]
      	this.dayIndex = this.sQuizzesInfo.isEndDay
      	// if(this.sStartQuizzes.shareNum > 0 && this.sQuizzesInfo.leftTimes == 1){
      	// 	this.dayTimes = 1
      	// }
	    	if(this.sRightNum==5){
	    		let accountId = this.sStartQuizzes.accountId
		    	let sign = '20180510HQBSANSWER' + accountId + this.dayIndex
		    	sign = MD5.hex_md5(sign).substr(8, 16).toUpperCase()
		    	this.quizzesSuccessAction({
		    		sign: sign
		    	}).then(()=>{
		    		console.log(this.sStartQuizzes)
		    		switch(this.sQuizzesSuccess.rank){
		    			case 0:
		    				this.rankText = '获普天同庆奖'
		    				break;
		    			case 1:
		    				this.rankText = '获一等奖'
		    				break;
		    			case 2:
		    				this.rankText = '获二等奖'
		    				break;
		    			case 3:
		    				this.rankText = '获三等奖'
		    				break;
		    		}
		    	})
	    	}else{
	    		if(this.sStartQuizzes.shareNum > 0){
	    			if(this.sQuizzesInfo.leftTimes == 1){
	    				if(this.dayIndex == 0){
		    				this.failText = '别气馁，明天还能参与哦！'
		    			}else{
		    				this.failText = '别气馁，23:00还有一大波优惠券等你来抢哦!'
		    			}
	    			}else if(this.sQuizzesInfo.leftTimes == 2){
	    				this.failText = '别气馁，再来一局'
	    			}
	    		}else{
	    			this.failText = '别气馁，分享答题活动即可再玩一次哦！'
	    		}
	    		// if(this.sStartQuizzes.shareNum > 0 && this.sQuizzesInfo.leftTimes == 1){
	    		// 	this.failText = '别气馁，再来一局'
	    		// }else if(this.sStartQuizzes.shareNum == 0 && this.sQuizzesInfo.leftTimes == 0){
	    		// 	this.failText = '别气馁，分享答题活动即可再玩一次哦！'
	    		// }

	    		// if(this.sStartQuizzes.shareNum > 0 && this.sQuizzesInfo.leftTimes == 0){
	    		// 	if(this.dayIndex == 0){
	    		// 		this.failText = '别气馁，明天还能参与哦！'
	    		// 	}else{
	    		// 		this.failText = '别气馁，23:00还有一大波优惠券等你来抢哦!'
	    		// 	}
	    		// }
	    	}
	    	this.showResult = true
      },
      nextQ(){
    		this.currentQIndex++
    		this.currentAIndex = -1
    	 	this.rightClass = false
    		this.wrongClass = false
      	if(this.currentQIndex==6){
    			//去到结果页
    			this.rightNumAction(this.rightNum)
    			// this.$router.push({
		     //  	name: 'quizzesResult',		
		     //  })
		     	this.showResultPage()
    		}else{
    			this.currentQA = this.qList[this.currentQIndex-1]
    		}
      },
      handleAnswer(right,index){
      	if(this.isClick){
      		this.isClick = false
      		let _a = this.currentQA.a
	      	let _rightIndex = this.currentQA.rightIndex
	      	if(right){
	      		this.rightNum++
	      		_a[index].rightClass = true
	      	}else{		
	      		_a[index].wrongClass = true
	      		_a[_rightIndex].rightClass = true
	      	}
	      	this.countNum = 16
	      	setTimeout(function(){
	      		this.currentAIndex = index
	      		this.isClick = true
	      		this.nextQ()
	      	}.bind(this),1000)
      	}    	
      }
    }
  };
</script>

