const Login = resolve => require(['@/views/login/login'], resolve)
const AddrSelector = resolve => require(['@/views/login/addrSelector'], resolve)
const Introducer = resolve => require(['@/views/login/introducer'], resolve)
const Bound = resolve => require(['@/views/login/bound'], resolve)
const Merge = resolve => require(['@/views/login/merge'], resolve)

export default [
  {
    path: '/login',
    name: 'login',
    component: Login
    // beforeEnter (to, from, next) {
    //   if (auth.isLoggedIn()) {
    //     next('/')
    //   } else {
    //     next()
    //   }
    // }
  },
  {
    path: '/login/selector',
    name: 'addrSelector',
    component: AddrSelector,
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/login/introducer',
    name: 'introducer',
    component: Introducer
  },
  {
    path: '/login/bound',
    name: 'bound',
    component: Bound
  },
  {
    path: '/login/merge',
    name: 'merge',
    component: Merge
  }
]
