const compose = r => require.ensure([], () => r(require('@/views/compose/zuhe')), 'zuhe')
export default [
  {
    path: '/compose/:id',
    name: 'compose',
    component: compose,
    meta: {
      keepAlive: true
    }
  }
]
