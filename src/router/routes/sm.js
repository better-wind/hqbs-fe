const smFl = r => require.ensure([], () => r(require('@/views/sm/fl')), 'sm') // 分类主页面
const smBd = r => require.ensure([], () => r(require('@/views/sm/bd')), 'sm') // 热门品牌
const smSc = r => require.ensure([], () => r(require('@/views/sm/sc')), 'sm') // 热门分类

export default [
  {
    path: '/sm/fl',
    name: 'smFl',
    component: smFl
  },
  {
    path: '/sm/bd/:id',
    name: 'smBd',
    component: smBd
  },
  {
    path: '/sm/sc/:id/:type/:fId',
    name: 'smSc',
    component: smSc
  }
]
