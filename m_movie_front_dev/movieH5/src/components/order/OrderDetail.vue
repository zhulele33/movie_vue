<template>
  <div>
  <div class="container">
    <div class="film_base order_block">
      <p class="film_name">{{productInfo.productName}}</p>
      <div v-if="orderInfo.orderType == 2">
        <p class="film_cinema">{{productInfo.cinemaName}} - {{productInfo.hallName}} {{productInfo.foretellName}}
        </p>
        <p class="film_date">{{productInfo.productQuantity}}张 （{{productInfo.seatName}})</p>
      </div>
      <div v-else>
        <p class="film_cinema">有效期：{{productInfo.ticketExpiresDate}} （{{productInfo.ticketEnableDay}}天）</p>
        <p class="film_date">{{productInfo.cinemaName}}张</p>
      </div>

    </div>
    <div class="film_status order_block">
      <p class="order_id clearfix">
        <label class="film_statu_label">订单号</label>
        <span class="film_statu_value">{{orderInfo.orderID}}</span>
      </p>
      <p class="order_statu clearfix">
        <label class="film_statu_label">订单状态</label>
      <span class="film_statu_value" v-if="orderInfo.orderStatus == 1">等待付款</span>
      <span class="film_statu_value" v-else-if="orderInfo.orderStatus == 2">支付成功</span>
      <span class="film_statu_value" v-else-if="orderInfo.orderStatus == 3">支付失败</span>
      <span class="film_statu_value" v-else-if="orderInfo.orderStatus == 4">等待出票</span>
      <span class="film_statu_value" v-else-if="orderInfo.orderStatus == 5">出票成功</span>
      <span class="film_statu_value" v-else-if="orderInfo.orderStatus == 6">部分妥投成功</span>
      <span class="film_statu_value" v-else-if="orderInfo.orderStatus == 7">出票失败</span>
      <span class="film_statu_value" v-else-if="orderInfo.orderStatus == 8">过期关闭</span>
      <span class="film_statu_value" v-else-if="orderInfo.orderStatus == 9">已取消</span>
      </p>
      <p class="create_date clearfix">
        <label class="film_statu_label">下单时间</label>
        <span class="film_statu_value">{{orderInfo.createDate}}</span>
      </p>
      <!--出票成功才会显示-->
      <div v-if="orderInfo.orderStatus == 5">
        <p class="getticket_code clearfix">
          <label class="film_statu_label">取票码</label>
          <span class="film_statu_value mainColor">{{productInfo.ticketCode}}</span>
        </p>
      </div>
      <p class="getticket_code clearfix">
        <label class="film_statu_label">手机号</label>
        <span class="film_statu_value ">{{orderInfo.mobile}}</span>
      </p>
    </div>
    <div class="film_price order_block">
      <div class="film_balance clearfix">
        <label class="film_price_label fl">订单金额</label>
        <div class="film_price_val fr">
          <p class="total_price"><i>&#165 </i><span>{{orderInfo.productTotal}}</span></p>
          <p class="total_price_detail"><i>&#165 </i>{{productInfo.productPrice}}<i>&#10005 {{productInfo.productQuantity}}张</i></p>
        </div>
      </div>
      <div v-if="orderInfo.banlanceTotal > 0">
        <div class="film_balance clearfix">
          <label class="film_price_label fl">使用余额</label>
          <div class="film_price_val fr">
            <p class="price"><i>&#165 </i><span>{{orderInfo.banlanceTotal}}</span></p>
          </div>
        </div>
      </div>
      <div class="film_balance clearfix" v-if="orderInfo.couponTotal > 0">
        <label class="film_price_label fl">使用优惠券</label>
        <div class="film_price_val fr">
          <p class="price"><i>&#165 </i>{{orderInfo.couponTotal}}</p>
        </div>
      </div>
    </div>
    <div class="pay_price order_block clearfix">
      <label class="film_price_label fl">实付金额</label>
      <div class="film_price_val fr">
        <p class="price"><i>&#165 </i>{{orderInfo.total}}</p>
      </div>
    </div>

    <p class="tips">本服务由蜘蛛网提供</p>
  </div>

    <DiaLogTable @confirmFun="confirmFun"></DiaLogTable>

  <footer class="operate_sub" v-if="orderInfo.orderStatus == 1 || (orderInfo.orderStatus == 5 && orderInfo.canSendSMSDeliveryNotify == 1)">
    <!--<a title="" v-if="orderInfo.canCancelOrder == 1 && orderInfo.canCancelOrder == 1" v-on:click="cancelOrder"> 取消订单</a>-->
    <router-link :to="{ path: '/orderPay', query: { siteOrderNo:orderInfo.siteOrderNo, orderType: -1  }}" v-if="orderInfo.orderStatus == 1"> 立即支付</router-link>
    <span title="" v-if="orderInfo.orderStatus == 5 && orderInfo.canSendSMSDeliveryNotify == 1">
      <a v-if=" countDown > 0">{{countDown}}秒后可重新发送</a>
      <a v-else v-on:click="showConfirm">重新发送电子码</a>
    </span>
  </footer>
  </div>
