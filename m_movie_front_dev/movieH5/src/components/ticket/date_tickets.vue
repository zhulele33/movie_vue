<template>
	<div v-if="films.length!=0">
  	<section class="movies">
  		<div class="movies_box">
  			<div class="movie_bg"></div>
        <div class="">
          <div v-swiper:filmPhotos="swiperOption">
            <div class="swiper-wrapper" >
              <div class="swiper-slide" v-for="item in films">
                <img :src="item.filmSmallPhoto">
              </div>
            </div>
          </div>
  			</div>
  			<div class="triangle"></div>
  		</div>
  	</section>

	<template >
		<section class="movie_infos">
			<div class="movie_info_item curr">
				<p class="movie_name">{{curFilm.filmName}}
        <template v-if="curFilm.filmSort!=0">
           <span class="score">{{curFilm.filmSort}}分</span>
        </template>
       </p>
        <ul class="movie_dates clearfix">
          <template v-for="(day,index)  in days">
            <li class="movie_date_item fl active" v-if="index==curDayIndex">
              <a href="javascript:;">{{day.substring(5)}}</a>
            </li>
            <li class="movie_date_item fl" v-else>
              <a href="javascript:;" v-on:click="onChangeDay(index)" title="">{{day.substring(5)}}</a>
            </li>
          </template>
        </ul>
        <ul class="movie_schedules clearfix">
          <li class="row fl" v-for="sc in foretells">
            <div class="m_time fl">
              <strong>{{sc.foretellShowDate.substring(11,16)}}</strong>
              <p class="ending">{{sc.foretellSaleEndDate.substring(11,16)}}散场</p>
            </div>
            <div class="m_info fl">
              <p class="info_type">3D</p>
              <p class="m_room ellipsis">{{sc.hallName}}</p>
              <template v-if=" leftTicket[sc.foretellID] && leftTicket[sc.foretellID].leftSeatPercent!=0 ">
                <p class="tickets_left">{{leftTicket[sc.foretellID].leftSeatPercent}}%</p>
              </template>
            </div>
            <div class="m_gomeActive fl">
              <span class="jiang" v-if="sc.promotionDesc!=''">降</span>
            </div>
            <div class="m_pri fl">
              <p class="discount_pri"><em>&#165</em>{{sc.foretellMallPrice}}</p>
              <del>&#165 {{sc.foretellMarketPrice}}</del>
            </div>
            <div class="m_buy fl">
              <router-link :to="{path:'/seat',query:{scId:sc.foretellID,cinemaId:cinemaId,filmID:curFilm.filmID,showDate:sc.foretellShowDate}}">选座购票</router-link>
            </div>
          </li>
        </ul>
			</div>
			<p class="movie_info_tips">提示：带“降”图标为国美活动价</p>
		</section>
	</template>
	</div>
</template>
<script>
	export default {
		data(){
			return {
        productId:this.$route.query.productId?this.$route.query.productId:'',
        cinemaId:this.$route.query.cinemaId,
				currCity:this.$store.getters.currCity,
				films:[],
        curFilm:{},
        days:[],
        curDayIndex:0,
        foretells:[],
        swiperOption: {
          slidesPerView: 'auto',
          centeredSlides: true,
          paginationClickable: true,
          spaceBetween: 20,
          notNextTick: true,
          slideToClickedSlide: true,
          onTouchEnd:this.swiperTest,
          onSlideChangeEnd:this.swiperFun
          /*slidesPerView: 5,
          centeredSlides: true,
          paginationClickable: true,
          spaceBetween: 21,
          onSlideChangeEnd:this.swiperFun*/
        },
        leftTicket:{}
			}
		},
		props: ['cinemaDetail'],
		mounted(){
			this.$http.post('/wap/foretell/getNav.json?cityRegionID='+this.currCity.regionID+'&includeFilmSmallPhoto=1'+'&cinemaID='+this.$route.query.cinemaId)
			.then(function(response){
				if (response.body.isSuccess == 'Y') {
					if(response.body.data && response.body.data !=''){
						var dataObj = JSON.parse(response.body.data);
					 	this.films = this.films.concat(dataObj.films);
            this.days = dataObj.days;
					 	if (this.films.length > 0)
            {
              this.curFilm = this.films[0];
              this.getForetellList(null);
            }
					}
				}else{
					// 服务请求错误
          if (response.body.failCode =='E100')
          {
            this.gotologin(window.location.href);
          }
				}
			}).catch(function(response){
				alert(123);
			});

		},
		methods:{
			getForetellList:function(dayIndex){
			    var postUrl = '/wap/foretell/getList.json?cityRegionID='+this.currCity.regionID+'&cinemaID='
            +this.$route.query.cinemaId+'&filmID='+this.curFilm.filmID;
			    if (dayIndex != null)
          {
            postUrl += '&showDate=' + this.days[dayIndex];
          }
				this.$http.post(postUrl)
				.then(function(response){
					if (response.body.isSuccess == 'Y') {
						if(response.body.data && response.body.data !=''){
              var dataObj= JSON.parse(response.body.data);
              if(dataObj.length!=0)
                this.foretells = dataObj[0].foretellList;
              console.log(this.foretells);
              var resDays = dataObj[0].days;
              if (resDays.length > 0)
              {
                this.days = resDays;
              }
						}
					}else{
						// 服务请求错误
            if (response.body.failCode =='E100')
            {
              this.gotologin(window.location.href);
            }
					}
				}).catch(function(response){
          console.log(response)
					alert(456);
				})
			},
      swiperFun:function(swiper){
         this.curDayIndex = 0;
         this.curFilm = this.films[swiper.activeIndex];
         this.getForetellList(null);
      },
      swiperTest:function(swiper){
        console.log(swiper.activeIndex)

      },
      onChangeDay: function (dayIndex) {
          this.curDayIndex = dayIndex;
          this.getForetellList(dayIndex);
      },
      getLeaveTic:function(foretellIds){
        this.$http.post("/wap/foretell/getSeatMsg.json?foretellIds="+foretellIds)
        .then(function(response){
          if (response.body.isSuccess == 'Y') {
            // 余票数量
            var leftTic = JSON.parse(response.body.data);
            this.leftTicket = leftTic;
          }else{
            // 服务请求错误
            if (response.body.failCode =='E100')
            {
              this.gotologin(window.location.href);
            }
          }
        }).catch(function(response){
          // alert(123);
        })

      }
		},
    watch:{
      foretells:function(){
        var ids = [];
        for(var d in this.foretells){
          this.foretells[d].leftSeatPercent=0;
          ids.push(this.foretells[d].foretellID);
        }
        this.getLeaveTic(ids.join(','));
      }
    }
	}
</script>
<style lang = "scss" scoped>
	@import "../../style/date_ticket.scss";
  @import "../../style/movie_schedules.scss";
  .swiper-container{
    padding-top: 1rem;
  }
  .swiper-slide{
    width: 3.5rem;
    height: 4.75rem;
  }
  .swiper-slide img{
    width: 100%;
    height: 100%;
  }
  .swiper-slide-active{
      width: 4.325rem;
      height: 5.25rem;
      border: 2px solid #fff;
      -webkit-transform: translateY(-0.25rem);
      transform: translateY(-0.25rem);
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
  }
</style>
