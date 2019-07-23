<template>
  <div class="hotel_detail">
    <div class="header_link">
      <nuxt-link to="/hotel">酒店</nuxt-link>&nbsp;&nbsp;>
      <nuxt-link to="/hotel">南京酒店</nuxt-link>&nbsp;&nbsp;>
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
      <div class="bgImg">
        <img :src="`/images/hotel-pics/${bgURL}`" alt =''/>
      </div>
      <div class="smImg">
        <span v-for="(item,index) in hotelDetail.pics" :key="index" class="smImg_row">
          <img :src="`/images/hotel-pics/${item.name}`" alt  @click="handleBgImg(index)"/>
        </span>
      </div>
    </div>
    <div class="hotel_item default_color">
      <el-table style="width: 100%" :data="hotelDetail.products">
        <el-table-column prop="name" label="价格来源"></el-table-column>
        <el-table-column prop="bestType" label="低价房型"></el-table-column>
        <el-table-column prop="price" label="最低价格/每晚" width="180"></el-table-column>
      </el-table>
    </div>
    <!-- 地图组件 -->
    <HotelMap :data="hotelDetail" />

    <div class="hotel_info">
      <el-row>
        <el-col :span="4">基本信息</el-col>
        <el-col :span="20" class="hotel_baseInfo default_color">
          <span>入住时间：14:00之后</span>
          <span>离店时间：12:00之前</span>
          <span>{{hotelDetail.creation_time}}/{{hotelDetail.renovat_time}}</span>
          <span>酒店规模：{{hotelDetail.roomCount}}间客房</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">主要设施</el-col>
        <el-col :span="20" class="hotel_facility default_color">
          <span v-for="(item,index) in hotelDetail.hotelassets" :key="index">{{item.name}}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">停车服务</el-col>
        <el-col :span="20">
          <span>-</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">品牌信息</el-col>
        <el-col :span="20">
          <span>-</span>
        </el-col>
      </el-row>
    </div>
    <HotelGrade :data="hotelDetail"/>
    <!-- 评论跟帖组件 -->
    <HotelComment  :data='hotelComment'/>
  </div>
</template>

<script>
import HotelMap from "@/components/hotel/hotelMap";
import HotelGrade from "@/components/hotel/hotelGrade";
import HotelComment from "@/components/hotel/hotelComment";
export default {
  components: {
    HotelMap,
    HotelGrade,
    HotelComment
  },
  methods: {
    handleBgImg(index){
      this.bgURL=this.hotelDetail.pics[index].name
    }
  },
  data() {
    return {
      bgURL:'1.jpeg',
      hotelDetail: {
        // location:{}
        scenic: [],
        scores:{},
      },
    
        
        hotelComment:[],
    };
  },
  mounted() {
    const {id} = this.$route.query
    console.log(id);
    
    this.$axios({
      url: "/hotels",
      method: "get",
      params:{
          id:id
      }
    }).then(res => {
      console.log(res);
      const { data } = res.data;
      this.hotelDetail = data[0];
    });

     this.$axios({
      url: "/hotels/comments",
      method: "get"
    }).then(res => {
      // console.log(res);
      this.hotelComment=res.data.data
    });
  }
};
</script>

<style lang='less' scoped>
img {
  width: 100%;
}
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
    display: flex;
    margin: 50px 0;
    height: 380px;
    .bgImg {
      height: 100%;
      flex: 6;
      margin-right: 20px;
    }
    .smImg {
      flex: 4;
      height: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .smImg_row {
        width: 48%;
       padding-bottom: 5px;
      //  box-sizing: border-box;
      }
    }
  }
  .hotel_info {
    > div {
      padding: 15px 0;
      border-bottom: 1px solid #eeeeee;
      font-size: 14px;
    }
    .hotel_baseInfo {
      span {
        margin: 0 10px;
        padding: 5px 8px;
      }
    }
    .hotel_facility {
      span {
        margin: 0 10px;
        padding: 5px 8px;
        background-color: #eeeeee;
      }
    }
  }
}
</style>