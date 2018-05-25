import Vue from 'vue'
import config from '@/service/config'
import request, { httpRequest } from '@/service/request'
let conf
const home = {
    namespaced: true,
    state: {        
        isLoading: false,
        hotWordData:'',
        matchListData:'',
        searchData:{
            resultList:[],
            recommendList:[],
            searchList:[]
        }
    },
    actions:{
        /**
           * getAddress 获取搜索列表
           * @param  {Function} options.commit [description]
           * @param  {Object} options        [description]
           * @return {Promise}                [description]
        */
        getSearchList ({commit,state},options={}) {
            state.isLoading = true
            const {data = ''} = options
            conf = new config()  
            conf.data = data    
            conf.url = '/ygg-hqbs/search/infoList' 
            return new request(conf).POST().then((data) =>{
                state.isLoading = false
                if(data.type == 1){
                    window.location.href = data.url;
                    return false;
                }
                if(data.status == 1){                    
                    if(data.resultList.length>0){
                        data.searchList=state.searchData.searchList.concat(data.resultList); 
                    }else{
                        data.searchList=state.searchData.searchList.concat(data.recommendList);
                    }                    
                }
                commit('SearchList',data)
                
            })
        },
        /**
           * getAddress 获取热门搜索
           * @param  {Function} options.commit [description]
           * @param  {Object} options        [description]
           * @return {Promise}                [description]
        */
        getHotWord ({commit,state},options={}){
            const {data = ''} = options
            conf = new config() 
            conf.data = data   
            conf.url = '/ygg-hqbs/search/hot'       
            return new request(conf).POST().then((data) =>{
                if(data.status==1){
                    commit('hotWord',data.hotList)
                }
            })  
        },
        /**
           * getAddress 获取输入匹配下拉列表
           * @param  {Function} options.commit [description]
           * @param  {Object} options        [description]
           * @return {Promise}                [description]
        */
        getMatchList ({commit,state},options={}){
            const {data = ''} = options
            conf = new config() 
            conf.data = data   
            conf.url = '/ygg-hqbs/search/associateWord'       
            return new request(conf).POST().then((data) =>{
                if(data.status==1){
                    commit('matchList',data.wordList)
                }
            })  
        }
    },
    mutations:{
        SearchList (state, data) {
            state.searchData = data
        },
        hotWord (state, data) {
            state.hotWordData = data
        },
        matchList (state, data) {
            state.matchListData = data
        }
       
    },
    getters:{
       
    }
}
export default home