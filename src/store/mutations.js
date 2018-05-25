import types from './types'

export default {
  [types.GET_HOME] (state, payload) {
    let result = payload.data
    state.homeData = result ? result : ''
  },
  [types.GET_HOT] (state, payload) {
    let result = payload.data
    state.homeHotData = result ? result : ''
  },
  [types.GET_LIKE] (state, payload) {  
    let result = payload.data
    state.homeLikeData = result ? result : ''
  }
}
