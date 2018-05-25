!(function(window){
    var queryString = window.eventListener.queryString,
        createScript = window.eventListener.createScript,
        isSupportSticky = window.eventListener.isSupportSticky,
        registerCss = window.eventListener.registerCss,
        toast = window.eventListener.toast,
        colorTrans = window.eventListener.colorTrans,
        throttle = window.eventListener.throttle,
        getSingleInstance = window.eventListener.getSingleInstance,
        countDown = window.eventListener.countDown,
        leftPad = window.eventListener.leftPad,
        lazyload = window.eventListener.lazyload,
        sildeAndroid = window.eventListener.sildeAndroid,
        linkInfoFun = window.eventListener.linkInfoFun,
        globalVar = [
            {
                defaultImg: 'img/default-ggj.jpg',
                color: '#fb4b4d'
            },
            {
                defaultImg: 'img/default-hqbs.jpg',
                color: '#000'
            },
            {
                defaultImg: 'img/default-mbyd.jpg',
                color: '#f2ba13'
            }
        ],
        _accountId = 0,
        _basePath = '',
        _cmsBasePath = '',
        APPOS = queryString('APPOS') || 0,
        memberObj = {};
    var cmsGa = new Ganalytics({targetType:'222',gpm:'222',targetId:queryString('cId')});
    var layerComponent = {
        loginInit: function(){
            var html = [
                '<div class="c-login">',
                    '<div class="login-wrap">',
                        '<p class="phone"><input type="tel" placeholder="请输入11位手机号" /></p>',
                        '<p class="verify"><input type="tel" placeholder="请输入短信验证码" /><span class="verify-btn">发送验证码</span></p>',
                        '<div class="login-btn">验证并登陆</div>',
                    '</div>',
                    '<img src="img/icon-close.png" />',
                '</div>',
            ].join('');
            $('#layer').append(html);
            $('.verify>input').on('input',function(){
                if ($(this).val()!==''&&$('.phone>input').val()!=='') {
                    $('.login-btn').addClass('available')
                }else{
                    $('.login-btn').removeClass('available')
                }
            });

            $('.c-login>img').on('singleTap',function(){
                $('#layer').css('display','none')
            });
            $('.verify-btn').on('singleTap',function(){
                if ($('.phone>input').val().length==11) {
                    $.ajax({
                        url: '/ygg/user/sendsms',
                        data: {
                            accountid: $('.phone>input').val(),
                            type: 3,
                            source: 'cmsCoupon' 
                        },
                        dataType: 'json',
                        type: 'GET',
                        success: function(res){
                            if (res.status == 1) {
                                toast.show('发送成功');
                                var showTime = function(count){
                                    $('.verify-btn').html(count+'s');
                                    if (count == 0) {
                                        $('.verify-btn').html('再次发送')
                                    }else{
                                        count--;
                                        setTimeout(function () {
                                            showTime(count);
                                        }, 1000);
                                    }   
                                };
                                showTime(60)
                            }else if(res.status == 0){
                                switch(res.errorCode){
                                    case '1':
                                        toast.show('手机号不合法');
                                        break;
                                    case '2':
                                        toast.show('重复手机号');
                                        break;
                                    case '3':
                                        toast.show('手机号不存在');
                                        break;
                                    case '4':
                                        toast.show('请求过于频繁，请稍后再试');
                                        break;
                                    case '5':
                                        toast.show('图形验证码错误');
                                        break;
                                    case '6':
                                        toast.show('发送短信次数超过限制');
                                        break;
                                }
                            }
                        }
                    })
                }else{
                    toast.show('请先填写正确手机号')
                }
            });
            $('.login-btn').on('singleTap',function(){
                if ($(this).hasClass('available')) {
                    $.ajax({
                        url: '/ygg/user/loginAjax',
                        data: {
                            name: $('.phone>input').val(),
                            verificationCode: $('.verify>input').val(),
                            source: 'cmsCoupon'
                        },
                        dataType: 'json',
                        type: 'GET',
                        success: function(res){
                            if (res.errorCode == null) {
                                $('#layer').css('display','none');
                                toast.show('登录成功');
                                location.reload()
                            }else{
                                toast.show(res.errorCode)
                            }
                        }
                    })
                }else{
                    toast.show('请填写完整')
                }
            });
            return $('#layer')
        },
        choujiangInit: function(status,num){
            // if(isLoading){
            //     var html = [
            //         '<div class="c-choujiang">',
            //             '<div class="choujiang-wrap result">',
            //                 '<p>正在为您拼命抢红包<br />请耐心等待</p>',
            //             '</div>',
            //             '<img src="img/choujiang-close.png" class="choujiang-close" />',
            //         '</div>',
            //     ].join('');
            //     $('#layer').append(html);
            //     return $('#layer')
            // }
            if(status){
                var result = ''
                if(status == 3){
                    result+='<p>来晚了一步哦<br/>红包已经被抢光了</p>'
                }else if(status == 4){
                    result+='<dl><dt>'+num+'</dt><dd>已存入环球G币，可前往个人中心查看<br/>环球G币最高抵扣每笔交易实付金额的50%</dd></dl>'
                }else if(status == 5){
                    result+='<p>很遗憾哦<br/>与红包擦肩而过</p>'
                }
                var html = [
                    '<div class="c-choujiang">',
                        '<div class="choujiang-wrap result">'+ result +'</div>',
                        '<img src="img/choujiang-close.png" class="choujiang-close" />',
                    '</div>',
                ].join('');
            }else{
                var html = [
                    '<div class="c-choujiang">',
                        '<div class="choujiang-wrap">',
                            '<div class="choujiang-btn"></div>',
                        '</div>',
                        // '<div class="choujiang-wrap loading">',
                        //     '<p>正在为您拼命抢红包<br />请耐心等待</p>',
                        //     '<img src="../img/choujiang-loading.png" />',
                        // '</div>',
                        '<img src="img/choujiang-close.png" class="choujiang-close" />',
                    '</div>',
                ].join('');
            }           
            $('#layer').append(html);
            $('.choujiang-close').on('tap',function(){
                setTimeout(function(){
                    $('#layer').css('display','none')
                    $('.c-choujiang').remove()
                },350)
            })
            return $('#layer')
        }
    };
    var getUrl = function(url){
        var url = decodeURI(url)
        var _host = url.indexOf('cId')>-1?_cmsBasePath:_basePath;
        var _url = url?(_host+url):'javascript:void(0)';
        if(_url.indexOf('/h5/activity/quizzes/')>0){
            var left = _url.split('ygg-hqbs/')[0]
            var right = _url.split('ygg-hqbs/')[1]
            _url = left+right
        }
        return _url
    }
    var getLogin = getSingleInstance(layerComponent.loginInit);
    //var getChoujiang = getSingleInstance(layerComponent.choujiangInit);

    // var GegeWxTpl = function(data){
    //     this.data = data   //data结构见下
    // }  
    // GegeWxTpl.prototype = {
    //     initHtml: function(){
    //         if (this.data) {
    //             return '<div class="gegewx-tpl" id="cms-'+ this.data.cmsId +'"><img src="'+this.data.oneImage+'" /><div>'+ this.data.content +'</div><img src="'+this.data.threeImage+'" /></div>'
    //         }
    //     },
    //     create: function(){
    //         rootDom.append(this.initHtml())
    //         this.initStyle()
    //     },
    //     initStyle: function(){
    //         $('.gegewx-tpl>div').css({
    //             'backgroundImage': 'url('+this.data.twoImage+')',
    //             'color': colorTrans(this.data.color.oneColor)
    //         })
    //     }
    // }    

    

    var getProduct = {
        //适用情景模板和品牌特卖
        type1: function(item){
            var statusArr = ['有货','还有机会','即将开始','已抢完'];
            var _productTag = '';
            if(item.status > 1){
                if(item.status == 2){
                    _productTag = '<span class="pr-tag" style="background-color:rgba(251,77,77,.7)">'+statusArr[item.status-1]+'</span>'
                }else{
                    _productTag = '<span class="pr-tag">'+statusArr[item.status-1]+'</span>'
                }
            }
            var html = [
                '<a class="product-type-1 swiper-slide" href='+getUrl(item.url)+' >' +
                    '<div class="pr-img" style="background-image:url('+ item.image +')">'+_productTag+'<div class="pr-shadow"></div></div>' +
                    '<h1><p>'+ item.name +'</p></h1>' +
                    '<div class="pr-price">' +
                        '<span>&yen'+ item.lowPrice +'</span>' +
                    '</div>' +
                '</a>'
            ].join('')
            return html
        }
    }

    var PicDisplayTpl = function(data){
        this.data = data;
        this.isCoupon = false
    };
    PicDisplayTpl.prototype = {
        initHtml: function(){
            var html='';
            $.map(this.data.cmsList,function(item,index){
                var divHtml='';
                $.map(item.groupProductDetailList,function(data,i){
                    // var _host = data.url.indexOf('cId')>-1?_cmsBasePath:_basePath;
                    // var _url = data.url?(_host+data.url):'javascript:void(0)';
                    //divHtml+='<div style="width:'+ 100/item.layoutType +'%" data-src="'+ data.url +'" ><img src="'+ data.image +'" /></div>'
                    if (data.type == 7) {
                        //divHtml+='<div style="width:100%" class="video-wrap" data-id="'+data.cmsCouponId+'"><iframe src="'+ data.image +'" frameBorder="0"><source src="'+ data.image +'"></iframe></div>'
                        divHtml+='<div style="width:100%" class="video-wrap" data-id="'+data.cmsCouponId+'"><video height="100%" width="100%" src="'+ data.image +'" webkit-playsinline x-webkit-airplay controls></video></div>'
                    }else if(data.type == 8){
                        divHtml+='<div style="width:'+ 100*data.width/750 +'%" data-coin-id="'+ data.url +'" class="choujiang"><img src="'+ data.image +'" data-img="'+ globalVar[APPOS].defaultImg +'" /></div>'
                    }else if(data.cmsCouponId == null){
                        divHtml+='<a style="width:'+ 100*data.width/750 +'%" href='+ getUrl(data.url) +'><img src="'+ data.image +'" data-img="'+ globalVar[APPOS].defaultImg +'" /></a>'
                    }else{
                        divHtml+='<div style="width:'+ 100*data.width/750 +'%" data-src='+ getUrl(data.url) +' data-id="'+data.cmsCouponId+'" data-status="'+data.status+'" data-msg="'+data.msg+'" data-type="'+data.type+'" class="coupon-wrap" ><img src="'+ data.image +'" data-img="'+ globalVar[APPOS].defaultImg +'" /></div>'
                    }
                });
                html+='<div class="line">'+divHtml+'</div>'
            });
            html='<div class="pic-display-tpl" id="cms-'+ this.data.cmsId +'">'+html+'</div>';
            return html
        },
        create: function(){
            rootDom.append(this.initHtml());
            this.initEvent()
        },
        getResult: function(data,coinId){
            var status = data&&data.status
            var _this = this
            // if(isLoading){
            //     var layer = layerComponent.choujiangInit(null,null,true);
            //     layer.css('display','block');
            // }
            if(status == 1){
                loginFun();
                return false;
            }else if(status == 2){
                toast.show('活动未开始');
            }else if(status == 3 || status == 4 || status == 5){
                var layer = layerComponent.choujiangInit(data.status,data.amount);
                layer.css('display','block');
            }else if(status == 6){
                var layer = layerComponent.choujiangInit();
                layer.css('display','block');
                $(document).on('tap','.choujiang-btn',function(){
                    // $('#layer').css('display','none')
                    // $('.c-choujiang').remove()
                    // _this.getResult(null,coinId,true)
                    var html = '<p>正在为您拼命抢红包<br />请耐心等待</p><img src="./img/choujiang-loading.png" />'
                    $('.choujiang-wrap').empty().addClass('loading').append(html)
                    $.ajax({
                        url: '/ygg-hqbs/cms/getCmsQqbsCoin?qqbsCoinId='+coinId,
                        type: 'get',
                        success:function(data){
                            $('#layer').css('display','none')
                            $('.c-choujiang').remove()
                            _this.getResult(data,coinId)
                        }
                    })
                })
            }else{
                toast.show('活动太火爆，请稍后再试');
            }
        },
        initEvent: function(){
            // $('.pic-display-tpl>.line>div').on('tap',function(){
            //     var _src = $(this).attr('data-src')
            //     if (_src || _src!==null) {
            //         if(_src=='isApp'){
            //             toast.show('仅限APP用户参与')
            //         }else{
            //             location.href = _src
            //         }
            //     }
            // })
            var _this = this
            if($('#cms-'+this.data.cmsId+' .choujiang').length>0){
                $('.choujiang').on('tap',function(){
                    var coinId = $(this).attr('data-coin-id')
                    $.ajax({
                        url: '/ygg-hqbs/cms/cmsQqbsCoinInfo?qqbsCoinId='+coinId,
                        type: 'get',
                        success:function(data){
                            //status
                            //1未登录 2活动未开始 3已抢完 4领取成功 5领取失败 6未领取
                            _this.getResult(data,coinId)
                        }
                    })
                })
            }           
        }
    };
    var BannerWithBroadcastTpl = function(data){
        this.data = data
    };
    BannerWithBroadcastTpl.prototype = {
        creatBroadcastHtml: function(){
            var html = '';
            $.map(this.data.cmsList,function(item,index){
                html+='<dl data-src='+ item.url +'><dt>'+item.oneContent+'</dt><dd>'+item.twoContent+'</dd></dl>'
            });
            html+=html;
            return html
        },
        initHtml: function(){
            var html = [
                '<div class="banner-with-broadcast-tpl" id="cms-'+ this.data.cmsId +'">',
                    '<div class="broadcast-wrap">',
                        '<div class="broadcast">'+ this.creatBroadcastHtml() +'</div>',
                    '</div>',
                '</div>'
            ].join('');

            if (this.data) {
                return html
            }
        },
        create: function(time){
            rootDom.append(this.initHtml());
            this.initStyle().initEvent(time)
        },
        initStyle: function(){
            $('.banner-with-broadcast-tpl').css({
                'height': this.data.oneImageHeight/75+'rem',
                'background-image': 'url('+ this.data.oneImage +')'
            });
            $('.broadcast>dl').css({
                // 'backgroundColor': colorTrans(this.data.color.twoColor),
                'backgroundColor': 'rgba('+this.data.color.twoColor+','+ this.data.color.oneAlpha +')',
                'color': colorTrans(this.data.color.threeColor),
                'borderColor': colorTrans(this.data.color.oneColor)
                //'opacity': this.data.oneAlpha || 1
            });
            return this
        },
        initEvent: function(time){
            var length = $('.broadcast>dl').length,
                v = 100/length, //定义每次滚动的距离
                overPot = 50,
                Y = 0;
            var fn = function(){
                Y -= v;
                if (Math.abs(Y)>overPot+v) {
                    Y = 0;
                    //clearInterval(timer)
                }
                if (Y == 0) {
                    $('.broadcast').css({
                        'transform': 'translate3d(0,'+ Y +'%,0)',
                        'transition': 'all 0s linear',
                        '-webkit-transform': 'translate3d(0,'+ Y +'%,0)',
                        '-webkit-transition': 'all 0s linear'
                    });
                    //var timer = setInterval(fn,time || 2000)
                }else{
                    $('.broadcast').css({
                        'transform': 'translate3d(0,'+ Y +'%,0)',
                        'transition': 'all 0.4s linear',
                        '-webkit-transform': 'translate3d(0,'+ Y +'%,0)',
                        '-webkit-transition': 'all 0.4s linear'
                    })
                }
            };
            var timer = setInterval(fn,time || 2000);
            $('.broadcast>dl').on('tap',function(index){
                var url = $(this).attr('data-src');
                if (url) {
                    var _host = url.indexOf('cId')>-1?_cmsBasePath:_basePath;
                    location.href = _host+url
                }
            })
        }
    };

    var ProductList3Tpl = function(data){
        this.data = data
    };
    ProductList3Tpl.prototype = {
        creatProductHtml: function(){
            var html = '',
                statusList = ['','','还有机会','即将开始','已抢完'],
                productDetail = this.data.productDetail;
            // if (productDetail.isShowTag == 1) {
            //     $.map(this.data.cmsList,function(item,index){
            //         html+= [
            //             '<div class="product" data-src='+ item.url +'>',
            //                 '<div class="pr-img lazy-img" style="background-image:url('+ globalVar[APPOS].defaultImg +')" data-img="'+ item.image +'">',
            //                     productDetail.isShowImage==1?'<img src="'+ productDetail.tagImage +'" />':'',
            //                     item.status>1?(item.status==2?'<div class="pr-status" style="background-color:rgba(251,77,77,70)">'+statusList[item.status]+'</div>':'<div class="pr-status">'+statusList[item.status]+'</div>'):'',
            //                 '</div>',
            //                 '<div class="pr-detail">',
            //                     '<div class="pr-title"><h2>'+ item.name +'</h2></div>',
            //                     '<div class="pr-price-style-1 pr-price-style">',
            //                         '<span>',
            //                             '<small>￥'+ item.highPrice +'</small>',
            //                             '<label>'+ productDetail.tagText +'</label>',
            //                         '</span>',
            //                         '<strong>￥'+ item.lowPrice +'</strong>',
            //                     '</div>',
            //                 '</div>',
            //             '</div>'
            //         ].join('')
            //     })
            // }else{
            //     $.map(this.data.cmsList,function(item,index){
            //         html+= [
            //             '<div class="product" data-src='+ item.url +'>',
            //                 '<div class="pr-img lazy-img" style="background-image:url('+ globalVar[APPOS].defaultImg +')" data-img="'+ item.image +'">',
            //                     productDetail.isShowImage==1?'<img src="'+ productDetail.tagImage +'" />':'',
            //                     item.status>1?(item.status==2?'<div class="pr-status" style="background-color:rgba(251,77,77,70)">'+statusList[item.status]+'</div>':'<div class="pr-status">'+statusList[item.status]+'</div>'):'',
            //                 '</div>',
            //                 '<div class="pr-detail">',
            //                     '<div class="pr-title"><h2>'+ item.name +'</h2></div>',
            //                     '<div class="pr-price-style-2 pr-price-style">',
            //                         '<span>',
            //                             '<small>￥</small>',
            //                             '<strong>'+ item.lowPrice +'</strong>',
            //                         '</span>',
            //                         '<small>￥'+ item.highPrice +'</small>',
            //                     '</div>',
            //                 '</div>',
            //             '</div>'
            //         ].join('')
            //     })
            // }  
            $.map(this.data.cmsList,function(item,index){
                html+= [
                    '<div class="product-3" data-src='+ item.url +'>',
                        '<div class="pr-img lazy-img" style="background-image:url('+ globalVar[APPOS].defaultImg +')" data-img="'+ item.image +'">',
                        productDetail.isShowImage==1?'<img src="'+ productDetail.tagImage +'" />':'',
                        item.status>1?(item.status==2?'<div class="pr-status" style="background-color:#FF6666;">'+statusList[item.status]+'</div>':'<div class="pr-status">'+statusList[item.status]+'</div>'):'',
                        '</div>',
                        '<div class="pr-info">',
                            '<div class="pr-title"><h2>'+ item.name +'</h2></div>',
                            memberObj.isMember == 1?'<div class="pr-price member"><strong>&yen'+item.agentPrice+'</strong><img src="./img/member-price-tag.png" /></div>':'<div class="pr-price"><strong>&yen'+item.lowPrice+'</strong><span>&yen'+item.highPrice+'</span></div>',
                        '</div>',
                    '</div>'
                ].join('')
            });
            return html
        },
        initHtml: function(){
            var html = [
                '<div class="product-list-3-tpl" id="cms-'+ this.data.cmsId +'">',
                    this.data.oneImage?'<img src="'+ this.data.oneImage +'" data-src='+ this.data.productDetail.oneUrl +'>':'',
                    '<div class="list-wrap-3">'+ this.creatProductHtml() +'</div>',
                    this.data.twoImage?'<img src="'+ this.data.twoImage +'" data-src='+ this.data.productDetail.twoUrl +'>':'',
                '</div>'
            ].join('');

            if (this.data) {
                return html
            }
        },
        create: function(){
            rootDom.append(this.initHtml());
            this.initStyle().initEvent()
        },
        initStyle: function(){
            var productDetail = this.data.productDetail;
            // $('#cms-'+ this.data.cmsId +' label').css({
            //     'backgroundColor': colorTrans(productDetail.tagBackColor),
            //     'color': colorTrans(productDetail.tagTextColor)
            // }) 
            // $('#cms-'+ this.data.cmsId +' .pr-detail>h2').css({
            //     'color': colorTrans(productDetail.productNameColor)
            // })
            // $('#cms-'+ this.data.cmsId +' .pr-detail').css({
            //     'backgroundColor': colorTrans(productDetail.productBackColor)
            // })
            $('#cms-'+ this.data.cmsId +' .list-wrap-3').css({
                'backgroundColor': colorTrans(productDetail.backColor)
            });
            // $('#cms-'+ this.data.cmsId +' .pr-price-style-2>span').css({
            //     'color': colorTrans(productDetail.productTextColor)
            // })
            // $('#cms-'+ this.data.cmsId +' .pr-price-style-1>strong').css({
            //     'color': colorTrans(productDetail.productTextColor)
            // })
            // $('#cms-'+ this.data.cmsId +' .pr-price-style-2>small').css({
            //     'color': colorTrans(productDetail.priceTextColor)
            // })
            // $('#cms-'+ this.data.cmsId +' .pr-price-style-1>span>small').css({
            //     'color': colorTrans(productDetail.priceTextColor)
            // })
            return this
        },
        initEvent: function(time){
            $('.list-wrap-3>.product-3,.product-list-3-tpl>img').on('tap',function(index){
                var url = $(this).attr('data-src');
                if (url) {
                    var _host = url.indexOf('cId')>-1?_cmsBasePath:_basePath;
                    location.href = _host+url
                }
            })
        }
    };

    var NavBarScrollTpl = function(data){
        this.data = data
    };
    NavBarScrollTpl.prototype = {
        initHtml: function(){
            var liListHtml='';
            $.map(this.data.cmsList,function(item,index){
                if (index == 0) {
                    liListHtml+='<li class="selected" data-id="'+ item.cmsId +'"><span>'+ item.navigationName +'</span></li>'
                }else{
                    liListHtml+='<li data-id="'+ item.cmsId +'"><span>'+ item.navigationName +'</span></li>'
                }
                //liListHtml+='<li class="selected" data-id="'+ item.cmsId +'"><span>'+ item.navigationName +'</span></li>'
            });
            var html = [
                '<div class="nav-bar-scroll-tpl" id="cms-'+ this.data.cmsId +'">',
                    '<ul>'+ liListHtml +'</ul>',
                '</div>'
            ].join('');

            if (this.data) {
                return html
            }
        },
        create: function(){
            rootDom.append(this.initHtml());
            //this.initStyle()
            this.initStyle().initEvent()
        },
        initStyle: function(){
            $('.nav-bar-scroll-tpl').css({
                'background-color': colorTrans(this.data.color.oneColor),
                'color': colorTrans(this.data.color.twoColor) 
            });
            // $('.nav-bar-scroll-tpl span').css({
            //     'color': colorTrans(this.data.color.twoColor) 
            // })
            // $('.nav-bar-scroll-tpl .selected').css({
            //     'color': colorTrans(this.data.color.threeColor) 
            // })
            registerCss('.selected {color:'+ colorTrans(this.data.color.threeColor) +'!important}');
            if (!isSupportSticky()) {
                $('.nav-bar-scroll-tpl').addClass('position-relative')
            }
            return this
        },
        initEvent: function(time){
            var $aLi = $('.nav-bar-scroll-tpl li'),
                length=$aLi.length,
                cmsIdArr = [],     //[12,23]
                allCmsIdArr = [],   //[{ id:12,scrollTop:12 }]
                navigationList = this.data.cmsList;

            createScript('js/iscroll-lite.js',function(){
                var navScroll = new IScroll('.nav-bar-scroll-tpl', {
                    bounce: false,
                    scrollX: true,  
                    scrollY: false,
                    tap: true,
                    click:true
                });
                $('.nav-bar-scroll-tpl li').on('click',function(){
                    $aLi.removeClass('selected');
                    $(this).addClass('selected');
                    if ($(this).index()==0) {
                        navScroll.scrollToElement($(this)[0])
                    }else{
                        navScroll.scrollToElement($(this).prev()[0])
                    }
                    var cmsId = $(this).attr('data-id');
                    var targetDom = document.getElementById('cms-'+cmsId);
                    if (targetDom) {
                        //targetDom.scrollIntoView({block: "start", behavior: "instant"})
                        targetY = targetDom.offsetTop-$('.nav-bar-scroll-tpl').height();
                        window.scrollTo(0,targetY)
                    }          
                });
                var $nav = $('.nav-bar-scroll-tpl');
                var closetCmsId = 0;
                var count = navOffsetY = 0;
                function onScroll(e) {  
                    setTimeout(function(){
                        var aDiv = rootDom.children();
                        for(var i=0,length=aDiv.length;i<length;i++){
                            var id = aDiv[i].getAttribute('id').split('-')[1];
                            var offsetTop = $(aDiv[i]).offset().top;
                            //var offsetTop = aDiv[i].getBoundingClientRect().top
                            allCmsIdArr.push({'id':id,'offsetTop':offsetTop})
                        }
                        for(var j=0,len=navigationList.length;j<len;j++){
                            var _id = navigationList[j].cmsId;
                            for(var k=0,length=allCmsIdArr.length;k<length;k++){
                                if(_id == allCmsIdArr[k].id){
                                    cmsIdArr.push({'id':allCmsIdArr[k].id,'offsetTop':allCmsIdArr[k].offsetTop})
                                }
                            }
                        }
                    },0);
                    if (count==0) {
                        navOffsetY = $nav.offset().top;
                        ++count
                    }
                    
                    //$nav.addClass('visibility-visible')
                    //var navOffsetY = $nav[0].offsetTop
                    //console.log(navOffsetY,$nav.offset().top,$nav[0].getBoundingClientRect().top)
                    //var navOffsetY = $nav[0].getBoundingClientRect().top
                    if (!isSupportSticky()) {
                        window.scrollY > navOffsetY ? $nav.addClass('position-fixed') : $nav.removeClass('position-fixed');
                        // function onScroll(e) {
                        //     window.scrollY >= navOffsetY ? $nav.addClass('position-fixed') : $nav.removeClass('position-fixed')
                        // }
                        // window.addEventListener('scroll', onScroll);
                    }

                    for(var m=0,l=cmsIdArr.length;m<l;m++){
                        if(window.scrollY-cmsIdArr[m].offsetTop+$('.nav-bar-scroll-tpl').height()+3>=0){
                            closetCmsId = cmsIdArr[m].id
                        }
                    } 
                    var _this = $('[data-id="'+ closetCmsId +'"]'),
                        _index = _this.index();
                    if (_this.length>0) {
                        $aLi.removeClass('selected');
                        _this.addClass('selected');
                        if (_index==0) {
                            navScroll.scrollToElement(_this[0])
                        }else{
                            navScroll.scrollToElement(_this.prev()[0])
                        }  
                    }
                                  
                }
                window.addEventListener('scroll', throttle(onScroll,100));
                new sildeAndroid('.nav-bar-scroll-tpl');
            })
        }
    };

    var BottomNavTpl = function(data){
        this.data = data
    };
    BottomNavTpl.prototype = {
        createNavHtml: function(){
            var html='';
            $.map(this.data.cmsList,function(item,index){
                var divHtml='';
                $.map(item.groupProductDetailList,function(data,i){
                    divHtml+='<div style="width:'+ 100/item.layoutType +'%" class="one-item" data-src='+ data.url +'><img src="'+ data.image +'" /></div>'

                });
                html+='<div class="line">'+divHtml+'</div>'
            });
            return html
        },
        initHtml: function(){
            var html = [
                '<div class="bottom-nav-tpl" id="cms-'+ this.data.cmsId +'">',
                    '<div class="bottom-nav-bg">',
                        '<div class="fixed-btn"><img src="'+ this.data.twoImage +'" /></div>',
                        '<div class="fixed-bottom-ct">',
                            '<img src="'+ this.data.oneImage +'" />',
                            '<div class="ct-wrap">'+ this.createNavHtml() +'</div>',
                            '<div class="down-btn"></div>',
                        '</div>',
                    '</div>',
                '</div>'
            ].join('');

            if (this.data) {
                return html
            }
        },
        create: function(){
            rootDom.append(this.initHtml());
            this.initEvent()
        },
        initEvent: function(time){
            $('.bottom-nav-tpl .fixed-btn').on('tap',function(ev){
                ev.stopPropagation();
                $('.bottom-nav-bg').css({
                    'height': $('.fixed-bottom-ct').height()+'px'
                });
                $('.bottom-nav-tpl').addClass('height-100');
                $(this).addClass('display-none')
            });

            $('.bottom-nav-tpl').on('tap',function(ev){
                ev.stopPropagation();
                if (ev.target.className == 'down-btn' || ev.target.className.indexOf('bottom-nav-tpl')>-1) {
                    $('.bottom-nav-bg').css({
                        'height': 0
                    });
                    $(this).removeClass('height-100');
                    $('.bottom-nav-tpl .fixed-btn').removeClass('display-none')
                }                
            });

            $('.bottom-nav-tpl .one-item').on('tap',function(index){
                var url = $(this).attr('data-src');
                if (url) {
                    var _host = url.indexOf('cId')>-1?_cmsBasePath:_basePath;
                    location.href = _host+url
                }
            })
        }
    };

    var ProductList2Tpl = function(data){
        this.data = data
    };
    ProductList2Tpl.prototype = {
        creatProductHtml: function(){
            var html = '',
                statusList = ['','','还有机会','即将开始','已抢完'],
                productDetail = this.data.productDetail;
            $.map(this.data.cmsList,function(item,index){
                html+= [
                    '<div class="product-2" data-src='+ item.url +'>',
                        '<div class="pr-img lazy-img" style="background-image:url('+ globalVar[APPOS].defaultImg +')" data-img="'+ item.image +'">',
                        productDetail.isShowImage==1?'<img src="'+ productDetail.tagImage +'" />':'',
                        item.status>1?(item.status==2?'<div class="pr-status" style="background-color:#FF6666;">'+statusList[item.status]+'</div>':'<div class="pr-status">'+statusList[item.status]+'</div>'):'',
                        '</div>',
                        '<div class="pr-info">',
                            '<div class="pr-title"><h2>'+ item.name +'</h2></div>',
                            memberObj.isMember == 1?'<div class="pr-price member"><span>&yen'+item.lowPrice+'</span><strong>&yen'+item.agentPrice+'</strong><img src="./img/member-price-tag.png" /></div>':'<div class="pr-price"><strong>&yen'+item.lowPrice+'</strong><span>&yen'+item.highPrice+'</span></div>',
                        '</div>',
                    '</div>'
                ].join('')
            });
            // if (this.data.cmsList.length == 3) {
            //     html+='<div class="justify_fix">&nbsp;</div>'
            // }
            return html
        },
        initHtml: function(){
            var html = [
                '<div class="product-list-2-tpl" id="cms-'+ this.data.cmsId +'">',
                this.data.oneImage?'<img src="'+ this.data.oneImage +'" data-src='+ this.data.productDetail.oneUrl +' >':'',
                '<div class="list-wrap-2">'+ this.creatProductHtml() +'</div>',
                this.data.twoImage?'<img src="'+ this.data.twoImage +'" data-src='+ this.data.productDetail.twoUrl +' >':'',
                '</div>'
            ].join('');

            if (this.data) {
                return html
            }
        },
        create: function(){
            rootDom.append(this.initHtml());
            this.initStyle().initEvent()
        },
        initStyle: function(){
            var productDetail = this.data.productDetail;
            // $('#cms-'+ this.data.cmsId +' label').css({
            //     'backgroundColor': colorTrans(productDetail.tagBackColor),
            //     'color': colorTrans(productDetail.tagTextColor)
            // })
            // $('#cms-'+ this.data.cmsId +' .pr-detail>h2').css({
            //     'color': colorTrans(productDetail.productNameColor)
            // })
            // $('#cms-'+ this.data.cmsId +' .pr-detail').css({
            //     'backgroundColor': colorTrans(productDetail.productBackColor)
            // })
            $('#cms-'+ this.data.cmsId +' .list-wrap-2').css({
                'backgroundColor': colorTrans(productDetail.backColor)
            });
            // $('#cms-'+ this.data.cmsId +' .pr-detail span').css({
            //     'color': colorTrans(productDetail.productTextColor)
            // })
            // $('#cms-'+ this.data.cmsId +' .pr-detail>small').css({
            //     'color': colorTrans(productDetail.priceTextColor)
            // })
            return this
        },
        initEvent: function(time){
            $('.list-wrap-2>.product-2,.product-list-2-tpl>img').on('tap',function(index){
                var url = $(this).attr('data-src');
                if (url) {
                    var _host = url.indexOf('cId')>-1?_cmsBasePath:_basePath;
                    location.href = _host+url
                }
            })
        }
    };

    //轮播图
    var SwiperTpl = function(data){
        this.data = data
    };
    SwiperTpl.prototype = {
        createNavHtml: function () {
            var html = '';
            $.map(this.data.cmsList,function(item,index){
                // var _host = item.url.indexOf('cId')>-1?_cmsBasePath:_basePath;
                // var _url = item.url?(_host+item.url):'javascript:void(0)';
                html+=[
                    '<a href='+ getUrl(item.url) +' class="swiper-slide"><img src="'+ item.image +'"></a>'
                ].join('')
            });
            return html
        },
        initHtml: function () {
            var html = [
                '<div class="swiper-box-tpl swiper-container swiper-'+ this.data.cmsId +'" id="cms-'+ this.data.cmsId +'">',
                '<section class="swiper-wrapper">'+ this.createNavHtml() +'</section>',
                '<div class="pagination pagination-'+this.data.cmsId+'"></div>',
                '</div>'
            ].join('');

            if (this.data) {
                return html
            }
        },
        create: function () {
            rootDom.append(this.initHtml());
            this.initEvent();
            // this.scrollFun();
        },
        initEvent: function (time) {
            var _this = this;
            var mySwiper = new Swiper ('.swiper-'+ _this.data.cmsId, {
                loop: true,
                autoplay:4000,
                pagination: '.pagination-'+_this.data.cmsId,
                autoplayDisableOnInteraction:false
            });
            new sildeAndroid('.swiper-'+ _this.data.cmsId);

        }
    };

    //情景模版
    var ProductScrollTpl = function(data){
        this.data = data;
    };
    ProductScrollTpl.prototype = {
        createNavHtml: function () {
            var html = ''
            $.map(this.data.cmsList,function(item,index){
                if(index < 6){//最多显示6个
                    html+=getProduct.type1(item)
                }
            });
            return html
        },
        initHtml: function () {
            var _show = '';
            if(this.data.cmsList.length >= 6){//大于等于6个显示全部按钮
                _show = 'display:block';
            } 
            // var _url = this.data.productDetail.oneUrl;           
            // if(!_url){
            //     _url = 'javascript:;'
            // }else{
            //     var _host = _url.indexOf('cId')>-1?_cmsBasePath:_basePath;
            //     _url = _host+_url
                
            // }
            var html = [
                '<div class="product-scroll-tpl" id="cms-'+ this.data.cmsId +'">' +
                    '<a href='+getUrl(this.data.productDetail.oneUrl) +' class="product-scroll-banner"><img src="'+ this.data.oneImage +'"></a>',
                    '<div class="product-scroll-list swiper-container  product-scroll'+ this.data.cmsId +'">' +
                        '<section class="swiper-wrapper">'+ this.createNavHtml() +'' +
                            '<a class="product-type-1 swiper-slide slide-all" href='+ getUrl(this.data.productDetail.oneUrl) +' >' +
                                '<div class="pr-img product-all" style="'+_show+'">' +
                                    '<span>查看全部<br>' +
                                        '<i>See All</i>' +
                                    '</span>' +
                                '</div>' +
                            '</a>' +
                        '</section>',
                    '</div>' +
                '</div>'
            ].join('');
            if (this.data) {
                return html
            }
        },
        create: function () {
            rootDom.append(this.initHtml());
            this.initStyle().initEvent()
        },
        initStyle: function(){
            if(this.data.color&&this.data.color.oneColor){
                $('#cms-'+this.data.cmsId).css({
                    'backgroundColor':colorTrans(this.data.color.oneColor)
                })
                $('#cms-'+this.data.cmsId+' .product-scroll-banner').css({
                    'color':colorTrans(this.data.color.oneColor)
                })
            }   
            return this      
        },
        initEvent: function (time) {
            var _this = this;
            var productSwiper = new Swiper ('.product-scroll'+ _this.data.cmsId, {
                spaceBetween: 8,
                slidesPerView: 3.5
            });
            new sildeAndroid('.product-scroll'+ _this.data.cmsId);

        }
    };

    var SeckillTpl = function(data){
        this.data = data;
        this.index = this.data.oneImage==0?0:this.data.oneImage-1;  //当前处于哪个秒杀阶段,0未开始，索引从1开始
    };
    SeckillTpl.prototype = {
        dateTrans: function(d,type){
            switch(type){
                case 'hours':
                    return new Date(d).getHours()<10?leftPad(new Date(d).getHours()):parseInt(new Date(d).getHours());
                case 'month':
                    return parseInt(new Date(d).getMonth())+1;
                case 'date':
                    return parseInt(new Date(d).getDate());
                case 'minute':
                    return new Date(d).getMinutes()<10?leftPad(new Date(d).getMinutes()):parseInt(new Date(d).getMinutes())
            }
        },  
        getProductStatus: function(roundStatus,productStatus,type){
            //productStatus 1[有货]、2[还有机会]、3[即将开始]、4[已抢完]
            //roundStatus  0已结束 1进行中 2即将开始
            //type == 1 商品状态  type == 2 按钮状态  type == 3 秒杀状态

            if (type == 1) {
                var _class = APPOS==0?"still":"sold";
                switch(productStatus){
                    case 2:
                        return '<div class="item-status '+_class+'">还有<br />机会</div>';
                    case 4:
                        return '<div class="item-status sold">已抢完</div>';
                    default: 
                        return ''
                }
            }else if(type == 2){
                if (roundStatus==2) {
                    return '<div class="info-btn">即将开始</div>'
                }else{
                    switch(productStatus){
                        case 4:
                            return '<div class="info-btn over">已抢完</div>';
                        default: 
                            return '<div class="info-btn">立即抢购</div>'
                    }
                }
            }else if(type == 3){
                switch(roundStatus){
                    case 0:
                        return '已售磬';
                        break;
                    case 1:
                        return '正在进行';
                        break;
                    case 2:
                        return '即将开始';
                        break;
                }
            }   
        },
        getTextHtml: function(){
            //0已结束 1进行中 2即将开始
            //初始化秒杀文案
            var _this = this,
                $active = $('#cms-'+this.data.cmsId+' .active'),
                _date = $active.attr('data-date'),
                _status = $active.attr('data-status'),
                $text = $('#cms-'+this.data.cmsId+' .sk-text');
            switch(_status){
                case '0':
                    $text.html('本场抢购商品已售磬');
                    break;
                case '1':
                    $text.html('本场火热抢购中');
                    break;
                case '2':
                    $text.html('距离本场开始还有<span id="day1">00</span>天<span id="hour1">00</span>时<span id="minute1">00</span>分<span id="second1">00</span>秒');
                    countDown(_date,{
                        day: $('#day1'),
                        hour: $('#hour1'),
                        minute: $('#minute1'),
                        second: $('#second1')
                    },function(){
                        // ++_this.index
                        // var $navItem = $('.nav-item').eq(_this.index)
                        // $('.nav-item').removeClass('active')
                        // $navItem.addClass('active')
                        // secKillScroll.scrollToElement($navItem[0])
                        // procuctScroll.scrollToElement($('.time-wrap')[_this.index],500,null,null,null)
                        $text.html('本场火热抢购中');
                        $active.find('dd').html('正在进行');
                        $('.time-wrap').eq(_this.index).find('.info-btn')
                                                        .html('立即抢购')
                                                        .css({
                                                            'backgroundColor': globalVar[APPOS].color,
                                                            'color': '#fff',
                                                            'borderColor': globalVar[APPOS].color
                                                        })
                                                                         
                    });
                    break;
            }
        },
        createHtml: function () {
            var sLiHtml = sDayHtml = '',
                _this = this;
            $.map(_this.data.cmsList,function(item,i){
                var aTimeHtml = '';
                $.map(item.seckillDetailList,function(one,j){
                    if (j==0) {
                        sLiHtml+='<li><div class="date-flag"><span class="flag-month">'+ _this.dateTrans(one.date,'month') +'月</span><span class="flag-day">'+ _this.dateTrans(one.date,'date') +'</span></div><dl class="nav-item" data-date="'+ one.date +'" data-status="'+ one.status +'"><dt>'+ _this.dateTrans(one.date,'hours') +':'+ _this.dateTrans(one.date,'minute') +'</dt><dd>'+ _this.getProductStatus(one.status,null,3) +'</dd></dl></li>'
                    }else{
                        sLiHtml+='<li><dl class="nav-item" data-date="'+ one.date +'" data-status="'+ one.status +'"><dt>'+ _this.dateTrans(one.date,'hours') +':'+ _this.dateTrans(one.date,'minute') +'</dt><dd>'+ _this.getProductStatus(one.status,null,3) +'</dd></dl></li>'
                    }
                    var aItemHtml = '';
                    $.map(one.productList,function(product,k){
                        // var _host = product.url.indexOf('cId')>-1?_cmsBasePath:_basePath;
                        // var _url = product.url?(_host+product.url):'javascript:void(0)';
                        aItemHtml+='<a class="pr-item" href='+getUrl(product.url)+'><div class="item-bg"><img class="lazy-img" data-img="'+ product.image +'" src="'+ globalVar[APPOS].defaultImg +'" />'+ _this.getProductStatus(null,product.status,1) +'</div><div class="item-info"><h2>'+ product.name +'</h2><div class="info-price">&yen'+ product.lowPrice +'</div>'+ _this.getProductStatus(one.status,product.status,2) +'</div></a>'
                    });
                    if (j == item.seckillDetailList.length-1 && i == _this.data.cmsList.length-1) {
                        aTimeHtml+='<div class="time-wrap">'+aItemHtml+'</div>'
                    }else{
                        aTimeHtml+='<div class="time-wrap">'+aItemHtml+'</div><div class="next-margin"><div><span>下</span><span>一</span><span>场</span></div></div>'
                    }
                    //aTimeHtml+='<div class="time-wrap">'+aItemHtml+'</div><div class="next-margin">下一场</div>'
                });
                sDayHtml+='<div class="day-wrap">'+aTimeHtml+'</div>'
            });
            var sNavHtml = '<div class="sk-time"><ul>'+ sLiHtml +'</ul></div>';
            return {
                sDayHtml: sDayHtml,
                sNavHtml: sNavHtml
            }
        },
        initHtml: function () {
            var html = [
                '<div class="seckill-tpl seckill-tpl-'+ this.data.cmsId +'" id="cms-'+ this.data.cmsId +'">',
                    this.createHtml().sNavHtml,
                    '<h5 class="sk-text">距离本场开始还有<span>00</span>时<span>00</span>分<span>00</span>秒</h5>',
                    '<div class="sk-product">',
                        '<div class="pr-scroll">',
                            this.createHtml().sDayHtml,
                        '</div>',
                    '</div>',
                '</div>',
            ].join('');
            return html
        },
        create: function () {
            rootDom.append(this.initHtml());
            this.initStyle().initEvent()
        },
        initStyle: function(){
            $('.seckill-tpl .nav-item').eq(this.index).addClass('active');
            registerCss('.seckill-tpl .active {background-color:'+ globalVar[APPOS].color +'!important}');
            $('.seckill-tpl .date-flag').css({
                'color': globalVar[APPOS].color
            });
            $('.seckill-tpl .date-flag .flag-month').css({
                'backgroundColor': globalVar[APPOS].color
            });
            $('.seckill-tpl .info-btn').css({
                'backgroundColor': globalVar[APPOS].color,
                'borderColor': globalVar[APPOS].color
            });
            $('.seckill-tpl .over').css({
                'color': globalVar[APPOS].color,
                'backgroundColor': '#fff'
            });
            if(APPOS==1){
                $('.seckill-tpl .sk-text,.seckill-tpl .sk-product').css({
                    'backgroundColor': '#2d2d2d'
                });
                $('.seckill-tpl .next-margin').css({
                    'color': '#fff'
                });
                registerCss('.seckill-tpl .sk-text>span {color: #fff!important};')
            }
            return this
        },
        initEvent: function () {
            var _this = this;
            var secKillScroll = new IScroll('.sk-time', {
                bounce: false,
                scrollX: true,  
                scrollY: false,
                eventPassthrough: true,
                tap: true
            });
            var procuctScroll = new IScroll('.sk-product', {
                bounce: false,
                scrollX: true,  
                scrollY: false,
                eventPassthrough: true,
                tap: true
            });
            var lz = lazyload($('.pr-scroll'));
            if (_this.index>0) {
                secKillScroll.scrollToElement($('.nav-item')[_this.index-1]);
                procuctScroll.scrollToElement($('.time-wrap')[_this.index],500,null,null,null)
            }
            _this.getTextHtml();

            lz();
            //把每组秒杀的time-wrap距离左侧的距离放到数组里面
            var aLeft = [],
                oWindowW = $(window).width();
            for(var i=0,length=$('.time-wrap').length;i<length;i++){
                aLeft.push($('.time-wrap').eq(i).offset().left-oWindowW/2)
            }
            $('.sk-time li').on('tap',function(){
                var $this = $(this),
                    _thisNavItem = $this.find('.nav-item'),
                    _index = $this.index();
                $('.nav-item').removeClass('active');
                _thisNavItem.addClass('active');
                if (_index==0) {
                    secKillScroll.scrollTo(0, 0);
                    _this.index = 0
                }else{
                    secKillScroll.scrollToElement($this.prev().find('.nav-item')[0]);
                    _this.index = _index
                }
                procuctScroll.scrollToElement($('.time-wrap')[_index],500,null,null,null);
                _this.getTextHtml()
            });
            //var index = 0; //上一次滚动到的位置
            procuctScroll.on('scrollEnd', function () {
                var X = Math.abs(this.x);
                for(var j=0,length=aLeft.length;j<length;j++){
                    if (aLeft[j]<X && aLeft[j+1]>X) {
                        //index = j
                        break;
                    }else if(j==length-1){
                        //index = j
                        break;
                    }
                }
                // console.log(j,_this.index)
                if (j!=_this.index) {  //判断这次滚动的位置和上次是否相同
                    $('.nav-item').removeClass('active');
                    $('.nav-item').eq(j).addClass('active');
                    if (j>1) {
                        secKillScroll.scrollToElement($('.nav-item')[j-1])
                    }else{
                        secKillScroll.scrollTo(0, 0);
                    }
                    _this.getTextHtml()
                }
                _this.index = j;
                lz()
            });

            // $('.seckill-tpl .pr-item').on('tap',function(){
            //     var _src = $(this).attr('data-src')
            //     if (_src) {
            //         location.href = _basePath+_src
            //     }
            // })

            new sildeAndroid('.seckill-tpl-'+ _this.data.cmsId);
        }
    };

    var RecommendProductTpl = function(data){
        this.data = data
    };
    RecommendProductTpl.prototype = {
        createItemHtml: function (item,index) {
            //status:str(1[有货]、2[还有机会]、3[即将开始]、4[已抢完])
            var statusHtml;
            if (item.status == 3) {
                statusHtml = '<div class="pr-btn">即将<br/>开始</div>'
            }else{
                statusHtml = '<div class="pr-btn available">立即<br/>购买</div>'
            }
            // var _host = item.url.indexOf('cId')>-1?_cmsBasePath:_basePath;
            // var _url = item.url?(_host+item.url):'javascript:void(0)';
            var html = [
                '<div class="item-wrap">',
                    '<dl class="recommend-reason">',
                        '<dt>',
                            '<img src="'+ item.headImage +'" />',
                            '<h1>'+ item.title +'</h1>',
                            '<span>'+ item.tips +'</span>',
                        '</dt>',
                        '<dd>'+ item.content +'</dd>',
                    '</dl>',
                    '<div class="recommend-product">',
                        '<a href='+getUrl(item.url)+'>',
                            // '<div class="pr-swipe">',
                            //     '<ul>',
                            //         '<li><img src="'+ item.oneImage +'" /></li>',
                            //         item.twoImage?'<li><img src="'+ item.twoImage +'" /></li>':'',
                            //         item.threeImage?'<li><img src="'+ item.threeImage +'" /></li>':'',
                            //     '</ul>',
                            // '</div>',
                            '<div class="pr-swipe swiper-container swiper-'+ this.data.cmsId + '-'+ index +'">',
                                '<ul class="swiper-wrapper">',
                                    // '<li class="swiper-slide"><img src="'+ item.oneImage +'" /></li>',
                                    // item.twoImage?'<li class="swiper-slide"><img src="'+ item.twoImage +'" /></li>':'',
                                    // item.threeImage?'<li class="swiper-slide"><img src="'+ item.threeImage +'" /></li>':'',
                                    '<li class="swiper-slide" style="background-image:url('+item.oneImage+')"></li>',
                                    item.twoImage?'<li class="swiper-slide" style="background-image:url('+item.twoImage+')"></li>':'',
                                    item.threeImage?'<li class="swiper-slide" style="background-image:url('+item.threeImage+')"></li>':'',
                                '</ul>',
                                !item.twoImage&&!item.threeImage ? '':'<div class="pagination pagination-'+this.data.cmsId+'-'+index+'"></div>',
                            '</div>',
                            '<div class="pr-detail">',
                                '<div class="pr-info">',
                                    '<div class="info-name">'+ item.name +'</div>',
                                    '<span class="info-price">'+ item.tagText +': <strong>'+ item.price +'</strong>元</span>',
                                    memberObj.isMember == 1?'<span id="vip-tag">会员价￥'+item.agentPrice+'</span>':'',
                                '</div>',
                                statusHtml,
                            '</div>',
                        '</a>',
                    '</div>',
                '</div>'
            ].join('');
            return html
        },
        initHtml: function () {
            var _this = this,
                itemHtml = '';

            $.map(_this.data.cmsList,function(item,index){
                itemHtml += _this.createItemHtml(item,index)
            });
            var html = [
                '<div class="recommend-product-tpl" id="cms-'+ _this.data.cmsId +'">',
                    '<div class="list-wrap">'+itemHtml+'</div>',
                '</div>'
            ].join('');

            if (_this.data) {
                return html
            }
        },
        create: function () {
            rootDom.append(this.initHtml());
            this.initStyle().initEvent()
        },
        initStyle: function(){
            $('.recommend-product-tpl').css({
                'backgroundColor': colorTrans(this.data.color.oneColor)
            });
            $('.recommend-product-tpl .info-price').css({
                'color': globalVar[APPOS].color
            });
            $('.recommend-product-tpl .available').css({
                'backgroundColor': globalVar[APPOS].color
            });
            return this
        },
        initEvent: function (time) {
            var $item = $('.recommend-product-tpl .item-wrap'),
                length = $item.length;
            for(var i=0;i<length;i++){
                if ($item.eq(i).find('li').length>1) {
                    var mySwiper = new Swiper ('.swiper-'+this.data.cmsId+'-'+i, {
                        loop: true,
                        pagination: '.pagination-'+this.data.cmsId+'-'+i,
                        autoplayDisableOnInteraction:false
                    });
                    new sildeAndroid('.swiper-'+this.data.cmsId+'-'+i);
                }
            }

            // $('.recommend-product').on('tap',function(){
            //     var _src = $(this).attr('data-src')
            //     if (_src) {
            //         location.href = _src
            //     }
            // })
        }
    };

    var CouponsTpl = function(data,params){
        PicDisplayTpl.call(this,data);
        this.isCoupon = true;
        this.request = true;
        this.params = params
    };
    CouponsTpl.prototype = new PicDisplayTpl();
    CouponsTpl.prototype.constructor = CouponsTpl;
    CouponsTpl.prototype.getAjax = function($this,_cmsCouponId){
        var _prototype = this,
            _this = $this,
            _id = _this.attr('data-id'),
            _type = _this.attr('data-type'),
            _isClick = _this.attr('data-status'),
            _msg = _this.attr('data-msg'),
            _url = '/ygg-hqbs/coupon/doCmsCoupon?'+ linkInfoFun(),
            _loginBox = $(".dialog-box"),
            _loginCancel = $(".cancel-btn"),
            _loginTurn = $(".bang-btn"),
            _maskFull = $(".mask-full");

        // if(_isClick != 1){
        //     // toast.show(_msg)
        //     window.location.href = _this.attr('data-src')
        //     _prototype.request = true;
        //     return false;
        // }
        // if(_isClick!=0){
        //     toast.show(_msg)
        //     _prototype.request = true;
        //     return false;
        // }

        //type=1，2，3跳转，type=4不跳转
        //status=0领取成功
        if(_type==4){

        }else{
            if(_isClick==0){
                window.location.href = _this.attr('data-src');
                setTimeout(function(){
                    _prototype.request = true;
                },1000);
                return false;
            }else if(_isClick!=1){
                toast.show(_msg);
                setTimeout(function(){
                    _prototype.request = true;
                },1000);
                return false;
            }
        }
        $.ajax({
            url:_url,
            type:'post',
            data:{
                cmsCouponId:_id
            },
            success:function(data){
                // console.log(data);
                if(data.status == 1){//未登录
                    _loginBox.show();
                    _maskFull.show();
                    _loginCancel.tap(function(){
                        _loginBox.hide();
                        _maskFull.hide();
                    });
                    _loginTurn.tap(function(){
                        window.location.href = data.url;
                    })

                }else if(data.status == 3){
                    _this.find('img').attr('src',data.image);
                    toast.show(data.msg);
                    setTimeout(function(){
                        window.location.href = _this.data('src')
                    },0)
                }else if(data.status == 4 || data.status == 5){//领取成功返回提示
                    _this.find('img').attr('src',data.image);
                    // _tip.show().text(data.msg)
                    toast.show(data.msg);
                    // setTimeout(function(){
                    //     _tip.hide();
                    // },1000)
                }else{//领取失败
                    toast.show(data.msg);
                    // _tip.show().text(data.msg)
                    // setTimeout(function(){
                    //     _tip.hide();
                    // },1000)
                }
                setTimeout(function(){
                    _prototype.request = true;
                },1000)
            }
        })
    };
    CouponsTpl.prototype.initEvent = function(){
        var _this = this;

        $('#cms-'+this.data.cmsId+' .coupon-wrap').on('tap',function(){
            if(!loginLoad()){
                loginFun();
                return false;
            }
            var $this = $(this),
                _cmsCouponId = $this.attr('data-id');
            if(_this.request){
                _this.request = false;
                _this.getAjax($this,_cmsCouponId)
            }else{
                // toast.show('请不要重复点击')
            }
        })
    };

    var CollectProductTpl = function(data,params){
        this.data = data;
        this.params = params;
        this.lock = false
        this.html = ''
        this.info = []
    };
    CollectProductTpl.prototype = {
        createItemHtml: function (item,info) {
            var html = [
                '<div class="collect-product-item" data-src='+ item.url +'>',
                    '<div class="pr-banner" style="background-image:url('+ item.image +')">',
                        '<div class="banner-collect" data-product-id="'+ item.productId +'" data-unit-id="'+ item.saleUnitId +'">',
                            info.isCollect == 0?'<img src="./img/uncollect-icon.png" />':'<img src="./img/collected-icon.png" />',
                            '<span>'+ info.count +'</span>',
                        '</div>',
                        '<p>'+ item.title +'</p>',
                    '</div>',
                    '<div class="pr-detail" href='+item.url+'>',
                        '<h3>'+ item.content +'</h3>',
                        '<div>',
                            '<div class="price">',
                                item.tagText?'<span>'+ item.tagText +'</span>':'',
                                '<strong>￥'+ item.price +'</strong>',
                                memberObj.isMember == 1?'<small id="vip-tag">会员价￥'+item.agentPrice+'</small>':'',
                            '</div>',
                            '<div class="btn">'+ item.btnText +'</div>',
                        '</div>',
                    '</div>',
                '</div>',
            ].join('');
            return html
        },
        initHtml: function (res) {
            console.log(res)
            var _this = this,
                itemHtml = '';
            $.map(_this.data.cmsList,function(item,index){
                itemHtml += _this.createItemHtml(item,res[index])
            });
            var html = [
                '<div class="collect-product-tpl" id="cms-'+ this.data.cmsId +'">',
                    '<div class="collect-product-list">'+itemHtml+'</div>',
                '</div>',
            ].join('');
            if (this.data) {
                this.html = html
            }
        },
        create: function () {
            this.getCollectInfo()
            setTimeout(function(){
                this.initHtml(this.info)
                rootDom.append(this.html)
                this.initStyle().initEvent()
            }.bind(this),1000)
        },
        collect: function(productId,saleUnitId,isCollect,fn){
            var _this = this;
            $.ajax({
                url: '/ygg-hqbs/cms/cmsCollect',
                data: {
                    source: queryString('source') || 2,
                    productId: productId,
                    saleUnitId: saleUnitId,
                    isCollect: isCollect,
                },
                dataType: 'json',
                type: 'GET',
                success: function(data){
                    //0:出错 1:成功 -1:未登录
                    // var data = res.params
                    console.log(_this.lock);
                    if (data.status == -1) {
                        if (queryString('isApp') == 1) {
                            //app
                            switch(APPOS){
                                case '0':
                                    window.WebViewJavascriptBridge.callHandler('presentLoginVC', {}, function(data) {
                                        if (data == 'success' || data == 'fail') {
                                            var _data = data
                                        }else{
                                            var _data = JSON.parse(data)
                                        }
                                        if (_data == 'success' || _data.status == 'success') {
                                            window.WebViewJavascriptBridge.callHandler('getUserInfo', {}, function(data) {
                                                // var newObj = JSON.parse(data)
                                                // _accountId = newObj.accountId
                                                location.reload()
                                            })
                                        }
                                    });
                                    break;
                                case '1':
                                    location.href = 'ggj://redirect/typeCommon/{"type":"6"}';
                                    break;
                                case '2':
                                    break;
                            }
                        }else{
                            //wx
                            switch(APPOS){
                                case '0':
                                    var layer = getLogin();
                                    layer.css('display','block');
                                    break;
                                case '1':

                                    break;
                                case '2':
                                    window.location.reload();
                                    break;
                            }
                        }
                    }else if(data.status == 0){
                        toast.show(data.msg)
                    }else if(data.status == 1){
                        fn&&fn()
                    }

                    _this.lock = false;
                    console.log(_this.lock)
                }
            })
        },
        getCollectInfo: function(){
            var _this = this,
                ids = [];
            $.map(_this.data.cmsList,function(item,index){
                ids.push(item.productId)
            });
            $.ajax({
                url: '/ygg-hqbs/cms/cmsCollectInfo',
                data: {
                    productIds: ids.join(',')
                },
                dataType: 'json',
                type: 'GET',
                success: function(data){
                    //fn.apply(_this,data.collectList)
                    _this.info = data.collectList
                }
            })
        },
        initEvent: function (time) {
            var _this = this;
            $('.collect-product-item').on('tap',function(){
                var url = $(this).attr('data-src');
                if(url){
                    var _host = url.indexOf('cId')>-1?_cmsBasePath:_basePath;
                    location.href = _host+url
                }
            });
            $('.collect-product-tpl .banner-collect').on('touchstart',function(ev){
                ev.stopPropagation();
                if(!loginLoad()){
                    loginFun();
                    return false;
                }
                if (!_this.lock) {
                    _this.lock = true;
                    var num = $(this).find('span').html(),
                        img = $(this).find('img').attr('src'),
                        productId = $(this).attr('data-product-id'),
                        saleUnitId = $(this).attr('data-unit-id'),
                        reg = /uncollect/g,
                        $this = $(this);
                    if (reg.test(img) ) {
                        //未收藏
                        _this.collect(productId,saleUnitId,1,function(){
                            $this.find('img').attr('src','img/collected-icon.png');
                            if (num.indexOf('k') == -1) {
                                num = parseInt(num);
                                $this.find('span').html(++num)
                            }
                        })
                    }else{
                        _this.collect(productId,saleUnitId,0,function(){
                            $this.find('img').attr('src','img/uncollect-icon.png');
                            if (num.indexOf('k') == -1) {
                                num = parseInt(num);
                                $this.find('span').html(--num)
                            }
                        })
                    }
                }else{
                    toast.show('请不要重复点击')
                }
            });
            return this
        },
        initStyle: function(){
            $('.collect-product-tpl .btn').css({
                'backgroundColor': globalVar[APPOS].color
            });
            return this
        }
    };
    var MemberInfoTpl = function(data){
        this.data = data
    };
    MemberInfoTpl.prototype = {
        initHtml: function(){
            var wrapHtml = '';
            if(memberObj.isMember == 1){
                wrapHtml+= [
                    '<div class="member-wrap">',
                        '<div>',
                            '<img src="'+memberObj.headImage+'" />',
                        '</div>',
                        '<dl>',
                            '<dt>'+memberObj.nickname+'</dt>',
                            '<dd>ID:'+_accountId+'</dd>',
                        '</dl>',
                    '</div>'
                ].join('')
            }else{
                wrapHtml+= [
                    '<div class="member-wrap">',

                    '</div>'
                ].join('')
            }
            if (this.data) {
                return '<div class="member-info-tpl" id="cms-'+ this.data.cmsId +'">'+wrapHtml+'</div>'
            }
        },
        initStyle: function(){
            if(memberObj.isMember == 1){
                $('.member-info-tpl').css({
                    'backgroundImage': 'url('+this.data.oneImage+')'
                })
            }else{
                $('.member-info-tpl').css({
                    'backgroundImage': 'url('+this.data.twoImage+')'
                })
            }

            return this
        },
        create: function(){
            rootDom.append(this.initHtml());
            this.initStyle()
        }
    };
    var HotBuyProductTpl = function(data){
        this.data = data;
        this.status = 0; //0距离开始 1 距离结束 2已结束
    };
    HotBuyProductTpl.prototype = {
        creatProductHtml: function(){
            var html = '',
                cmsId = this.data.cmsId;

            $.map(this.data.cmsList,function(item,index){
                var _text = null,
                    _date = null,
                    _labelHtml = '';
                if(+new Date()>item.endTime){
                    //this.status = 2
                }else if(+new Date()<item.startTime){
                    _date = item.startTime;
                    _text = '开始';
                    //this.status = 0
                }else{
                    _date = item.endTime;
                    _text = '结束';
                    //this.status = 1
                }
                if(_date!==null && _date-(+new Date())>86400000){
                    _labelHtml = '<label><span id="hot-buy-day-'+cmsId+'-'+index+'">00</span>天</label>'
                }
                html+= [
                    '<div class="product" data-src='+ item.url +' data-date="'+ _date +'">',
                        '<div class="pr-img" style="background-image:url('+ item.image +')">',
                            _text===null?'<div>已结束</div>':'',
                        '</div>',
                        '<div class="pr-info">',
                            '<div class="info-desc">',
                                '<h1>'+ item.title +'</h1>',
                                '<h2>'+ item.subtitle +'</h2>',
                                _text===null?'':'<p>距'+_text+_labelHtml+'<span id="hot-buy-hour-'+cmsId+'-'+index+'">00</span>:<span id="hot-buy-minute-'+cmsId+'-'+index+'">00</span>:<span id="hot-buy-second-'+cmsId+'-'+index+'">00</span></p>',
                            '</div>',
                            '<div class="info-price">',
                                '<div class="member">',
                                    '<div class="price">&yen<strong>'+item.agentPrice+'</strong></div>',
                                    '<div class="tag">会员专享价</div>',
                                '</div>',
                                '<div class="btn">点击查看</div>',
                            '</div>',
                        '</div>',
                    '</div>'
                ].join('')
            });
            return html
        },
        initHtml: function(){
            var html = [
                '<div class="hot-buy-product-tpl" id="cms-'+ this.data.cmsId +'">',
                    '<div class="list-wrap">',
                        this.creatProductHtml(),
                    '</div>',
                '</div>'
            ].join('');

            if (this.data) {
                return html
            }
        },
        create: function(){
            rootDom.append(this.initHtml());
            this.initEvent()
        },
        initEvent: function(time){
            var aList = $('#cms-'+this.data.cmsId+' .product');
            for(var i=0;i<aList.length;i++){
                countDown($(aList[i]).attr('data-date'),{
                    day: $('#hot-buy-day-'+this.data.cmsId+'-'+i)?$('#hot-buy-day-'+this.data.cmsId+'-'+i):'',
                    hour: $('#hot-buy-hour-'+this.data.cmsId+'-'+i),
                    minute: $('#hot-buy-minute-'+this.data.cmsId+'-'+i),
                    second: $('#hot-buy-second-'+this.data.cmsId+'-'+i)
                },function(){
                    if($(aList[i]).attr('data-date') == this.data.cmsList[i].endTime){
                        $(aList[i]).find('p').remove();
                        $(aList[i]).find('.pr-img').append("<div>已结束</div>")       
                    }                                           
                })
            }
            $('.list-wrap>.product').on('tap',function(index){
                var url = $(this).attr('data-src');
                if (url) {
                    var _host = url.indexOf('cId')>-1?_cmsBasePath:_basePath;
                    location.href = _host+url
                }
            })
        }
    };
    var MemberProductList2Tpl = function(data){
        this.data = data
    };
    MemberProductList2Tpl.prototype = {
        creatProductHtml: function(){
            var html = '',
                statusList = ['','','还有机会','即将开始','已抢完'],
                productDetail = this.data.productDetail;
            $.map(this.data.cmsList,function(item,index){
                html+= [
                    '<div class="product-2 product-member" data-src='+ item.url +'>',
                    //'<div class="pr-img" style="background-image:url('+ item.image +')">',
                        '<div class="pr-img lazy-img" style="background-image:url('+ globalVar[APPOS].defaultImg +')" data-img="'+ item.image +'">',
                            productDetail.isShowImage==1?'<img src="'+ productDetail.tagImage +'" />':'',
                            item.status>1?(item.status==2?'<div class="pr-status" style="background-color:#FF6666;">'+statusList[item.status]+'</div>':'<div class="pr-status">'+statusList[item.status]+'</div>'):'',
                        '</div>',
                        '<div class="pr-info">',
                            '<div class="pr-title"><h2>'+ item.name +'</h2></div>',
                            '<div class="pr-price">',
                                '<div class="p-member">&yen'+ item.highPrice +'<img src="img/member-price.png" /></div>',
                                '<div class="p-week">省'+ item.lowPrice +'元</div>',
                            '</div>',
                        '</div>',
                    '</div>'
                ].join('')
            });
            return html
        },
        initHtml: function(){
            var html = [
                '<div class="member-product-list-2-tpl" id="cms-'+ this.data.cmsId +'">',
                this.data.oneImage?'<img src="'+ this.data.oneImage +'" data-src='+ this.data.productDetail.oneUrl +' />':'',
                '<div class="list-wrap-2">'+ this.creatProductHtml() +'</div>',
                this.data.twoImage?'<img src="'+ this.data.twoImage +'" data-src='+ this.data.productDetail.twoUrl +' />':'',
                '</div>'
            ].join('');

            if (this.data) {
                return html
            }
        },
        create: function(){
            rootDom.append(this.initHtml());
            this.initStyle().initEvent()
        },
        initStyle: function(){
            var productDetail = this.data.productDetail;
            $('#cms-'+ this.data.cmsId +' .list-wrap-2').css({
                'backgroundColor': colorTrans(productDetail.backColor)
            });
            return this
        },
        initEvent: function(time){
            $('.list-wrap-2>.product-2,.member-product-list-2-tpl>img').on('tap',function(index){
                var url = $(this).attr('data-src');
                if (url) {
                    var _host = url.indexOf('cId')>-1?_cmsBasePath:_basePath;
                    location.href = _host+url
                }
            })
        }
    };

    var MemberProductScrollTpl = function(data){
        this.data = data;
    };
    MemberProductScrollTpl.prototype = {
        createNavHtml: function () {
            var html = '',
                statusArr = ['有货','还有机会','即将开始','已抢完'];
            $.map(this.data.cmsList,function(item,index){
                if(index < 6){//最多显示6个
                    var _productTag = '';
                    // var _url = item.url?(_basePath+item.url):'javascript:void(0)';
                    if(item.status > 1){
                        if(item.status == 2){
                            _productTag = '<span class="pr-tag" style="background-color:rgba(251,77,77,.7)">'+statusArr[item.status-1]+'</span>'
                        }else{
                            _productTag = '<span class="pr-tag">'+statusArr[item.status-1]+'</span>'
                        }
                    }
                    html+=[
                        '<a class="product-type-1 swiper-slide" href='+getUrl(item.url)+'>' +
                            '<div class="pr-img" style="background-image:url('+ item.image +')"><div class="pr-shadow"></div>'+_productTag+'</div>' +
                            '<h1><p>'+ item.name +'</p></h1>' +
                            //'<div class="member-price">&yen'+ item.lowPrice +'<span>会员价</span></div>' +
                            '<div class="member-price">&yen'+ item.lowPrice +'<img src="./img/member-price-tag.png" /></div>'+
                        '</a>'
                    ].join('')
                }
            });
            return html
        },
        initHtml: function () {
            
            var _show = '';
            if(this.data.cmsList.length >= 6){//大于等于6个显示全部按钮
                _show = 'display:block';
            }
            // var _url = this.data.productDetail.oneUrl;           
            // if(!_url){
            //     _url = 'javascript:;'
            // }else{
            //     var _host = _url.indexOf('cId')>-1?_cmsBasePath:_basePath;
            //     _url = _host+_url
                
            // }
            var html = [
                '<div class="product-scroll-tpl" id="cms-'+ this.data.cmsId +'">' +
                    '<a href='+getUrl(this.data.productDetail.oneUrl) +' class="product-scroll-banner"><img src="'+ this.data.oneImage +'"></a>',
                    '<div class="product-scroll-list swiper-container  product-scroll'+ this.data.cmsId +'">' +
                        '<section class="swiper-wrapper">'+ this.createNavHtml() +'' +
                            '<a class="product-type-1 swiper-slide slide-all" href='+ getUrl(this.data.productDetail.oneUrl) +'>' +
                                '<div class="pr-img product-all" style="'+_show+'">' +
                                    '<span>查看全部<br>' +
                                    '<i>See All</i>' +
                                    '</span>' +
                                '</div>' +
                            '</a>' +
                            '<ul class="swiper-slide"></ul>'+
                        '</section>',
                    '</div>' +
                '</div>'
            ].join('');

            if (this.data) {
                return html
            }
        },
        create: function () {
            rootDom.append(this.initHtml());
            this.initStyle().initEvent()
        },
        initStyle: function(){
            if(this.data.color&&this.data.color.oneColor){
                $('#cms-'+this.data.cmsId).css({
                    'backgroundColor':colorTrans(this.data.color.oneColor)
                })
                $('#cms-'+this.data.cmsId+' .product-scroll-banner').css({
                    'color':colorTrans(this.data.color.oneColor)
                })
            }   
            return this      
        },
        initEvent: function (time) {
            var _this = this;
            var productSwiper = new Swiper ('.product-scroll'+ _this.data.cmsId, {
                spaceBetween: 8,
                slidesPerView: 3.5
            });
            // var _productList = $(".product-scroll-list ul");
            // _productList.on('tap',function () {
            //     var _productUrl = $(this).data('url');
            //     if (_productUrl) {
            //         window.location.href = _basePath+_productUrl;
            //     }
            // })
            new sildeAndroid('.product-scroll'+ _this.data.cmsId);

        }
    };
    var ScrollCouponsTpl = function(data){
        CouponsTpl.call(this,data)
    };
    ScrollCouponsTpl.prototype = Object.create(CouponsTpl.prototype);  
    ScrollCouponsTpl.prototype.constructor = ScrollCouponsTpl;  
    ScrollCouponsTpl.prototype.initHtml = function(){
        var html='';
        $.map(this.data.cmsList,function(item,index){
            var divHtml='';
            $.map(item.groupProductDetailList,function(data,i){
                // var _url = data.url?(_basePath+data.url):'javascript:void(0)';
                divHtml+='<div class="coupon-wrap" data-id="'+ data.cmsCouponId +'" data-status="'+data.status+'" data-msg="'+data.msg+'" data-type="'+data.type+'" data-src='+ getUrl(data.url) +' ><img src="'+ data.image +'" /></div>'
            });
            html+='<div class="scroll-coupons-wrap" style="width:'+ (3.92+0.24)*item.groupProductDetailList.length +'rem">'+divHtml+'</div>'
        });
        html='<div class="scroll-coupons-tpl" id="cms-'+ this.data.cmsId +'">'+html+'</div>';
        return html
    };

    var ScrollMoreProductTpl = function(data,params){
        this.data = data;
        this.params = params;
        this.list = [];
        this.page = 1;
        this.pageCount = 10
    };
    ScrollMoreProductTpl.prototype = {
        initHtml: function(){

        },
        getInitData: function(){
            var _this = this;
            $.ajax({
                url: _this.params.host+'/cms/cmsSearchInfo',
                data: {
                    page: _this.page,
                    pageCount: _this.pageCount,
                    sortType: _this.data.oneImageHeight,
                    keys: _this.data.oneImage,
                },
                dataType: 'json',
                type: 'GET',
                success: function(res){
                    if (res.status === 1) {
                        _this.list = res.data.cmsList;
                        _this.initHtml()
                    }
                }
            })
        },
        create: function () {
            //this.getInitData()
        },
    };
    var SubjectScrollTpl = function(data){
        this.data = data;
    };
    SubjectScrollTpl.prototype = {
        initHtml: function(){
            //var _url = item.url?(_basePath+item.url):'javascript:void(0)'
            // var _url = this.data.productDetail.oneUrl;
            // var _host = _url.indexOf('cId')>-1?_cmsBasePath:_basePath;
            // _url = _url?(_host+_url):'javascript:void(0)';
            var html = [
                '<div class="subject-scroll-tpl" id="cms-'+ this.data.cmsId +'">',
                    '<a class="subject-scroll-banner" href='+getUrl(this.data.productDetail.oneUrl)+'>',
                        '<img src="'+ this.data.oneImage +'">',
                    '</a>',
                    '<div class="subject-scroll-wrap swiper-container subject-scroll'+ this.data.cmsId +'">',
                        '<div class="subject-scroll-list swiper-wrapper">'+this.initListHtml()+'</div>',
                    '</div>',
                '</div>'
            ].join('');
            return html
        },
        initListHtml: function () {
            var html = '';
            $.map(this.data.cmsList,function(item,index){
                // var _host = item.url.indexOf('cId')>-1?_cmsBasePath:_basePath;
                // var _url = item.url?(_host+item.url):'javascript:void(0)';
                html+=[
                    '<a class="item swiper-slide" href='+getUrl(item.url)+'>',
                        '<img src="'+ item.image +'">',
                    '</a>'
                ].join('')
            });
            return html
        },
        create: function () {
            rootDom.append(this.initHtml());
            this.initEvent()
        },
        initEvent: function (time) {
            var _this = this;
            var subjectSwiper = new Swiper ('.subject-scroll'+ _this.data.cmsId, {
                spaceBetween: 8,
                slidesPerView: 3.5
            });
            new sildeAndroid('.subject-scroll'+ _this.data.cmsId);
        }
    };

    var BottomLinkTpl = function(data){
        this.data = data;
    };
    BottomLinkTpl.prototype = {
        initHtml: function(){
            var navHtml = '';
            $.map(this.data.cmsList,function(item,index){
                // var _host = item.url.indexOf('cId')>-1?_cmsBasePath:_basePath;
                // var _url = _host+item.url;
                if(item.cmsId==queryString('cId')){
                    var _image = item.selectedImage;
                    _url = 'javascript:void(0)'
                }else{
                    var _image = item.noSelectedImage
                }
                navHtml+=[
                    '<a class="item" href='+ getUrl(item.url) +'>',
                        '<img src="'+ _image +'" />',
                    '</a>'
                ].join('')
            });
            var html = [
                '<div class="bottom-link-tpl" id="cms-'+ this.data.cmsId +'">',
                    '<div class="bottom-link-wrap display-'+ this.data.cmsList.length +'">'+navHtml+'</div>',
                '</div>'
            ].join('');
            return html
        },
        create: function () {
            rootDom.append(this.initHtml());
            this.initStyle().initEvent()
        },
        initStyle: function(){
            $('.bottom-link-tpl').css({
                'backgroundColor': colorTrans(this.data.color.oneColor)
            });
            return this
        },
        initEvent: function (time) {
       
        }
    };

    var ShareCouponsTpl = function(data){
        this.data = data
    };
    ShareCouponsTpl.prototype = {
        initHtml: function(){
            var html = '<div class="share-coupons-tpl" id="cms-'+ this.data.cmsId +'"><img src="'+ this.data.oneImage +'" /></div>';
            return html
        },
        create: function(){
            rootDom.append(this.initHtml());
            this.initEvent()
        },
        initEvent: function(){
            var _this = this;
            $('#cms-'+_this.data.cmsId).on('tap',function(){
                $.ajax({
                    url: '/ygg-hqbs/cms/addCmsReward',
                    type: 'get',
                    data: {
                        cmsRewardId: _this.data.color.oneColor,
                        cmsId: queryString('cId'),
                        times: _this.data.color.twoColor 
                    },
                    success:function(data){
                        if(data.status == 1){
                            toast.show(data.data.msg);
                        }else{
                            if(data.errorCode==1){
                                loginFun();
                                return false;
                            }else{
                                toast.show(data.errorMessage);
                            }
                        }
                    }
                })
            })
        }
    };

    var TenRecommnedTpl = function(data){
        this.data = data
    };
    TenRecommnedTpl.prototype = {
        initHtml: function(){
            var html = '';
            var _this = this
            $.map(this.data.cmsList,function(item,index){
                html+=_this.itemHtml(item)
            });
            return '<div class="ten-recommend-tpl" id="cms-'+ this.data.cmsId +'">'+html+'</div>'
        },
        itemHtml: function(item){
            // var _host = item.url.indexOf('cId')>-1?_cmsBasePath:_basePath;
            // var _url = item.url?(_host+item.url):'javascript:void(0)';
            var html = [
                '<a class="one-recommend" href='+ getUrl(item.url) +'>',
                    '<div class="recommend-img" style="background-image:url('+ item.image +')">',
                        '<span>已抢'+ item.saleVolume +'件</span>',
                    '</div>',
                    '<div class="recommend-info">',
                        '<div class="title"><h1>'+ item.name +'</h1></div>',
                        '<div class="desc"><p>'+ item.content +'</p></div>',
                        '<div class="price-btn">',
                            '<div>',
                                '<strong>'+ item.agentPrice +'</strong>',
                                '<span>',
                                    '<img src="./img/recommend-icon.png" />',
                                    '<del>'+ item.price +'</del>',
                                '</span>',
                            '</div>',
                            '<span>立即购买</span>',
                        '</div>',
                    '</div>',
                    '<span class="hot">热</span>',
                '</a>'
            ].join('');
            return html
        },
        create: function(){
            rootDom.append(this.initHtml());
            this.initEvent()
        },
        initEvent: function(){
            
        }
    };

    var DailySeckillTpl = function(data){
        this.data = data;
        this.last = data.cmsList[0].seckillDetailList.length==1?true:false
    };
    DailySeckillTpl.prototype = {  
        createPrHtml: function (item) {
            // var _host = item.url.indexOf('cId')>-1?_cmsBasePath:_basePath;
            // var _url = item.url?(_host+item.url):'javascript:void(0)';
            var html = [
                '<a class="pr" href='+ getUrl(item.url) +'>',
                    '<div class="pr-img" style="background-image:url('+ item.image +')">',
                        '<img src="./img/xianshi-icon.png" />',
                        '<div class="layer"></div>',
                    '</div>',
                    '<dl>',
                        '<dt>'+ item.name +'</dt>',
                        '<dd>',
                            '<strong>&yen'+ item.lowPrice +'</strong>',
                            '<del>&yen'+ item.highPrice +'</del>',
                        '</dd>',
                    '</dl>',
                '</a>',
            ].join('');
            return html
        },
        createTitleHtml: function (item) {
            if(this.last){
                var html = [
                    '<h1>正在抢购</h1>',
                ].join('');
            }else{
                var html = [
                    '<h1>限时抢购',
                        '<div class="time-wrap">',
                            '<img src="./img/time-icon.png" />',
                            //'<span id="daily-seckill-day"></span><small>:</small>',
                            '<span id="daily-seckill-hour"></span><small>:</small>',
                            '<span id="daily-seckill-minute"></span><small>:</small>',
                            '<span id="daily-seckill-second"></span>',
                        '</div>',
                    '</h1>',
                ].join('');
            }
            return html
        },
        createListHtml: function () {
            var seckillDetailList = this.data.cmsList[0].seckillDetailList
            var currentDetailList = seckillDetailList[0] ? seckillDetailList[0].productList : []
            var nextDetailList = seckillDetailList[1] ? seckillDetailList[1].productList : []
            var _this = this
            var aCurrentList = ''
            var aNextList = ''
            if(currentDetailList.length>0){
                $.map(currentDetailList,function(item,index){
                    aCurrentList += _this.createPrHtml(item)
                })
            }
            if(nextDetailList.length>0){
                $.map(nextDetailList,function(item,index){
                    aNextList += _this.createPrHtml(item)
                })
            }
            var html = [
                '<div class="daily-pr-list">',
                    '<div class="list-wrap">',
                        '<div class="pr-list current">',
                            aCurrentList,
                        '</div>',
                        //aNextList?'<div class="border">下期预告</div><div class="pr-list next">'+aNextList+'</div>':'',
                        aNextList?'<img src="./img/next.png" /><div class="pr-list next">'+aNextList+'</div>':'',
                    '</div>',
                '</div>',
            ].join('');
            return html
        },
        initHtml: function () {            
            var html = [
                '<div class="daily-seckill-tpl" id="cms-'+ this.data.cmsId +'">',
                    this.createTitleHtml(),
                    this.createListHtml(),
                '</div>',
            ].join('');
            return html
        },
        create: function () {
            rootDom.append(this.initHtml());
            this.initStyle().initEvent()
        },
        initStyle: function(){           
            return this
        },
        initEvent: function () {
            var _this = this
            var dailyProcuctScroll = new IScroll('.daily-pr-list', {
                bounce: false,
                scrollX: true,  
                scrollY: false,
                eventPassthrough: true,
                tap: true
            });
            if(!this.last){
                var date = this.data.cmsList[0].seckillDetailList[1].date
                countDown(date,{
                    //day: $('#daily-seckill-day'),
                    hour: $('#daily-seckill-hour'),
                    minute: $('#daily-seckill-minute'),
                    second: $('#daily-seckill-second')
                },function(){
                    $('.daily-seckill-tpl h1').html('正在抢购')
                    $('.daily-seckill-tpl .current').remove()
                    $('.daily-seckill-tpl .border').remove()     
                });
            }
        }
    };

    var SpecialProductScrollTpl = function(data){
        ProductScrollTpl.call(this,data);
    }
    SpecialProductScrollTpl.prototype = Object.create(ProductScrollTpl.prototype)
    SpecialProductScrollTpl.prototype.constructor = SpecialProductScrollTpl
    SpecialProductScrollTpl.prototype.initHtml = function(){
        var _show = '';
        if(this.data.cmsList.length >= 6){//大于等于6个显示全部按钮
            _show = 'display:block';
        } 
        // var _url = this.data.productDetail.oneUrl;           
        // if(!_url){
        //     _url = 'javascript:;'
        // }else{
        //     var _host = _url.indexOf('cId')>-1?_cmsBasePath:_basePath;
        //     _url = _host+_url
            
        // }
        var html = [
            '<div class="product-scroll-tpl special" id="cms-'+ this.data.cmsId +'">' +
                '<a href='+getUrl(this.data.productDetail.oneUrl) +' class="product-scroll-banner"><img src="'+ this.data.oneImage +'"></a>',
                '<div class="product-scroll-list swiper-container  product-scroll'+ this.data.cmsId +'">' +
                    '<section class="swiper-wrapper">'+ this.createNavHtml() +'' +
                        '<a class="product-type-1 swiper-slide slide-all" href='+ getUrl(this.data.productDetail.oneUrl) +' >' +
                            '<div class="pr-img product-all" style="'+_show+'">' +
                                '<span>查看全部<br>' +
                                    '<i>See All</i>' +
                                '</span>' +
                            '</div>' +
                        '</a>' +
                    '</section>',
                '</div>' +
            '</div>'
        ].join('');
        if (this.data) {
            return html
        }
    }
    var BrandSaleTpl = function(data){
        this.data = data
        this.now = +new Date()
    }
    BrandSaleTpl.prototype = {
        createNavHtml: function(list){
            var html = ''
            $.map(list,function(item,index){
                if(index < 6){//最多显示6个
                    html+=getProduct.type1(item)
                }
            });
            return html
        },
        oneBrandHtml: function(item,index){
            var _show = ''
            if(item.startTime>this.now){
                var countHtml = '距开始:<span id="br-start-hour-'+ this.data.cmsId +'-'+ index +'">00</span>:<span id="br-start-minute-'+ this.data.cmsId +'-'+ index +'">00</span>:<span id="br-start-second-'+ this.data.cmsId +'-'+ index +'">00</span>'
            }else if(item.endTime<this.now){
                var countHtml = '已结束'
            }else{
                var countHtml = '距结束:<span id="br-end-hour-'+ this.data.cmsId +'-'+ index +'">00</span>:<span id="br-end-minute-'+ this.data.cmsId +'-'+ index +'">00</span>:<span id="br-end-second-'+ this.data.cmsId +'-'+ index +'">00</span>'
            }
            
            if(item.productList.length >= 6){//大于等于6个显示全部按钮
                _show = 'display:block';
            } 
            var infohtml = [
                '<a class="br-info" href='+ getUrl(item.url) +'>'+
                    '<div class="wrap">'+
                        '<div class="count-down">'+
                            countHtml+
                        '</div>'+
                        '<div class="info">'+
                            '<img src="'+ item.brandImage +'" />'+
                            '<h1>'+ item.title +'</h1>'+
                            '<h2>'+ item.subtitle +'</h2>'+
                        '</div>'+
                    '</div>'+
                '</a>'
            ].join('');

            var prListHtml = [
                '<div class="product-scroll-list swiper-container product-scroll'+ this.data.cmsId +'">' +
                    '<section class="swiper-wrapper">'+ this.createNavHtml(item.productList) +'' +
                        '<a class="product-type-1 swiper-slide slide-all" href='+ getUrl(item.url) +'>' +
                            '<div class="pr-img product-all" style="'+_show+'">' +
                                '<span>查看全部<br>' +
                                    '<i>See All</i>' +
                                '</span>' +
                            '</div>' +
                        '</a>' +
                    '</section>'+
                '</div>'
            ].join('');

            var html = '<div class="one-brand" style="background-image:url('+ item.image +')">'+ infohtml+prListHtml +'</div>'
            return html
        },
        initHtml: function(){
            var listHtml = '';
            var _this = this
            $.map(this.data.cmsList,function(item,index){
                listHtml += _this.oneBrandHtml(item,index)
            });
            var html = [
                '<div class="brand-sale-tpl" id="cms-'+ this.data.cmsId +'">'+
                    '<div class="sale-list">'+
                        listHtml+
                    '</div>'+
                '</div>'
            ]
            return html
        },
        create: function(){
            rootDom.append(this.initHtml());
            this.initStyle().initEvent()
        },
        initStyle: function(){  
            // if(this.data.color&&this.data.color.oneColor){
            //     $('#cms-'+this.data.cmsId+' .crazy-list').css('background-color',colorTrans(this.data.color.oneColor))         
            //     $('#cms-'+this.data.cmsId+' .btn').css('background-color',colorTrans(this.data.color.oneColor))         
            // }
            
            return this
        },
        initEvent: function (time) {
            var _this = this
            var cmsList = this.data.cmsList
            var productSwiper = new Swiper ('.product-scroll'+ _this.data.cmsId, {
                spaceBetween: 8,
                slidesPerView: 3.5
            });
            new sildeAndroid('.product-scroll'+ _this.data.cmsId);
            for(var i=0;i<cmsList.length;i++){
                if(cmsList[i].startTime>this.now){
                    //距开始
                    countDown(cmsList[i].startTime,{
                        hour: $('#br-start-hour-'+ this.data.cmsId +'-'+ i),
                        minute: $('#br-start-minute-'+ this.data.cmsId +'-'+ i),
                        second: $('#br-start-second-'+ this.data.cmsId +'-'+ i)
                    },function(){
                        
                    });
                }else if(cmsList[i].endTime>this.now){
                    //距结束
                    countDown(cmsList[i].endTime,{
                        hour: $('#br-end-hour-'+ this.data.cmsId +'-'+ i),
                        minute: $('#br-end-minute-'+ this.data.cmsId +'-'+ i),
                        second: $('#br-end-second-'+ this.data.cmsId +'-'+ i)
                    },function(){
                        $('#cms-'+ _this.data.cmsId +' .count-down').eq(i).html('已结束')
                    });
                }
            }            
        }
    };

    var BrandCrazyTpl = function(data){
        this.data = data
    }
    BrandCrazyTpl.prototype = {
        itemHtml: function(item){
            var html = [
                '<a class="crazy-pr" href='+ getUrl(item.url) +'>'+
                    '<img src="'+ item.image +'" />'+
                    '<div class="pr-detail">'+
                        '<h1><p>'+ item.name +'</p></h1>'+
                        '<div class="progress">'+
                            '<div class="p-wrap">'+
                                '<div class="length" style="width:'+item.stockPercent+'%;"></div>'+
                            '</div>'+
                            '<span>'+ item.stockPercent +'%</span>'+
                        '</div>'+
                        '<div class="pb">'+
                            '<div class="price">'+
                                '<strong>&yen'+ item.lowPrice +'</strong>'+
                                '<del>&yen'+ item.highPrice +'</del>'+
                            '</div>'+
                            '<div class="btn">立即购买</div>'+
                        '</div>'+
                    '</div>'+
                '</a>'
            ].join('');
            return html
        },
        initHtml: function(){
            var _this = this
            var listHtml = ''
            $.map(this.data.cmsList,function(item,index){
                listHtml+=_this.itemHtml(item)
            });
            var html = '<div class="brand-crazy-tpl" id="cms-'+ this.data.cmsId +'"><div class="crazy-list">'+listHtml+'</div></div>'
            return html
        },
        create: function(){
            rootDom.append(this.initHtml());
            this.initStyle().initEvent()
        },
        initStyle: function(){  
            if(this.data.color&&this.data.color.oneColor){
                $('#cms-'+this.data.cmsId+' .crazy-list').css('background-color',colorTrans(this.data.color.oneColor))         
                $('#cms-'+this.data.cmsId+' .btn').css('background-color',colorTrans(this.data.color.oneColor))         
            }
            
            return this
        },
        initEvent: function(){
            
        }
    };
    var rootDom = $('#tpl-container');
    var factoryInterface = function(type,data,params){
        switch(type){
            case 1:
                return new BannerWithBroadcastTpl(data);
                break;
            case 2:
                return new PicDisplayTpl(data);
                break;
            case 3:
                return new ProductList3Tpl(data);
                break;
            case 4:
                return new NavBarScrollTpl(data);
                break;
            case 5:
                return new GegeWxTpl(data);
                break;
            case 6:
                return new BottomNavTpl(data);
                break;
            case 7:
                return new ProductList2Tpl(data);
                break;
            case 8:
                return new SwiperTpl(data);
                break;
            case 9:
                return new ProductScrollTpl(data);
                break;
            case 10:
                return new CouponsTpl(data,params);
                break;
            case 11:
                return new SeckillTpl(data);
                break;
            case 12:
                return new RecommendProductTpl(data);
                break;
            case 13:
                return new CollectProductTpl(data,params);
                break;
            case 14:
                return new MemberInfoTpl(data);
                break;
            case 15:
                return new HotBuyProductTpl(data);
                break;
            case 16:
                return new MemberProductList2Tpl(data);
                break;
            case 17:
                return new MemberProductScrollTpl(data);
                break;
            case 18:
                return new ScrollCouponsTpl(data);
                break;
            case 19:
                return new ScrollMoreProductTpl(data,params);
                break;
            case 20:
                return new DailySeckillTpl(data);
                break;
            case 21:
                return new SubjectScrollTpl(data);
                break;
            case 22:
                return new BottomLinkTpl(data);
                break;
            case 23:
                return new ShareCouponsTpl(data)
                break;
            case 24:
                return new TenRecommnedTpl(data)
                break;
            case 25:
                return new SpecialProductScrollTpl(data)
                break;
            case 26:
                return new BrandSaleTpl(data)
                break;
            case 27:
                return new BrandCrazyTpl(data)
                break;
        }
    };

    //初始化cms，先调用通用接口，如果遇到复杂类型再去调用复杂类型接口
    var InitCms = {
        initAccountInfo: function(params,fn){
            var _this = this;
            $.ajax({
                url: params.host+'/cms/cmsMemberInfo?'+linkInfoFun(),
                dataType: 'json',
                type: 'GET',
                success: function(res){
                    if (res.status === 1) {
                        _accountId = res.accountId;
                        if(res.isMember === 1){
                            memberObj.isMember = res.isMember;
                            memberObj.headImage = res.headImage ? res.headImage : '';
                            memberObj.nickname = res.nickname ? res.nickname : ''
                        }  
                        fn&&fn()                      
                    }
                }
            })
        },
        initCmsRequest: function(params){
            this.host = location.protocol+'//'+ location.host;
            this.root = $('#'+params.id);
            //判断捕手环境
            var hostName = location.host,
                pathName = location.pathname;

            if(pathName.indexOf('ygg-hqbs') > -1){
                this.host = this.host +'/ygg-hqbs'
            }

            // 微信环境加下载条
            // if (queryString('clientType') == 2) {
            //     //$('#wrapper').addClass('padding-top')
            //     $('#download').addClass('display-block').on('tap',function(){
            //         location.href = 'http://download.gegejia.com'
            //     })
            // }

            //调用接口读取数据
            var _this = this;
            _this.initAccountInfo(params,function(){
                $.ajax({
                    url: params.host+'/cms/detail1?' + linkInfoFun(),
                    // data: {
                    //     // source: queryString('source') || 2,
                    //     // cId: queryString('cId')
                    //     // clientType: queryString('clientType') || 1,
                    //     // accountId: queryString('clientType')==1?queryString('accountId'):_accountId,
                    //     // cmsInfoId: queryString('cmsInfoId') || 0
                    // },
                    dataType: 'json',
                    type: 'GET',
                    success: function(res){
                        if (res.status === 1) {
                            InitCms.initCmsData(true,res,params);
                            cmsCache.setCmsCache(res)
                        }else if(res.status == 4){//处理微信调用接口缓存授权问题
                            var _link = window.location.href;

                            if(_link.indexOf('?') > -1){
                                window.location.href = _link + '&cache='+Math.round(Math.random()*100);
                            }else{
                                window.location.href = _link + '?cache='+Math.round(Math.random()*100);
                            }
                        }else if(res.status == 5){//出错跳转首页
                            window.location.href = res.url;
                        }else{
                            toast.show('服务器错误')
                        }
                    }
                })
            })
        },
        initCmsData: function(loadType,res,params){
            var data = res.componentList,
                _this = this;

            if(!queryString('isApp')){
                brandShareFun(res.jsSdk)
            }
            _basePath = res.basePath;
            _cmsBasePath = res.cmsBasePath;
            //如果是读取缓存需要再调用用户信息接口
            if(!loadType){
                _this.initAccountInfo(params,function(){
                    for(var i=0,length=data.length;i<length;i++){
                        factoryInterface(data[i].type,data[i],params) && factoryInterface(data[i].type,data[i],params).create()
                    }
                    $('#loading').addClass('display-none');
                    function getScrollHeight() { 
                        return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight); 
                    }
                    // setTimeout(function(){
                    //     console.log(getScrollHeight())
                    // },2000)
                    var lz2 = lazyload($('#wrapper'),true,1500);
                    lz2();
                    window.addEventListener('scroll', throttle(lz2,400));
                    window.onunload = function(){
                        if (window.sessionStorage) {
                            window.sessionStorage.setItem('T',document.body.scrollTop)
                        }
                    };
                    document.body.scrollTop = window.sessionStorage.getItem('T') || 0
                })
            }else{
                for(var i=0,length=data.length;i<length;i++){
                    factoryInterface(data[i].type,data[i],params) && factoryInterface(data[i].type,data[i],params).create()
                }
                $('#loading').addClass('display-none');
                function getScrollHeight() { 
                    return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight); 
                }
                // setTimeout(function(){
                //     console.log(getScrollHeight())
                // },2000)
                var lz2 = lazyload($('#wrapper'),true,1500);
                lz2();
                window.addEventListener('scroll', throttle(lz2,400));
                window.onunload = function(){
                    if (window.sessionStorage) {
                        window.sessionStorage.setItem('T',document.body.scrollTop)
                    }
                };
                document.body.scrollTop = window.sessionStorage.getItem('T') || 0  
            }
            if (res.pageTitle) {
                document.title = res.pageTitle
            }    
        }
    };

    //缓存接口数据
    var cmsCache = {
        cmsCid : queryString('cId'),
        cmsDataTime : Date.parse(new Date()),
        cmsInfoData : [],
        getCmsCache: function (callback) {
            var _loadType = true,
                _loadCmsData = '',
                _this = cmsCache;

            if(localStorage.cmsData){//判断缓存是否存在cmsData
                _this.cmsInfoData = JSON.parse(localStorage.cmsData) ? JSON.parse(localStorage.cmsData):[];

                if(_this.cmsInfoData.length > 0){
                    _this.cmsInfoData.map(function (item,i) {
                        if(item.cId == _this.cmsCid){//遍历数组种是否存在当前访问cms id
                            if((item.creatTime + 60000) < _this.cmsDataTime){//判断缓存是否失效 (1分钟)
                                _loadType = true;
                                _this.cmsInfoData.splice(i,1)

                            }else{
                                _loadType = false;
                                _loadCmsData = item.dataInfo
                            }
                        }
                    })
                }
            }else{//首次进入设置cmsData
                window.localStorage.setItem('cmsData','');
            }
            callback && callback(_loadType, _loadCmsData);
        },
        setCmsCache: function (obj) { //数据存入localStorage
            var _this = cmsCache;

            if(_this.cmsInfoData.length >=10){//存10条，多的删掉第一条
                _this.cmsInfoData.splice(0,1)
            }

            var _dataInfo = {
                cId: _this.cmsCid,
                creatTime:_this.cmsDataTime,
                dataInfo:obj
            };
            _this.cmsInfoData.push(_dataInfo);
            localStorage.cmsData = JSON.stringify(_this.cmsInfoData)
        }
    };

    window.InitCms = InitCms;
    window.CmsCache = cmsCache;

})(window);