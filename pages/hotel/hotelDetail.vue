<template>
  <div class="hotel_detail">
    <div class="header_link">
      <nuxt-link to='/hotel'>酒店</nuxt-link>&nbsp;&nbsp;>
      <nuxt-link to='/hotel'>南京酒店</nuxt-link>&nbsp;&nbsp;>
      <span class="default_color">{{hotelDetail.name}}</span>
    </div>
    <div class="hotel_name">
      <h2 class="title_name">
        {{hotelDetail.name}}
        <span class="title_grade">
          <i class="iconfont iconhuangguan"></i>
          <i class="iconfont iconhuangguan"></i>
          <i class="iconfont iconhuangguan"></i>
          <i class="iconfont iconhuangguan"></i>
          <i class="iconfont iconhuangguan"></i>
        </span>
      </h2>
      <span class="default_color hotel_EnglishName">{{hotelDetail.alias}}</span>
      <p class="default_color hotel_address">
        <i class="iconfont iconlocation"></i>
        {{hotelDetail.address}}
      </p>
    </div>
    <div class="hotel_img">
      <el-row type="flex" justify="space-between" class="hotel_img_row">

        <el-col :span="14" class="bgImg">
          <!-- <img :src='hotelDetail.pics[0].url' alt =''/> -->
        </el-col>
        <el-col :span="10" class="smImg">
          <el-row
          
            class="smImg_row"
            v-for="(item,index) in hotelDetail.pics"
            :key="index"
            >
            <el-col :span="12" class="smImg_col">
              <!-- <img :src="$axios.defaults.baseURL+item.url" alt=""> -->
              <!-- <img :src="`${$axios.defaults.baseURL+item.url}`" alt=""> -->
            </el-col>
          </el-row>
         
        </el-col>
      </el-row>
    </div>
    <div class="hotel_item default_color">
      <el-table style="width: 100%"  :data="hotelDetail.products">
        <el-table-column prop="name" label="价格来源" ></el-table-column>
        <el-table-column prop="bestType" label="低价房型" ></el-table-column>
        <el-table-column prop="price" label="最低价格/每晚" width="180"></el-table-column>
      </el-table>
    </div>
    <!-- 地图组件 -->
    <HotelMap :data='hotelDetail'/>

    <div class="hotel_info">
        <el-row>
            <el-col :span='4'>基本信息</el-col>
            <el-col :span='20'>
                <span>入住时间</span>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span='4'>主要设施</el-col>
            <el-col :span='20'>
                <span>外币兑换服务</span>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span='4'>停车服务</el-col>
            <el-col :span='20'>
                <span>可以停车</span>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span='4'>品牌信息</el-col>
            <el-col :span='20'>
                <span>有品牌 </span>
            </el-col>
        </el-row>
    </div>
  </div>
</template>

<script>
import HotelMap from '@/components/hotel/hotelMap'
export default {
  components: {
    HotelMap,
  },
    data () {
        return {
            // hotelInfo:[
            //     { form:'携程', type:'高级大床房', price:'230', }
            // ],
            hotelDetail:{
              location:{}
            }
        }
    },
    mounted () {
        this.$axios({
            url:'/hotels',
            method:'get',
            params:{
                id:1
            }
        }).then(res=>{
            // console.log(res);
            const {data} = res.data
            this.hotelDetail=data[0]
            // console.log(this.hotelDetail);
        })
          this.$axios({
            url:'/hotels/options',
            method:'get',
          
        }).then(res=>{
            console.log(res);
        })

    }
};
</script>

<style lang='less' scoped>
.default_color {
  color: #666666;
}
.hotel_detail {
  width: 1000px;
  margin: 0 auto;
  .header_link {
    padding: 10px;
  }
  .title_name {
    font-weight: normal;
    .title_grade {
      color: orange;
    }
    .hotel_EnglishName {
      padding-left: 8px;
    }
  }
  .hotel_img {
    .hotel_img_row {
      margin: 30px 0;
      .bgImg {
        width: 640px;
        height: 360px;
        margin-right: 20px;
        img{
        // width: 640px;
        // height: 360px;
        width: 100%;
        }
      }
      .smImg {
        //    height: 360px;
        .smImg_row {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          > div {
            background-color: aqua;
            width: 180px;
            height: 113px;
            margin-bottom: 10px;
            // width: 50%;
            //   box-sizing: border-box;
            // &:nth-child(odd) {
              // margin-right: 15px;
            // }
           /deep/ img{
              width: 50%;
            }
          }
        }
      }
    }
  }
  .hotel_info{
      >div{
          padding: 15px 0;
          border-bottom: 1px solid #eeeeee;
          font-size: 14px;
      }
      el-row{
          span{
              padding: 0 20px;
          }
      }
  }
}
</style>