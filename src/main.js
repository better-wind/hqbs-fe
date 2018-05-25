// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import '../static/js/const'
import '@/utils/ext'
import Vue from 'vue'
import VueLazyload from 'vue-lazyload'
import router from './router'
import '@/lib/init'
import '@/assets/css/reset.css'
import '@/assets/dialog/fm.dialog.min.css'
import 'swiper/dist/css/swiper.css'
import '@/assets/css/swipers.css'
import App from './App'
import store from './store'
import auth from '@/utils/auth'
import tools from '@/utils/tools'
import session from '@/utils/session-lite'

Vue.config.productionTip = false
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'https://yangege.b0.upaiyun.com/1794a971b4043.png',
  loading: 'https://yangege.b0.upaiyun.com/1794a971b4043.png'
})

router.beforeEach((to, from, next) => {

  if(to.query.accountid) {//记录accountid 拉粉
    session.set('accountId',to.query.accountid);
  }

  // if (!auth.isLoggedIn() && to.query.code) {
  //   auth.loginByCode(to, from, next)
  // }

  // console.log('to:',to)
  if (to.meta.title) {
    tools.setTitle(to.meta.title)
  }

  // if (to.query.isApp && to.query.sign) {
  //   tools.appParam(to)
  // }

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!auth.isLoggedIn()) {
      auth.login(to.fullPath)
    } else {
      next()
    }
  } else {
    next()
  }
})

/* router.afterEach((to, from, next) => {
  window.scrollTo(0, 0);
}) */

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
