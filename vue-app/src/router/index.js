import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Login from '@/views/Login'
import About from '@/views/About'
import ClassList from '@/components/ClassList'
import Error from '@/components/Error'
import Find from '@/components/Find'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '',
      component: Login
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/about',
      name: 'About',
      component: About,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/home',
      component: Home,
      meta: {
        requireAuth: true
      },
      children: [
        {
          path: '/classlist',
          name: 'ClassList',
          component: ClassList,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/error',
          name: 'Error',
          component: Error,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/find',
          name: 'Find',
          component: Find,
          meta: {
            requireAuth: true
          }
        }
      ]
    }
  ]
})
