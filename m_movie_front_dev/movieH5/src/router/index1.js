import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Hello from '@/components/Hello'
import World from '@/components/World'
import LoginFather from '@/components/LoginFather'
import Todo from '@/components/Todo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/world',
      name: 'World',
      component: World
    },
    {
      path: '/hello',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/father',
      name: 'Father',
      component: resolve => {require(['../components/Demos/Father.vue'], resolve)}
    },
    {
      path: '/loginfather',
      name: 'LoginFather',
      component: LoginFather
    },
    {
      path: '/todo',
      name: 'Todo',
      component: Todo
    }
  ],mode: 'history'
})
