<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
  import tool from "@/utils/tools"
  import auth from '@/utils/auth'
  import config from '@/service/config'
  import request from '@/service/request'

  export default {
    name: 'app',
    data() {
      return {
        
      };
    },
    mounted() {
    },
    beforeDestroy() {
    },
    methods: {
    },
    watch: {
      '$route'(to,from){
        if(!auth.isLoggedIn()) return false;
        // console.log(this.$route)
        const _link = encodeURIComponent(location.href);
        const _name = this.$route.name;
        let _id = this.$route.params.id ? this.$route.params.id : 0;
        let _type = 0;

        switch(_name){
          case 'index'://首页   分享内容跟首页一样都是type=9
          case 'search':
          case 'recommend':     
            _type = 9;
            break;
          case 'productDetail'://详情
            _type = 1;
            break;
          case 'zuhe'://组合
            _type = 2;
            break;
          case 'quizzesIndex'://cms
          case 'quizzesMain'://cms
            _type = 200;
            break;
          case 'smBd'://分类--品牌
            _type = 4;
            break;
          case 'smFl'://分类
            _type = 10;
            break;
          case 'smSc'://二级分类
            _type = 11;
            break;
          case 'berserk'://疯抢
            _type = 12;
            break;
        }

        let conf = new config()          
        conf.url = tool.linkHeader +'/share/getJssdk'
        conf.data = {
          link:_link,
          type:_type,
          id:_id
        }
        new request(conf).POST().then((data) => {
          try {
            //微信分享
            // alert(JSON.stringify(data))
            if(_type == 200){
              var accountId = data.jsSdk?data.jsSdk.indexUrl.split('?')[1].split('&')[0].split('=')[1]:''
              brandShareFun(data.jsSdk,{
                sharePath: 'https://m.51bushou.com/cms/index.html?APPOS=1&gpm=0&cId=3351&caId=2875&accountid='+accountId,
                cb: function(){
                  if(_name == 'quizzesIndex'){
                    location.reload()
                  }else if(_name == 'quizzesMain'){
                    location.replace('/h5/activity/quizzes/index')
                  }                 
                }
              });
            }else{
              brandShareFun(data.jsSdk);
            }
            
          } catch (err) {}

        })
        
         
      }
    }
    
  }
</script>

<style>
  #app {
    font-size:14px;
    line-height: 1.4;
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
  }
</style>
