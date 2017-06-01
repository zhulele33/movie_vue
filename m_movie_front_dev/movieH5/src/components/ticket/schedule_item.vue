<template>
  <li class="row fl">
    <div class="m_time fl">
      <strong>{{sc.foretellShowDate.substring(11,16)}}</strong>
      <p class="ending">{{sc.foretellSaleEndDate.substring(11,16)}}散场</p>
    </div>
    <div class="m_info fl">
      <p class="info_type">3D</p>
      <p class="m_room">{{sc.hallName}}</p>


      <template v-if=" $parent.leftTicket[sc.foretellID] && $parent.leftTicket[sc.foretellID].leftSeatPercent!=0 ">
        <p class="tickets_left">{{$parent.leftTicket[sc.foretellID].leftSeatPercent}}%</p>
      </template>
    </div>
    <div class="m_gomeActive fl">
      <span class="jiang" v-if="sc.promotionDesc!=''">降</span>
    </div>
    <div class="m_pri fl">
      <p class="discount_pri"><em>&#165</em>{{sc.foretellMallPrice}}</p>
      <del>&#165 {{sc.foretellMarketPrice}}</del>
    </div>
    <div class="m_buy fl">
      <a href="javascript:;" @click="changeForetell(sc.foretellID)" v-if="$parent.$parent.scId !=sc.foretellID">选座购票</a>
      <!-- <router-link :to="{path:'/seat',query:{scId:sc.foretellID,cinemaId:$route.query.cinemaId,filmID:$route.query.filmID,showDate:sc.foretellShowDate}}" >选座购票</router-link> -->
      <span v-else>当前场次</span>
    </div>
  </li>
</template>
<script >
  export default {
    data(){
      return{
        scId: this.$parent.$parent.scId
      }
    },
    props:['sc'],
    mounted(){
      console.log(this.sc);
    },
    methods:{
      changeForetell:function(scId){
        this.$parent.$parent.scId = scId;
        this.$parent.$parent.isShowForetells = !this.$parent.$parent.isShowForetells;
        this.$parent.$parent.checkSeat = [];
      }
    }
  }
</script>
<style lang="scss" scoped>
  $mainColor: #ff5c5c;
  $linkColor: #06c #333 !default;//第一个值为默认值，第二个鼠标滑过值
  $rootFontSize:40;

  .row{
        width:100%;
        border-bottom:1px solid #ddd;
        padding:14rem/$rootFontSize 0;
        text-align:center;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        height:112rem/$rootFontSize;
        overflow: hidden;
        .m_time{
          width:120rem/$rootFontSize;
          padding-left:30rem/$rootFontSize;
          text-align:left;
          margin-top: 5rem/$rootFontSize;
          strong{
            line-height:40rem/$rootFontSize;
          }
          .ending{
            color:#999;
            line-height:32rem/$rootFontSize;
          }
        }
        .m_info{
          width:180rem/$rootFontSize;
          .info_type{
            line-height:28rem/$rootFontSize;

          }
          .m_room,.tickets_left{
            color:#999;
            line-height:28rem/$rootFontSize;
          }
        }
        .m_gomeActive{
          width:100rem/$rootFontSize;
          min-height:1px;
          .jiang{
            display:inline-block;
            width:30rem/$rootFontSize;
            height:30rem/$rootFontSize;
            text-align:center;
            border:1px solid #009800;
            -webkit-border-radius:2rem/$rootFontSize;
            border-radius:2rem/$rootFontSize;
            color:#009800;
            margin-top:28rem/$rootFontSize;
          }
        }
        .m_pri{
          width:100rem/$rootFontSize;
          .discount_pri{
            line-height:40rem/$rootFontSize;
            margin-top: 6rem/$rootFontSize;
            color: $mainColor;
          }
          del{
            line-height:32rem/$rootFontSize;
            color:#999;
          }
        }
        .m_buy{
          width:220rem/$rootFontSize;
          a,span{
            display:inline-block;
            width:160rem/$rootFontSize;
            height:60rem/$rootFontSize;
            line-height:60rem/$rootFontSize;
            margin:11rem/$rootFontSize auto 0;
            
          }
          a{
            border:1px solid $mainColor;
            -webkit-border-radius:4rem/$rootFontSize;
            border-radius:4rem/$rootFontSize;
            color:$mainColor;
          }
        }
  }
  [data-dpr="1"] {
    .movie_schedules{
      .m_time{
        font-size:18px;
        .ending{
          font-size:11px;
        }
      }
      .m_info{
        .m_room,.tickets_left{
          font-size:12px;
        }
      }
      .m_gomeActive{
        .jiang{
          font-size:12px;
        }
      }
      .m_pri{
        font-size:13px;
        em,del{
          font-size:11px;
        }
        
      }
    }
  }
  [data-dpr="2"] {
    .movie_schedules{
      .m_time{
        font-size:36px;
        .ending{
          font-size:22px;
        }
      }
      .m_info{
        .m_room,.tickets_left{
          font-size:24px;
        }
      }
      .m_gomeActive{
        .jiang{
          font-size:24px;
        }
      }
      .m_pri{
        font-size:26px;
        em,del{
          font-size:22px;
        }
        
      }
    }
    
  }
  [data-dpr="3"] {
    .movie_schedules{
      .m_time{
        font-size:54px;
        .ending{
          font-size:33px;
        }
      }
      .m_info{
        .m_room,.tickets_left{
          font-size:36px;
        }
      }
      .m_gomeActive{
        .jiang{
          font-size:36px;
        }
      }
      .m_pri{
        font-size:39px;
        em,del{
          font-size:33px;
        }
        
      }
    }
    
  }
</style>