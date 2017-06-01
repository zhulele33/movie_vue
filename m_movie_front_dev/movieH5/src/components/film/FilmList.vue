<template>
  <div>
    <Navigation></Navigation>
    <div class="container" id="movies" @toTop="scrollToTop" v-on:touchmove="swipeMove" v-on:scroll="swipeMove">
      <!-- 焦点图 -->
      <ADLoop></ADLoop>
      <template v-if="page.pageCount == 0">
         <p class="errorTips">哎呦，出错了！</p>
      </template>
      <template v-else>
        <ul class="movies" v-infinite-scroll="loadMore"
            infinite-scroll-disabled="busy"
            infinite-scroll-distance="100"
            infinite-scroll-immediate-check="false">
          <FilmItem v-for="item in filmListData" :itemdata='item'></FilmItem>
        </ul>
        <!--</div>-->
        <p class="hasnomore">{{loadingTip}}</p>
      </template>
    </div>
    <ToTop :isHide="toTop" @toTop="scrollToTop"></ToTop>
    <!-- <a class="toTop" :class="{'hide':toTop}" v-on:click="scrollToTop"></a> -->
  </div>
</template>

<script>
 // import '../../../static/style/index.scss';
  import FilmItem from './FilmItem.vue'
  import Navigation from '../Navigation.vue'
  import ADLoop from '../ad/ADLoop.vue'
  import ToTop from '../toTop/ToTop.vue'
  export default {
    name: 'filmItem',
    data () {
      return {
        filmListData: [],
        isFirst:true,
        page:{
          pageCount:1,
          pageIndex:1,
          pageSize:10,
          recordCount:0
        },
        touchLocation : {
          startX:0,
          startY:0
        },
        loadingTip:"努力加载中...",
        busy: false,
        toTop:true
      }
    },
    computed: {
      currCity(){
        return {
          id:this.$store.getters.currCity.regionID,
          name:this.$store.getters.currCity.regionName
        }
      }
    },
    mounted() {
      this.loadFilmData();
    },
    beforeCreate () {
      this.$store.dispatch('editHeadMsg', '国美电影票')
      this.$store.dispatch('editIsHeadHomeShow', 0);
      this.$store.dispatch('editAreaShow', 0);
      this.$store.dispatch('editToBack', '');
    },
    components: {
      FilmItem,
      Navigation,
      ADLoop,
      ToTop
    },
    methods: {
      loadFilmData: function(){
        this.$http.post('/wap/film/getList.json?cityRegionID='+this.currCity.id+'&pageIndex='+this.page.pageIndex+'&pageSize='+this.page.pageSize)
        .then((response) => {
          if (response.body.isSuccess == 'Y') {
            var dataObj = JSON.parse(response.body.data);
            this.filmListData = this.filmListData.concat(dataObj.list);
            if(this.isFirst){
              this.page = dataObj.page;
              this.isFirst = false;
            }
            this.page.pageIndex++;
          }
          else {
            this.filmListData = [];
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
        if(this.page.pageIndex > this.page.pageCount){
          this.loadingTip = "没有更多了~";
        }else if(this.page.pageIndex<=this.page.pageCount){
          this.loadFilmData();
          self.busy = false;
        }
      },
      swipeMove: function(evt){
        var docEl = document.getElementById("movies");
        var winScrollTop = docEl.scrollTop;
        var winHeight = docEl.getBoundingClientRect().height;
        if(winScrollTop >= winHeight){
          this.toTop = false;
        }else{
          this.toTop = true;
        }
      },
      scrollToTop:function(){
        document.getElementById("movies").scrollTop = 0;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../../style/swiper.min.css';
</style>
<style lang="scss" scoped>
  .container{
    top:4.4rem;
  }
  .swiper-container{
    height:7.5rem;
  }
  // 影片列表
  .movies{
    background-color:#fff;
  }
  
</style>
