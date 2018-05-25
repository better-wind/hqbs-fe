const index = r => require.ensure([], () => r(require('@/views/activity/quizzes/index')), 'quizzesIndex')
const main = r => require.ensure([], () => r(require('@/views/activity/quizzes/main')), 'quizzesMain')
const result = r => require.ensure([], () => r(require('@/views/activity/quizzes/result')), 'quizzesResult')
export default [
  {
    path: '/activity/quizzes/index',
    name: 'quizzesIndex',
    component: index
  },
  {
    path: '/activity/quizzes/main',
    name: 'quizzesMain',
    component: main
  },
  {
    path: '/activity/quizzes/result',
    name: 'quizzesResult',
    component: result
  }
]
