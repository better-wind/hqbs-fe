<template>
  <div class="bar">
    <img src="../assets/image/back-home-tu.png" />
    <span>前往首页</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
    };
  },
  methods: {    
  },
  mounted() {}
};
</script>

<style lang="less" scoped>
	.bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		height: 1.3rem;
		padding: 0 0.4rem;
		box-sizing: border-box;
		position: fixed;
		top: 0;
		left: 0;
		background-color: #fff;
		border-bottom: 1px solid #e0e0e0;
		>img {
			width: 3.68rem;
			display: flex;
		}
		>span {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 2.5rem;
			height: 0.666667rem;
			background-color: #000;
			border-radius: 4px;
			color: #fff;
			font-size: 14px;
		}
	}
</style>
