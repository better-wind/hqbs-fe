<style scoped>
  .intro {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .intor-bg{
    background-color: #2B1756;
  }
  .intro img{
    margin: 0;
    padding: 0;
    width: 100%;
    border:0 none;
  } 
  .pt-45{
    padding-top:45px;
  }
</style>
<template>
    <div class="pt-45">
        <topBar :title-name="'工商资质'" ></topBar>
        <div>
            <div class="intro intor-bg">
                <img :src="data" v-for="data in imageList" />
            </div>
        </div> 
    </div>      
</template>
<script>
import topBar from '@/components/topBar'
import config from '@/service/config'
import request, { httpRequest } from '@/service/request'
import storage from '@/utils/storage-lite'
  export default {
    name: 'zizhi',
    data () {
        return {
            imageList:[]
        }
    }, 
    computed: {
    },
    created () {
        
    },
    mounted () {
        let urlParam=this.GetQueryString('sellerId');        
        let conf = new config()
        conf.data = {'sellerId':urlParam}
        conf.url = '/ygg-hqbs/seller/qualificationImageList'       
        new request(conf).POST().then((data) =>{
            if(data.imageList){
                this.imageList=data.imageList;                
            }
        })
    },
    methods: {        
        GetQueryString (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
            var r = window.location.search.substr(1).match(reg);
            if (r!=null) return (r[2]); return null;
        }
    },
    components: {
        topBar
    }
  };
</script>
