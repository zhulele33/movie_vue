<template>
  <div>
    <div class="container">
      <section class="movie_info">
          <p class="movie_name">{{dataInfo.ticketName}}</p>
          <p class="movie_addr">{{dataInfo.cinemaName}}</p>
          <p class="show_time">过期时间: {{dataInfo.ticketExpiresDate}} ({{dataInfo.ticketEnableDay}}天)</p>
          <p class="count">{{quantity}}张 </p>
      </section>
      <section class=" order_block" id="order_price">
        <span class="block_name">订单金额</span>
        <span class=" block-des">
				<span class="price"><i>&#165</i> {{productList.productTotal}}</span>
				<span class="price_detail">&#165 {{productList.productPrice}} x {{quantity}}</span>
			</span>
      </section>
      <section class="order_block">
        <span class="block_name">购买数量<i class="jiang"></i></span>
        <span class="block-des quantity-block">
          <span v-on:click="reduceQuantity" class="quantity_oper">-</span><span class="quantity_show"> {{quantity}}</span><span v-on:click="addQuantity" class="quantity_oper">+</span>
        </span>
      </section>
      <section class="order_block" v-if="orderPrice.discountTotal > 0">
        <span class="block_name">国美直降金额<i class="jiang"></i></span>
        <span class=" block-des"><i>&#165</i> {{orderPrice.discountTotal}}</span>
      </section>
      <section class="order_block" v-if="couponList.length == 0">
        <span class="block_name">使用优惠券</span>
        <span class="block-des" >暂无可用优惠券</span>
      </section>
      <section class="order_block" v-else >
          <div v-on:click="showCouponPageFun">
            <span class="block_name">使用优惠券</span>
            <span class="block-des">
              <span class="icon-arrow-r"></span>
            </span>
          </div>
      </section>
      <section class="order_block">
        <span class="block_name">接受电子兑换券</span>
        <input class=" block-des" v-on:click="inputMobile" v-model="mobileNum">
      </section>
    </div>
    <footer class="submitBtn clearfix">
      <div class="pay_count fl"><label>应付：</label><span class="discount"><i>&#165</i> {{orderPrice.total}}</span></div>
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
    name: 'ticketConfirm',
    components:{CouponList},
    data () {
      return {
        quantity: 1,
        mobileNum: '输入手机号',
        dataInfo: {},
        couponList: [],
        selectedCouponList: [],
        productList: {},
        orderPrice:{},
        getTicketBase: '/wap/ticket/confirm.json',    //跳转兑换券支付页面
        isHideCoponPage:true,
        randomCode:'',
        payPassword:''
      };
    },
    beforeCreate () {
      this.$store.dispatch('editHeadMsg', '确认订单')
      this.$store.dispatch('editIsHeadHomeShow', 0)
    },
    mounted()
    {
        this.getTicketBaseFun();
    },
    methods: {
      //兑换券的基本信息数据
      getTicketBaseFun: function() {
        var params={
          cinemaID:47,
          ticketID:88,
          productQuantity:this.quantity,
          couponList:JSON.stringify(this.selectedCouponList)
        }
        this.$http.post(this.getTicketBase,params,{emulateJSON:true})
          .then((response) => {
            if (response.body.isSuccess == 'Y') {
              var dataObj = JSON.parse(response.body.data);
              this.dataInfo = dataObj;
              this.randomCode = dataObj.r;
              this.dataInfo.ticketExpiresDate = dataObj.ticketExpiresDate.substr(0, 10);
              this.orderPrice = dataObj.orderPrice;
              this.productList = dataObj.orderPrice.productList[0];
              this.couponList = dataObj.orderPrice.couponList;
            }
            else {
              console.log(response.body.isSuccess);
                if (response.body.failCode =='E100')
                {
                  this.gotologin(window.location.href);
                }
            }
          })
//          .catch(function(response) {
//            console.log(response)
//            this.msg = response
//          })
      },

      inputMobile: function () {
          if (this.mobileNum == '输入手机号')
          {
            this.mobileNum = '';
          }
      },

      toPayFun: function () {
        //
        var self = this;
        var curProductList = [
            {
                productID:88,
              productQuantity:self.quantity
            }
        ];

        var payInfo = {
          orderType: 3,
          productList:curProductList,
          mobile:self.mobileNum,
          discountTotal:self.orderPrice.discountTotal,
          couponTotal:self.orderPrice.couponTotal,
          balanceTotal:self.orderPrice.balanceTotal,
          total:self.orderPrice.total,
          payPassword:self.payPassword,
          couponList:self.selectedCouponList
        }
        this.$router.push({
          path: '/orderPay',
          query: payInfo
        });
      },
      reduceQuantity: function () {
        //数量减少
        this.quantity--;
        this.getTicketBaseFun();
      },
      addQuantity: function () {
        this.quantity++;
        this.getTicketBaseFun();
      },
      onCouponSelectedFun: function (chooseSet, password) {
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
        this.getTicketBaseFun();
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
