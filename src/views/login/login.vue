<style>
body {
  background: #ffffff;
}
</style>
<style scoped>
.login {
  color: #000;
  overflow: auto;
}
.title {
  margin: 24px 0;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
}
ul {
  padding: 0 24px;
  text-align: center;
}
li {
  width: 100%;
  height: 60px;
  border: 1px solid #000;
  position: relative;
  text-align: left;
  margin-bottom: 12px;
}
input {
  width: 100%;
  height: 100%;
  border: none;
  padding-left: 72px;
  padding-right: 12px;
  box-sizing: border-box;
  font-size: 16px;
}
.tel-state {
  position: absolute;
  z-index: 5;
  left: 12px;
  top: 33%;
  width: 60px;
}
.tel-state:after {
  content: "";
  display: inline-block;
  border: 3.6px solid transparent;
  border-top-color: #000;
  margin-left: 3.6px;
}
.yzm-span {
  width: 65%;
  height: 100%;
  position: relative;
}
.yzm-input {
  width: 70%;
  padding-left: 12px;
}
.yzm-i {
  width: 30%;
  border-left: 1px solid #000;
  height: 43px;
  line-height: 43px;
  vertical-align: middle;
  text-align: center;
}
.submit {
  height: 60px;
  line-height: 60px;
  background: #000;
  color: #fff;
  font-size: 16px;
}
.voice {
  height: inherit;
  border: none;
  margin-bottom: 36px;
}
.voice-btn {
  text-decoration: underline;
}
</style>
<template>
  <div class="login">
    <h2 class="title">手机登录</h2>
    <ul>
      <li>
        <i class="tel-state" @click="goSelector">+{{addrNo}}</i>
        <input type="tel" name="" placeholder="请输入手机号" v-model.trim="phoneNum">
      </li>
      <li>
        <span class="yzm-span">
          <input type="" name="" placeholder="请输入验证码" class="yzm-input" v-model.trim="valiCode">
        </span>
        <i class="yzm-i" @click="getValiCode(1)" v-text="codeTxt"></i>
      </li>
      <li class="voice" v-if="showVoice">
            收不到短信，试试<i class="voice-btn" @click="getValiCode(2)">语音验证码</i>
        </li>
      <p class="submit" @click="login">登录</p>
    </ul>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import auth from "@/utils/auth";
import "@/assets/dialog/fm.dialog.min.css";
import { Dlg } from "@/assets/dialog/fm.dialog.min.js";
import session from '@/utils/session-lite';

export default {
  name: "login",
  data() {
    return {
      isState: 0,
      phoneNum: "",
      valiCode: "",
      telNo: "86",
      codeTxt: "获取验证码",
      showVoice: false,
      voiceDisable: true,
      voiceCounter: 60,
      redirectUrl: this.$route.query.redirect_url,
      accountId:session.get('accountId')
    };
  },
  computed: {
    ...mapState("modLogin", ["addrNo"]),
    ...mapGetters("modLogin", ["addrList", "isHideSea"])
  },
  mounted() {
    if (!this.addrList) {
      this.getAddress();
    }
  },
  methods: {
    ...mapActions("modLogin", ["getAddress", "getCode", "goLogin"]),
    login() {
      let opts = {};
      opts.data = {
        name: this.phoneNum,
        code: this.valiCode,
        addressCode: this.addrNo
      };
      if(this.accountId) {
        opts.data = {...opts.data,...{accountId:this.accountId}}
      }
      this.goLogin(opts).then(data => {
        if (data.status == 0 && data.msg) {
          this.showDlg(data.msg);
        } else if (data.status == 1) {
          window.location.href = this.redirectUrl || "/";
        } else if (data.status == 2) {
          this.$router.push({
            path: window.routerPrefix + "/login/merge",
            query: { ...this.$route.query, name: this.phoneNum }
          });
        } else if (data.status == 3) {
          this.$router.push({
            path: window.routerPrefix + "/login/introducer",
            query: { redirect_url: this.redirectUrl }
          });
        }
      });
    },
    getValiCode(type) {
      //type 1 短信，2语音
      if (type == 2 && !voiceDisable) {
        this.showDlg("请等候" + this.voiceCounter + "s后重试");
      }
      let opts = {};
      opts.data = {
        mobileNumber: this.phoneNum,
        addressCode: this.addrNo,
        channelType: type
      };
      this.getCode(opts).then(data => {
        if (data.status == 0 && data.msg) {
          this.showDlg(data.msg);
        } else if (data.status == 1) {
          if (type == 2) {
            this.voiceDisable = false;
            this.timeCount(
              this.voiceCounter,
              counter => {
                //60秒内禁止发送语音
                this.voiceCounter = counter;
              },
              () => {
                this.voiceDisable = true;
                this.voiceCounter = 60;
              }
            );
          } else {
            this.timeCount(
              60,
              counter => {
                //发送短信倒计时
                this.codeTxt = counter + "s";
              },
              () => {
                this.codeTxt = "重发";
              }
            );

            this.timeCount(
              15,
              counter => {
                //15秒后打开发送语音
              },
              () => {
                this.showVoice = true;
              }
            );
          }
        }
      });
    },

    goSelector() {
      this.$router.push(window.routerPrefix + "/login/selector");
    },
    timeCount(counter, fn, done) {
      let timer = setInterval(() => {
        counter--;
        if (counter == 0) {
          clearInterval(timer);
          done.call(this);
        } else {
          fn.call(this, counter);
        }
      }, 1000);
    },
    showDlg(content) {
      Dlg.msg({
        content: content,
        msgType: "inverse"
      });
    }
  }
};
</script>
