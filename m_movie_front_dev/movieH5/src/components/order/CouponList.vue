<template>
  <div>
    <section class="container coupons-container">
      <p class="order-tips">本订单最多可使用{{quantity}}张优惠券</p>
      <p class="couponsCount">共有<em>{{couponList.length}}</em>张优惠券
        <a class="coupons-explanation" style="left: 0;width: 2.0rem;"v-on:click="returnBack">返回</a>
        <a class="coupons-explanation" style="right: 0;"><i class="icon-tips"></i><span v-on:click="hideTipFun(false)">使用说明</span></a></p>
      <ul class="coupons-list" id="couponslist">
       <template v-for="item in couponList">
           <Coupon :couponInfo="item" :chooseSet="chooseSet" :quantity="quantity" @showAlertFun="showAlertFun"></Coupon>
        </template>
      </ul>
    </section>
    <div class="cover coupons-tips " id="coupons-tips" v-bind:class="{ hide:isHideTip}">
      <article class="article-content" >
        <a href="javascript:;" class="close" v-on:click="hideTipFun(true)">&#10005</a>
        <p><span>.</span>一张电影票（或者兑换券）仅可使用一张优惠券。</p>
      </article>
    </div>

    <section class="coupons-inputPass" id="inputPass" v-bind:class="{hide:isHidePasswordTable}">
      <div class="inputPass-container">
        <h3 class="inputPass-title">安全验证</h3>
        <div class="inputPass-content">
          <p class="inputPass-tips">您使用了虚拟资产，为了保障您的账户安全，请输入支付密码</p>
          <p class="inputPass-txt">
            <input type="password" id="password" v-model="passwordContent"/>
          </p>
          <p class="forgetPass">
            <a href="javascript:;" class="">忘记密码</a>
          </p>
        </div>
        <p class="inputPass-btn">
          <a class="cancel" v-on:click="hidePasswordTableFun(true)">取消</a>
          <a class="confirm" v-on:click="sureFun">确定</a>
        </p>
      </div>
    </section>
    <footer class="operate_sub" >
      <span>
      <a v-on:click="hidePasswordTableFun(false)">确 认</a>
    </span>
    </footer>
    <DialogTable></DialogTable>
  </div>
</template>

<script>
  import Coupon from './Coupon.vue'
  import DialogTable from '../Dialog/DiaLogTable.vue'
  export default {
    name: 'couponListName',
    props:['couponList','quantity','randomCode'],
    data ()
    {
      return {
        chooseSet: new Set(),
        isHideTip:true,
        isHidePasswordTable:true,
        passwordContent:''
      }
    },
    components:{
      Coupon,
  DialogTable
    },
    methods:
      {
        showAlertFun:function () {
          this.$store.dispatch('editDialogTable', {tablename: 'alert', msg: '最多可选择'+this.quantity+'张优惠券'});
          this.$store.dispatch('editDialogIsShow', 1);
        },
        sureFun:function () {
          //加密并发送请求
          var JSEncrypt = require('../../../static/js/jsencrypt.min.js');
          var encrypt = new JSEncrypt();
          encrypt.setPublicKey('MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDFAeZC+xH4UJvBdvnD9B3AZ9iPT+5wFo2m22TSOfgyNnelWqptZygTRDeSwE1XZESDZaAownjZ2MsJc7r4PZSDpuyFzWkSR5qOZ8jyOKa0lV3LhzDPiLYbtEBHpovHj8/I/vF2LGuEXzzBjoQlz6O5V15d+aAJVX3O+vihdl8AzwIDAQAB');
          this.passwordContent = 'zhifumima123';
          console.log(this.passwordContent);
          var encryptResult = encrypt.encrypt(this.passwordContent+this.randomCode);
          console.log('这是受到的动态码：' + this.randomCode);
          this.checkPayPasswordFun(encryptResult);
        },
        hidePasswordTableFun:function (val) {
          this.isHidePasswordTable=val;
        },
        hideTipFun:function (val) {
          this.isHideTip = val;
        },
        returnBack:function () {
          this.$emit("onCouponReturnFun")
        },
        checkPayPasswordFun:function (curPassword) {
            var params = {
              password:curPassword
            }
          this.$http.post('/wap/order/checkPayPassword.json',params, {emulateJSON:true})
            .then((response) => {
              if (response.body.isSuccess == 'Y') {
                var dataObj = JSON.parse(response.body.data);
                console.log(dataObj);
                if (dataObj.verifyResult == 1)
                {
                  this.hidePasswordTableFun(true);
                  this.$emit("onCouponSelectedFun", this.chooseSet, curPassword);
                }
                else
                {
                  this.hidePasswordTableFun(true);
                  alert('请检查输入的密码是否正确');
                }
              }
              else {
                console.log(response.body.isSuccess);
                this.hidePasswordTableFun(true);
                alert('请检查输入的密码是否正确');
                if (response.body.failCode =='E100')
                {
                  this.gotologin(window.location.href);
                }
              }
            })
            .catch(function(response) {
              console.log(response)
              this.msg = response;
              this.hidePasswordTableFun(true);
              //提示异常
              this.$store.dispatch('editDialogTable', {tablename: 'alert', msg: '报请服务异常，请您稍后重试'});
              this.$store.dispatch('editDialogIsShow', 1);
            })
        }
      }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import "../../style/coupons.css";
  .operate_sub{
    background-color: #ff5c5c;
  a{
    display:block;
    height:100%;
    line-height:2.45rem;
    color:#fff;
    text-align:center;
  }
  };

  .cover{
    position: absolute ;
    top:0;
    bottom:0;
    left: 0;
    right: 0;
    z-index: 100;
    background-color: rgba(0,0,0,0.6);
  }
</style>
