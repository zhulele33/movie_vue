<template>
  <div id="app">
    <Myheader></Myheader>
    <router-view></router-view>
  </div>
</template>

<script>
  import  './script/flexible'
  import  './script/flexible_css'
  import Myheader from './components/Header'
  export default {
    name:'app',
    components: {
      Myheader
    }
  }
</script>

<style lang="scss">
  @import 'style/common.scss';
  @import 'style/font-icon.css';
</style>
