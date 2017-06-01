<template>
	<div class="container">
		<section class="cinema_title clearfix">
			<div class="cinema_icon fl">
				<img :src="cinema_detail.cinemaLogoUrl" :alt="cinema_detail.cinemaName">
			</div>
			<h1 class="cinema_name ellipsis">{{cinema_detail.cinemaName}}</h1>
		</section>
		<section class="cinema_detail">
			<div class="cinema_address clearfix">
				<i class="icon-address fl"></i>
				<p class="fl">{{cinema_detail.cinemaAddress}}</p>
			</div>
			<div class="cinema_tel clearfix">
				<i class="icon-tel fl"></i>
				<p class="fl">{{cinema_detail.cinemaTel}}</p>
			</div>
		</section>
		<Certificates></Certificates>
		<DateTicket></DateTicket>
	</div>
</template>
<script >
	import Certificates from "../ticket/certificates.vue";
	import DateTicket from "../ticket/date_tickets.vue";

	export default{
		data(){
			return {
				cinema_detail:{}
			}
		},
		components:{
			Certificates,
			DateTicket
		},
		beforeCreate(){
		    if(this.$route.query.productId){ // 从影院详情跳过来的
			    this.$store.dispatch('editToBack', '/buyTicket?productId='+this.$route.query.productId);
			}else{ // 从影院列表跳过来的
				this.$store.dispatch('editToBack', '/navCinema');
			}
		},
		mounted(){
			// 获取影院基本信息
			this.$http.post('/wap/cinema/getById.json?cinemaID='+this.$route.query.cinemaId)
			.then(function(response){
				if (response.body.isSuccess == 'Y') {
					 var dataObj = JSON.parse(response.body.data);
					 this.cinema_detail = dataObj;
				}else{
					// 服务请求错误
          if (response.body.failCode =='E100')
          {
            this.gotologin(window.location.href);
          }
				}

			}).catch(function(response){

			});
		}
	}
</script>
<style lang="scss" scoped>
	@import "../../style/cinema_detail.scss";
</style>
