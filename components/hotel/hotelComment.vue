<template>
  <div class="hotel_Comment">
    <!-- 评分模块 -->
    <h4>10条真实的评论</h4>
    <el-row class="hotel_Comment_info">
      <el-col :span="4">
        <p>总评数：82</p>
        <p>好评数：14</p>
        <p>差评数：6</p>
      </el-col>
      <el-col :span="20" class="hotel_grate">
        <span class="star_level">推荐 </span>
        <el-rate class="star_level_item" v-model="value" disabled show-score text-color="#ff9900" score-template="{value}"></el-rate>
          <div class="grade_item">
          <div class="grade_item_Tab">
            <el-progress  type="circle" :percentage="0" :width='70' :show-text='false' :stroke-width='3'>
          </el-progress>
         <div class="grade_item_text">
            <span>环境</span>
            <span>7.3</span>
         </div>
          </div>
          <div class="grade_item_Tab">
            <el-progress  type="circle" :percentage="0" :width='70' :show-text='false' :stroke-width='3'>
          </el-progress>
           <div class="grade_item_text">
            <span>环境</span>
            <span>7.3</span>
         </div>
          </div>
            <div class="grade_item_Tab">
            <el-progress  type="circle" :percentage="0" :width='70' :show-text='false' :stroke-width='3'>
          </el-progress>
          <div class="grade_item_text">
            <span>环境</span>
            <span>7.3</span>
         </div>
          </div>
        </div>
      </el-col>
    </el-row>
      <!-- 评论模块 -->
      
  </div>

  
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      value: 3,
      commonInfo: {
        hotel: 1,
        _sort: "",
        _limt: 10,
        _start: 0
      }
    };
  },
  mounted() {
    this.$axios({
      url: "/hotels/comments",
      method: "get"
    }).then(res => {
      console.log(res);
    });
  }
};
</script>

<style lang='less' scoped>
.hotel_Comment {
  margin: 20px 0;
  .hotel_Comment_info {
      .hotel_grate{
          position: relative;
          >div{
              padding: 0 20px;
              
          }
          .star_level{
            display: inline-block;
              height: 60px;
              width: 60px;
              border-radius: 50%;
              text-align: center;
              line-height: 60px;
              border: 1px solid orange;
              opacity: 0.5;
              color: orange;
              font-size: 18px;
              transform:rotate(-30deg);
              position: absolute;
              left: 40px;
              top: -20px;
              .star_level_item{
              }
          }
          .grade_item{
            position:absolute;
            top: -21px;
            left: 200px;
            >div{
              padding: 0 20px;
              color: orange;
            }
            .grade_item_Tab{
              display: inline-block;
              position: relative;
              .grade_item_text{
                position: absolute;
                left: 40px;
                top: 18px;
                display: flex;
                // justify-content: center;
                flex-direction: column;
                align-items: center;
                span{
                  font-size: 16px;
                }
              }
            }
          }
      }
  }
}
</style>