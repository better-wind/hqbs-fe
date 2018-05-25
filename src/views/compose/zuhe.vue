<template>
	<div class="zuhe" :class="{'pt-50':zuheTopNav.reImage}">
		<a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.globalscanner" class="top-store-mesg" v-if="zuheTopNav.reImage">
			<img :src="zuheTopNav.reImage">
			<span>{{zuheTopNav.reNickName}}</span>
			<b>的捕手店</b>
			<i class="t_c">打开APP</i>
		</a>
		<div id="banner">
			<img class="banner_img" :src="zuheTopData.bannerImage">
		</div>
		<div class="gegetalk1 clear">
	        <div class="gegeleft">
	        	<img src="http://yangege.b0.upaiyun.com/product/1d3f735f4ebc1.png">
	        </div>
	        <div class="gegeright">
	        	<img src="https://test.51bushou.com/ygg-hqbs/pages/images/shousuo.png" class="gegeright_img1" v-if="!isShow" @click="isShow=!isShow">
	        	<img src="https://test.51bushou.com/ygg-hqbs/pages/images/zhankai.png" class="gegeright_img2" v-if="isShow" @click="isShow=!isShow">
	        </div>
	        <ul :class="{'heightauto':isShow,'height48':!isShow}">
	            <li>
	                <p>{{zuheTopData.gegesay}}</p>
	            </li>
	        </ul>
	    </div>
	    <List :listData="zuheListData" :isMember="this.zuheTopData.isMember"></List>
	    <p class="loading t_c mar20" v-if="isLoading">努力加载中…</p>
		<p class="loading t_c mar20" v-if="!isMore">已加载全部相关商品</p>
    </div>
</template>
<script>
import List from '@/components/list'
import tools from '@/utils/tools'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
export default {
	name: 'zuhe',
    data () {
    	return{
    		isShow:false,
    		idList:[],
    		proPage :1,
    		pageCount : 20,
    		isMore:true,
    		paramsId:''
    	}
    },
    computed:{
    	...mapState('modCompose',['zuheListData','zuheTopData','zuheTopNav','isLoading'])
    },
    components:{
    	List
    },
    methods:{
    	...mapActions('modCompose',['getzuheList','getzuheTop','getzuheTopnav']),
    	scrollHandle(){
            if(this.idList.length<=0) return
            this.paramsId = this.idList.slice((this.proPage-1)*this.pageCount,this.proPage*this.pageCount)
            if(this.paramsId.length<=0){
                this.isMore=false;
            }else{                
                this.getData();
                this.proPage++
            }
        },
        getData(){
        	let data={
	    		'productIdList':this.paramsId.join(',')
	    	}
	    	this.getzuheList({data});
        }
    },
    mounted (){    	
    	   this.getzuheTopnav() 	
    },
    created (){  
    	let data={
    		commonActivityId:this.$route.params.id
    	}
    	this.getzuheTop({data}).then(()=>{
    		this.idList=this.zuheTopData.productIdList.split(',')
    		this.scrollHandle();
    	}) 
    	window.addEventListener('scroll', () => { 
            if(tools.bottomVisible() && !this.isLoading){
            	this.scrollHandle();    	
            }
        }) 
    }

}
</script>
<style lang="scss">
	.pt-50{
		padding-top:50px;
	}
	.mar20{margin:20px 0;}
	#banner {
	    position: relative;
	    width:100%;
	}
	.banner_img {
	    width: 100%;
	}
	.gegetalk1{ 
		border-top:1px solid #fafafa; 
		padding:8px 13px 8px 12px;  
		font-size: 12px; 
		background: #ffffff; 
		border-bottom: 1px solid #ececec;  
	}
	.gegeleft{ 
		width: 48px;
		float: left; 
		margin-right:8px;
		img{ 
			width: 48px;
		}
	}
	.gegeright{ 
		float: right;  
		width: 22px; 
		height: 48px; 
		text-align: center;  
		padding-top: 2px 
	}
	.gegeright_img1,.gegeright_img2{ 
		width: 13px; 
		margin-top: 18px 
	}
	.gegetalk1{
		ul{ 
			margin: 0 22px 0 58px; 
			line-height: 16px;  
			min-height: 65px; 
			overflow: hidden;
		}
		li{
			color:#505050;
			i{
				color:#ff3300;
				font-style:normal;
			}
		}
	}
	.height48{
		height:48px;
	}
	.heightauto{
		height:auto;
	}
	.top-store-mesg{
		position: fixed;
		z-index: 9;
		top:0;
		left: 0;
		width: 100%;
		height: 50px;
		line-height: 50px;
		padding: 0 12px 0 9px;
		box-sizing: border-box;
		background: #fff;
		border-bottom: 1px solid #e0e0e0;
		transition: .3s;
		img{
			width:34px;
			height:34px;
			border-radius: 100%;
			margin-top: 10px;
			vertical-align: top;
		}
		span{
			display: inline-block;
			max-width: 40%;
			margin-left:3px;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		b{
			vertical-align: top;
			font-weight:normal;
		}
		i{
			width:72px;
			height:28px;
			line-height:28px;
			color:#fff;
			background: #000;
			margin-top: 11px;
			float:right;
		}
	}
</style>