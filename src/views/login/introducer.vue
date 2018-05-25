<style>
  body{ background: #ffffff; }
</style>
<style scoped>
  .login{ color: #000 }
  .title{
    margin: 24px 0;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
  }
  .col-888 {
    color: #888;
  }
  .col-000 {
    color: #000;
}
  ul{
    padding: 0 24px;
    text-align: center;
  }
  li{
    width: 100%;
    height: 60px;
    border: 1PX solid #000;
    position: relative;
    text-align: left;
    margin-bottom: 12px;
  }
  input{
    width: 100%;
    height: 100%;
    border: none;
    padding-left: 72px;
    padding-right: 12px;
    box-sizing: border-box;
    font-size: 16px;
  }
  .login-tel{
    padding-left: 12px;
  }
  .submit{
    height: 60px;
    line-height: 60px;
    background: #000;
    color: #fff;
    font-size: 16px;
    margin-top: 60px;
  }
  .mask-full2 {
    position: fixed;
    z-index: 98;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.7);
  }
  .login-reminder, .login-reminder2 {
    position: fixed;
    z-index: 9;
    left: 50%;
    top: 50%;
    width: 80%;
    -webkit-transform: translate(-50%,-50%);
    background: #fff;
    border-radius: 6px;
  }
  .reminder-info, .reminder-info2 {
    padding: 24px 12px;
    font-size: 16px;
  }
  .tAvatar {
    width: 60px;
    height: 60px;
    margin-right: 6px;
    border-radius: 50%;
    background: url(https://yangege.b0.upaiyun.com/1794a971b4043.png) no-repeat center;
    background-size: cover;
    vertical-align: middle;
  }
  .reminder-btn, .reminder-btn2 {
    font-size: 0;
    border-top: 1PX solid #ccc;
  }
  .reminder-btn i, .reminder-btn2 i {
    width: 50%;
    height: 48px;
    line-height: 48px;
    box-sizing: border-box;
    font-size: 14px;
  }
  .reminder-btn2 i+i {
    border-left: 1PX solid #ccc;
  }
  .mt-20 {
    margin-top: 24px;
  }
</style>
<template>
  <div class="login">
    <h2 class="title">请输入推荐人ID</h2>
    <ul>
      <li>
        <input type="number" v-model.number="tAccountId" placeholder="请输入推荐人ID" class="login-tel">
        <i class="clear-val" @click="clear(1)" v-if="tAccountId.toString().length > 0"></i>
      </li>
      <p class="submit" @click="setIntroducer" v-if="tAccountId==''">绑定</p>
      <p class="submit" @click="getUser" v-else>绑定</p>
    </ul>

    <div class="mask-full2" v-if="isShow">
        <div class="login-reminder t_c">
            <p class="reminder-info2 f-16 col-888">您的推荐人</p>
            <p>
                <i class="tAvatar" v-lazy:background-image="userInfo.image"></i>
                {{userInfo.nickName}}
            </p>
            <p class="reminder-btn2 col-888 mt-20">
                <i class="cancle" @click="isShow = false">取消</i>
                <i class="col-000 reminder-true" @click="setIntroducer(),isShow = false">确定</i>
            </p>
        </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex'
  import auth from '@/utils/auth'
  import '@/assets/dialog/fm.dialog.min.css'
  import { Dlg } from '@/assets/dialog/fm.dialog.min.js'

  export default {
    name: 'introducer',
    data () {
      return {
        tAccountId:'',
        isShow:false,
        redirectUrl:this.$route.query.redirect_url
      }
    },
    computed: {
      ...mapState('modLogin', ['userInfo']),
    },
    mounted(){
      console.log('params:',this.$route.query.redirect_url)
    },
    methods: {
      ...mapActions('modLogin',['setTid','getUserInfo']),
      
      showDlg(content){
        Dlg.msg({
          content: content,
          msgType: 'inverse'
        })
      },
      setIntroducer(){
        let opts = {}
        opts.data = {tid:this.tAccountId}
        this.setTid(opts).then(data => {
          if(data.status==0 && data.errorMessage){ 
            this.showDlg(data.errorMessage) 
          }else if(data.status==1){
            window.location.href = this.redirectUrl || '/'
          }
        })
      },
      getUser(){
        let opts = {}
        opts.data = {id:this.tAccountId}
        this.getUserInfo(opts).then(data => {
          // console.log('user:',data)
          if(data.status==0 && data.msg){ 
            this.showDlg(data.msg) 
          }else if(data.status==1){
            this.isShow = true
          }
        })
      }
    }
  }
</script>
