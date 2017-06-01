<template>
  <div>
    <div v-if="dialogIsShow == 1">
        <div v-if="dialogTableInfo.tablename == 'confirm'">
          <div class="mask" style="display: block;">
            <div class="confirm-box" style="margin-top: -126.5px;">
              <header class="confirm-title">提示</header>
              <article class="confirm-content">{{dialogTableInfo.msg}}</article>
              <PhoneInput @onPhoneNumChange="onPhoneNumChangeFun" v-if="dialogTableInfo.inputType == 1"></PhoneInput>
              <p class="confirm-btns">
                <a class="weight" v-on:click="sureFun">确定</a>
                <a v-on:click="cancelFun">取消</a>
              </p>
            </div>
          </div>
        </div>
        <div v-else="dialogTableInfo.tablename == 'alert'">
          <p class="tip-content" style="margin-left: -162px;opacity: 1;display: block;">{{dialogTableInfo.msg}}</p>
        </div>
    </div>
  </div>
</template>

<script>
  import PhoneInput from './PhoneInput.vue'
  export default {
    name: 'dialogTable',
    data()
    {
        return {
          curPhoneNum:''
        }
    },
    computed: {
      dialogIsShow(){
        this.setTimeOutFun();
        return this.$store.getters.dialogIsShow;
      },
      dialogTableInfo()
      {
        return this.$store.getters.dialogTableInfo;
      }
    },
    components:
      {
        PhoneInput
      },
    methods: {
      sureFun: function()
      {
          var self = this;
        var response =
          {
            code: 1,
            phoneNum:self.curPhoneNum
          };
        this.$store.dispatch('editDialogIsShow', 0);
        this.$emit('confirmFun', response);
      },
      cancelFun: function () {
        this.$store.dispatch('editDialogIsShow', 0);
        var response = {code: 0};
        this.$emit('confirmFun', response);
      },

      setTimeOutFun: function () {
          if (this.dialogTableInfo.tablename == 'alert' && this.$store.getters.dialogIsShow == 1)
          {
            var thisVue = this;
            setTimeout(function () {
              thisVue.$store.dispatch('editDialogIsShow', 0);
            }, 2000);
          }
      },
      onPhoneNumChangeFun:function (phoneNumVal) {
        this.curPhoneNum = phoneNumVal;
        console.log(this.curPhoneNum);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .mask{
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.3);
    z-index: 10;
  }

  .confirm-box{
    width: 16.75rem;
    left: 50%;
    top: 50%;
    position: absolute;
    margin-left: -8.375rem;
    background: #fff;

  }
  .confirm-box .confirm-title {
    background-color: #eee;
    height: 2.0rem;
    line-height: 2.0rem;
    color: #333;
    text-align: center;
  }
  .confirm-box .confirm-content {
    padding: 0.5rem 0.75rem 0.75rem;
    line-height: 1.05rem;
    color: #666;
  }
  .confirm-box .confirm-btns {
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    height: 2.0rem;
    line-height: 2.0rem;
    border-top: 1px solid #ddd;
  }
  .confirm-box .confirm-btns a {
    color: #666;
    text-align: center;
    display: block;
    -webkit-box-flex: 1;
    -moz-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
  }
  .confirm-box .confirm-btns .weight {
    color: #ef3030;
  }
  [data-dpr="1"] .confirm-box .confirm-title {
    font-size: 17px;
  }
  [data-dpr="1"] .confirm-box .confirm-content {
    font-size: 15px;
  }
  [data-dpr="2"] .confirm-box .confirm-title {
    font-size: 34px;
  }
  [data-dpr="2"] .confirm-box .confirm-content {
    font-size: 30px;
  }
  [data-dpr="3"] .confirm-box .confirm-title {
    font-size: 51px;
  }
  [data-dpr="3"] .confirm-box .confirm-content {
    font-size: 45px;
  }
  /* confirm end */

  /* alert begin */
  .tip-content {
    background: rgba(0,0,0,0.7);
    position: absolute;
    top: 50%;
    padding: 0.4rem 1.25rem;
    left: 50%;
    border-radius: 0.15rem;
    color: #fff;
    line-height: 0.85rem;
    max-width: 9.65rem;
    opacity: 1;
    -webkit-transition: opacity 3s;
    transition: opacity 3s;
    z-index: 9999999;
  }
</style>
