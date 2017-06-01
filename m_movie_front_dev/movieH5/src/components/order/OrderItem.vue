<template>
    <li class="list_item">
      <p class="states clearfix">
        <i class="icon-film fl"></i>
        <router-link :to="{ path: '/cinema_detail', query: { cinemaId: itemdata.productList[0].cinemaID }}"><span class="cinema fl">{{itemdata.productList[0].cinemaName}}</span></router-link>
        <span class="curr_state fr">
          <div v-if="itemdata.orderStatus == 1">等待付款</div>
          <div v-else-if="itemdata.orderStatus == 2">支付成功</div>
          <div v-else-if="itemdata.orderStatus == 3">支付失败</div>
          <div v-else-if="itemdata.orderStatus == 4">等待出票</div>
          <div v-else-if="itemdata.orderStatus == 5">出票成功</div>
          <div v-else-if="itemdata.orderStatus == 6">部分妥投成功</div>
          <div v-else-if="itemdata.orderStatus == 7">出票失败</div>
          <div v-else-if="itemdata.orderStatus == 8">过期关闭</div>
          <div v-else-if="itemdata.orderStatus == 9">已取消</div>
        </span>
      </p>
      <router-link :to="{ path: '/orderDetail', query: { orderNo: itemdata.siteOrderNo }}">
      <div class="film_info">
        <div v-if="itemdata.orderType == 2">
          <p class="film_name">{{itemdata.productList[0].filmName}}</p>
          <p class="show_time">{{itemdata.productList[0].foretellShowDate}}</p>
          <p class="count clearfix">
            <span class="film_count fl">{{itemdata.productList[0].productQuantity}}张（{{itemdata.productList[0].seatName}})</span>
            <span class="film_price fr"><i>&#165 </i>{{itemdata.productList[0].productPrice}}</span>
          </p>
        </div>
        <div v-else>
          <p class="film_name">{{itemdata.productList[0].productName}}</p>
          <p class="show_time">{{itemdata.productList[0].ticketExpiresDate}}</p>
          <p class="count clearfix">
            <span class="film_count fl">{{itemdata.productList[0].productQuantity}}张</span>
            <span class="film_price fr"><i>&#165 </i>{{itemdata.productList[0].productPrice}}</span>
          </p>
        </div>
      </div>
      </router-link>
      <div v-if="itemdata.orderStatus == 1">
          <router-link to="orderDetail">去付款</router-link>
      </div>
    </li>
</template>

<script>
  export default {
    name: 'orderItem',
    props: ['itemdata']
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
