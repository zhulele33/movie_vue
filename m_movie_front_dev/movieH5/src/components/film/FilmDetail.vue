<template>
  <div>
    <div class="container">
      <section class="base_info">
        <div class="img_txt clearfix">
          <img :src="detailInfo.filmLargePhoto" class="blur" />
          <!-- <div class="bg_cover"></div> -->
          <div class="base_img">
            <img v-if="detailInfo.filmLargePhoto && detailInfo.filmLargePhoto!=null" :src="detailInfo.filmLargePhoto" :alt="detailInfo.filmName" />
            <img v-else src="../../assets/film-default.png" :alt="detailInfo.filmName" />
          </div>
          <dl class="base_info_txt">
            <dt class="base_title">
              <h1 class="fl clamp_ellipsis_2">{{detailInfo.filmName}}</h1>
              <span class="score fr" v-if="detailInfo.filmGrade!=null&& detailInfo.filmGrade!=0">{{detailInfo.filmGrade.toFixed(1)}}分</span>
            </dt>
            <dd class="base_introduce ellipsis">{{detailInfo.filmReview}}</dd>
            <dd class="actor ellipsis">主演：{{detailInfo.filmActor}}</dd>
            <dd class="base_type">类型：</dd>
            <dd class="base_time">片长：
            <template v-if="detailInfo.filmDuration!=null && detailInfo.filmDuration!=0">
              {{detailInfo.filmDuration}}分钟
            </template></dd>
            <dd class="base_showtime">上映时间：
             <template v-if="detailInfo.filmShowDate!=null && detailInfo.filmShowDate!=0">
              {{detailInfo.filmShowDate}}
            </template>
            </dd>
          </dl>
        </div>
        <div class="plot_introduction">

          <article class="" v-if="toggleShow">{{detailInfo.filmDescription}}</article>
          <article class="clamp_ellipsis_4" v-else>{{detailInfo.filmDescription}}</article>
          <div class="icon-b-arrow" v-bind:class="{'hide':isHide,'icon-up':toggleShow}" v-on:click="toggleShowFun"></div>
        </div>

      </section>
      <section class="stage_photo" v-if="detailInfo.photoList.length!=0" @click="showPhotolist(detailInfo.photoList)">
        <header class="stage_title">
          <span class="fl">剧照</span>
          <div class="fr more" ><span class="">{{detailInfo.photoList.length}}</span><i class="icon-r-arrow"></i></div>
        </header><!-- /header -->
        <div v-swiper:filmPhotos="swiperOption">
          <div class="swiper-wrapper" >
            <div class="swiper-slide"  v-for="(photoItem,index) in detailInfo.photoList">
              <img :data-original="photoItem.filmSmallPhoto">
            </div>
          </div>
        </div>
      </section>
    </div>
    <!-- <div class="container" v-bind:class="{'hide':isShowList}" style="bottom:0;z-index:10;">
      <ul class="photo_list clearfix">
        <li class="photo_item" v-for="p in detailInfo.photoList">
          <img :data-original="p.filmMiddlePhoto">
        </li>
      </ul>
    </div> -->
    <footer class="buy_btn">
      <router-link :to="{ path: '/buyTicket', query: { productId: detailInfo.filmID }}">选座购票</router-link>
    </footer>
  </div>
