<template>
	<div class="search-box">
		<div class="search-top col-fff t_c ">
	        <span>
	            <i class="search-tb"></i>
	            <input type="search" placeholder="搜索喜欢的宝贝" id="search" v-model.trim="inputTxt" @keyup="getkeywordList($event)" @keyup.13="goSearch()">
	            <span class="clearTxt" v-if="isClear" @click="clearTxt()">x</span>
	        </span>
	        <em class="ml-10" @click="goUrl('/')">取消</em>
	    </div>
	    <div class="dropdown-match" v-if="matchDropList">
	        <ul class="match-list">
	            <li v-for="data in matchListData" @click="btnSearch(data)">{{data}}</li>
	        </ul>
	    </div>
	    <div class="search-label-box" v-if="searchLabel">
            <ul class="search-record">
                <li class="search-tit mb-10">热门搜索<span class="search-change" @click="batchClick()"><b></b>换一批</span></li>
                <li class="search-label search-hot">
                    <template v-for="hot in hotWordData">
                    	<i v-if="hot.url" :class="{'redfont':hot.isHighlight==1}" @click="goUrl(hot.url)">{{hot.hotWord}}</i>
                    	<i v-else :class="{'redfont':hot.isHighlight==1}" @click="btnSearch(hot.searchWord)">{{hot.hotWord}}</i>
                    </template>
                </li>
            </ul>
            <ul class="search-record mt-20 search-history" v-if="searchHistory">
                <li class="search-tit mb-15" v-if="storageInfo">历史搜索</li>
                <li class="search-label">
                    <i v-for="name in storageInfo" @click="btnSearch(name)">{{name}}</i>
                </li>
                <li class="search-clear t_c" v-if="storageInfo.length>0" @click="clearHistory()">清空历史记录</li>
            </ul>
            <p class="history-none" v-if="searchHistory&& storageInfo.length==0">历史搜索记录为空</p>
        </div>  
        <div class="list-wrap" v-if="showList">
	        <div class="list-top col-333 t_c" v-if="isShowNav">
	            <i v-for="(navdata,index) in navCon" :class="{'on':type==index,'search-price':index==2}" @click="navClick(index)">
	            	{{navdata}}
	            	<em v-if="index==2" :class="{'order':sort==2}"></em>
	            </i>
	            <!-- <i>销量</i>
	            <i class="search-price">
	                价格
	                <em></em>
	            </i> -->
	        </div> 
	        <div class="search-none" v-if="searchData.resultList.length==0 && searchData.recommendList.length>0">
		        <img src="../../assets/image/search_none.png" alt="">
		        <p>抱歉，未找到“{{inputTxt}}”相关的商品<br/>为您推荐以下商品</p>
	        </div>
	        <div class="list-box" :class="{'pt-35':searchData.resultList.length>0 && searchData.recommendList.length==0}">     
				<List :listData="dataList" :isMember="isMember"></List>
			</div>
		</div>
		<p class="loading t_c" v-if="isLoading">努力加载中…</p>
		<p class="loading t_c" v-if="!isLoading && page==totalPage">已加载全部相关商品</p>
	</div>
