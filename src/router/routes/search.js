const search = r => require.ensure([], () => r(require('@/views/search/search')), 'search')

export default [
  {
    path: '/search',
    name: 'search',
    component: search,
    meta: {
      keepAlive: true
    }
  }
]
