!(function(window){
	var ua = navigator.userAgent.toLowerCase();
	if (ua.indexOf('globalscanner')>-1) {
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
			if(ua.indexOf('ios')>-1){
				bridge.registerHandler('initFinish', function(data, responseCallback) {

				})
			}

		});
		document.addEventListener('WebViewJavascriptBridgeReady', function() {

		},false);
	}

})(window)



