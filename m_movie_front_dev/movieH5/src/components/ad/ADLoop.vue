<template>
  <div v-swiper:adLoop="swiperOption">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="item in adList">
        <img :src="item.adLargeImage">
      </div>
    </div>
    <div class="swiper-pagination" slot="pagination"></div>
  </div>
</template>

<script>
  export default {
    name: 'adLoop',
    data() {
      return {
        swiperOption: {
          pagination: '.swiper-pagination',
          paginationClickable: true,
          spaceBetween: 30,
          centeredSlides: true,
          autoplay: 5000,
          autoplayDisableOnInteraction: false
        },
        adListUrl: '/wap/ad/getList.json',
        adList: []
      };
    },
    mounted() {
      this.$http.get(this.adListUrl)
        .then((response) => {
          if (response.body.isSuccess == 'Y') {
            var dataObj = JSON.parse(response.body.data);
            this.adList = dataObj.list;
            if (this.adList.length > 0)
            {
//              this.adLoop.slideTo(1);
            }
          }
          else{
            if (response.body.failCode =='E100')
            {
              this.gotologin(window.location.href);
            }
          }
        })
        .catch(function (response) {
          return response
        });
    }
  }
</script>
