(function(root, factory){
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.eventListener = factory();
    }
}(this, function(){
    var toast = {
        show : function(str,timeout){
            if(!str){
                return;
            }
            var $tipEl = $('#J_tip');
            if($tipEl.length == 0){
                $tipEl = $('<div id="J_tip" class="c-tip none">');
                $(document.body).append($tipEl);
            }
            window.clearTimeout(toast.tipTimeout);
            $tipEl.html(str).css({'opacity' : 0}).removeClass('none');
            $tipEl.animate({opacity : 1},500,'ease-out');
            timeout = timeout || 2000;
            toast.tipTimeout = window.setTimeout(function(){
                toast.hide();
            },timeout);
        },
        hide : function(){
            var $tipEl = $('#J_tip');
            if($tipEl.length){
                $tipEl.animate({opacity : 0},500,'ease-out',function(){
                    $tipEl.addClass('none');
                });
            }
        }
    }
    function isArray(o) {
        return Object.prototype.toString.call(o) === '[object Array]';
    }
    function leftPad(n, len){
        len = len || 2;
        n = n + '';
        var diff = len - n.length;
        if (diff > 0) {
            n = new Array(diff + 1).join('0') + n;
        }
        return n;
    }
    function getSingleInstance(fn) {
        var result;
        return function(){
            return result || (result = fn.call(this,arguments));
        }
    };
    function queryString(val){
        var uri = window.location.search;
        var re = new RegExp("" + val + "=([^&?]*)", "ig");
        return ((uri.match(re)) ? (uri.match(re)[0]
            .substr(val.length + 1)) : null);
    }
    function throttle(fn, delay){
        var timer = null;
        return function(){
            var context = this, args = arguments;
            clearTimeout(timer);
            timer = setTimeout(function(){
                fn.apply(context, args);
            }, delay);
        };
    };
    function colorTrans(str){
        if (!str) {
            return '#fff'
        }
        if(str.split('')[0] == '#'){
            return str
        }
        return '#'+str
    }
    // 判断是否支持sticky属性
    function isSupportSticky() {
        var prefixTestList = ['', '-webkit-', '-ms-', '-moz-', '-o-'];
        var stickyText = '';
        for (var i = 0; i < prefixTestList.length; i++ ) {
            stickyText += 'position:' + prefixTestList[i] + 'sticky;';
        }
        // 创建一个dom来检查
        var div = document.createElement('div');
        var body = document.body;
        div.style.cssText = 'display:none;' + stickyText;
        body.appendChild(div);
        var isSupport = /sticky/i.test(window.getComputedStyle(div).position);
        body.removeChild(div);
        div = null;
        return isSupport;
    }
    function registerCss(cssText){
        var style = document.createElement("style");
        var head = document.getElementsByTagName("head")[0];
        if(!head){
            return;
        };
        if(document.all){
            style.setAttribute("type","text/css");
            style.styleSheet.cssText=cssText;
        }else{
            style.appendChild(document.createTextNode(cssText));
        };
        if(head.firstChild){
            head.insertBefore(style,head.firstChild);
        }else{
            head.appendChild(style);
        };
    };
    function createScript(src,callback){
        var head = document.getElementsByTagName('head')[0];
        var aScripts = head.getElementsByTagName('script');
        var srcName = src.split('/')[2]
        for(var i=0,length=aScripts.length;i<length;i++){   
            if(aScripts[i].src.indexOf(srcName)>-1){
                return 
            }
        }
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = src;
        script.onload = script.onreadystatechange = function() {
            if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete" ) {
                callback();
                script.onload = script.onreadystatechange = null;
            }
        };
        head.appendChild(script);
    }
    function Pubsub(){
        this.handlers = {};
    }
    Pubsub.prototype = {
        on: function(type,handler){
            var handlers = this.handlers
            if (!(type in handlers)) {
                handlers[type] = []
            }
            handlers[type].push(handler)
        },
        fire: function(type){
            var _this = this
            var handlers = this.handlers
            var args = Array.prototype.slice.call(arguments,1)
            if (isArray(handlers[type])) {
                for(var i=0,length=handlers[type].length;i<length;i++){
                    //handlers[type][i](arg)
                    handlers[type][i].apply(_this,args)
                }
            }
        }
    }
    var countDown = function(deadline,domParam,cb){
        var that = this,
            MILLS_OFFSET = 15,
            ps = new Pubsub(),
            count = 0,
            args = Array.prototype.slice.call(arguments,3)
            timer = null;
        function CountDown(){
            this.deadline = deadline;
            this.domParam = domParam;
        };
        CountDown.prototype = {
            caculate: function(){
                var year,month,day,hour,minute,second;
                var nowTimestamp = +new Date(),
                    //finallTimestamp = +new Date(this.deadline),
                    finallTimestamp = this.deadline,
                    gapTimestamp = parseInt((finallTimestamp-nowTimestamp)/1000,10)
                // if (this.deadline.split(' ').length == 1) {
                //     year = month = day = 0
                // }else{
                    
                // }
                if (gapTimestamp<0) {
                        // 处理结束时候的逻辑
                    if (count==0) {
                        cb&&cb.apply(cb,args)
                        count++
                    }
                    return false
                }
                day = parseInt(gapTimestamp / 60 / 60 / 24, 10);//计算剩余的天数
                hour = parseInt(gapTimestamp / 60 / 60 % 24, 10);//计算剩余的小时数
                minute = parseInt(gapTimestamp / 60 % 60, 10);//计算剩余的分钟数
                second = parseInt(gapTimestamp % 60, 10);//计算剩余的秒数
                return {
                    day: leftPad(day),
                    hour: leftPad(hour),
                    minute: leftPad(minute),
                    second: leftPad(second)
                }
            },
            /*刷新dom*/
            refresh: function(){
                var result = this.caculate()
                if(domParam.day){domParam.day.html(result.day)}
                domParam.hour.html(result.hour)
                domParam.minute.html(result.minute)
                domParam.second.html(result.second)
            }
        };
        var cd = new CountDown();
        /**
         * 启动定时器
         * @param first 是否首次进入
         */
        function startTimer(first){
            !first&&ps.fire('TIMER');
            //若是首次进入，则根据当前时间的毫秒数进行纠偏，延迟1000-当前毫秒数达到整数秒后开始更新UI
            //否则直接1秒后更新UI
            //若当前毫秒数大于MILLS_OFFSET 15，则修正延时数值与系统时间同步
            mills = new Date().getMilliseconds();
            timer = setTimeout(arguments.callee,first?(1000 -mills):(mills>MILLS_OFFSET?(1000-mills):1000));
        }
        /**
         * 订阅一次事件
         */
        ps.on('TIMER',cd.refresh.bind(cd));
        //首次初始化时启动定时器
        !timer && startTimer(true);
    };
    var Observer = function(data){
        this.data = data;
        this.walk(data)
    }
    Observer.prototype = {
        walk: function(obj){
            var _this = this,
                val;
            Object.keys(obj).forEach(function(key){
                val = obj[key]
                if (typeof(val) == 'object') {
                    new Observer(val)
                }
                _this.convert(key,val)
            })
        },
        convert: function(key,val){
            Object.defineProperty(this.data,key,{
                configurable: true,
                enumarable: true,
                get: function(){
                    console.log('你访问了'+key)
                    return val
                },
                set: function(newVal){
                    console.log('你设置了'+key)
                    console.log('新的'+key+'='+newVal)
                    if (typeof(newVal) == 'object') {
                        new Observer(newVal)
                    }
                    val = newVal
                }
            })
        }
    }

    // function lazyload($parent){
    //     var imgs = Array.prototype.slice.call($parent.find('.lazy-img'),0),
    //         parentLeft = Math.abs($parent.offset().left),
    //         windowW = $(window).width(),
    //         fn = function(event) {
    //             for (var i = imgs.length; i--;) {
    //                 if (Math.abs($(imgs[i]).offset().left) < Math.abs($parent.offset().left)+windowW) {
    //                     if ($(imgs[i]).attr("src").indexOf('default')>-1) {
    //                         var src = $(imgs[i]).attr("data-img");
    //                         $(imgs[i]).attr("src", src);
    //                         (function(i){
    //                             $(imgs[i]).error(function(){
    //                                 $(imgs[i]).attr("src", 'img/default-hqbs.jpg');
    //                             })
    //                         })(i)
    //                         // imgs.splice(i, 1);
    //                     }
    //                 }
    //             }
    //         }
    //     return fn
    // }
    function lazyload($parent,vertical,gap){
        var imgs = Array.prototype.slice.call($parent.find('.lazy-img'),0),
            parentLeft = Math.abs($parent.offset().left),
            windowW = $(window).width(),
            windowH = parseInt($(window).height()),
            gap = gap || 0,
            //vertical = vertical || true,
            fn = null;
            if (vertical) {
                fn = function(event) {
                    var parentTop = parseInt(document.body.scrollTop | document.documentElement.scrollTop)
                    for (var i = imgs.length; i--;) {
                        if (Math.abs($(imgs[i]).offset().top)-gap < parentTop+windowH) {
                            var src = $(imgs[i]).attr("data-img");
                            if ($(imgs[i]).attr("src") && $(imgs[i]).attr("src").indexOf('default')>-1) {
                                $(imgs[i]).attr("src", src);
                            }else{
                                $(imgs[i]).css("background-image","url("+src+")")
                            }
                            imgs.splice(i, 1);
                        }
                    }
                }
            }else{
                fn = function(event) {
                    for (var i = imgs.length; i--;) {
                        if (Math.abs($(imgs[i]).offset().left) < windowW) {
                            var src = $(imgs[i]).attr("data-img");
                            if ($(imgs[i]).attr("src") && $(imgs[i]).attr("src").indexOf('default')>-1) {
                                $(imgs[i]).attr("src", src);
                            }else{
                                $(imgs[i]).css("background-image","url("+src+")")
                            }
                            imgs.splice(i, 1);
                        }
                    }
                }
            }
        return fn
    }
    //利用桥接处理页面与安卓下有手势滑动的冲突
    function bridgeSilde(touchType){
        window.WebViewJavascriptBridge.callHandler('requestTouchEventController', {"touchType":touchType},function(){
        })
    }
    var sildeAndroid = function(name){
        // this.listenerTouch(name);
        var ua = navigator.userAgent;
        if (window.WebViewJavascriptBridge) {
            this.listenerTouch(name);
        } else {
            if (ua.indexOf('ios')>-1 && ua.indexOf('3.4')>-1) {

            }
            document.addEventListener('WebViewJavascriptBridgeReady', function() {
                // scrollFun();
                this.listenerTouch(name);
            },false);
        }

    }
    sildeAndroid.prototype = {
        listenerTouch:function(name){
            var _sildeX,_sildeY,_sildeTop = 0,_sildeH = 0,
                _name = $(name),
                _sildeType = true,
                _sildeEndType= true;

            document.addEventListener("touchstart",function(e) {
                _sildeTop = _name.offset().top;
                _sildeH = _sildeTop + _name.height();
                _sildeX = e.touches[0].pageX;
                _sildeY = e.touches[0].pageY;

                if(_sildeY > _sildeTop && _sildeY < _sildeH){
                    if(_sildeType){
                        bridgeSilde(1);
                        _sildeEndType = true;
                    }
                    // _sildeType = false;
                    return false;
                }else{
                    if(_sildeEndType){
                        bridgeSilde(0);
                        _sildeType = true;
                    }
                    _sildeEndType = false;
                }

            }, false);
        }
    }

    function linkInfoFun(){
        var _ref = window.location.href,
            _refNum = _ref.indexOf('?'),
            _refTid = '';
    
        if(_refNum > -1){
            _refNum += 1;
            _refTid = _ref.substring(_refNum,_ref.length);
        }
    
        return _refTid;
    }

    return {
        toast: toast,
        Observer: Observer,
        queryString: queryString,
        createScript: createScript,
        throttle: throttle,
        isSupportSticky: isSupportSticky,
        registerCss: registerCss,
        colorTrans: colorTrans,
        getSingleInstance: getSingleInstance,
        countDown: countDown,
        leftPad: leftPad,
        lazyload: lazyload,
        sildeAndroid:sildeAndroid,
        linkInfoFun:linkInfoFun
    }
}));