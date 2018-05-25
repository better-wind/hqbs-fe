/*
 *捕手数据分析 gegejia analytics
 */
;(function(root, factory){
    if (typeof define === 'function' && define.amd) {
        define(function () {
            return factory(root);
        });
    } else if (typeof exports === 'object') {
        module.exports = factory;
    } else {
        root.Ganalytics = factory(root);
    }
})(this,function(root){
	'use strict';

    /*
     * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
     * Digest Algorithm, as defined in RFC 1321.
     * Version 2.1 Copyright (C) Paul Johnston 1999 - 2002.
     * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
     * Distributed under the BSD License
     * See http://pajhome.org.uk/crypt/md5 for more info.
     */

    /*
     * Configurable variables. You may need to tweak these to be compatible with
     * the server-side, but the defaults work in most cases.
     */
    var hexcase = 0;  /* hex output format. 0 - lowercase; 1 - uppercase        */
    var b64pad  = ""; /* base-64 pad character. "=" for strict RFC compliance   */
    var chrsz   = 8;  /* bits per input character. 8 - ASCII; 16 - Unicode      */

    /*
     * These are the functions you'll usually want to call
     * They take string arguments and return either hex or base-64 encoded strings
     */
    function hex_md5(s){ return binl2hex(core_md5(str2binl(s), s.length * chrsz));}
    function b64_md5(s){ return binl2b64(core_md5(str2binl(s), s.length * chrsz));}
    function str_md5(s){ return binl2str(core_md5(str2binl(s), s.length * chrsz));}
    function hex_hmac_md5(key, data) { return binl2hex(core_hmac_md5(key, data)); }
    function b64_hmac_md5(key, data) { return binl2b64(core_hmac_md5(key, data)); }
    function str_hmac_md5(key, data) { return binl2str(core_hmac_md5(key, data)); }

    /*
     * Perform a simple self-test to see if the VM is working
     */
    function md5_vm_test()
    {
      return hex_md5("abc") == "900150983cd24fb0d6963f7d28e17f72";
    }

    /*
     * Calculate the MD5 of an array of little-endian words, and a bit length
     */
    function core_md5(x, len)
    {
      /* append padding */
      x[len >> 5] |= 0x80 << ((len) % 32);
      x[(((len + 64) >>> 9) << 4) + 14] = len;

      var a =  1732584193;
      var b = -271733879;
      var c = -1732584194;
      var d =  271733878;

      for(var i = 0; i < x.length; i += 16)
      {
        var olda = a;
        var oldb = b;
        var oldc = c;
        var oldd = d;

        a = md5_ff(a, b, c, d, x[i+ 0], 7 , -680876936);
        d = md5_ff(d, a, b, c, x[i+ 1], 12, -389564586);
        c = md5_ff(c, d, a, b, x[i+ 2], 17,  606105819);
        b = md5_ff(b, c, d, a, x[i+ 3], 22, -1044525330);
        a = md5_ff(a, b, c, d, x[i+ 4], 7 , -176418897);
        d = md5_ff(d, a, b, c, x[i+ 5], 12,  1200080426);
        c = md5_ff(c, d, a, b, x[i+ 6], 17, -1473231341);
        b = md5_ff(b, c, d, a, x[i+ 7], 22, -45705983);
        a = md5_ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
        d = md5_ff(d, a, b, c, x[i+ 9], 12, -1958414417);
        c = md5_ff(c, d, a, b, x[i+10], 17, -42063);
        b = md5_ff(b, c, d, a, x[i+11], 22, -1990404162);
        a = md5_ff(a, b, c, d, x[i+12], 7 ,  1804603682);
        d = md5_ff(d, a, b, c, x[i+13], 12, -40341101);
        c = md5_ff(c, d, a, b, x[i+14], 17, -1502002290);
        b = md5_ff(b, c, d, a, x[i+15], 22,  1236535329);

        a = md5_gg(a, b, c, d, x[i+ 1], 5 , -165796510);
        d = md5_gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
        c = md5_gg(c, d, a, b, x[i+11], 14,  643717713);
        b = md5_gg(b, c, d, a, x[i+ 0], 20, -373897302);
        a = md5_gg(a, b, c, d, x[i+ 5], 5 , -701558691);
        d = md5_gg(d, a, b, c, x[i+10], 9 ,  38016083);
        c = md5_gg(c, d, a, b, x[i+15], 14, -660478335);
        b = md5_gg(b, c, d, a, x[i+ 4], 20, -405537848);
        a = md5_gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
        d = md5_gg(d, a, b, c, x[i+14], 9 , -1019803690);
        c = md5_gg(c, d, a, b, x[i+ 3], 14, -187363961);
        b = md5_gg(b, c, d, a, x[i+ 8], 20,  1163531501);
        a = md5_gg(a, b, c, d, x[i+13], 5 , -1444681467);
        d = md5_gg(d, a, b, c, x[i+ 2], 9 , -51403784);
        c = md5_gg(c, d, a, b, x[i+ 7], 14,  1735328473);
        b = md5_gg(b, c, d, a, x[i+12], 20, -1926607734);

        a = md5_hh(a, b, c, d, x[i+ 5], 4 , -378558);
        d = md5_hh(d, a, b, c, x[i+ 8], 11, -2022574463);
        c = md5_hh(c, d, a, b, x[i+11], 16,  1839030562);
        b = md5_hh(b, c, d, a, x[i+14], 23, -35309556);
        a = md5_hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
        d = md5_hh(d, a, b, c, x[i+ 4], 11,  1272893353);
        c = md5_hh(c, d, a, b, x[i+ 7], 16, -155497632);
        b = md5_hh(b, c, d, a, x[i+10], 23, -1094730640);
        a = md5_hh(a, b, c, d, x[i+13], 4 ,  681279174);
        d = md5_hh(d, a, b, c, x[i+ 0], 11, -358537222);
        c = md5_hh(c, d, a, b, x[i+ 3], 16, -722521979);
        b = md5_hh(b, c, d, a, x[i+ 6], 23,  76029189);
        a = md5_hh(a, b, c, d, x[i+ 9], 4 , -640364487);
        d = md5_hh(d, a, b, c, x[i+12], 11, -421815835);
        c = md5_hh(c, d, a, b, x[i+15], 16,  530742520);
        b = md5_hh(b, c, d, a, x[i+ 2], 23, -995338651);

        a = md5_ii(a, b, c, d, x[i+ 0], 6 , -198630844);
        d = md5_ii(d, a, b, c, x[i+ 7], 10,  1126891415);
        c = md5_ii(c, d, a, b, x[i+14], 15, -1416354905);
        b = md5_ii(b, c, d, a, x[i+ 5], 21, -57434055);
        a = md5_ii(a, b, c, d, x[i+12], 6 ,  1700485571);
        d = md5_ii(d, a, b, c, x[i+ 3], 10, -1894986606);
        c = md5_ii(c, d, a, b, x[i+10], 15, -1051523);
        b = md5_ii(b, c, d, a, x[i+ 1], 21, -2054922799);
        a = md5_ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
        d = md5_ii(d, a, b, c, x[i+15], 10, -30611744);
        c = md5_ii(c, d, a, b, x[i+ 6], 15, -1560198380);
        b = md5_ii(b, c, d, a, x[i+13], 21,  1309151649);
        a = md5_ii(a, b, c, d, x[i+ 4], 6 , -145523070);
        d = md5_ii(d, a, b, c, x[i+11], 10, -1120210379);
        c = md5_ii(c, d, a, b, x[i+ 2], 15,  718787259);
        b = md5_ii(b, c, d, a, x[i+ 9], 21, -343485551);

        a = safe_add(a, olda);
        b = safe_add(b, oldb);
        c = safe_add(c, oldc);
        d = safe_add(d, oldd);
      }
      return Array(a, b, c, d);

    }

    /*
     * These functions implement the four basic operations the algorithm uses.
     */
    function md5_cmn(q, a, b, x, s, t)
    {
      return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s),b);
    }
    function md5_ff(a, b, c, d, x, s, t)
    {
      return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
    }
    function md5_gg(a, b, c, d, x, s, t)
    {
      return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
    }
    function md5_hh(a, b, c, d, x, s, t)
    {
      return md5_cmn(b ^ c ^ d, a, b, x, s, t);
    }
    function md5_ii(a, b, c, d, x, s, t)
    {
      return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
    }

    /*
     * Calculate the HMAC-MD5, of a key and some data
     */
    function core_hmac_md5(key, data)
    {
      var bkey = str2binl(key);
      if(bkey.length > 16) bkey = core_md5(bkey, key.length * chrsz);

      var ipad = Array(16), opad = Array(16);
      for(var i = 0; i < 16; i++)
      {
        ipad[i] = bkey[i] ^ 0x36363636;
        opad[i] = bkey[i] ^ 0x5C5C5C5C;
      }

      var hash = core_md5(ipad.concat(str2binl(data)), 512 + data.length * chrsz);
      return core_md5(opad.concat(hash), 512 + 128);
    }

    /*
     * Add integers, wrapping at 2^32. This uses 16-bit operations internally
     * to work around bugs in some JS interpreters.
     */
    function safe_add(x, y)
    {
      var lsw = (x & 0xFFFF) + (y & 0xFFFF);
      var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
      return (msw << 16) | (lsw & 0xFFFF);
    }

    /*
     * Bitwise rotate a 32-bit number to the left.
     */
    function bit_rol(num, cnt)
    {
      return (num << cnt) | (num >>> (32 - cnt));
    }

    /*
     * Convert a string to an array of little-endian words
     * If chrsz is ASCII, characters >255 have their hi-byte silently ignored.
     */
    function str2binl(str)
    {
      var bin = Array();
      var mask = (1 << chrsz) - 1;
      for(var i = 0; i < str.length * chrsz; i += chrsz)
        bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (i%32);
      return bin;
    }

    /*
     * Convert an array of little-endian words to a string
     */
    function binl2str(bin)
    {
      var str = "";
      var mask = (1 << chrsz) - 1;
      for(var i = 0; i < bin.length * 32; i += chrsz)
        str += String.fromCharCode((bin[i>>5] >>> (i % 32)) & mask);
      return str;
    }

    /*
     * Convert an array of little-endian words to a hex string.
     */
    function binl2hex(binarray)
    {
      var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
      var str = "";
      for(var i = 0; i < binarray.length * 4; i++)
      {
        str += hex_tab.charAt((binarray[i>>2] >> ((i%4)*8+4)) & 0xF) +
               hex_tab.charAt((binarray[i>>2] >> ((i%4)*8  )) & 0xF);
      }
      return str;
    }

    /*
     * Convert an array of little-endian words to a base-64 string
     */
    function binl2b64(binarray)
    {
      var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
      var str = "";
      for(var i = 0; i < binarray.length * 4; i += 3)
      {
        var triplet = (((binarray[i   >> 2] >> 8 * ( i   %4)) & 0xFF) << 16)
                    | (((binarray[i+1 >> 2] >> 8 * ((i+1)%4)) & 0xFF) << 8 )
                    |  ((binarray[i+2 >> 2] >> 8 * ((i+2)%4)) & 0xFF);
        for(var j = 0; j < 4; j++)
        {
          if(i * 8 + j * 6 > binarray.length * 32) str += b64pad;
          else str += tab.charAt((triplet >> 6*(3-j)) & 0x3F);
        }
      }
      return str;
    }

    ///////////////////////////////////////////////////////////////////////////////////////////

    function generateUUID() {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = (d + Math.random() * 16) % 16 | 0;
          d = Math.floor(d / 16);
          return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
        });
        uuid = uuid.replace(/-/g, '');
        return uuid;
    }

    function parseJSON(str){
        try{
            return !!str ? JSON.parse(str) : str||'';
        }catch(e){
            return ''
        }       
    }

    function ajax(options) {
        options = options || {};
        options.type = (options.type || "GET").toUpperCase();
        options.dataType = options.dataType || "json";
        var params = formatParams(options.data);

        //创建 - 非IE6 - 第一步
        if (window.XMLHttpRequest) {
            var xhr = new XMLHttpRequest();
            xhr.timeout = 2000;
        } else { //IE6及其以下版本浏览器
            var xhr = new ActiveXObject('Microsoft.XMLHTTP');
        }

        //接收 - 第三步
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                var status = xhr.status;
                if (status >= 200 && status < 300) {
                    options.success && options.success(xhr.responseText, xhr.responseXML);
                } else {
                    options.fail && options.fail(status);
                }
            }
        }

        //连接 和 发送 - 第二步
        if (options.type == "GET") {
            options.url = options.url.indexOf('?')>-1 ? options.url + "&" + params : options.url + "?" + params;
            xhr.open("GET", options.url, true);
            xhr.send(null);
        } else if (options.type == "POST") {
            xhr.open("POST", options.url, true);
            //设置表单提交时的内容类型
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.send(params);
        }
    }
    //格式化参数
    function formatParams(data) {
        var arr = [];
        for (var name in data) {
            arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
        }
        // arr.push(("v=" + Math.random()).replace(".",""));
        return arr.join("&");
    }

    if (!Object.keys) Object.keys = function(o) {
      if (o !== Object(o))
        throw new TypeError('Object.keys called on a non-object');
      var k=[],p;
      for (p in o) if (Object.prototype.hasOwnProperty.call(o,p)) k.push(p);
      return k;
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////


    var _ls = root.localStorage;
    var _app_version = root.navigator.appVersion;
    var isAndroid = !!_app_version.match(/android/gi);
    var isIOS = !!_app_version.match(/iphone/gi) || !!_app_version.match(/ipad/gi);
    var hoster = root.location.hostname.indexOf('test')>0 ? root.location.protocol+'//testmaidian.51bushou.com' : root.location.protocol+'//bigdatacollect.gegejia.com';
    var aid = 0;

    //ga
    function _ga(options){
        var that = this;
        ajax({
          url:'/ygg-hqbs/track/tag',
          type:'POST',
          dataType:'json',
          success:function(res){
            res = JSON.parse(res);
            if (res.status==1) aid = res.userTag
            that._init(options);
          },
          fail:function(){
            that._init(options);
          }
        });
        
    }

    _ga.prototype = {

      _init : function(options){
          this._ga_data = this._get_data() || {};
          this._ga_data.productIdChain = this._ga_data.productIdChain||0
          this._ga_data.cartProductIdChain = this._ga_data.cartProductIdChain||0
          document.referrer.indexOf('51bushou.com')>-1 ? this._old_session(options) : this._new_session(options);  
          this._send_action(); 
      },

      //首次进入，上传旧的数据并清空
      _new_session : function(ops){
          this._ga_data.hasOwnProperty('sessionId') && this._send_start();//发送老数据  
          this._ga_data = {oldSessionId:this._ga_data.sessionId};
          this._get_base_info();//获取基本信息
          this._data_init(ops); 
          this._send_start();     
      },

      //非首次进入,拼接参数
      _old_session : function(ops){
          // this._ga_data.hasOwnProperty('sessionId') ? this._data_init()._send_action() : this._get_base_info()._send_start()._send_action();
          if(this._ga_data.hasOwnProperty('sessionId')){
            this._data_init(ops)
          }else{
            this._get_base_info()
            this._data_init(ops)
            this._send_start()
          }
      },

      //页面数据初始化
      _data_init : function(ops){
          var _data = this._ga_data;
          _data.accountId = ops.accountId || aid;
          _data.targetType = ops.targetType;
          _data.targetId = ops.targetId;
          _data.gpm = this._gpm(ops.gpm);
          _data.productIdChain = this._productid_chain(ops.productIdChain);
          _data.cartProductIdChain = this._cart_productid_chain(ops.cartProductIdChain);
          _data.tag = ops.tag;
          _data.position = ops.position;
          _data.udata = ops.udata;
          this._set_data(); 
      },

      //获取基本数据
      _get_base_info : function(){
          if(isAndroid){
              var _str = _app_version.split('Android ')[1];
              this._ga_data.os = 'android' + _str.substr(0,_str.indexOf(';')).replace(/\s+/g,""); 
          }else if(isIOS){
              this._ga_data.os = 'iOS' + _app_version.substr(_app_version.indexOf('OS '),_app_version.indexOf(' like') - _app_version.indexOf('OS ')).replace(/_/g,'.').replace(/\s+/g,"")
          }
          this._ga_data.sessionId = generateUUID.call();
          this._ga_data.platform = _app_version.indexOf('globalscanner')>0 ? '104' : '101';//平台：捕手h5     
      },

      _gpm : function(id){
          return !this._ga_data.gpm ? id+'' : this._ga_data.gpm + '-' + id;
      },

      _productid_chain : function(id){
          this._ga_data.productIdChain = this._ga_data.productIdChain || 0
          return this._ga_data.productIdChain == '0' && !id ? '0' : (this._ga_data.productIdChain == '0' ? id+'' : (!id ? this._ga_data.productIdChain : this._ga_data.productIdChain + '-' + id) );
      },

      _cart_productid_chain : function(id){
          this._ga_data.cartProductIdChain = this._ga_data.cartProductIdChain || 0
          return this._ga_data.cartProductIdChain == '0' && !id ? '0' : (this._ga_data.cartProductIdChain == '0' ? id+'' : (!id ? this._ga_data.cartProductIdChain : this._ga_data.cartProductIdChain + '-' + id) );
      },

      //发送启动信息
      _send_start : function(){
          var query_data = {};
          query_data.oldSessionId = this._ga_data.oldSessionId;
          query_data.sessionId = this._ga_data.sessionId;
          query_data.accountId = this._ga_data.accountId;
          query_data.platform = this._ga_data.platform;
          query_data.os = this._ga_data.os;
          Object.keys(query_data).forEach(function(k){
            if (!query_data[k]) delete query_data[k]
          })
          ajax({url:hoster+'/gegejia-track/track/start',type:'POST',dataType:'json',data:this._sign(query_data),success:function(res,xml){}});
      },

      //发送用户信息
      _send_action : function(){
          var query_data = {};
          query_data.sessionId = this._ga_data.sessionId;
          query_data.accountId = this._ga_data.accountId;
          query_data.platform = this._ga_data.platform;
          query_data.targetType = this._ga_data.targetType;
          query_data.targetId = this._ga_data.targetId;
          query_data.gpm = this._ga_data.gpm;
          query_data.udata = this._ga_data.udata;
          query_data.productIdChain = this._ga_data.productIdChain || 0;
          query_data.cartProductIdChain = this._ga_data.cartProductIdChain || 0;
          query_data.tag = this._ga_data.tag;
          query_data.position = this._ga_data.position;
          Object.keys(query_data).forEach(function(k){
            if (!query_data[k]) delete query_data[k]
          })
          ajax({url:hoster+'/gegejia-track/track/action',type:'POST',dataType:'json',data:this._sign(query_data),success:function(res,xml){}});
      },
      
      _get_data : function(key){
          var _data = parseJSON(_ls.getItem('_ga_data'));
          return !!key ? _data[key] : _data;
      },
      _set_data : function(){
          typeof this._ga_data === 'object' && _ls.setItem('_ga_data',JSON.stringify(this._ga_data));
      },
      
      //用户行为上报
      _report : function(obj){
          this._ga_data.action = obj.action;
          if(obj.targetType) this._ga_data.targetType = obj.targetType;
          this._ga_data.udata = obj.udata || this._ga_data.udata;        
          this._ga_data.cartProductIdChain = this._cart_productid_chain(obj.cartProductIdChain);
          this._set_data()
          this._send_action();
      },

      //生成sign签名
      _sign : function(obj){
          var str = '';
          Object.keys(obj).sort().forEach(function(k){ str = str + k + '=' + obj[k] + '&' });
          return obj.sign = hex_md5(str + 'gegejia-track-2017').substr(8,16).toUpperCase(), obj;
      }
    }

    //暴露接口
    function Ganalytics(ops){
        //初始化
        var gg = new _ga(ops);
        //上报数据
        this.report = function(obj){gg._report(obj);}
    }

    return Ganalytics;    
});
/*
1.初始化统计对象：
    var ga = new Ganalytics(ops);
    ops：accountId(必传，没有传0)，targetType(必传)，targetId(非必传),gpm(必传，同targetType)，
        productIdChain(详情页必传，商品id)，tag(详情页必传，商品状态)，position(非必传)，udata(非必传，扩展数据json)
2.上报用户数据接口：
    ga.report(ops)
    ops：cartProductIdChain(加购成功必传)，udata(非必传，扩展数据json)，action(行为描述，非必传)
*/