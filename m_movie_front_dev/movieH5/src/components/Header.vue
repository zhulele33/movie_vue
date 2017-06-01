<template>
  <header id="header" class="head">
    <div class="fixed">
      <a href="javascript:;" class="left hide" v-if="toBack==''"></a>
      <router-link :to="toBack" class="left" v-else ></router-link>
      <span>{{headMsg}}</span>
      <router-link to="/" class="right" id="activate" v-if="isHeadHomeShow == 1">首页</router-link>
    </div>
  </header>
</template>
<script>
	export default {
	  name: 'head',
    computed: {
      headMsg(){
        return this.$store.getters.headMsg
      },
      isHeadHomeShow()
      {
          return this.$store.getters.isHeadHomeShow
      },
      toBack()
      {
          return this.$store.getters.toBack
      }
    }
	}
</script>
<style lang="scss">
  @import '../style/head.scss';
</style>
