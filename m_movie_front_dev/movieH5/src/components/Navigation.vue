<template>
  <section class="movie_tab">
    <div class="fixed">
      <div class="city">
        <router-link :to="{ path: '/citys', query: { r: isFilmList }}" class="currCity">
          <i class="icon-city"></i>{{currCity.regionName}}
        </router-link>
      </div>
      <div class="tabs">
        <div class="tabs_list">
            <router-link to="/" class="tab_item fl" tag="a"  active-class="active" exact id="films">影片</router-link>
            <router-link to="/navCinema" class="tab_item fl" tag="a"  active-class="active" id="cinemas" >影院</router-link>
        </div>
      </div>
      <template v-if="isAreaShow==0">
        <div class="order_list"><router-link to="/orderList">我的订单</router-link></div>
      </template>
      <template v-else>
      <div class="order_list"><a href="javascript:;" v-on:click="loadArea">{{currCity.districtRegionName}}<i class="icon-b-arrow" :class="{'icon-up':isAreaBlockShow}"></i></a></div>
        <ul class="areabox clearfix" :class="{'hide':!isAreaBlockShow}">
          <li v-for="areaitem in areaData">
            <a href="javascript:;" :dirId="areaitem.regionid" v-on:click="freshCinemaList(areaitem)">{{areaitem.regionname}}</a>
          </li>
        </ul>
      </template>

    </div>
  </section>
</template>

<script>
  // import RegionIndex from './region/RegionIndex'
  export default {
    name: 'navigation',
    data(){
      return {
        areaData:[{'regionid':0,'regionname':'全城'}],
        isFilmList:1,
        isAreaBlockShow:false
      }
    },
    computed: {
      currCity(){
        return this.$store.getters.currCity
      },
      isAreaShow(){
        return this.$store.getters.isAreaShow
      }
    },
    components: {
      // RegionIndex
    },
    mounted(){
      if (document.querySelector('#films').className.indexOf('active')!=-1){
        this.isFilmList = 1;
      }else{
        this.isFilmList = 0;
      }
    },
    methods: {
      freshCinemaList:function(areaitem){
        this.isAreaBlockShow = !this.isAreaBlockShow;
        var city = {
          regionID:this.currCity.regionID,
          regionName:this.currCity.regionName,
          districtRegionID:areaitem.regionid,
          districtRegionName:areaitem.regionname
        }
        this.$store.dispatch('editCurrCity',city);
        // this.$router.push('/navCinema');
      },
      loadArea:function(){
        if(this.areaData.length > 1) {
          this.isAreaBlockShow = !this.isAreaBlockShow;
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
        this.isAreaBlockShow = !this.isAreaBlockShow;
      }
    }
  }
</script>
<style lang="scss">
  @import "../style/navigation.scss";
</style>

