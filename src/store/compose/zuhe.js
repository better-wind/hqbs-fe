import Vue from 'vue'
import config from '@/service/config'
import request, { httpRequest } from '@/service/request'
let conf
const home = {
    namespaced: true,
    state: {        
        isLoading: false,
        zuheTopNav:'',
        zuheTopData:'',
        zuheListData:[]       
    },
    actions:{        
        /**
           * getAddress 获取组合列表
           * @param  {Function} options.commit [description]
           * @param  {Object} options        [description]
           * @return {Promise}                [description]
        */
        getzuheList ({commit,state},options={}){
            state.isLoading = true
            const {data = ''} = options
            conf = new config() 
            conf.data = data   
            conf.url = '/ygg-hqbs/cnty/toac/detail'       
            return new request(conf).POST().then((data) =>{
                state.isLoading = false
                if(data.status==1){
                    data.productDetailList=state.zuheListData.concat(data.productDetailList)
                    commit('zuHeListData',data.productDetailList)
                }
            })  
        },
        /**
           * getAddress 获取组合头部数据
           * @param  {Function} options.commit [description]
           * @param  {Object} options        [description]
           * @return {Promise}                [description]
        */
        getzuheTop ({commit,state},options={}){
            const {data = ''} = options
            conf = new config() 
            conf.data = data   
            conf.url = '/ygg-hqbs/cnty/toacsp'       
            return new request(conf).POST().then((data) =>{
               commit('zuHeTopData',data)
            })  
        },
        /**
           * getAddress 获取导航店铺数据
           * @param  {Function} options.commit [description]
           * @param  {Object} options        [description]
           * @return {Promise}                [description]
        */
        getzuheTopnav ({commit,state},options={}){
            const {data = ''} = options
            conf = new config() 
            conf.data = data   
            conf.url = '/ygg-hqbs/cnty/toac/recommend'       
            return new request(conf).POST().then((data) =>{
               commit('zuheTopNav',data)
            })  
        }
    },
    mutations:{
        zuHeListData (state, data) {
            state.zuheListData = data
        },
        zuHeTopData (state, data) {
            state.zuheTopData = data
        },
        zuheTopNav (state, data) {
            state.zuheTopNav = data
        }
    },
    getters:{
       
    }
}
export default home