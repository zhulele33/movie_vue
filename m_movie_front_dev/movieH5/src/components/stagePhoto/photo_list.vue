<template>
	<div class="container" :class="{'forbid_scroll':showLarge}" v-on:scroll="loadImgLevel" >
		<ul class="photo_list clearfix">
			<li class="photo_item" v-for="(p,i) in photos" @click="showBig(i)">
				<img :data-original="p.filmMiddlePhoto">
			</li>
		</ul>
		<div v-swiper:filmPhotos="swiperOption" class="bigPhoto" :class="{'hide':!showLarge}" ref="mySwiper" @click="toggleBig">
            <div class="swiper-wrapper" >
              	<div class="swiper-slide" v-for="item in photos">
	          		<img :data-src="item.filmLargePhoto" class="swiper-lazy">
	          		<div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
            	</div>
        	</div>
        	<div class="swiper-pagination" slot="pagination"></div>
        	<div class="close" @click="toggleBig">&#10005</div>
        </div>
	</div>
</template>
<script>
	export default{
		name:'photo_list',
		data(){
			return{
				photos:JSON.parse(this.$route.query.photos),
				images:[],
				bigImages:[],
				showLarge:false,
				swiperOption:{
			        pagination: '.swiper-pagination',
			        paginationType: 'fraction',
			        paginationClickable: true,
			        // Disable preloading of all images
			        preloadImages: false,
			        // Enable lazy loading
			        lazyLoading: true,
		            observer: true,//修改swiper自己或子元素时，自动初始化swiper
			        onSlideChangeEnd:this.swiperFun,
			        initialSlide:0
				}
			}
		},
		computed: {
			swiper() {
				return this.$refs.mySwiper.swiper
			}
	    },
		mounted(){
			this.images = document.querySelector('.photo_list').getElementsByTagName('img');
			this.bigImages =  document.querySelector('.swiper-wrapper').getElementsByTagName('img');
			this.loadImgLevel();
			this.$store.dispatch('editHeadMsg','剧照列表');
		},
		methods:{
			swiperFun:function(swiper){
				// 获取该图片
				var _thisImg = this.bigImages[swiper.activeIndex];
				console.log(_thisImg);
				// 计算图片高度宽度 
				setTimeout(function(){
					if(_thisImg.getBoundingClientRect().width >=_thisImg.getBoundingClientRect().height){
						_thisImg.style.width= '100%';
						_thisImg.style.height= 'auto';
					}else{
						_thisImg.style.width= 'auto';
						_thisImg.style.height= '100%';
					}
				},100)
			},
			loadImgLevel:function(){
		      var arr = this.images;
		      // var photoListDom = document.querySelector('.photo_list').getElementsByTagName('img');
		      for( var i = 0,len = arr.length; i < len; i++){
		        if(arr[i].getBoundingClientRect().top < document.documentElement.clientHeight && !arr[i].isLoad ){
					arr[i].isLoad = true;
					arr[i].style.cssText = "transition: ''; opacity: 0;"
					if(arr[i].dataset){
						this.aftLoadImg(arr[i],arr[i].dataset.original);  
				    }else{
						this.aftLoadImg(arr[i],arr[i].getAttribute("data-original"));
				    }
					(function(i){
						setTimeout(function(){
							if(arr[i].getBoundingClientRect().width >= arr[i].getBoundingClientRect().height){
								arr[i].style.width= '100%';
							}else{
								arr[i].style.height= '100%';
							}
						},30)
					})(i);
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
		    toggleBig:function(){
		    	this.showLarge=!this.showLarge;
		    },
		    showBig:function(index){

		    	this.toggleBig();
		    	this.filmPhotos.slideTo(index);
		    }
		}
	}
</script>
<style lang="scss">
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
	.bigPhoto{
		position: fixed;
		top:2.2rem;
		left:0;
		right:0;
	    bottom:0;
		.swiper-wrapper{
			.swiper-slide{
				background:#000;
				display: -webkit-box; /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */ 
				display: -moz-box; /* 老版本语法: Firefox (buggy) */ 
				display: -ms-flexbox; /* 混合版本语法: IE 10 */ 
				display: -webkit-flex; /* 新版本语法： Chrome 21+ */ 
				display: flex; /* 新版本语法： Opera 12.1, Firefox 22+ */
			    -webkit-box-align: center;
			    -moz-box-align: center;
			    -ms-flex-align: center;
			    -webkit-align-items: center;
			    align-items: center;
			    -webkit-box-pack: center;
			    -moz-box-pack: center;
			    -ms-flex-pack: center;
			    -webkit-justify-content: center;
			    justify-content: center;
				img{
					width:100%;
				}
			}
			
		}
		.swiper-pagination{
			color:#fff;
		}
	}
	.hide{
		display:none;
	}
	.forbid_scroll{
		overflow:hidden;
	}

	.close{
		position:absolute;
		width:1rem;
		height: 1rem;
		line-height:1rem;
		text-align:center;
		top:0.5rem;
		right:0.5rem;
		color:#fff;
		z-index:10;
	}
	
</style>