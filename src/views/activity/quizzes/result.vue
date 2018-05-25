<style lang="less" scoped>
	.quizzes-result-wrap {
		width: 100%;
		height: 100%;
		overflow: hidden;
		position: absolute;
		background: url('../../../assets/image/activity/quizzes/result-bg.jpg') no-repeat 0 0;
		background-size: cover;
		padding-top: 44px;
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
				border: 1px solid #5E6291;
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
					}
					h1 {
						color: #FCCE72;
						font-size: 30px;
						margin: 6px 0;
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
					border: 1px solid #FCCE72;
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
</style>
<template>
	<div class="quizzes-result-wrap">
		<TopNav :items="navItems"></TopNav>
		<div class="content-wrap">
			<a class="entry-btn" :href="sStartQuizzes.mainUrl">进入主会场 > </a>
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
					<p>{{day[dayIndex]['failText'][dayTimes]}}</p>
				</div>
			</div>
			<div class="btns">
				<div class="type1" @click="handleShareCb" v-if="sQuizzesInfo.shareNum==0">分享即可<strong>+1</strong>次答题机会</div>
				<div class="type1" @click="handleShareCb" v-else>邀请好友，参与瓜分</div>
				<div class="type1" @click="handleBackCb">答题首页</div>
				<div class="type1" v-if="sQuizzesInfo.shareNum>0&&dayIndex==1" :style="{color:'#D40459'}">9号23:00开抢优惠券</div>
		  	<a class="type2" v-else>查看答题攻略，80%的答题都在这里</a>  
			</div>		
		</div>
	</div>
</template>
<script>
	import { mapState, mapActions } from 'vuex'
	import bg100 from '@/assets/image/activity/quizzes/bg-100.jpg'
	import bg150 from '@/assets/image/activity/quizzes/bg-150.jpg'
	import navBackIcon from '@/assets/image/arrow-left-white.png'
	import navShareIcon from '@/assets/image/activity/quizzes/share-icon.png'
	import Modal from '@/components/activity/modal'
	import TopNav from '@/components/activity/topNav'
	import MD5 from '@/utils/md5'
  export default {
    name: 'quizzesResult',
    components: {
      Modal,
      TopNav
    },
    computed:{
      ...mapState('modActivityQuizzes',['sStartQuizzes','sQuizzesSuccess','sRightNum','sQuizzesInfo'])
    },
    data () {
      return {
      	rankText: '',
      	navItems: [
      		{
      			type: 'back',
      			src: navBackIcon,
      			cb: this.handleBackCb
      		},
      		{
      			type: 'title',
      			text: '疯狂答题'
      		},
      		{
      			type: 'share',
      			src: navShareIcon,
      			cb: this.handleShareCb
      		}
      	],
      	dayTimes: 0, 
      	dayIndex: 0,
        day: [
        	{
        		failText: [
        			'别气馁，分享答题活动即可再玩一次哦！',
        			'别气馁，明天还能参与哦！'
        		],
        	},
        	{
        		failText: [
        			'别气馁，分享答题活动即可再玩一次哦！',
        			'别气馁，23:00还有一大波优惠券等你来抢哦!'
        		]
        	}
        ]
      }
    },
    mounted () {
    	this.dayIndex = this.sStartQuizzes.isEndDay
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
    	}
    },
    methods: {
      ...mapActions('modActivityQuizzes',['quizzesSuccessAction']),
      handleShareCb(){
      	location.href='ggj://redirect/typeCommon/{"type":30,"id":2006,"shareInfoType":4}'
      },
      handleBackCb(){
      	this.$router.push({
	      	name: 'quizzesIndex',		
	      })
      }
    }
  };
</script>

