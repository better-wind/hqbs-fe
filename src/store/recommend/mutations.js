import types from './types'

export default {
  [types.GET_BASE_INFO] (state, payload) {
    state.sBaseInfo = payload.data
  },
  [types.GET_NEW_ITEM_LIST] (state, payload) {
    state.sNewItemList = payload.data.editorRecList
  },
}
