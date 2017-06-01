	<template>
		<span class="seat-able" v-bind:class="{ 'seat-checked':isChecked}" @click="showSeat" v-if="seat.seatID!=0 && seat.seatType==1&&seat.seatStatus == 1"></span>
		<span class="seat-disable" v-else-if="seat.seatID!=0 && seat.seatType==1&&seat.seatStatus != 1"></span>
		<span class="seat-double-able" v-else-if="seat.seatID!=0 && seat.seatType==2&&seat.seatStatus == 1" v-bind:class="{ 'seat-double-checked':isChecked}"  @click="showDoubleSeatA($event)"  ></span>
		<span class="seat-double-disable" v-else-if="seat.seatID!=0 && seat.seatType==2&&seat.seatStatus != 1"></span>
		<span class="seat-double-able" v-else-if="seat.seatID!=0 && seat.seatType==3&&seat.seatStatus == 1" style="display:none;" :text="seat.seatName" :oid="seat.seatID"></span>
		<span  class="noseat" v-else-if="seat.seatID==0"></span>

	</template>
<script>
	export default{
		data(){
			return {
				isChecked:false
			}
		},
		props:['seat','checkSeat','productId'],
		methods:{
			showSeat:function(){
				// 需要判断是否登录 获取价格
				if(this.isChecked){
					this.isChecked = !this.isChecked;
					this.checkSeat.splice(this.checkSeat.indexOf(this.seat),1);
					this.getPrices();
				}else{
					if(this.checkSeat.length>=5){
						this.$parent.showAlertTable('每个订单最多选择五个座位');
					}else{
						this.isChecked = !this.isChecked;
						this.checkSeat.push(this.seat);
					}
				}
			},
			showDoubleSeatA(e){
				// 需要判断是否登录 获取价格
				if(this.isChecked){
					this.isChecked = !this.isChecked;
					this.checkSeat.splice(this.checkSeat.indexOf(this.seat),2);
				}else{
					if(this.checkSeat.length>=4){
						this.$parent.showAlertTable('每个订单最多选择五个座位');
					}else{
						this.isChecked = !this.isChecked;
						this.checkSeat.push(this.seat);
						var $nextDom = e.target.nextSibling;
						console.log($nextDom)
						var nextSeat = {
							seatID:$nextDom.getAttribute('oid'),
							seatName:$nextDom.getAttribute('text')
						}
						this.checkSeat.push(nextSeat);
					}
				}
			}
			
		},
		watch:{
			checkSeat:function(){
				if(this.checkSeat.length == 0){
					this.isChecked = false;
				}
			}
		}
	}
</script>
<style lang="scss" scoped>

			a{
				display: inline-block;
			    height: 1.1rem;
			    // margin: 0.125rem;
			    font-size:0;
			}
			span{
				background-image:url('../../assets/seats.png');
				background-size:9.1rem 0.75rem;
				height:0.75rem;
				margin:0.125rem;
				display:inline-block;
			}
			.noseat{
				width:0.9rem;
				height:0.75rem;
				background:none;
			}

		.seat-able{
			background-position:0 0;
			width:0.9rem;
		}
		.seat-disable{
			background-position:-1.9rem 0;
			width:0.9rem;
		}
		.seat-checked{
			background-position:-0.95rem 0;
			width:0.9rem;
		}

		.seat-double-able{
			width:2.05rem;
			background-position:-7.05rem 0;
		}
		.seat-double-disable{
			width:2.05rem;
			background-position:-4.95rem 0;
		}
		.seat-double-checked{
			width:2.05rem;
			background-position:-2.85rem 0;
		}
</style>