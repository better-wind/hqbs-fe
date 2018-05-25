import config from '@/service/config'
import request from '@/service/request'

const ease = {
  //config huanxin
  config(){
    window.easemobim = window.easemobim || {};
    easemobim.config = {
        tenantId: '20414',
        //orgName#appName
        appKey: 'globalscanner#globalscannerh5',
        //手机App绑定的IM号
        to: 'globalscanner00',
        //是否隐藏小的悬浮按钮
        hide: true,
        //自动连接
        autoConnect: true,
        eventCollector:true,
        ticket:false,
        //下班后，不展示留言页面，不允许访客发送消息
        offDutyType: 'none'
    };
    if(window.location.hostname.startsWith('test')){
        easemobim.config['appKey'] = 'globalscanner#globalscannertest';
        easemobim.config['to'] = 'globalscannerTest';
    }
  },
  //bind huanxin
  bindEase(e){
    let conf = new config()
    conf.url = '/ygg-hqbs/huanxin/user'
    new request(conf).POST().then(data => {
      if(data.status == '1'){
        window.event = e
        console.log('wine:',window.easemobim)
        window.easemobim.config.user={
            //指定用户名，集成时必填
            username: data.huanxinAccountName,
            //password验证方式
            password: data.huanxinPassword
        }
        window.easemobim.config.visitor = {
            userNickname: data.huanxinAccountName,
            trueName: data.huanxinAccountName
        }
        window.easemobim.bind({tenantId: '20414'});
      }
    })
  }
}

export default ease