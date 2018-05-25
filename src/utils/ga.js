import MD5 from './md5'
import _ls from './storage-lite'
import config from '@/service/config'
import request from '@/service/request'

const _app_version = window.navigator.appVersion;
const isAndroid = !!_app_version.match(/android/gi);
const isIOS = !!_app_version.match(/iphone/gi) || !!_app_version.match(/ipad/gi);
const hoster = window.location.hostname.indexOf('test') > -1 ? window.location.protocol + '//testmaidian.51bushou.com' : window.location.protocol + '//bigdatacollect.gegejia.com';
const generateUUID = () => {
    let d = new Date().getTime();
    let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
    });
    uuid = uuid.replace(/-/g, '');
    return uuid;
}
class GanalyticsBase {
    constructor(opts) {
        this.options = opts
        this.gaData = {
            productIdChain: 0,
            cartProductIdChain: 0
        }
        this.init()
    }
    init() {
        let conf = new config()
        conf.url = `/ygg-hqbs/track/tag`
        return new request(conf).POST().then((data) => {
            this.gaData.accountId = data.userTag || 0
            this.gaData = Object.assign(this.gaData, this.getData())
            document.referrer.indexOf('51bushou.com') > -1 ? this.oldSessionHandler() : this.newSessionHandler();
            this.action();
        })
    }
    //非首次进入,拼接参数
    oldSessionHandler() {
        if (this.gaData.hasOwnProperty('sessionId')) {
            this.dataConcat()
        } else {
            this.firstInit()
        }
    }
    //首次进入，上传旧的数据并清空
    newSessionHandler() {
        this.gaData.hasOwnProperty('sessionId') && this.start(); //发送老数据
        this.gaData = {
            oldSessionId: this.gaData.sessionId
        };
        this.firstInit()
    }
    firstInit() {
        this.getBaseInfo(); //获取基本信息
        this.dataConcat();
        this.start()
    }
    getBaseInfo() {
        if (isAndroid) {
            let _str = _app_version.split('Android ')[1];
            this.gaData.os = 'android' + _str.substr(0, _str.indexOf(';')).replace(/\s+/g, "");
        } else if (isIOS) {
            this.gaData.os = 'iOS' + _app_version.substr(_app_version.indexOf('OS '), _app_version.indexOf(' like') - _app_version.indexOf('OS ')).replace(/_/g, '.').replace(/\s+/g, "")
        }
        this.gaData = Object.assign(this.gaData, {
            sessionId: generateUUID.call(),
            platform: _app_version.indexOf('globalscanner') > 0 ? '104' : '101',
        })
    }
    getImei() {
        let _imei = _ls.get('_ga_imei')
        if (!_imei) {
            _imei = generateUUID.call()
            _ls.set('_ga_imei', _imei)
        }
        return _imei;
    }
    gpm(id) {
        return !this.gaData.gpm ? id + '' : this.gaData.gpm + '-' + id;
    }
    productidChain(id) {
        this.gaData.productIdChain = this.gaData.productIdChain || 0
        return this.gaData.productIdChain == '0' && !id ? '0' : (this.gaData.productIdChain == '0' ? id + '' : (!id ? this.gaData.productIdChain : this.gaData.productIdChain + '-' + id));
    }
    cartProductidChain(id) {
        this.gaData.cartProductIdChain = this.gaData.cartProductIdChain || 0
        return this.gaData.cartProductIdChain == '0' && !id ? '0' : (this.gaData.cartProductIdChain == '0' ? id + '' : (!id ? this.gaData.cartProductIdChain : this.gaData.cartProductIdChain + '-' + id));
    }
    dataConcat() {
        this.gaData.gpm = this.gpm(this.options.gpm)
        this.gaData.productIdChain = this.productidChain(this.options.productIdChain)
        this.gaData.cartProductIdChain = this.cartProductidChain(this.options.cartProductIdChain)
        this.gaData = Object.assign(this.gaData, this.options)
        this.gaData.targetType = this.options.targetType
        this.gaData.targetId = this.options.targetId
        this.gaData.tag = this.options.tag
        this.gaData.position = this.options.position
        this.gaData.udata = this.options.udata
        this.gaData.imei = this.getImei()
        this.setData();
    }
    getData(key) {
        const _data = _ls.get('_ga_data');
        return !!key ? _data[key] : _data;
    }
    setData() {
        typeof this.gaData === 'object' && _ls.set('_ga_data', this.gaData);
    }
    sign(obj) {
        let str = ''
        Object.keys(obj).sort().forEach(k => {
            if (!obj[k]) {
                delete obj[k]
            } else {
                str = str + `${k}=${obj[k]}&`
            }
        })
        return obj.sign = MD5.hex_md5(`${str}gegejia-track-2017`).substr(8, 16).toUpperCase(), obj
    }
    start() {
        let conf = new config()
        conf.data = this.sign({
            oldSessionId: this.gaData.oldSessionId,
            sessionId: this.gaData.sessionId,
            accountId: this.gaData.accountId,
            platform: this.gaData.platform,
            os: this.gaData.os,
            imei: this.gaData.imei
        })
        conf.url = `${hoster}/gegejia-track/track/start`
        return new request(conf).POST()
    }
    action() {
        let conf = new config()
        conf.data = this.sign({
            sessionId: this.gaData.sessionId,
            accountId: this.gaData.accountId,
            platform: this.gaData.platform,
            imei: this.gaData.imei,
            targetType: this.gaData.targetType,
            targetId: this.gaData.targetId,
            gpm: this.gaData.gpm,
            udata: this.gaData.udata,
            productIdChain: this.gaData.productIdChain,
            cartProductIdChain: this.gaData.cartProductIdChain,
            tag: this.gaData.tag,
            position: this.gaData.position,
        })
        conf.url = `${hoster}/gegejia-track/track/action`
        return new request(conf).POST()
    }
    report(opts) {
        this.gaData.action = opts.action;
        this.gaData.position = opts.position;
        if (opts.targetType) this.gaData.targetType = opts.targetType;
        this.gaData.udata = JSON.stringify(opts.udata) || this.gaData.udata;
        this.gaData.cartProductIdChain = this.cartProductidChain(opts.cartProductIdChain);
        this.gaData.gpm = this.gpm(opts.targetType)
        this.setData()
        this.action();
    }
}
export class Ganalytics {
    constructor(opts) {
        //初始化
        this.gg = new GanalyticsBase(opts);
    }
    report(opts) {
        //上报数据
        gg && gg.report(opts)
    }
}
