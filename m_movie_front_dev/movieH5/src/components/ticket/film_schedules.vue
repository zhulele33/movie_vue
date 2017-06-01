<template>
	<div>
		<ul class="movie_dates clearfix">
			<template v-for="(d,index) in scheduleCon.days">
				<li class="movie_date_item fl active" v-if="index==0">
					<a href="" title="">{{d}}</a>
				</li>
				<li class="movie_date_item fl" v-else>
					<a href="" title="">{{d}}</a>
				</li>
			</template>
		</ul>
		<ul class="movie_schedules clearfix">
			<li class="row fl" v-for="sc in schedules">
				<div class="m_time fl">
					<strong>{{sc.foretellShowDate.split(' ')[1]}}</strong>
					<p class="ending">{{sc.foretellSaleEndDate.split(' ')[1]}}散场</p>
				</div>
				<div class="m_info fl">
					<p class="info_type">3D</p>
					<p class="m_room">{{sc.hallName}}</p>
					<p class="tickets_left">余90%</p>
				</div>
				<div class="m_gomeActive fl">
					<span class="jiang" v-if="sc.promotionDesc!=''">降</span>
				</div>
				<div class="m_pri fl">
					<p class="discount_pri"><em>&#165</em>{{sc.foretellMallPrice}}</p>
					<del>&#165 {{sc.foretellMarketPrice}}</del>
				</div>
				<div class="m_buy fl">
					<router-link :to="{path:'/seat',query:{'scId':sc.foretellID}}">选座购票</router-link>
				</div>
			</li>
			<!-- <li class="row fl">
				<div class="m_time fl">
					<strong>16:35</strong>
					<p class="ending">16:39散场</p>
				</div>
				<div class="m_info fl">
					<p class="info_type">3D</p>
					<p class="m_room">3号厅</p>
					<p class="tickets_left">余90%</p>
				</div>
				<div class="m_gomeActive fl">
					<span class="jiang">降</span>
				</div>
				<div class="m_pri fl">
					<p class="discount_pri"><em>&#165</em>51.9</p>
					<del>&#165 108</del>
				</div>
				<div class="m_buy fl">
					<a href="" title="">选座购票</a>
				</div>
			</li>
			<li class="row fl">
				<div class="m_time fl">
					<strong>16:35</strong>
					<p class="ending">16:39散场</p>
				</div>
				<div class="m_info fl">
					<p class="info_type">3D</p>
					<p class="m_room">3号厅</p>
					<p class="tickets_left">余90%</p>
				</div>
				<div class="m_gomeActive fl">
					<span class="jiang">降</span>
				</div>
				<div class="m_pri fl">
					<p class="discount_pri"><em>&#165</em>51.9</p>
					<del>&#165 108</del>
				</div>
				<div class="m_buy fl">
					<a href="" title="">选座购票</a>
				</div>
			</li> -->
		</ul>
	</div>

</template>
<script>
	export default{
		data(){
			return{
				currCity:this.$store.getters.currCity,
				scheduleDays:this.scheduleCon.days,
				schedules:[]
			}
		},
		props:['scheduleCon'],
		mounted(){
			this.getForetellList(0);
		},
		methods:{
			getForetellList:function(dayIndex){
				this.$http.post('/wap/foretell/getList.json?cityRegionID='+this.currCity.regionID+'&cinemaID='+this.$route.query.cinemaId+'&filmId='+this.scheduleCon.filmId+'&showDate='+this.scheduleDays[dayIndex])
				.then(function(response){
					if (response.body.isSuccess == 'Y') {
						if(response.body.data && response.body.data !=''){
							var dataObj = JSON.parse(response.body.data);
						 	this.schedules = dataObj[0].foretellList;
						}
					}else{
						// 服务请求错误
            if (response.body.failCode =='E100')
            {
              this.gotologin(window.location.href);
            }
					}
				}).catch(function(response){
				})
			}
		},
		watch:{
			schedules:function(){
				// 查询余票输
			}
		}
	}
</script>
<style lang="scss" scoped>
	@import "../../style/movie_schedules.scss";
</style>
