<style lang="less" scoped>
	.countdown {
		width: 100%;
		color: #D40459;
		font-size: 16px;
		text-align: center;
		margin-bottom: 20px;
	}
</style>
<template>
    <div class="countdown" :endTime="endTime" :callback="callback" :endText="endText">
        <slot>
          {{content}}
        </slot>
    </div>
</template>
<script>
    export default {
        data(){
           	return {
            	content: '',
           	}
        },
        props:{
            endTime:{
                type: Number,
            },
            endText:{
               type : String,
               default:'已结束'
            },
            callback : {
                type : Function,
                default : ()=>{
                  location.reload()
                }
            }
        },
        mounted () {
          	this.countdowm(this.endTime)
        },
        methods: {
           countdowm(timestamp){
            let self = this;
            let timer = setInterval(function(){
                let nowTime = new Date();
                let endTime = new Date(timestamp * 1000);
                let t = endTime.getTime() - nowTime.getTime();
                if(t>0){
                    let day = Math.floor(t/86400000);
                    let hour=Math.floor((t/3600000)%24);
                    let min=Math.floor((t/60000)%60);
                    let sec=Math.floor((t/1000)%60);
                    hour = hour < 10 ? "0" + hour : hour;
                    min = min < 10 ? "0" + min : min;
                    sec = sec < 10 ? "0" + sec : sec;
                    let format = '';
                    if(day > 0){
                       format =  `倒计时 ${day}:${hour}:${min}:${sec}`;
                    }
                    if(day <= 0 && hour > 0 ){
                       format = `倒计时 ${hour}:${min}:${sec}`;
                    }
                    if(day <= 0 && hour <= 0){
                       format =`倒计时 ${min}:${sec}`;
                    }
                    self.content = format;
                    }else{
                      clearInterval(timer);
                      self.content = self.endText;
                      self._callback();
                    }
                 },1000);
               },
               _callback(){
               		if(this.callback && this.callback instanceof Function){
                     	this.callback(...this);
                	}
            	}
        }
    }
</script>