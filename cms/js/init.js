var InitCms = window.InitCms;
var queryString = window.eventListener.queryString;
var host = '/ygg-hqbs';
//var host = 'https://test.51bushou.com/hqbsbak'
var ua = navigator.userAgent.toLowerCase();
var config = {
    host: host,
    id: 'tpl-container'
}
var getData = function() {
    window.CmsCache.getCmsCache(function (loadType, loadCmsData) {
        if(loadType){
            InitCms.initCmsRequest(config)
        }else{
            InitCms.initCmsData(loadType,loadCmsData,config)
        }
    })
}
if(ua.indexOf('globalscanner')>-1){
	function setupWebViewJavascriptBridge(callback) {
		if (ua.indexOf('android')>-1) {
			if (window.WebViewJavascriptBridge) {
				callback(WebViewJavascriptBridge)
			} else {
				document.addEventListener('WebViewJavascriptBridgeReady',function() {
					callback(WebViewJavascriptBridge)
				},false);
			}
		}else{
			if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
			if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
			window.WVJBCallbacks = [callback];
			var WVJBIframe = document.createElement('iframe');
			WVJBIframe.style.display = 'none';
			WVJBIframe.src = 'ggjBridge://__BRIDGE_LOADED__';
			document.documentElement.appendChild(WVJBIframe);
			setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
		}
	}
	setupWebViewJavascriptBridge(function(bridge) {
		getData();
	})
}else{
	getData();
}

if(!queryString('isApp')){
	getJssdk();
}
//微信分享
function getJssdk() {
	var linkHeader = location.protocol+'//'+ location.host +'/ygg-hqbs';
	var _link = encodeURIComponent(location.href);
	var _id = queryString('caid') || 0;
	$.ajax({
		url: linkHeader + '/share/getJssdk',
		type:'post',
		data:{
			link:_link,
        	type:3, //cms
        	id:_id
		},
		success:function(data){
			try {
				brandShareFun(data.jsSdk);
			} catch (err) {

			}
		}
	})
}

<!--统计-->
var tjDiv = document.createElement("div"),
	_tjHtml = '<script src="https://s95.cnzz.com/z_stat.php?id=1258654236&web_id=1258654236" ><\/script>',
	_tjAppHtml = '<script src="https://s95.cnzz.com/z_stat.php?id=1260883731&web_id=1260883731"><\/script>';

tjDiv.style.display = "none"

if(window.location.href.indexOf("isApp=1") > -1){
	tjDiv.innerHTML = _tjAppHtml
}else{
	tjDiv.innerHTML = _tjHtml
}
document.body.appendChild(tjDiv)