</template>
<script>
import List from '@/components/list'
import tools from '@/utils/tools'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'  
import { Ganalytics } from "@/utils/ga";
export default {
    name: 'search',
    data () {
        return {
        	inputTxt:'',
        	isClear:false,
        	matchDropList:false,
        	searchLabel:true,
            dataList:[],
            data:'',
            isMember:'',
            page:1,
            type:0,
            sequenceCondition:0,
            sort:1,
            navCon:['默认','销量','价格'],
            searchHistory:true,
            storageInfo:[],
            showList:false,
            //matchListData:'',
            batchPage:1,
            //batchData:'',
            isBottom:false,
            totalPage:0,
            isShowNav:false,
            ga:undefined
        }
    }, 
    computed: {
    	...mapState('modSearch',['searchData','hotWordData','matchListData','isLoading']),
    },    
    mounted () {
    	this.ga = new Ganalytics({targetType:'193',gpm:'193'})
        this.localSearchInfo();        
    },
    methods: { 
    	...mapActions('modSearch',['getSearchList','getHotWord','getMatchList']),
    	...mapMutations('modSearch', ['SearchList']),    
        goUrl(url){
        	window.location.href=url
        },
        goSearch (){
        	if(!this.inputTxt) return false;
        	this.searchLabel=false;
        	this.matchDropList=false;        	
        	if(this.storageInfo.indexOf(this.inputTxt)>-1){
        		this.storageInfo.remove(this.inputTxt)
        	}
        	this.storageInfo.unshift(this.inputTxt);
        	localStorage.searchinfo=JSON.stringify(this.storageInfo);
        	this.dataList=[];
        	let data={
        		resultList:[],
            	recommendList:[],
        		searchList:[]
        	}
        	this.SearchList(data)
        	this.page=1;
        	this.sequenceCondition=0;
            this.sort=1;
            this.type=0;
        	this.sendAjax();        	
        },
        sendAjax(){
        	let data= {
	        	'page':this.page,
				'pageCount':10,
				'sequenceCondition':this.sequenceCondition,
				'sequenceType':this.sort,
				'keyword':this.inputTxt
	    	}
	        this.getSearchList({data}).then(()=>{
	        	this.showList=true;
	        	this.searchData.searchList.forEach((em,index) =>{
	                if(em.name.indexOf(this.inputTxt)>-1){
	                    em.name=em.name.replaceAll(this.inputTxt,'<span rel="mark" style="color:red;">'+this.inputTxt+'</span>')
	                } 
	            })
	            if(this.searchData.resultList.length>0){
	            	this.isShowNav=true;
	            }else{
	            	this.isShowNav=false;
	            }
	            this.dataList=this.searchData.searchList;
	            this.isMember=this.searchData.isMember;
	            this.totalPage=Math.ceil(this.searchData.totalCount/10);
	        })      	
        },
        getkeywordList(event){
        	if(event.keyCode == 13){
        		return false;
        	}
	        let data = {	        	
				'keyword':this.inputTxt
	    	}
	    	this.getMatchList({data}).then(()=>{
	    		this.matchDropList=true;
	    	})	               
        },
        hotlist(){
        	let data = {	        	
				'page':this.batchPage
	    	}
	        this.getHotWord({data}).then()     
        },
        batchClick: function(){//换一批                             
            this.batchPage++;
            this.hotlist();
        },
        btnSearch(val){
        	this.inputTxt=val;
        	this.goSearch();
        },
        navClick(index){
        	this.type=index;
        	this.sequenceCondition=index+1;
        	if(index==2){
        		this.sequenceCondition=index+2;
        		this.sort= (this.sort==1) ? 2 :1;
        	}else{
        		this.sort=1;
        	}
        	this.page=1;
        	this.dataList=[]
        	let data={
        		resultList:[],
            	recommendList:[],
        		searchList:[]
        	}
        	this.SearchList(data)
        	this.sendAjax();
        },
        localSearchInfo(){
            if(localStorage.searchinfo){
                let storageInt = localStorage.searchinfo;
                if(storageInt != ''){
                    this.storageInfo = JSON.parse(localStorage.searchinfo);
                }
            }
        }, 
        clearHistory(){
        	this.storageInfo=[];
        	localStorage.searchinfo=[]
        },
        clearTxt(){
        	this.inputTxt='';
        }
    },
    watch:{
    	inputTxt:function(val){
    		if(val){
    			this.isClear=true;
    			this.searchLabel=false;    			
    			//this.getkeywordList();
    		}else{
    			this.searchLabel=true;
    			this.showList=false;
    			this.isClear=false;
    		}
    	}
    },
    components: {
        List
    },
    created () {
    	this.hotlist();
        window.addEventListener('scroll', () => { 
            if(tools.bottomVisible() && !this.isLoading){
            	if(this.page<this.totalPage){
            		this.page++;
            		this.sendAjax();
            	}           	
            }
        }) 
    },
}


</script>
<style lang="scss">
.pt-35{
	padding-top:35px;
}
.mt-20{margin-top:20px;}
.loading{
	padding:50px 0 20px 0;
}
.search-box{	
	padding-top:44px;
}
.search-top{
	position:fixed;
	left:50%;
	top:0;
	z-index:101;
	transform: translate(-50%,0);
	width:100%;
	max-width:750px;
	padding:8px 0;
	background:#000;		
	span{
		width:80%;
		height:28px;
		background:#fff;
		position:relative;
	}
	.search-tb{
		width:16px;
		height:16px;
		background:url(../../assets/image/search_tb.png) no-repeat;	
		background-size:contain;
		vertical-align: middle;
	}
	input{
		width:85%;
		height:28px;
		border:none;
		vertical-align: middle;
		-webkit-appearance: none;
		font-size:14px;
	}
	.clearTxt{
		width:14px;
		height:14px;
		line-height:14px;
		background: #8F8E94;
		border-radius: 100%;
		color:#fff;
		font-size:12px;
		text-align:center;
		position:absolute;
		top:7px;
		right:5px;
	}
	em{
		margin-left:10px;
	}
}

