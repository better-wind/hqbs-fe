import Vue from 'vue'
import Vuex from 'vuex'
import storage from '../utils/session-lite'
import { createSessionPlugin } from './plugins'
import state from './state'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'
import modSearch from './search/search'
import modCompose from './compose/zuhe'
import modSm from './sm'
import modLogin from './login'
import modProduct from './product'
import modRecommend from './recommend'
import modActivityQuizzes from './activity/quizzes'

const SS_KEY = '@GGJHQBSFE'
const syncData = storage.get(SS_KEY)
//需要存储的state
let mapping = {
  modLogin: ['addrData', 'userInfo']
}
//白名单中mutation数据进sessionStorage
// console.log(modLogin)
let mWhiteList = [
	`modLogin/${modLogin.types.GET_ADDRS}`,
	`modLogin/${modLogin.types.GET_USERINFO}`
]
if (syncData) {
  Object.assign(modLogin.state, syncData.modLogin)// login数据还原
}
const plugin = createSessionPlugin(SS_KEY, mapping, mWhiteList)

Vue.use(Vuex)

const option = {
  state,
  getters,
  actions,
  mutations,
  plugins: [plugin],
  modules: {
    modSm,
    modSearch,
    modCompose,
    modLogin,
    modProduct,
    modRecommend,
    modActivityQuizzes
  }
}
export default new Vuex.Store(option)
