// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'
import VueResource from 'vue-resource'
import infiniteScroll from 'vue-infinite-scroll'
import VueAwesomeSwiper from 'vue-awesome-swiper/ssr'
import loginFun from './script/login'

Vue.use(infiniteScroll)
Vue.use(VueResource)
Vue.use(VueAwesomeSwiper)
Vue.use(loginFun)


Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})


