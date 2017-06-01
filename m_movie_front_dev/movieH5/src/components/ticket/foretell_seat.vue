<template>
	<div v-if="getData">
		<div class="container">
			<div class="movie_info">
	            <p class="name"><span class="fl ellipisis">{{seat_info.filmName}}</span>
	            <i class="label-type">
	            	<template v-for="de in seat_info.foretellDimensional">
	            		<template v-if="de == '2'">2D</template>
	            		<template v-if="de == '3'">3D</template>
	            		<template v-if="de == '4'">IMAX</template>
	            		<template v-if="de == '5'">4D</template>
	            	</template>

	            </i></p>
	            <div class="sep"></div>
	            <div class="movie-meta fl"><span class="fl ellipisis">{{seat_info.foretellShowDate.substring(0,16)}}</span><span class="fl ellipisis">{{seat_info.foretellLanguage}}</span>
	            </div>
	            <p class="movie-seq fr" @click="showForetells">换一场</p>
			</div>
			<section class="seats">
				<div class="theater-screen" :style="{width:(1.15*seat_info.seatRowCount+1)+'rem'}">
					<div class="screen" >{{seat_info.hallName}}</div>
					<div class="seats-wrapper" v-if="!seat_info.column">
						<p class="loading">正在加载中。。。</p>
					</div>
					<div class="seats-wrapper" v-else>
						<ul class="row_no">
							<template v-for="i in seat_info.column">
								<li v-if="i!=0">{{i}}</li>
								<li v-else> </li>
							</template>
						</ul>
						<ul class="seat-table fl">
							<li class="row" v-for="(x,ix) in seat_info.seatList">
								<template  v-for="(seat,iy) in x">
									<Seat :seat="seat" :checkSeat="checkSeat" ></Seat>
								</template>
							</li>
						</ul>
					</div>
				</div>

			</section>
			<ul class="graphical clearfix">
				<li class="fl graphical-item"><span class="seat-able"></span>可选</li>
				<li class="fl graphical-item"><span class="seat-disable"></span>已售</li>
				<li class="fl graphical-item"><span class="seat-checked"></span>已选</li>
				<li class="fl graphical-item"><span class="seat-double-able"></span>情侣座</li></li>
			</ul>
			<div class="seat-tips"></div>
		</div>
		<footer class="sub_btn" v-if="checkSeat.length!=0">
			<div class="selected-seats">
				<p class="selected-tit">已选座位</p>
				<span class="clear-seat" @click="removeSeats">&#10005</span>
				<ul class="selected-seat-list clearfix">
					<li class="selected-seat-item" v-for="check in checkSeat">
						<p class="seat-location">{{check.seatName}}</p>
						<p class="price">&#165 {{price}}</p>
					</li>
				</ul>
			</div>
			<p class="btn" id="subForm" @click="sub($event)" v-if="!isSubmiting">确定</p>
			<p class="btn" id="subForm" v-else>提交中...</p>
		</footer>
		<DiaLogTable></DiaLogTable>
		<ChangeForetell v-if="isShowForetells"></ChangeForetell>
	</div>
	<div v-else>
		<p>获取场次信息失败，请重新选择场次</p>
	</div>
