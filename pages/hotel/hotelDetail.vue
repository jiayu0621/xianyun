<template>
  <div class="hotel_detail">
    <div class="header_link">
      <nuxt-link to>酒店</nuxt-link>&nbsp;&nbsp;>
      <nuxt-link to>南京酒店</nuxt-link>&nbsp;&nbsp;>
      <span class="default_color">好来阁商务宾馆</span>
    </div>
    <div class="hotel_name">
      <h2 class="title_name">
        好来阁商务宾馆
        <span class="title_grade">
          <i class="iconfont iconhuangguan"></i>
          <i class="iconfont iconhuangguan"></i>
          <i class="iconfont iconhuangguan"></i>
          <i class="iconfont iconhuangguan"></i>
          <i class="iconfont iconhuangguan"></i>
        </span>
      </h2>
      <span class="default_color hotel_EnglishName">hao lai ge shang wu hotel</span>
      <p class="default_color hotel_address">
        <i class="iconfont iconlocation"></i>
        高淳县淳溪镇镇兴路118号(高淳县委党校对面)
      </p>
    </div>
    <div class="hotel_img">
        <el-row type='flex' class="hotel_img_row">
            <el-col :span='14' class="bgImg">
                <img src="" alt="">
            </el-col>
            <el-col :span='10' class="smImg">
                <el-row type='flex' class="smImg_row">
                    <el-col :span='12' class="smImg_col"></el-col>
                    <el-col :span='12' class="smImg_col"></el-col>
                </el-row>
                <img src="" alt="">
            </el-col>
        </el-row>
    </div>
  </div>
</template>

<script>
export default {};
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
  .hotel_img{
      
      .hotel_img_row{
          width: 1000px;
          .bgImg{
              width: 640px;
              height: 360px;
              background-color: lightcoral;
              margin-right: 20px;
          }
          .smImg{
              .smImg_row{
                  >div{
                      background-color: aqua;
                      width: 120px;
                      height: 120px;
                      margin: 2px;
                  }
              }
          }
      }
  }
}
</style>