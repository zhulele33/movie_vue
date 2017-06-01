import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/film/FilmList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/navCinema',
      name: 'CinemaList',
      component: resolve => {require(['../components/cinema/CinemaList.vue'], resolve)}
    },
    {
      path: '/film_detail',
      name: 'FilmDetail',
      component:resolve => {require(['../components/film/FilmDetail.vue'], resolve)}
    },
    {
      path: '/photolist',
      name: 'Photolist',
      component:resolve => {require(['../components/stagePhoto/photo_list.vue'], resolve)}
    },
    {
      path: '/cinema_detail',
      name: 'cinemaDetail',
      component:resolve => {require(['../components/cinema/CinemaDetail.vue'],resolve)}
    },
    {
      path: '/citys',
      name:"Citys",
      component:resolve => {require(['../components/region/RegionIndex.vue'], resolve)}
    },
    {
      path: '/seat',
      name: 'foretell',
      component:resolve => {require(['../components/ticket/foretell_seat.vue'], resolve)}
    },
    {
      path: '/orderList',
      name: 'OrderList',
      component:resolve => {require(['../components/order/OrderList.vue'], resolve)}
    },
    {
      path: '/orderDetail',
      name: 'OrderDetail',
      component:resolve => {require(['../components/order/OrderDetail.vue'], resolve)}

    },
    {
      path: '/buyTicket',
      name: 'buyTicket',
      component:resolve => {require(['../components/buyTicket/buyticket.vue'], resolve)}
    },
    {
      path: '/foretellConfirm',
      name: 'ForetellConfirm',
      component:resolve => {require(['../components/order/ForetellConfirm.vue'], resolve)}
    },
    {
      path: '/ticketConfirm',
      name: 'TicketConfirm',
      component:resolve => {require(['../components/order/TicketConfirm.vue'], resolve)}
    },
    {
      path: '/orderPay',
      name: 'OrderPay',
      component:resolve => {require(['../components/order/OrderPay.vue'], resolve)}
    }
  ]
})
