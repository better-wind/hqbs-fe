import types from './types'
import service from '@/service/service-activity'

export default {
  quizzesInfoAction ({commit}, options) {
    return service.getQuizzesInfo(options).then((data) => {
      commit(types.GET_QUIZZES_INFO, { data: data })
    })
  },
  startQuizzesAction ({commit}, options) {
    return service.startQuizzes(options).then((data) => {
      commit(types.START_QUIZZES, { data: data })
    })
  },
  quizzesSuccessAction ({commit}, options) {
    return service.getQuizzesSuccess(options).then((data) => {
      commit(types.GET_QUIZZES_SUCCESS, { data: data })
    })
  },
  rightNumAction ({commit}, options){
    commit(types.RIGHT_NUM, {data: options})
  }
}
