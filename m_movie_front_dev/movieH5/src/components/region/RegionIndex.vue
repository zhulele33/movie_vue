<template>
  <div class="city city-transition">
		<!-- <section class="search-city">
			<label class="search-box">
				<i class="icon-search"></i>
				<input type="text" id="search_text" placeholder="北京/beijing/bj">
			</label>
		</section>
		<section class="search-result">
			<ul id="result"></ul>
		</section> -->
		<section class="city-body">
			<div class="city-history" v-if="historyCitys.length!=0">
				<h2 class="city-title">历史搜索</h2>
				<ul class="city-items clearfix" id="historyCity">
					<li class="city-item" v-for="historyCity in historyCitys" >
            			<a v-on:click="jumpPage(historyCity)" href="javascript:;">{{historyCity.regionName}}</a>
					</li>
				</ul>
			</div>
			<div class="city-hot" id="hot">
				<h2 class="city-title">热门城市</h2>
				<ul class="city-items clearfix" id="hotcity">
					<li class="city-item" v-for="hotCity in citys.hotCity">
            			<a v-on:click="jumpPage(hotCity)" href="javascript:;">{{hotCity.regionName}}</a>
					</li>
				</ul>
			</div>
			<div class="city-list" id="cityList">
				<div class="city-list-items" v-for="letter in citys.letterCity" :id="letter.word">
					<h2 class="city-title">{{letter.word}}</h2>
					<ul class="list-items clearfix">
						<li class="city-item" v-for="city in letter.lc" >
							<a v-on:click="jumpPage(city)" href="javascript:;">{{city.regionName}}</a>
						</li>
					</ul>
				</div>
			</div>
		</section>
		<div class="list-bar-inner">
			<div><a href="javascript:;"  v-on:click="jumpLetter('hot')">热门</a></div>
			<div><a href="javascript:;" v-for="l in letters" v-on:click="jumpLetter(l)">{{l}}</a></div>
		</div>
		<div class="letter-show"></div>
		<div class="cover"></div>
	</div>
</template>

<script>
	export default{
		data(){
 			return {
 				msg:"",
 				letters:['A','B','C','D','E','F','G','H','J','K','L','M','N','P','Q','R','S','T','W','X','Y','Z'],
	        	citys: [],
	        	historyCitys:[]
	      	}
		},
		beforeCreate(){
			this.$store.dispatch('editHeadMsg', '选择城市');
			if(this.$route.query.r == 1){
				this.$store.dispatch('editToBack', '/');
			}else if(this.$route.query.r == 0){
				this.$store.dispatch('editToBack', '/navCinema');
			}else if(this.$route.query.r == 2){
				this.$store.dispatch('editToBack', '/buyTicket?productId='+this.$route.query.productId);
			}
		},
		mounted() {
	        this.$http.get('/wap/region/getList.json')
	          .then((response) => {
	            if (response.body.isSuccess == 'Y') {
	              var dataObj = JSON.parse(response.body.data);
	              this.citys = this.sortCitys(dataObj,this.letters);
	            }
	            else {
	              this.msg = "请求不成功";
                if (response.body.failCode =='E100')
                {
                  this.gotologin(window.location.href);
                }
	            }
	          })
	          .catch(response => {
	            return response;
	          });
	        var historyCitys = this.getHistoryCity();
	        this.historyCitys = historyCitys.reverse();
		},
		methods:{
			jumpLetter:function(str){
				var result = document.querySelector("#"+str).offsetTop ;
				if(str == 'hot') {
					str = '热门';
					result = document.querySelector("#hot").offsetTop ;
				}
				var largeLetter = document.querySelector(".letter-show");
				largeLetter.innerHTML = str;
				largeLetter.style.display = 'block';
				setTimeout(function(){
					largeLetter.style.display = 'none';
				},500);

				document.querySelector(".city-transition").scrollTop = result;
			},
			sortCitys:function(citys){
				var newCitys = {letterCity:[]};
				newCitys.hotCity = citys.filter((item) => (item.regionHot==1));
				for(var i in this.letters){
					var lettersCitys = citys.filter((item) => (item.regionSpell!=null && item.regionSpell.charAt(0).toLocaleUpperCase()==this.letters[i]));
					if(lettersCitys.length!=0){
						newCitys.letterCity.push({"word":this.letters[i], "lc" : lettersCitys});
					}
				}
				return newCitys;
			},
			getHistoryCity:function(){
				var historyCitys = [];
				try{
					var historyCityStr = localStorage.getItem('historyCity');
					return historyCityStr?JSON.parse(historyCityStr):[];
				}catch(error){
					return [];
				}
			},
			setHistoryCity:function(city){
				try{
					var historyCity = this.getHistoryCity(),newArr = [];
					if(historyCity && historyCity.length<6){
						for(var i=0;i<historyCity.length;i++){
							if(historyCity[i].regionCode != city.regionCode){
								newArr.push(historyCity[i]);
							}
						}
					}else if(historyCity && historyCity.length==6){
						for(var i=0;i<historyCity.length;i++){
							if(historyCity[i].regionCode == city.regionCode){
								historyCity.splice(i,1);
								break;
							}
						}
						newArr = historyCity;
						if(newArr.length==6){
							newArr.splice(0,1);
						}
					}
					newArr.push(city);
					localStorage.setItem('historyCity',JSON.stringify(newArr));
				}catch(error){

				}
			},
			jumpPage : function(city){
				var c = {
					regionID:city.regionID,
				    regionName:city.regionName,
				    districtRegionID:0,
				    districtRegionName:"全城"
				}
				this.setHistoryCity(city);
				this.$store.dispatch('editCurrCity', c);
				if(this.$route.query.r == 1){
					this.$router.push('/');
				}else if(this.$route.query.r == 0){
					this.$router.push('/navCinema');
				}else if(this.$route.query.r == 2){
					this.$router.push({
						path: '/buyTicket',
            			query: this.$route.query
					});
				}
			}
		}
	}


</script>
<style lang="scss">
	@import '../../style/citys.scss';
</style>
