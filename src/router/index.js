import Vue from 'vue'
import Router from 'vue-router'
import login from './routes/login'
import product from './routes/product'
import logout from './routes/logout'
import mini from './routes/mini'
import sm from './routes/sm'
import search from './routes/search'
import recommend from './routes/recommend'
import compose from './routes/compose'
import berserk from './routes/berserk'
import activity from './routes/activity'
const NotFound = resolve => require(['@/views/404'], resolve)
const Index = r => require.ensure([], () => r(require('@/views/index')), 'index')
const WxAuth = r => require.ensure([], () => r(require('@/views/wxauth')), 'wxauth')

Vue.use(Router)

const routes = [
  {
    path: '/wxauth',
    component: WxAuth,
    name: 'wxAuth'
  },
  ...login,
  ...logout,
  ...product,
  ...search,
  ...sm,
  ...recommend,
  ...compose,
  ...berserk,
  ...activity
]

const rootPath = window.routerPrefix
routes.map(route => {
  route.path = rootPath + route.path
  return route
})

routes.push(...mini)
routes.push({
  path: '/',
  name: 'index',
  component: Index,
  meta: {
    keepAlive: true
  }
})
// 404
routes.push({
  path: '*',
  component: NotFound,
  name: 'notfound'
})

export default new Router({
  mode: 'history',
  routes: routes
})
