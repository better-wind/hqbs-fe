const miniIntro = r => require.ensure([], () => r(require('@/views/mini/intro')), 'mini')

export default [
  {
    path: '/mini/intro',
    name: 'miniIntro',
    component: miniIntro
  }
]
