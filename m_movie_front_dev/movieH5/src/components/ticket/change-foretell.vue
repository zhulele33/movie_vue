<template>
	<div class="changebox">
		<div class="cover" @click="toggleShow"></div>
		<div class="change_list">
			<header>换一场<i @click="toggleShow"> &#10005</i></header>
			<ul class="movie_schedules clearfix" v-if="foretells.length!=0">
				<ScheduleItem :sc="sc" v-for="sc in foretells"></ScheduleItem>
			</ul>
			<div class="noMore" v-else>没有更多场次</div>
		</div>
	</div>
</template>
<script>
	import ScheduleItem from '../ticket/schedule_item.vue';
	export default {
		data(){
			return {
				foretells:[],
				leftTicket:{},
				currCity:this.$store.getters.currCity
			}
		},
		components:{
			ScheduleItem
		},
		mounted(){
			var postUrl = '/wap/foretell/getList.json?cityRegionID='+this.currCity.regionID+'&cinemaID='+this.$route.query.cinemaId+'&filmID='+this.$route.query.filmID+'&showDate=' + this.$route.query.showDate;
			this.$http.post(postUrl).then(function(response){
				if (response.body.isSuccess == 'Y') {
					if(response.body.data && response.body.data !=''){
		            	var dataObj= JSON.parse(response.body.data);
		            	if(dataObj.length!=0){
		            		this.foretells = dataObj[0].foretellList;
		            		var ids = [];
					        for(var d in this.foretells){
					          this.foretells[d].leftSeatPercent=0;
					          ids.push(this.foretells[d].foretellID);
					        }
					        this.getLeaveTic(ids.join(','));
		              	}
		            }
				}else{
				// 服务请求错误
          if (response.body.failCode =='E100')
          {
            this.gotologin(window.location.href);
          }
				}
			}).catch(response=>{
				console.log(response)
			});
		},
		methods:{
			toggleShow:function(){
				this.$parent.isShowForetells = !this.$parent.isShowForetells;
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

		      },

		},

	}
</script>
<style lang="scss" scoped>
	$mainColor: #ff5c5c;
	$linkColor: #06c #333 !default;//第一个值为默认值，第二个鼠标滑过值
	$rootFontSize:40;
	.changebox{
		position: absolute;
		top: 0;
		left:0;
		right:0;
		bottom:0;
		.cover{
			position: absolute;
			top: 0;
			left:0;
			right:0;
			bottom:0;
			background-color: rgba(0,0,0,0.6);
		}
		.change_list{
			position:absolute;
			bottom:0;
			left:0;
			right:0;
			background-color: #fff;
			header{
				height:1.75rem;
				line-height:1.75rem;
				background-color: #475561;
				text-align: center;
				color:#fff;
				i{
					position:absolute;
					width:2rem;
					right:0;
					top:0;
					text-align: center;

				}
			}

			.movie_schedules{
				max-height:672rem/$rootFontSize;
			    overflow: auto;

			}
			.noMore{
				height:112rem/$rootFontSize;
				line-height:112rem/$rootFontSize;
				text-align:center;
				color:#999
			}

		}
	}

</style>
