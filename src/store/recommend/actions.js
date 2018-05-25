import types from './types'
import service from '@/service/service-new'

export default {
  newItemListAction ({commit}, options) {
    return service.getNewItemList(options).then((data) => {
      commit(types.GET_NEW_ITEM_LIST, { data: data })
    })
  },
}
