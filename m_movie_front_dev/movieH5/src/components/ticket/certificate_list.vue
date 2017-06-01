<template>
	<div class="quan_container" :class="{'hide':hide}" v-if="certificates.length!=0">
		<div class="cover" @click="hideCertificate" :class="{'hide':hide}"></div>
		<div class="quan_lists">
			<header>兑换券</header><!-- /header -->
			<ul class="list clearfix">
				<li class="quan_item" v-for="c in certificates">
					<div class="quan_icon fl">通兑券</div>
					<div class="quan_name fl">
						<p class="title">{{c.ticketName}}</p>
						<p class="validity">有效期：{{c.ticketEnableDay}}天</p>
					</div>
					<div class="quan_price fl">
						<p class="original"><em>&#165</em>{{c.ticketPrice}}</p>
						<p class="discount"><del><em>&#165</em>{{c.ticketMarketPrice}}</del></p>
					</div>
					<router-link :to="{path:'/ticketConfirm',query:{cinemaID:cinemaId,ticketID:c.ticketID}}" class="quan_btn fr">购票</router-link>
					<!-- <a class="quan_btn fr">购票</a> -->
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	export default{
		name: 'certificateList',
		data(){
			return {
			}
		},
		props:['certificates','hide','cinemaId'],
		mounted(){
			console.log(this.$route)
		},
		methods:{
			hideCertificate:function(){
				this.$parent.hide = true;
			}
		}
	}
</script>
<style lang="scss" scoped>
	$mainColor:#ef3030;
	.quan_container{
		position: absolute;
		top:0;
		left:0;
		right:0;
		bottom:0;
	    z-index: 100;
	    .quan_lists{
	    	position: absolute;
	    	bottom:0;
	    	z-index: 101;
	    	width:100%;
	    	background-color: #fff;
	    	transition: 0.2s;

	    	header{
	    		height:1.75rem;
	    		line-height:1.75rem;
	    		text-align: center;
	    		background-color:#475561;
	    		color:#fff;
	    	}
	    	.list{
	    		.quan_item{
	    			float:left;
	    			width:100%;
	    			height:3rem;
	    			padding:0 0.75rem;
	    			-webkit-box-sizing: border-box;
	    			box-sizing: border-box;
	    			.quan_icon {
	    				width:96px;
	    				height:54px;
	    				line-height:54px;
	    				margin-top:34px;
	    				background-image:url(../../assets/quan.png);
	    				text-align: center;
	    				color:#fff;
	    			}
	    			.quan_name{
    				    width: 256px;
    				    padding-left:36px;
    					text-align: left;
    					margin-top:26px;
    					.title{
    						height:1.1rem;
    						line-height:1.1rem;
    					}
    					.validity{
    						color:#999;
    						height:0.75rem;
    						line-height:0.75rem;
    					}
	    			}
	    			.quan_price {
	    				width:3.25rem;
	    				margin-top:0.75rem;
	    				text-align: center;
	    				.original{
	    					height:38px;
	    					line-height:38px;
	    					color:$mainColor;
	    					em{
	    						font-size:22
	    					}
	    				}
	    				.discount{
	    					color:#999;
	    				}
	    			}
	    			.quan_btn{
	    				margin-top:0.75rem;
	    				border:2px solid $mainColor;
	    				color:$mainColor;
	    				width:140px;
	    				height:60px;
	    				line-height:58px;
	    				text-align: center;
	    				-webkit-box-sizing:border-box;
	    				box-sizing:border-box;
	    				-webkit-border-radius: 6px;
	    				border-radius: 6px;

	    			}
	    		}
	    	}
	    }
	    .cover{
	    	display:block;
	    }
	}

	[data-dpr="1"] .quan_container{
		.quan_lists .list .quan_item .quan_icon{
			font-size:12px;
		}
	    .quan_lists .list .quan_item .quan_name .validity,
		.quan_lists .list .quan_item .quan_price .original em,
		.quan_lists .list .quan_item .quan_price .discount{
	    	font-size:11px;
	    }
	}
	[data-dpr="2"] .quan_container{
		.quan_lists .list .quan_item .quan_icon{
			font-size:24px;
		}
	    .quan_lists .list .quan_item .quan_name .validity,
		.quan_lists .list .quan_item .quan_price .original em,
		.quan_lists .list .quan_item .quan_price .discount{
			font-size:22px;
		}
	}
	[data-dpr="3"] .quan_container{
		.quan_lists .list .quan_item .quan_icon{
			font-size:36px;
		}
	    .quan_lists .list .quan_item .quan_name .validity,
		.quan_lists .list .quan_item .quan_price .original em,
		.quan_lists .list .quan_item .quan_price .discount{
			font-size:33px;
		}
	}
</style>
