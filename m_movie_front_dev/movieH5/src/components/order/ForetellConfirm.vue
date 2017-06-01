<template>
  <div>
    <div class="container">
      <section class="movie_info">
          <p class="movie_name">{{productList.filmName}}</p>
          <p class="movie_addr">{{productList.cinemaName}} - <em>{{productList.hallName}}</em> <span class="type"> {{productList.foretellDimensional}}</span></p>
          <p class="show_time">{{productList.foretellShowDate}}</p>
          <p class="count">{{quantity}}张 （{{productList.seatName}})</p>
      </section>
      <section class=" order_block" id="order_price">
        <span class="block_name">订单金额</span>
        <span class=" block-des">
				<span class="price"><i>&#165</i> {{productList.productTotal}}</span>
				<span class="price_detail">&#165 {{productPrice}} x {{quantity}}</span>
			</span>
      </section>
      <section class="order_block" v-if="dataInfo.discountTotal > 0">
        <span class="block_name">国美直降金额<i class="jiang"></i></span>
        <span class=" block-des"><i>&#165</i> {{dataInfo.discountTotal}}</span>
      </section>
      <section class="order_block" v-if="couponList.length == 0">
        <span class="block_name">使用优惠券</span>
        <span class="block-des" >暂无可用优惠券</span>
      </section>
      <section class="order_block" v-else  v-on:click="showCouponPageFun">
          <span class="block_name">使用优惠券</span>
          <span class="block-des">
            <span class="icon-arrow-r"></span>
          </span>
      </section>
      <section class="order_block">
        <span class="block_name">接受电子兑换券</span>
        <input class=" block-des" type="number" v-on:input="inputMobile" v-model="mobileNum" placeholder="请输入电话号码">
      </section>
    </div>
    <footer class="submitBtn clearfix">
      <div class="pay_count fl"><label>应付：</label><span class="discount"><i>&#165</i> {{dataInfo.total}}</span></div>
      <div class="sub_btn fr" v-on:click="toPayFun">立即支付</div>
    </footer>

    <CouponList :couponList="couponList" :quantity="quantity" :randomCode="randomCode"
                @onCouponSelectedFun="onCouponSelectedFun"
                @onCouponReturnFun="onCouponReturnFun"
                v-bind:class="{hide:isHideCoponPage}"></CouponList>
  </div>
</template>

<script>
  import CouponList from './CouponList.vue'
  export default {
    name: 'orderDetail',
    components:{CouponList},
    data () {
      return {
        quantity:this.$route.query.seatID.toString().split(',').length,
        mobileNum:'输入手机号',
        dataInfo:{},
        couponList:[],
        selectedCouponList: [],
        productList:{},
        productPrice:0,
        lockSeat: '/wap/foretell/confirm.json', //提交电影片订单
        queryPriceUrl: '/wap/foretell/queryPrice.json', //提交电影片订单
        isHideCoponPage:true,
        randomCode:'',
        payPassword:''
      }
    },
    beforeCreate () {
      this.$store.dispatch('editHeadMsg', '确认订单')
      this.$store.dispatch('editIsHeadHomeShow', 0)
    },
    mounted()
    {
      this.lockSeatFun();
      this.queryPrice();
    },
    methods: {
      //执行锁座
      lockSeatFun: function()
      {
        var curParams =
          {
            foretellID: this.$route.query.foretellID,
            seatID:this.$route.query.seatID.toString()
          };
        this.$http.post(this.lockSeat, curParams,{emulateJSON:true})
          .then((response) => {
            if (response.body.isSuccess == 'Y') {
              var dataObj = JSON.parse(response.body.data);
              this.randomCode = dataObj.r;
            }
            else {
              this.dataInfo = {};
              this.couponList = [];
              if (response.body.failCode =='E100')
              {
                this.gotologin(window.location.href);
              }
            }
          })
          .catch(function (response) {
            console.log(response)
          });
      },
      queryPrice: function () {
          var curParams={
            orderType:2,
            productList:JSON.stringify([{productID: this.$route.query.foretellID, productQuantity:this.quantity, seatID:this.$route.query.seatID.toString()}]),
            couponList:JSON.stringify(this.selectedCouponList)
          }
        this.$http.post(this.queryPriceUrl, curParams,{emulateJSON:true})
          .then((response) => {
            if (response.body.isSuccess == 'Y') {
              var dataObj = JSON.parse(response.body.data);
              console.log(dataObj);
              this.dataInfo = dataObj;
              this.couponList = dataObj.couponList;
              this.productList = dataObj.productList[0];
              this.quantity = this.productList.productQuantity;
              this.productPrice = dataObj.productList[0].productPrice;
            }
            else {
              console.log(response.body.isSuccess);
              this.dataInfo = {};
              this.couponList = [];
              if (response.body.failCode =='E100')
              {
                this.gotologin(window.location.href);
              }
            }
          })
          .catch(function (response) {
            console.log(response)
          });
      },
      inputMobile: function ($eve) {
          var el = $eve.target;
          this.mobileNum = el.value+"";
          if(this.mobileNum.length>11) {
            this.mobileNum=this.mobileNum.slice(0,11);
          }
      },

      toPayFun: function () {
        //
        var self = this;
        var curProductList = [
            {
              productID:parseInt(self.$route.query.foretellID),
              seatID:self.$route.query.seatID.toString(),
              productQuantity:self.quantity
            }
          ];
        var payInfo = {
          orderType: 2,
          productList:curProductList,
          mobile:self.mobileNum,
          discountTotal:self.dataInfo.discountTotal,
          couponTotal:self.dataInfo.couponTotal,
          balanceTotal:self.dataInfo.balanceTotal,
          total:self.dataInfo.total,
          siteOrderNo: self.dataInfo.siteOrderNo,
          payPassword:self.payPassword,
          couponList:self.selectedCouponList
        }
        this.$router.push({
          path: '/orderPay',
          query: payInfo
        });
      },
      onCouponSelectedFun: function (chooseSet,password) {
        this.payPassword = password;
        //隐藏优惠券
        this.onCouponReturnFun();
        //对比优惠券是否更改
        //重新请求数据
        this.selectedCouponList = [];
        for (let i of chooseSet) {
          console.log(i);
          this.selectedCouponList.push({couponID: i});
          console.log(this.selectedCouponList);
        }
        this.queryPrice();
      },
      showCouponPageFun:function () {
        this.isHideCoponPage = false;
        this.$store.dispatch('editHeadMsg', '选择优惠券');
      },
      onCouponReturnFun:function () {
        this.isHideCoponPage=true;
        this.$store.dispatch('editHeadMsg', '确认订单');
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import "../../style/order_confirm.scss";
</style>