.search-label-box{	
	position: fixed;
    z-index: 99;
    left: 0;
    top: 44px;
    width: 100%;
    height: 100%;
    padding-top:4.8%;
    background:#fff;
    .history-none{
		color:#858585;
		text-align:center;
		margin-top:20px;
		font-size:12px;
	}
}
.search-record{
	padding:0 2.67%;
}
.search-record + .search-record{
	padding-top:4.8%;
	border-top:1PX solid #e0e0e0;
}
.search-tit{
	position:relative;
	color:#858585;
	margin-bottom:10px;
	.search-change{
		position:absolute;
		right:0;
		top:0;
		font-size: 13px;
		color: #858585;
		display:block;
		b{
			display:inline-block;
			width:10px;
			height:10px;
			background:url(../../assets/image/search_change.png) no-repeat;
			background-size:100%;
			margin-right:3px;
		}
	}
}
.search-label{
	font-size:0;
	max-height:104px; 
	overflow: hidden;
	i{
		min-width:53px;
		max-width:100%;
		height:28px;
		line-height:28px;
		padding:0 1PX;
		box-sizing: border-box;
		background:#f0f0f0;
		color:#000;
		margin:0 10px 10px 0;
		font-size:12px;
		text-overflow:ellipsis; 
		white-space:nowrap; 
		overflow:hidden;
		text-align: center;
	}
	.history-none{
		color:#858585;
		text-align:center;
		margin-top:20px;
		font-size:12px;
	}
}
.search-clear{
	width:30%;
	height: 30px;
	line-height: 30px; 
	margin: 30px auto ;
}
.search-label .redfont{
	color: #FF0000;
}
.dropdown-match{
	height:100%;
	width:100%;
	position:absolute;
	top:44px;
	z-index:10;
	background:#fff;
	.match-list{
		margin-left:5.34%;
		li{
			padding:10px 0;
			border-bottom:1PX solid #d9d9d9;
		}
	}
} 
.no-result,.search-none{
	background:#fff;
	padding: 0 0 3.733% 5.33%;
	overflow:hidden;
	margin-bottom:5px;
}
.no-result{
	p{
		font-size: 14px;
		color: #858585;
		margin-top:4.8%;
		span{
			color:#000;
		}
	}
	.search-label{
		margin-top:3.467%;
		i{
			border: 1PX solid #E0E0E0;
		}
	}

}
.search-none{
	padding-top:6.4%;
	img{
		width:28px;
		height:28px;
		float:left;
		margin-top: 1.5%;
	}
	p{
		float:left;
		width:88%;
		font-size: 14px;
		color: #858585;
		margin-left:6px;
	}
}
.search-list-box{padding-top:44px;overflow: hidden;}
.list-top{
	position:fixed;
	z-index:6;
	left:0;
	top:44px;
	width:100%;
	max-width:375px;
	height:34px;
	line-height:34px;
	background:#fff;
	font-size: 0;
	border-bottom:1PX solid #e0e0e0;
	color:#858585;
}
.list-top i{
	width: 33%;
	box-sizing: border-box; 
	font-size: 14PX; 
	vertical-align: top
}
.list-top i+i:before{
	content:"";
	float:left;
	width:1PX;
	height:18px;
	margin-top:8px;
	border-left:1PX solid #e0e0e0;
}
.list-top .on{
	font-weight: bold;
	color:#000;
}
.search-price {
	em{ 
		vertical-align: middle;
		&:before,&:after{
			content: '';
			display:block;
			width:0;
			border:4PX solid transparent;
			border-bottom-color:#999;
		}
		&:after{
			border-top-color:#999;
			border-bottom-color:transparent;
			margin-top:2PX;
		}
	}
	.order:before{
		border-bottom-color:#333;
	}
}
.search-price.on em:after{
	border-top-color:#333;
}
.search-price.on .order:after{
	border-top-color:#999;
	border-bottom-color:transparent;
}
</style>