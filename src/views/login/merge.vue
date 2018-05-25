<style>
  body{ background: #ffffff; }
</style>
<style scoped>
  .login{ color: #000 }
  .title{
    margin: 24px 0;
    text-align: center;
    font-size: 14px;
    font-weight: bold;
  }
  .mesgtip{
    width: 90%;
    margin: 20px auto;
    margin-bottom: 24%;
    color: #858585;
    font-size: 12px;
  }
  .col-888 {
    color: #888;
  }
  .col-000 {
    color: #000;
  }
  .login-info{
    padding: 0 24px;
  }
  .login-info li{
    line-height: 60px;
    margin-bottom: 12px;
    font-size: 16px;
  }
  .btn_1{
    height: 60px;
    line-height: 60px;
    background: #000;
    color: #fff;
  }
  .mesg-top {
    width: 90%;
    margin: 0 auto;
    padding: 3% 0 2.1% 0;
    position: relative;
    background: #F0F0F0;
    border: 1PX solid #E0E0E0;
    overflow: hidden;
  }
  .mesg-top img {
    display: block;
    width: 60px;
    height: 60px;
    position: absolute;
    left: 5.3%;
    border-radius: 100%;
  }
  .mesg-top .mesg-top-p {
    padding-left: 29.5%;
  }
  .mesg-top .mesg-top-p b {
    display: block;
    width: 98%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 18px;
  }
  .mesg-top p span {
    display: block;
    margin-top: 2px;
    color: #858585;
  }
  .dialog-box {
    position: fixed;
    z-index: 98;
    left: 50%;
    top: 50%;
    width: 80%;
    -webkit-transform: translate(-50%,-50%);
    background: #fff;
    text-align: center;
  }
  .dialog-info {
    padding: 18px;
    line-height: 1.6; 
  }
  .dialog-info p:first-child {
    color: #858585;
  }
  .dialog-box-edit .dialog-info p:last-child {
    margin-top: 17px;
    text-align: center;
    position: relative;
  }
  .dialog-info p input {
    width: 35px;
    height: 25px;
    line-height: 25px;
    margin-right: 2px;
    font-size: 14px;
    border: 1PX solid #E0E0E0;
    text-align: center;
  }
  .dialog-btn {
    border-top: 1PX solid #e0e0e0;
    font-size: 0;
  }
  .dialog-btn i {
    display: inline-block;
    width: 50%;
    height: 50px;
    line-height: 50px;
    box-sizing: border-box;
    font-size: 14px;
  }
  .dialog-btn i:first-child {
    border-right: 1px solid #e0e0e0;
  }
  .mt-20 {
    margin-top: 24px;
  }
  .mask{
    position:fixed;
    top:0;
    left:0;
    z-index:12;
    width:100%;
    height:100%;
    background:rgba(0,0,0,0.2);
  }
</style>
<template>
  <div class="login">
    <h2 class="title">这个账号是否为您的账号，若是则可直接登录</h2>
    <div class="mesg-top" v-if="account.user">
        <img :src="account.user.image" alt="" v-if="account.user.image">
        <img src="images/imgplace01.png" alt="" v-else>
        <p class="mesg-top-p">
            <b>{{account.user.nickname}}</b>
            <span class="f-12">ID:{{account.user.id}}</span>
            <span class="f-12">最近登录时间：{{account.user.updateTime}}</span>
        </p>
        <p class="addressee f-14" v-if="account.receiveAds">
            <span>收件人姓名：{{account.receiveAds.fullName}}</span>
            <span>收件人手机号：{{account.receiveAds.mobileNumber}}</span>
            <span>收件人所在省市：{{account.receiveAds.province}} {{account.receiveAds.city}}</span>
        </p>
    </div>
    <p class="mesgtip">环球捕手账号体系升级，系统检测到您当前手机号在之前注册的微信账号收件人地址中有出现，则可绑定之前微信账号后用手机号登录之前的账号。
    </p>
    <ul class="login-info">
      <li class="login-btn t_c col-fff f-16 mb-10">
        <p class="btn_1" @click="goCheck()">是，登录这个账号</p>
      </li> 
      <li class="login-btn t_c f-16" @click="goNewAccount()">不是，用新账号登录</li>
    </ul>

    <ul class="dialog-box dialog-box-edit" v-if="isCheck">
        <li class="dialog-info">
            <p>安全校验，请补充姓名</p>
            <p><input type="text" v-model="editValue">{{account.receiveAds.fullNameShow}}</p>
        </li>
        <li class="dialog-btn">
            <i class="col-888 dialog-cancel" @click="isCheck=false">取消</i>
            <i class="dialog-turn" @click="saveEdit(editValue,account.receiveAds.id)">确定</i>
        </li>
    </ul>
    <div class="mask" v-if="isCheck"></div>
  </div>
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex'
  import auth from '@/utils/auth'
  import '@/assets/dialog/fm.dialog.min.css'
  import { Dlg } from '@/assets/dialog/fm.dialog.min.js'

  export default {
    name: 'merge',
    data () {
      return {
        name:this.$route.query.name,
        redirectUrl:this.$route.query.redirect_url,
        accountId:this.$route.query.accountId,
        editValue:'',
        isCheck:false,
      }
    },
    computed: {
      ...mapState('modLogin', ['account']),
    },
    mounted(){
      console.log('params:',this.$route.query.redirect_url)
    },
    created:function(){
        this.getData()
    },
    methods: {
      ...mapActions('modLogin',['checkAccount','getAccount','loginDirect']),
      
      showDlg(content){
        Dlg.msg({
          content: content,
          msgType: 'inverse'
        })
      },
      goCheck(){
        this.editValue='';
        this.isCheck=true;
      }, 
      saveEdit:function(val,id){
        if(!val){
           this.showDlg('姓不能为空');
           return false; 
        }
        let opts = {}
        opts.data = {name:encodeURI(val),id:id}
        this.checkAccount(opts).then(data => {
          if(data.status==1){
            window.location.href = this.redirectUrl || '/'
          }else if(data.msg){
            this.showDlg(data.msg);
          }
        })
      },
      goNewAccount(){
        let opts = {}
        opts.data = {accountId:this.accountId}
        this.loginDirect(opts).then(data => {
          if(data.status==1){
            window.location.href = this.redirectUrl || '/'
          }else if(data.status == 3){
              this.$router.push({path: window.routerPrefix + `/login/introducer`, query: {redirect_url: this.redirectUrl}})
          }else if(data.msg){
            this.showDlg(data.msg);
          }else{
            this.showDlg('登录失败');
          }
        })
      },   
      getData(){
        let opts = {}
        opts.data = {name:this.name}
        this.getAccount(opts)
      }
    }
  }
</script>
