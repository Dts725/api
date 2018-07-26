import Vue from 'vue'
import Router from 'vue-router'
import test from '@/components/test'
import login from '@/components/login'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/',
      name: 'test',
      component: test
    }
  ]
})
