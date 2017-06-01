<template>
	<section class="exchange_quan clearfix" v-if="tickets.length!=0">
		<div class="quan_title fl">
			<span class="quan">券</span><span>兑换券</span>
		</div>
		<div class="fr quan_price">
			<span class="price"><em>&#165</em>53.0<i>起</i></span>
			<a href="javascript:;" class="quan_btn" @click="showCertificate">购券</a>
		</div>
		<CertificateList :certificates="tickets" :hide="hide" :cinemaId="this.$route.query.cinemaId"></CertificateList>
	</section>
</template>
<script >
	import CertificateList from "../ticket/certificate_list.vue";
	export default{
		name: 'certificate',
		data(){
			return {
				tickets:[],
				currCity: this.$store.getters.currCity,
				hide:true
			}
		},
		mounted(){
			// 获取兑换券信息
			this.$http.post('/wap/ticket/getList.json?cityRegionID='+this.currCity.regionID+'&cinemaID='+this.$route.query.cinemaId)
			.then(function(response){
				if (response.body.isSuccess == 'Y') {
					if(response.body.data !=''){
						var dataObj = JSON.parse(response.body.data);
					 	this.tickets = dataObj[0].ticketList;
					}

				}else{
					// 服务请求错误
          if (response.body.failCode =='E100')
          {
            this.gotologin(window.location.href);
          }
				}

			}).catch(function(response){

			});

		},
		components:{
			CertificateList
		},
		methods:{
			showCertificate:function(){
				this.hide = false;
			}
		}

	}
</script>
<style  lang="scss" scoped>
	@import "../../style/certificates.scss";
	.hide{
		display: none;
	}
</style>
