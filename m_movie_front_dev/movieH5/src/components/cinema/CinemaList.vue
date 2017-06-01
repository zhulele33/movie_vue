<template>
  <div>
    <Navigation></Navigation>
    <div class="container" id="cinema" @toTop="scrollToTop" v-on:touchmove="swipeMove" v-on:scroll="swipeMove">
      <template v-if="page.pageCount == 0 || cinemaList.length == 0">
      <p class="errorTips">哎呦，出错了 ！</p>
      </template>
      <template>
        <ul class="cinemas" v-infinite-scroll="loadMore"
            infinite-scroll-disabled="busy"
            infinite-scroll-distance="100"
            infinite-scroll-immediate-check="false">
          <CinemaItem v-for="item in cinemaList" :itemdata='item'></CinemaItem>
        </ul>
        <!-- <ul class="cinemas" v-on:touchstart="swipeStart($event)" v-on:touchmove="swipeMove($event)">
          <CinemaItem v-for="item in cinemaList" :itemdata='item'></CinemaItem>
        </ul> -->
        <p class="hasnomore">{{loadingTip}}</p>
      </template>
      <ToTop :isHide="toTop" @toTop="scrollToTop"></ToTop>
    </div>
  </div>
</template>
<script>
  import CinemaItem from './CinemaItem'
  import Navigation from '../Navigation'
  import ToTop from '../toTop/ToTop.vue'
  export default {
    name: 'cinemaList',
    data () {
      return {
        cinemaList: [],
        isFirst:true,
        page:{
          pageCount:1,
          pageIndex:1,
          pageSize:10,
          recordCount:0
        },
        busy: false,
        loadingTip:"没有更多了~",
        toTop:true
      }
    },
    computed: {
      currCity(){
        return this.$store.getters.currCity
      }
    },
    components: {
      CinemaItem,
      Navigation,
      ToTop
    },
    beforeCreate(){
      this.$store.dispatch('editAreaShow', this.$store.getters.currCity.districtRegionName);
      this.$store.dispatch('editToBack', '');
    },
    mounted(){
      // 第一次加载
      this.loadCinemaList();
    },
    watch:{
      currCity:function(){
        this.isFirst = true;
        this.loadCinemaList();
      }
    },
    methods:{
      loadCinemaList: function(){
        if(this.isFirst){
          this.page.pageIndex=1;
        }
        var url = '/wap/cinema/getList.json?cityRegionID='+this.currCity.regionID+'&pageSize='+this.page.pageSize+'&pageIndex='+this.page.pageIndex;
        if(this.currCity.districtRegionID!=0){
          url = '/wap/cinema/getList.json?cityRegionID='+this.currCity.regionID+'&districtRegionID='+this.currCity.districtRegionID+'&pageSize='+this.page.pageSize+'&pageIndex='+this.page.pageIndex;
        }
        this.$http.post(url).then((response) => {
          if (response.body.isSuccess == 'Y') {
            var dataObj = JSON.parse(response.body.data);
            this.page = dataObj.page;
            if(dataObj.list!=null){
              if(this.isFirst){
                this.cinemaList = dataObj.list;
                this.isFirst = false;
              }else{
                 this.cinemaList = this.cinemaList.concat(dataObj.list);
              }
            }else{
              this.cinemaList = [];
            }
          }
          else {
            // 服务器请求错误
            if (response.body.failCode =='E100')
            {
              this.gotologin(window.location.href);
            }
          }
        })
        .catch(function(response) {
          return response
        })
      },
      loadMore: function () {
        var self = this;
        self.busy = true;
        if(this.page.pageIndex >= this.page.pageCount){
          this.loadingTip = "没有更多了~";
        }else if(this.page.pageIndex<this.page.pageCount){
          this.page.pageIndex++;
          this.loadCinemaList();
          self.busy = false;
        }
      },
      swipeMove: function(evt){
        var docEl = document.getElementById("cinema");
        var winScrollTop = docEl.scrollTop;
        var winHeight = docEl.getBoundingClientRect().height;
        if(winScrollTop >= winHeight){
          this.toTop = false;
        }else{
          this.toTop = true;
        }
      },
      scrollToTop:function(){
        document.getElementById("cinema").scrollTop = 0;
      }
    }
  }
</script>
<style scoped>
  .container{
    top:4.4rem;
  }
</style>
