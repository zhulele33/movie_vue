<template>
  <div>
    <div class="container">
      <ul class="order_list" v-infinite-scroll="loadMore"
          infinite-scroll-disabled="busy"
          infinite-scroll-distance="100">
            <div v-for="item in orderItems">
              <OrderItem :itemdata='item'></OrderItem>
            </div>
      </ul>
      <p class="hasnomore">{{loadingTip}}</p>
    </div>
  </div>
</template>

<script>
  import OrderItem from './OrderItem.vue'
  export default {
    name: 'orderList',
    data () {
      return {
        orderItems:[],
        apiUrl: '/wap/order/getList.json',
        loadingTip:"努力加载中...",
        busy: false,
        page:{
          pageCount:1,
          pageIndex:1,
          pageSize:10,
          recordCount:10
        }
      }
    },
    beforeCreate () {
      this.$store.dispatch('editHeadMsg', '电影订单');
    },
    beforeMount()
    {

    },
    components: {
      OrderItem
    },
    mounted () {

    },
    methods: {
      loadMore: function () {
        this.busy = true;
        console.log(this.page.pageIndex);
        if(this.page.pageIndex > this.page.pageCount){
          this.loadingTip = "没有更多了~";
        }else if(this.page.pageIndex<=this.page.pageCount){
          this.getOrderList();
          this.busy = false;
        }
      },

      getOrderList: function () {
        this.$http.get(this.apiUrl+"?pageIndex="+this.page.pageIndex)
          .then((response) => {
            if (response.body.isSuccess == 'Y') {
              var dataObj = JSON.parse(response.body.data);
              this.orderItems =  dataObj.list;
              this.page.pageIndex++;
            }
            else {
              console.log(response.body.isSuccess);
              this.orderItems =  [];
              if (response.body.failCode =='E100')
              {
                this.gotologin(window.location.href);
              }
            }
          })
          .catch(function (response) {
            console.log(response);
            this.orderItems = [];
          });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scope>
   @import '../../style/order_list.scss';
</style>
