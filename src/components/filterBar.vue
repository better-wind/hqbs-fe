<style lang="less" scoped>
	.filter-bar {
		display: flex;
		width: 100%;
		height: 1.066667rem;
		background-color: #fff;
		border-bottom: 1px solid #e0e0e0;
		>span {
			display: flex;
			align-items: center;
			justify-content: center;
			flex: 1;
			color: #888;
			position: relative;
			font-weight: bold;
			font-size: 0.38rem;
		}
		.hot {
			&:after {
				content: '';
				height: 50%;
				width: 2px;
				background-color: #e0e0e0;
				position: absolute;
				right: 0;
			}
		}
		.price {
			>em {
				margin-left: 4px;
				&:before,&:after {
					display: block;
					width: 0;
    				height: 0;
					content: '';
				}
				&:before {
					border-right: 0.13333rem solid transparent;
				    border-bottom: 0.13333rem solid #999;
				    border-left: 0.13333rem solid transparent;
				    margin-bottom: 2px;
				}
				&:after {
					border-right: 0.13333rem solid transparent;
				    border-top: 0.13333rem solid #999;
				    border-left: 0.13333rem solid transparent;		
				}
			}
		}
		.top {
			>em {
				&:before {
					border-bottom: 0.13333rem solid #000;
				}
			}
		}
		.down {
			>em {
				&:after {
					border-top: 0.13333rem solid #000;
				}
			}
		}
		.selected {
			color: #000;
		}
	}
</style>

<template>
  <div class="filter-bar" @click="handleTab">
  	<span class="hot" :class="{'selected':type===1}">热门</span>
  	<span class="price" :class="{'selected':type===2,'top':direction===1,'down':direction===2}">价格<em></em></span>
  </div>
</template>

<script>
export default {
  name: "filter-bar",
  data() {
    return {
      type: 1,      //1、热门 2、价格
      direction: 0  //1、升序 2、降序
    }
  },
  props: {

  },
  methods: { 
  	handleTab(ev){
  		const className = ev.target.className
  		if(className == 'hot'){
  			this.type = 1
  			this.direction = 0
  			this.$emit('filterCb',1,this.direction)
  		}else if(className == 'hot selected'){
  			return false
  		}else{
  			this.type = 2
  			if(this.direction === 0 || this.direction === 2){
  				this.direction = 1
  			}else if(this.direction === 1){
  				this.direction = 2
  			}
  			this.$emit('filterCb',2,this.direction)
  		}
  	}
  },
  mounted() {}
};
</script>