</template>

<script>
  import DiaLogTable from '../Dialog/DiaLogTable.vue'
  export default {
    name: 'orderDetail',
    data () {
      return {
        countDown: 0,//重发电子码倒计时
        orderInfo:{},
        productInfo: {},
        //显示订单详情接口
        apiUrl: '/wap/order/getById.json?siteOrderNo=',
        //点击重新发送电子码
        userSMSDeliveryNotifyUrl:'wap/order/userSMSDeliveryNotify.json?siteOrderNo=',
        //点击取消订单
        cancelOrderUrl: '/wap/order/cancel.json?siteOrderNo='
      }
    },
    components: {
      DiaLogTable
    },
    beforeCreate () {
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
        this.$http.get(this.apiUrl+this.$route.query.orderNo)
          .then((response) => {
            if (response.body.isSuccess == 'Y') {
              var dataObj = JSON.parse(response.body.data);
              this.orderInfo = dataObj;
              this.productInfo = dataObj.productList[0];
              this.$store.dispatch('editHeadMsg', dataObj.productList[0].productName);
            }
            else {
              console.log(response.body.isSuccess);
              this.orderInfo = {};
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
      //发送电子码
      userSMSDeliveryNotify: function (mobile) {
        this.$http.get(this.userSMSDeliveryNotifyUrl+this.$route.query.orderNo+'&mobile='+mobile)
          .then((response) => {
          if (response.body.isSuccess == 'Y') {
            var dataObj = JSON.parse(response.body.data);
            if(dataObj.notifyResult == 1)
            {
              this.showAlertTable('电子码已发送');
              //重新开始数秒
              this.countDown= 60;
              this.countDownFun();
            }
        }
        else {
          console.log(response.body.isSuccess);
          //提示发送失败
            this.showAlertTable(response.body.failReason);
            //重新开始数秒
            this.countDownFun();
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
      //取消订单
      cancelOrder: function()
      {
        this.$http.get(this.cancelOrderUrl+this.$route.query.orderNo)
          .then((response) => {
          if (response.body.isSuccess == 'Y') {
          var dataObj = JSON.parse(response.body.data);
          //重新加载页面
          this.getOrderInfo();
        }
        else {
          console.log(response.body.isSuccess);
          this.orderInfo = {};
            if (response.body.failCode =='E100')
            {
              this.gotologin(window.location.href);
            }
        }
      }).catch(function (response) {
          console.log(response)
        })
      },

      //弹框面板，点击确定，或者取消后调用
      confirmFun: function (confirmValue) {
          if (confirmValue.code == 1)
          {
              this.userSMSDeliveryNotify(confirmValue.phoneNum)
          }
      },
      //显示对话框面板
      showConfirm: function () {
        var tableInfo =
          {
            tablename: 'confirm',
            msg: '重新发送电子码',
            inputType: 1
          };
        this.$store.dispatch('editDialogTable', tableInfo);
        this.$store.dispatch('editDialogIsShow', 1);
      },
      //显示提示框面板
      showAlertTable:function (curMsg) {
        var tableInfo =
          {
            tablename: 'alert',
            msg: curMsg
          };
        this.$store.dispatch('editDialogTable', tableInfo);
        this.$store.dispatch('editDialogIsShow', 1);

      },
      //开始倒计时数秒，重新发送电子码按钮可点
      countDownFun: function () {
        var self = this;
        if (this.countDown > 0)
        {
          this.countDown--
          setTimeout(function () {
            self.countDownFun();
          }, 1000);
        }

      }

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import "../../style/order_detail.scss";
</style>
