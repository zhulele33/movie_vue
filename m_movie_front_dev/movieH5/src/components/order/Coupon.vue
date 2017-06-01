<template>
  <li class="coupons-item " v-bind:class="{ active:selected}" v-on:click="chooseFun">
    <div class="coupons-content" >
      <p class="amount"><i>&#165 </i>{{couponInfo.couponAmount}}</p>
      <p class="validity">有效期至{{couponInfo.couponExpirationDate}}</p>
      <!--<p class="restrict">仅限火车票使用</p>-->
    </div>
  </li>
  <!--<DialogTable></DialogTable>-->
</template>

<script>
  import  DialogTable from '../Dialog/DiaLogTable.vue'
  export default {
    name: 'coupon',
    props:['couponInfo','chooseSet','quantity'],
    components:{
      DialogTable
    },
    data()
    {
        return {
            selected:false
        }
    },
    methods:{
      chooseFun:function () {
        if (!this.selected)
        {
          if ( this.chooseSet.size < this.quantity)
          {
            this.chooseSet.add(this.couponInfo.couponID);
            this.selected = true;
          }
          else{
            //弹出提示框
            /*this.$store.dispatch('editDialogTable', {tablename: 'alert', msg: '最多可选择'+this.quantity+'张优惠券'});
            this.$store.dispatch('editDialogIsShow', 1);*/
            this.$emit('showAlertFun');
          }
        }
        else
        {
          this.chooseSet.delete(this.couponInfo.couponID);
          this.selected = false;
        }
        console.log(this.chooseSet);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
   .coupons-content:after{
    background-image: url('../../assets/coupons.png');
  }
   .coupons-content:before{
     background-image: url('../../assets/coupons.png');
   }

</style>
