<template>
	<div class="container">
		<router-link :to="{ path: '/film_detail', query: { productId:$route.query.productId }}" class="base_info">
		<!-- <section class="base_info" > -->
			<div class="img_txt clearfix">
				<img :src="detailInfo.filmLargePhoto" class="blur" />
				<div class="bg_cover"></div>
				<div class="base_img">
					<img :src="detailInfo.filmLargePhoto"  :alt="detailInfo.filmName" />
				</div>
				<dl class="base_info_txt">
					<dt class="base_title">
						<h1 class="fl clamp_ellipsis_2">{{detailInfo.filmName}}</h1>
						<span class="score fr"  v-if="detailInfo.filmGrade!=null&&detailInfo.filmGrade!=0">{{detailInfo.filmGrade.toFixed(1)}}分</span>
					</dt>
					<dd class="base_introduce ellipsis">{{detailInfo.filmReview}}</dd>
					<dd class="actor ellipsis">主演：{{detailInfo.filmActor}}</dd>
					<dd class="base_type">类型：动作 科幻 惊悚</dd>
					<dd class="base_time">片长：
						<template v-if="detailInfo.filmDuration!=null && detailInfo.filmDuration!=0">
			              {{detailInfo.filmDuration}}分钟
			            </template>
		            </dd>
					<dd class="base_showtime">上映时间：
						<template v-if="detailInfo.filmShowDate!=null && detailInfo.filmShowDate!=0">
			              {{detailInfo.filmShowDate}}
			            </template>
            		</dd>
				</dl>
			</div>
		<!-- </section> -->
			<i class="icon-right"></i>
		</router-link>
		<section class="cinemas">
			<ul class="city_area">
				<li class="city_area_item">
					<router-link :to="{path:'/citys',query:{r:2,productId:this.$route.query.productId}}">
						{{currCity.regionName}}<i class="icon-b-arrow"></i>
					</router-link>
				</li>
				<li class="city_area_item">
					<span v-on:click="loadArea">{{currCity.districtRegionName}}<i class="icon-b-arrow"></i></span>
					<ul class="areabox clearfix" :class="{'hide':isAreaboxHide}" >
			          <li v-for="areaitem in areaData">
			            <a href="javascript:;" :dirId="areaitem.regionid" v-on:click="freshCinemaList(areaitem)">{{areaitem.regionname}}</a>
			          </li>
			        </ul>
				</li>
			</ul>
			<!--<template v-if="page.pageCount == 0 || cinemaList.length == 0">-->
			<!--<div style="min-height:9.125rem"><p class="errorTips">哎呦，出错了 ！</p></div>-->
			<!--</template>-->
			<!--<template v-else>-->
				<!-- <ul class="cinemas" v-on:touchstart="swipeStart($event)" v-on:touchmove="swipeMove($event)">
				  <CinemaItem v-for="item in cinemaList" :itemdata='item'></CinemaItem>
				</ul> -->
				<ul class="cinemas" v-infinite-scroll="loadMore"
		            infinite-scroll-disabled="busy"
		            infinite-scroll-distance="100"
            infinite-scroll-immediate-check="false">
		          <template v-if="page.pageCount == 0 || cinemaList.length == 0">
		            <li style="min-height:9.125rem"><p class="errorTips">{{loadingTip}}</p></li>
		          </template>
		          <template v-else>
		          <CinemaItem v-for="item in cinemaList" :itemdata='item' :productId="productId"></CinemaItem>
		          </template>
		        </ul>
				<p class="hasnomore" :class="{'hide':cinemaList.length==0}">{{loadingTip}}</p>
			<!--</template>-->
		</section>
		
		
	</div>
	
