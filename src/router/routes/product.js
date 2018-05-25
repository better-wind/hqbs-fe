const detail = r => require.ensure([], () => r(require('@/views/product/detail/index')), 'productDetail')
const zizhi = r => require.ensure([], () => r(require('@/views/qualification/qualification')), 'qualification')

export default [
  {
    path: '/product/detail/:id',
    name: 'productDetail',
    component: detail
  },
  {
    path: '/qualification',
    name: 'qualification',
    component: zizhi
  }
]