</template>
<script>
export default {
  name: 'filmDetail',
  data(){
    return {
      detailInfo:{
        photoList:[]
      },
      touchLocation : {
        startX:0,
        currX:0
      },
      images:[],
      swiperOption: {
        slidesPerView: 'auto',
        paginationClickable: true,
        spaceBetween: 20,
        freeMode: true,
        onSlideChangeEnd:this.swiperFun
      },
      isHide:false, //是否显示箭头
      toggleShow:false // 控制显示与否
      // isShowList:true
    }
  },
  beforeCreate(){
    this.$store.dispatch('editToBack', '/');
  },
  mounted(){
    this.$http.post('/wap/film/getById.json?filmID='+this.$route.query.productId)
    .then(function(response){
        if (response.body.isSuccess == 'Y') {
          var dataObj = JSON.parse(response.body.data);
          this.detailInfo = dataObj;
          console.log(dataObj)
          if(this.detailInfo.filmDescription.length<=107){
            this.isHide = true;
          }
          var _this = this;
          setTimeout(function(){
            _this.images = document.images;
            _this.loadImgLevel();
          },300)
          // this.$store.dispatch('editHeadMsg', dataObj.productList[0].productName);
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
    .catch(function(response){
      console.log(response);
    })
  },
  methods:{

    loadImgLevel:function(){
      var arr = this.images;
      for( var i = 0,len = arr.length; i < len; i++){
        if(arr[i].getBoundingClientRect().left < document.documentElement.clientWidth && !arr[i].isLoad ){
          arr[i].isLoad = true;
          arr[i].style.cssText = "transition: ''; opacity: 0;"
          if(arr[i].dataset){
            this.aftLoadImg(arr[i],arr[i].dataset.original); 
          }else{
            this.aftLoadImg(arr[i],arr[i].getAttribute("data-original"));
          }
          (function(i){
            setTimeout(function(){
              arr[i].style.cssText = "transition: 1s; opacity: 1;"
            },16)
          })(i);
        }
      }
    },
    aftLoadImg:function(obj,url){
      var oImg = new Image();
      oImg.onload = function(){
        obj.src = oImg.src;
      }
      oImg.src = url;
    },
    toggleShowFun:function(){
      this.toggleShow = !this.toggleShow;
    },
    showPhotolist:function(photos){
      console.log(photos)
      this.$router.push({path:'/photoList',query:{photos:JSON.stringify(photos)}});


/*
      this.isShowList = !this.isShowList;
      this.$store.dispatch('editHeadMsg','剧照列表');
      var photoListDom = document.querySelector('.photo_list').getElementsByTagName('img');
      // this.loadImgLevel();

      setTimeout(function(){
        for(var i=0;i<photoListDom.length;i++){
          console.log(photoListDom[i].getBoundingClientRect().width,photoListDom[i].getBoundingClientRect().height)
          if(photoListDom[i].getBoundingClientRect().width >= photoListDom[i].getBoundingClientRect().height){
            photoListDom[i].style.width= '100%';
          }else{
            photoListDom[i].style.height= '100%';
          }
        }
      },500)*/
    },
    swiperFun:function(swiper){
      this.loadImgLevel();
    },
    /*swipeStart:function(e){
      //evt.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动等
      var touch = e.touches[0]; //获取第一个触点
      var x = Number(touch.pageX); //页面触点X坐标
      var y = Number(touch.pageY); //页面触点Y坐标
      //记录触点初始位置
      this.touchLocation.startX = x;
      this.touchLocation.startY = y;
    },
    swipeMove: function(evt){
      //evt.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动等
      var touch = evt.touches[0]; //获取第一个触点
      var x = Number(touch.pageX); //页面触点X坐标
      var y = Number(touch.pageY); //页面触点Y坐标
      var text = 'TouchMove事件触发：（' + x + ', ' + y + '）';
      //判断滑动方向
      if (x - this.touchLocation.startX != 0) {
          var minX = 0,
          maxX = (750-document.querySelector(".photo_list").getBoundingClientRect().width);
          //左右滑动   arr[i].style.cssText = "transition: ''; opacity: 0;"
          var diffX = (x - this.touchLocation.startX);
          if(this.touchLocation.currX <= minX && this.touchLocation.currX >= maxX){
            this.touchLocation.currX += diffX;
            document.querySelector(".photo_list").style.cssText +=" left:"+this.touchLocation.currX+"px;";
          }
          this.loadImgLevel();
      }
      if (y - this.touchLocation.startY < 0) {
          //上下滑动
      }
    },
    swipeEnd:function(evt){
      var minX = 0,
          maxX = (750-document.querySelector(".photo_list").getBoundingClientRect().width);
      if(this.touchLocation.currX > 0){
          this.touchLocation.currX = 0;
          document.querySelector(".photo_list").style.cssText +=" left:0px;";
        }else if(this.touchLocation.currX < maxX) {
          this.touchLocation.currX = maxX;
          document.querySelector(".photo_list").style.cssText +=" left:"+maxX+"px;";
        }
    }*/
  }
}
</script>
<style lang="scss" scoped>
  @import '../../style/movie_detail.scss';
  .container{
    bottom:2.2rem;
  }
  .swiper-container{
     padding-left: 0.75rem;
  }
  .swiper-slide{
    float: left;
    width: 4.75rem;
    height: 3.6rem;
    margin-right: 0.375rem;
    overflow: hidden;
    background-color: rgba(0, 0, 0, 0.6);
    text-align: center;
  }
  .swiper-slide img{
    height: 100%;
  }
  .hide{
    display: none;
  }
  .photo_list{
    padding:0 1px 0 2px;
    .photo_item{
      float: left;
      width: 245px;
      height: 245px;
      line-height: 245px;
      background: #000;
      margin: 0 2px 4px;
      overflow: hidden;
      text-align: center;
      img{
        vertical-align: middle;
      }
    }
  }
</style>