</template>
<script>
	import Seat from "../../components/ticket/seat.vue";
	import DiaLogTable from '../Dialog/DiaLogTable.vue';
	import ChangeForetell from './change-foretell.vue';

	export default{
		data(){
			return  {
				getData:true,
				seat_info:{seatList:[]},
				checkSeat:[],
				price:0,
				seatIds:[],
				isSubmiting:false,
				isShowForetells:false,
				scId:this.$route.query.scId
			}
		},
		beforeCreate(){
			this.$store.dispatch('editToBack', '/cinema_detail?cinemaId='+this.$route.query.cinemaId);
		},
		mounted(){
			this.getSeat();
		},
		components:{
			Seat,
			DiaLogTable,
			ChangeForetell
		},
		methods:{
			getSeat:function(){
				this.$http.post('/wap/foretell/getById.json?foretellID='+this.scId).then((response)=>{
					if(response.body.isSuccess == 'Y'){

						this.getData = true;
						this.seat_info = JSON.parse(response.body.data);
						this.seat_info.seatRowCount = Number(this.seat_info.seatRowCount);
						this.seat_info.seatColumnCount = Number(this.seat_info.seatColumnCount);
						this.seat_info.column=[];
						this.price = this.seat_info.foretellPrice;
						var newseats = [];
						for(var y=1;y<=this.seat_info.seatColumnCount;y++){
							var seatrows = [];
							for (var x=1;x<=this.seat_info.seatRowCount;x++){
								var noseat = true;
								for(var s=0;s<this.seat_info.seatList.length;s++){
									var seat = this.seat_info.seatList[s];
									if(seat.seatX == x+'' && seat.seatY == y+''){
										noseat = false;
										seatrows.push(seat);
									}
								}
								if(noseat){
									seatrows.push({'seatID':0});
								}
							}
							newseats.push(seatrows);
							var norow = true;
							for(var r=0;r<seatrows.length;r++){
								if(seatrows[r].seatID!=0){
									norow = false;
									break;
								}
							}
							if(norow){
								this.seat_info.column.push(0);
							}else{
								for(var r=0;r<seatrows.length;r++){
									if(seatrows[r].seatID!=0){
										var _index = seatrows[r].seatName.indexOf("排");
										this.seat_info.column.push(seatrows[r].seatName.substring(0, _index));
										break;
									}
								}
							}
						}
						this.seat_info.seatList = newseats;
					}else{
						console.log(response.body)
						alert(1)
						this.getData = false;
			            if (response.body.failCode =='E100')
			            {
			              this.gotologin(window.location.href);
			            }
					}
				}).catch((response)=>{
					console.log(response);
				})
			},
			removeSeats:function(){
				this.checkSeat = [];
			},
			sub:function(e){
				if(this.checkSeat.length == 0){
					this.showAlertTable('请选择座位');
					return;
				}else{
					if(!this.isSubmiting){
						this.isSubmiting = !this.isSubmiting;
						// this.lockSeat(this.seatIds.join(","));
						this.$router.push({path:'/foretellConfirm',query:{
							foretellID:this.seat_info.foretellID,
							seatID:this.seatIds.join(",")
						}});
					}else{
						return false;
					}
				}
			},
			getPrices:function(){
				var seatIds = [];
				for(var d in this.checkSeat){
					seatIds.push(this.checkSeat[d].seatID);
				}
				this.seatIds = seatIds;
				var param = encodeURIComponent('[{"productID":'+this.seat_info.foretellID+',"productQuantity":'+this.checkSeat.length+',"seatID":"'+seatIds.join(',')+'"}]');
				this.$http.post('/wap/foretell/queryPrice.json?orderType=2&productList='+param).then((response)=>{
					if(response.body.isSuccess == 'Y'){
						this.price = JSON.parse(response.body.data).productList[0].productPrice;
					}else{
						// 请求错误 （错误码是4010 登录错误跳转登录）
            if (response.body.failCode =='E100')
            {
              this.gotologin(window.location.href);
            }
					}
				}).catch((response)=>{

				})
			},
		    //显示提示框面板
		    showAlertTable:function (curMsg) {
		        var tableInfo =
		          {
		            tablename: 'alert',
		            msg: curMsg
		          };
		        this.$store.dispatch('editDialogTable', tableInfo);
		        this.$store.dispatch('editDialogIsShow', 1);
		    },
		    showForetells:function(){
		    	this.isShowForetells = !this.isShowForetells;
		    }
		},
		watch:{
			checkSeat:function(){
				this.getPrices();
			},
			scId:function(){
				this.seat_info={seatList:[]};
				this.getSeat();
			}
		}
	}
</script>
<style lang="scss" scoped>
	@import "../../style/movie_seat.scss";
</style>
