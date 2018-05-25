<style scoped lang="less">
  .new-product-list {
    width: 100%;
    padding-top:.5rem;
  	background-color: #fff;
		.wrap {
			width: 100%;
			.item {
        display: block;
				width: 100%;
				padding: 0 0.33333rem;
				border-bottom: 1px solid #e0e0e0;
				box-sizing: border-box;
				margin-bottom: 0.5rem;
				>img {
					display: block;
					width: 100%;
					max-height: 5.3333334rem;
				}
				>dl {
					padding: 0.2rem;
					>dt {
						font-size: 16px;
						line-height: 24px;
            font-weight: bold;
						color: #000;
					}
					>dd {
						font-size: 14px;
						line-height: 18px;
						color: #888;
					}
				}
			}
		}
  }
  .p-top {
  	padding-top: 1.8333rem;
  }
</style>
<template>
  <div class="new-product-list" :class="{'p-top':!isApp}">
  	<back-to-index v-if='!isApp'/>
    <div class="wrap">
  		<a class="item" v-for="(item,index) in list" :href="item.url">
	  		<img v-lazy="item.image" />
	  		<dl>
	  			<dt>{{item.title}}</dt>
	  			<dd>{{item.desc}}</dd>
	  		</dl>
	  	</a>
	  	<infinite-loading @infinite="infiniteHandler">
        <span slot="no-results">已显示全部内容</span>
        <span slot="no-more">已显示全部内容</span>  
      </infinite-loading>
  	</div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import backToIndex from '@/components/backToIndex'
  import InfiniteLoading from 'vue-infinite-loading';
  export default {
    name: 'index',
    components: {
    	backToIndex,
    	InfiniteLoading
    },
    data () {
      return {
        isApp:false,
        list: [],
        params: {
          page: 1,
        }
      }
    },
    computed: {
      ...mapState('modRecommend', ['sBaseInfo','sNewItemList'])
    },
    mounted: function() {
      const _r = this.$router.currentRoute
      if(_r.query.isApp) {
        this.isApp = true
      }
    },
    methods: {
      ...mapActions('modRecommend', ['newItemListAction']),
      infiniteHandler($state) {
        let params = this.params
        let page = this.params.page 
        this.state = $state
        this.newItemListAction({data:params}).then(()=>{
          if(this.sNewItemList.length === 0){
            $state.complete()
          }else{
            this.list = this.list.concat(this.sNewItemList)
            Object.assign(params,{
              page: ++page
            })
            $state.loaded()
          }
        })
      }
    }
  }
</script>
