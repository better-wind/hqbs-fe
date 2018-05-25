import types from './types'

export default {
  [types.GET_QUIZZES_INFO] (state, payload) {
    state.sQuizzesInfo = payload.data
  },
  [types.START_QUIZZES] (state, payload) {
    state.sStartQuizzes = payload.data
  },
  [types.GET_QUIZZES_SUCCESS] (state, payload) {
    state.sQuizzesSuccess = payload.data
  },
  [types.RIGHT_NUM] (state, payload) {
    state.sRightNum = payload.data
  }
}
