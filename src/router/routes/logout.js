import auth from '@/utils/auth'

export default [
  {
    path: '/logout',
    name: 'logout',
    beforeEnter (to, from, next) {
      if (auth.isLoggedIn()) {
        auth.logout()
      }
      next('/login')
    }
  }
]
