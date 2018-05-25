const recommend = r => require.ensure([], () => r(require('@/views/recommend/recommend')), 'recommend')

export default [
  {
    path: '/recommend',
    name: 'recommend',
    component: recommend
  }
]
