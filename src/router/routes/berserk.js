const berserk = r => require.ensure([], () => r(require('@/views/berserk/berserk')), 'berserk')
export default [
  {
    path: '/berserk',
    name: 'berserk',
    component: berserk,
    meta: {
      keepAlive: true
    }
  }
]
