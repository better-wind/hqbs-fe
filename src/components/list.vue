<template>
	<ul class="list-ul clearfix">
		<li v-for="data in listData"> 
			<div class="list-mesg"> 
				<div class="imglazyload" v-lazy:background-image="data.image" @click="goUrl(data.productId)">
                    <div class="mask" v-if="data.type==2 || data.type==3 || data.type==4"></div>  
					<span v-if="data.type==2">还有机会</span>
					<span v-if="data.type==3">即将开抢</span>
					<span v-if="data.type==4">还有机会</span>                  
				</div>				           
				<p class="product-name" @click="goUrl(data.productId)">
					<i v-for="tags in data.saleGoodsTagList" :class="{'bg-FFF0F0':tags.type==2,'col-f93':tags.type==1}">{{tags.tag}}</i>
					<span v-html="data.name"></span>
				</p> 				
				<p @click="goUrl(data.productId)">
					<b v-if="isMember==1">
						￥{{data.highPrice}}
						<em class="col-C59F51">￥{{data.lowPrice}}</em>
						<i class="menber-box">会员价</i>
					</b>
					<b v-else>
						￥{{data.lowPrice}}
						<del class="delprice col-C2C2C2">￥{{data.highPrice}}</del>
					</b>
				</p>
				<p class="activity-tags">
					<span v-for="tags in data.activityTagList" :class="{'bg-F93939':tags.type==2,'col-fff':tags.type==2,'col-f93':tags.type==1}">{{tags.tag}}</span>
				</p> 
			</div> 
		</li>
	</ul>
</template>
<script>
export default{
	name: 'list',
	data(){
		return{
			
		}
	},
	props: {
		listData:{},
		isMember:''
	},
	computed: {
      	
    },    
    methods:{
        goUrl(productId){
        	//window.location.href=url
        	this.$router.push({name:'productDetail',params:{id:productId}})
        }
    },
    mounted () {
	},
	created (){
	}
}
</script>
<style lang="scss" scoped>
.bg-FFF0F0{background: #FFF0F0;}
.bg-F93939{
  background:#F93939;
}
.col-f93{
  color:#F93939;
}
.list-ul {	
    padding-top:8px;
    li{
    	float: left;
    	position: relative;
	    width: 47%;    
	    margin:0 0% 2% 2%;
	    border-radius: 3px;
	    padding-bottom: 5px;
	    background: #fff;	    
    }
}
.list-mesg{
    background: #fff;
    font-size: 14px;
    color: #33383b;
    .imglazyload{
		padding-top: 100%;
		background:no-repeat center; 
		background-size: cover;
		min-height: inherit;
		border-radius: 3px 3px 0 0;
		position: relative;
		.mask{
		    width: 100%;
		    height: 100%;
		    background: rgba(0, 0, 0, 0.1);
		    position: absolute;
		    top: 0;
		    left: 0;
		}
		span{
		    position: absolute;
		    bottom: 0px;
		    width: 100%;
		    text-align: center;
		    height: 20px;
		    line-height: 20px;
		    color: #fff;
		    font-size: 11px;
		    background: #797979;
		}
		&:after{
		    content: '';
		    position: absolute;
		    z-index: 2;
		    top: 0;
		    left: 0;
		    width: 100%;
		    height: 100%;
		    background: rgba(0,0,0,.03);
		}
	}
	p:nth-of-type(1){
	    line-height: 1.6;
	    font-size: 14px;
	    color: #000;
	    width: 95%;
	    padding-left: 4%;
	    padding-top: 5px;
	    margin-bottom: 5px;
	    height: 46px;
	    display: -webkit-box;
	    -webkit-box-orient: vertical;
	    overflow: hidden;
	    i{
	    	@extend .activity-tag
	    }
	}
	p:nth-of-type(2){
	    font-size: 16px;
	    color: #000;
	    b{
		    padding-left: 4%;
		}
	    em {
		    line-height: 12px;
		    font-size: 14PX;
		    color: #C59F51;
		}
		i{
		    width: 25px;
		    height: 11px;
		    line-height: 11px;
		    background: url(../assets/image/vip-icon.png) no-repeat;
		    background-size: 100%;
		    text-indent: -9999px;
		    margin-left: 3px;
		}
	}
}
.delprice{
    color: #858585;
}
.delprice-line{
    text-decoration: line-through;
}
.col-C2C2C2{
    color: #C2C2C2;
}
.delprice{
    line-height: 12px;
    font-size: 12px;
    color: #999999;
    margin-left: 4px;
}
.activity-tag{
	display:inline-block;
	min-width:28px;
	height:14px;
	line-height: 14px;
	padding:0 2px;
	border:1px solid #F93939; 
	vertical-align: middle;
	box-sizing: border-box; 
	font-size: 10px;
}
.activity-tags{
    display: block;
    height: 22px;
    margin-left: 8px;
    span{
		@extend .activity-tag;
		margin-left:3px;
    }
}
</style>