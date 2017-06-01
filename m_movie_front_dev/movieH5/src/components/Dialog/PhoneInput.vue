<template>
  <div>
    <input v-model="num" v-on:change="onPhoneNumChange">
  </div>
</template>

<script>
  export default {
    name: 'dialogTable',
    props:['phoneNum'],
    data (){
      return {
        num: this.phoneNum
      };
    },
    methods: {
      onPhoneNumChange: function()
      {
        this.$emit('onPhoneNumChange', this.num);
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
