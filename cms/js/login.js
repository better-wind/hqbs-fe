;(function(win) {
  if (typeof String.prototype.startsWith != 'function') {
    String.prototype.startsWith = function(prefix) {
      return this.slice(0, prefix.length) === prefix;
    };
  }

  var ua = win.navigator.userAgent.toLowerCase(),
    WX_APP_ID = location.hostname.startsWith('test') ? 'wx57da11c5e53e6e7c' : 'wxee370be0c7e36ef0',
    href = encodeURIComponent(location.href),
    wxRedirect = encodeURIComponent(location.origin + '/cms/wxauth.html'),
    redirect = 'redirect_url=' + href,
    loginUrl = window.routerPrefix + '/login?' + redirect;

  var isWx = ua.match(/MicroMessenger/i) == "micromessenger";
  win._encodeLink = href;
  localStorage.setItem('HQBSSEARCH', location.search)
  if (isWx) { //微信环境
    loginUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + WX_APP_ID + '&redirect_uri=' + wxRedirect + '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
  } else if (GetQueryString('isApp') == 1 && GetQueryString('accountId') <= 0) { //app环境
    loginUrl = 'ggj://redirect/typeCommon/{"type":6}';
  }

  win.loginLoad = function() { //判断是否登录返回true
    return getCookie("QQBSLG409292508") === '1';
  }

  win.loginFun = function() { //判断是否登录,没登陆跳转登录页面
    if (getCookie("QQBSLG409292508") !== '1') {
      localStorage.setItem('HQBSREDIRECTOLD', location.href)
      window.location.href = loginUrl;
    }
  }

  //获取某个cookie对应的cookie
  function getCookie(name) {
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) return unescape(arr[2]);
    return null;
  }

  function GetQueryString(name) { //获取url参数
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return (r[2]);
    return null;
  }

})(window)
