<template>
  <li class="movie_item">
    <router-link :to="{ path: '/film_detail', query: { productId: itemdata.filmID }}" class="movie_item_link clearfix">
      <div class="movie-item-img fl">
        <img v-if="itemdata.filmSmallPhoto && itemdata.filmSmallPhoto!=null" :src="itemdata.filmSmallPhoto" :alt="itemdata.filmName" />
        <img v-else src="../../assets/film-default.png" :alt="itemdata.filmName" />
      </div>
      <div class="movie_item_info fl">
        <h3 class="movie_item_title ellipsis">{{itemdata.filmName}}</h3>
        <p class="movie_item_summary ellipsis">{{itemdata.filmReview}}</p>
        <p class="movie_item_actor ellipsis">主演：{{itemdata.filmActor}}</p>
        <p class="movie_item_time movie_item_type ellipsis">
          <span v-if="itemdata.filmDuration!=null">{{itemdata.filmDuration}}分钟&nbsp;</span>
          <span>{{itemdata.filmCategoryName}}</span>
        </p>
      </div>
        <router-link :to="{ path: '/buyTicket', query: { productId: itemdata.filmID }}" class="movie_item_btn fl">购票</router-link>
      <div class="movie_item_label">
        <template v-for="demension in filmDimensional">
          <span v-if="demension=='5'" class="fourD">4D</span>
          <span v-if="demension=='4'" class="imax">imax</span>
          <span v-if="demension=='3'" class="threeD">3D</span>
          <span v-if="demension=='2'" class="twoD">2D</span>
        </template>
      </div>
    </router-link>
  </li>
</template>
<script>
  export default {
      name: 'film_item',
      props: ['itemdata'],
      data () {
        return {
          filmDimensional:[]
        }
      },
      /*computed:{
        getDimensional:{
          set: function (v) {
            this.itemdata.filmDimensional = v;
          },
          get:function(){
            return this.itemdata;
          }
        }
      },*/
      mounted() {
         var newFilmDimensional = this.itemdata.filmDimensional.split(',');
         this.filmDimensional= [newFilmDimensional.length>2?newFilmDimensional.splice(2,newFilmDimensional.length):newFilmDimensional];
      }
  }
</script>
<style lang="scss" scoped>
  @import '../../style/film_item.scss';
</style>