</template>
<script>
	import CinemaItem from '../cinema/CinemaItem';
	import ToTop from '../toTop/ToTop';
	export default {
		data(){
			return {
				productId:this.$route.query.productId,
				detailInfo:{},
				cinemaList:[],
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
		        busy:false,
		        isFirst:true,
		        areaData:[{'regionid':0,'regionname':'全城'}],
		        loadingTip:"努力加载中...",
		        toTop:false,
		        isAreaboxHide:true 
			}
		},
		beforeCreate(){
			this.$store.dispatch('editHeadMsg', '国美电影票');
			this.$store.dispatch('editToBack', '/film_detail?productId='+this.$route.query.productId);

		},
		computed:{
			currCity(){
		        return {
		          regionID:this.$store.getters.currCity.regionID,
		          regionName:this.$store.getters.currCity.regionName,
		          districtRegionID:this.$store.getters.currCity.districtRegionID,
		          districtRegionName:this.$store.getters.currCity.districtRegionName
		        }
		    }
		},
		components:{
			CinemaItem
		},
		methods:{
	      loadCinemaList: function(){
		        var url = '/wap/cinema/getList.json?cityRegionID='+this.currCity.regionID+'&filmID='+this.$route.query.productId+'&pageSize='+this.page.pageSize+'&pageIndex='+this.page.pageIndex;
		        if(this.currCity.districtRegionID!=0){
		          url = '/wap/cinema/getList.json?cityRegionID='+this.currCity.regionID+'&districtRegionID='+this.currCity.districtRegionID+'&filmID='+this.$route.query.productId+'&pageSize='+this.page.pageSize+'&pageIndex='+this.page.pageIndex;
		        }
		        this.$http.post(url).then((response) => {
		          if (response.body.isSuccess == 'Y') {
		            var dataObj = JSON.parse(response.body.data);
		            this.page = dataObj.page;

		            if(dataObj.list!=null){
		              if(this.isFirst){
		                this.cinemaList = dataObj.list;
		                this.isFirst = false;
		                if(this.cinemaList.length<this.page.pageSize){
		                	 this.loadingTip = "没有更多了~";
		                }
		              }else{
		                 this.cinemaList = this.cinemaList.concat(dataObj.list);
		              }
		            }else{
		               if(this.isFirst){
		                this.cinemaList = [];
	                	this.loadingTip = "哎呦!出错了~";
		              }
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
		      swipeStart:function(e){
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
		            //左右滑动
		        }
		        if (y - this.touchLocation.startY < 0) {
		            //上下滑动
		            // console.log(y - this.touchLocation.startY);
		            if(this.page.pageIndex == this.page.pageCount){
		              this.loadingTip = "没有更多了~";
		            }else if(this.lowEnough() && this.page.pageIndex<this.page.pageCount){
		              this.loadingTip = "努力加载中...";
		              this.page.pageIndex++;
		              this.loadCinemaList();

		            }
		        }
	      },
	      lowEnough:function(evt){
	        var dom = document.querySelector(".container");
	        var pageHeight = Math.max(dom.scrollHeight,dom.offsetHeight);
	        var viewportHeight = dom.innerHeight || dom.clientHeight || 0;
	        var scrollHeight = dom.pageYOffset || dom.scrollTop || 0;
	        return pageHeight - viewportHeight - scrollHeight < 100;
	      },
	      loadMore: function () {
	      	this.toTop = true;
	        var self = this;
	        self.busy = true;
	        if(this.cinemaList.length!=0){
	        	if(this.page.pageIndex >= this.page.pageCount){
		          this.loadingTip = "没有更多了~";
		        }else if(this.page.pageIndex<this.page.pageCount){
		          this.page.pageIndex++;
		          this.loadCinemaList();
		          self.busy = false;
		        }
	        }else{
	        	this.loadingTip = "哎呦出错了~";
	        }

	      },
	      loadArea:function(){
	        if(this.areaData.length > 1) {
	        	this.isAreaboxHide = false;
	          // document.querySelector('.areabox').style.display = 'block';
	          return;
	        };
	        this.$http.post('wap/region/getDistrictListByCityId.json?regionID='+this.currCity.regionID)
	        .then((response) => {
	          if (response.body.isSuccess == 'Y') {
	            var dataObj = JSON.parse(response.body.data);
	            this.areaData = this.areaData.concat(dataObj);
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
	        });
	        // document.querySelector('.areabox').style.display = 'block';
	        this.isAreaboxHide = false;
	      },
	      freshCinemaList:function(areaitem){
	        // document.querySelector('.areabox').style.display = 'none';
	        this.isAreaboxHide = true;
	        var city = {
	          regionID:this.currCity.regionID,
	          regionName:this.currCity.regionName,
	          districtRegionID:areaitem.regionid,
	          districtRegionName:areaitem.regionname
	        }
	        this.$store.dispatch('editCurrCity',city);
	        // this.$router.push('/navCinema');
	      },
	    },
		mounted(){
		    this.$http.post('/wap/film/getById.json?filmID='+this.$route.query.productId)
		    .then(function(response){
		        if (response.body.isSuccess == 'Y') {
		          var dataObj = JSON.parse(response.body.data);
		          this.detailInfo = dataObj;
		          var _this = this;
		          // this.$store.dispatch('editHeadMsg', dataObj.productList[0].productName);
		        }
		        else {
		          this.orderInfo = {};
              if (response.body.failCode =='E100')
              {
                this.gotologin(window.location.href);
              }
		        }
		    })
		    .catch(function(response){
		      console.log(response);
		    });
		    this.loadCinemaList();
		  },
		watch:{
			currCity:function(){
		        this.isFirst = true;
		        this.loadCinemaList();
		    }
		}
	}
</script>
<style lang="scss" scoped>
	@import '../../style/movie_detail.scss';
	.cinemas{
		background: #fff;
	}
</style>
