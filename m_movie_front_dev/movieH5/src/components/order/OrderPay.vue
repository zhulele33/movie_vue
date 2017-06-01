<template>
  <div>
    <div class="container">
      <section class="total_count">
      <span>应付金额：<label>¥ {{dataInfo.payMoney}}</label></span>
    </section>
      <div v-if="payModeList.length > 0">
      <ul class="pay-type">
        <div v-for="payMode in payModeList">
        <li class="pay-item" v-on:click="getPayUrl(dataInfo.orderNo,payMode.payTal)">
            <div class="icon_wrapper">
              <div class="img_wrapper">
                <img :src="payMode.bankIma" />
              </div>
            </div>
            <div class="content ellipsis">
            <p class="title">{{payMode.bankName}}</p>
            <small class="desc ellipsis" style="color:#999999"> &nbsp;  </small>
          </div>
        </li>
        </div>
      </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'orderPay',
    data () {
      return {
        dataInfo:{},
        payModeList: [],
        requestPayUrl: '/wap/order/requestPay.json',
        orderSaveUrl: '/wap/order/save.json',
        submitPayUrl: '/wap/order/submitPay.json?',
        params: this.$route.query
      };
    },
    beforeCreate () {
      this.$store.dispatch('editHeadMsg', '订单支付');
      this.$store.dispatch('editIsHeadHomeShow', 1)
    },
    mounted()
    {
      this.getOrderInfo();
    },
    methods: {
      //获取基本数据
      getOrderInfo: function()
      {
        var requestUrl = '';
        var curParams = {};
        if (this.params.orderType == -1)
        {
          requestUrl = this.requestPayUrl;
          curParams = {
            siteOrderNo:this.params.siteOrderNo
          }
        }
        else
        {
          curParams = {
              orderType:this.params.orderType,
              productList:JSON.stringify(this.params.productList),
              mobile:this.params.mobile,
              discountTotal:this.params.discountTotal,
              couponTotal:this.params.couponTotal,
            balanceTotal:this.params.balanceTotal,
            total:this.params.total,
            payPassword:this.params.payPassword,
            couponList:JSON.stringify(this.params.couponList)
            }
            requestUrl = this.orderSaveUrl
            if (this.params.orderType== 2)
            {
              curParams.siteOrderNo = this.params.siteOrderNo;
            }
        }

        this.$http.post(requestUrl,curParams,{emulateJSON:true})
          .then((response) => {
            if (response.body.isSuccess == 'Y') {
              console.log(response.body)
              var dataObj = JSON.parse(response.body.data);
              this.dataInfo = dataObj;
              this.payModeList = dataObj.payModeList;
            }
            else {
              console.log(response.body.isSuccess);
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
      getPayUrl: function (siteOrderNo,payTal) {
        this.$http.get(this.submitPayUrl+'siteOrderNo='+siteOrderNo+'&payTal='+payTal)
          .then((response) => {
            if (response.body.isSuccess == 'Y') {
              console.log(response.body.data);
              window.location=response.body.data;
            }
            else {
              console.log(response.body.isSuccess);
              if (response.body.failCode =='E100')
              {
                this.gotologin(window.location.href);
              }
            }
          })
          .catch(function (response) {
            console.log(response)
          });
      }

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import "../../style/order_detail.scss";
</style>
