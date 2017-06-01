<template>
  <li class="cinema_item">
    <router-link :to = "{ path: '/cinema_detail', query: { cinemaId: itemdata.cinemaID,productId:productId }}" class="cinema_item_link clearfix">
      <div class="cinema_info fl">
        <h3 class="cinema_title ellipsis">{{itemdata.cinemaName}}</h3>
        <p class="cinema_addr ellipsis">{{itemdata.cinemaAddress}}</p>
        <p class="cinema_label">
          <template v-if="itemdata.minTicketPrice!=null">
            <span class="quan">券</span>
          </template>
          <template v-if="itemdata.minSeatPrice!=null">
            <span class="zuo">座</span>
          </template>
          <template v-if="itemdata.promotionFlag=='1'">
            <span class="jiang">降</span>
          </template>
        </p>
      </div>
      <div class="cinema_price fr">
        <!-- <p class="distance">2.4km</p> -->
        <p class="price"><em>&#165</em>{{minPrice}}<i>起</i></p>
      </div>
    </router-link>
  </li>
</template>
<script>
  export default{
    name: 'film_item',
    props: ['itemdata','productId'],
     data () {
      return {
        minPrice:0
      }
    },
/*    computed:{
        minPriceFun:{
          set: function (v) {
            this.itemdata.minPrice = v;
          },
          get:function(){
            return this.itemdata;
          }
        }
    },*/
    mounted() {
      this.minPriceFun = 0;
      // console.log(this.itemdata)
      this.minPrice = (function(item){
        if(item.minSeatPrice!=null){
          if(item.minTicketPrice!=null){
            return item.minSeatPrice<=item.minTicketPrice?item.minSeatPrice:item.minTicketPrice;
          }else{
            return item.minSeatPrice
          }
        }else{
          if(item.minTicketPrice!=null ){
            return item.minTicketPrice;
          }else{
            return 0;
          }
        }
      })(this.itemdata);
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../style/cinema_items.scss";
</style>
