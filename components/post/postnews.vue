<template>
  <div class="container">
    <div v-for="(item,index) in postList" :key="index"  @click="goDetails(item.id)">
      <el-row class="news_content border_bottom" v-if="item.images.length>1">
        <h4 class="h4">
          {{item.title}}
        </h4>
        <p>
          {{item.summary}}
        </p>
        <el-row type="flex" class="news_three_imgs" justify="space-between">
          <div v-for="(v,i) in item.images" :key="i">
            <nuxt-link to>
              <img :src="v" alt />
            </nuxt-link>
          </div>
        </el-row>
        <el-row type="flex" class="news_bottom" justify="space-between">
          <el-col class="bottom_left">
            <i class="el-icon-location-outline">{{item.cityName}}</i>
            <div>
              by
              <img :src="`${$axios.defaults.baseURL+item.account.defaultAvatar}`" alt />
              <span style="color:orange">{{item.account.nickname}}</span>
            </div>
            <i class="el-icon-view"></i>
            {{item.watch}}
          </el-col>
          <el-col class="bottom_right">{{item.like}}赞</el-col>
        </el-row>
      </el-row>

      <!-- //一张图片的 -->
      <el-row type="flex" class="news_one_img border_bottom" v-if="item.images.length<3">
        <el-col class="left" :span="8">
          <img :src="item.images[0]" alt />
        </el-col>
        <el-col class="right" :span="16">
          <h4>{{item.title}}</h4>
          <p>
            <a href>{{item.summary}}</a>
          </p>
          <el-row type="flex" justify="space-between" class="post_right_bottom">
            <div class="post_right_bottom_left">
              <i class="el-icon-location-outline">{{item.cityName}}</i>
              <div style="margin:0 8px">
                by
                <img :src="`${$axios.defaults.baseURL+item.account.defaultAvatar}`" alt />
                <span style="color:orange">{{item.account.nickname}}</span>
              </div>
              <i class="el-icon-view"></i>
              {{item.watch}}
            </div>
            <div class="post_right_bottom_right">{{item.like}}赞</div>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageIndex"
      :page-sizes="[3, 6, 9]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>
<script>
import { setTimeout } from "timers";
// import { setTimeout } from 'timers';
export default {
  
    props: ['userKey'],
  data() {
      
    return {
      postList1: [],
      total: 10,
      pageSize: 3,
      pageIndex: 1
    };
  },
  methods: {
    //改变页面大小
    handleSizeChange(value) {
      this.pageSize = value;
    },
    // 改变当前页
    handleCurrentChange(value) {
      this.pageIndex = value;
    }
    ,
    goDetails(id){
      this.$router.push('/post/detail?id='+id)
    }
  },
  watch:{
      userKey(){
        
          this.$axios({
            url:'/posts',
            params:{
              city:this.userKey
            }
        }).then(res=>{
            console.log(res);
            if(res.data.total===0){
              return
            }else{
            this.postList1 = res.data.data
            this.total = res.data.total;
            }
            
        })
        
      },
      '$route'(newvalue,oldvalue){
        // console.log(newvalue);
        // this.postList1
         this.$axios({
            url:'/posts',
            params:this.$route.query
        }).then(res=>{
            console.log(res);
            this.total = res.data.total;
            this.postList1 = res.data.data
            
        })
        
      }
  },
  computed: {
    postList() {
          return this.postList1.slice(
            (this.pageIndex-1)*this.pageSize,
            this.pageSize*this.pageIndex
        )
         
    }

  },
 
  mounted() {
    setTimeout(() => {
      this.$axios({
        url: "/posts"
      }).then(res => {
        console.log(res, "sdsfasf");
        const { data } = res.data;
        const  total  = res.data.total;
        this.postList1 = data;
      });
    }, 30);
  }
};
</script>
<style lang="less" scoped>
.container {
  h4 {
    &:hover {
      color: orange;
    }
  }

  margin-top: 20px;
  .border_bottom {
    border-bottom: 1px solid #999;
    padding-bottom: 12px;
  }
  .news_content {
    .h4 {
      height: 50px;
      line-height: 40px;
      font-size: 20px;
      font-weight: 500;
    }
    p {
      width: 100%;
      height: 65px;
      line-height: 1.5;
      font-size: 14px;
      color: #666;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .news_three_imgs {
      width: 700px;
      //   height: 70px;
      margin: 40px 0;
          overflow: hidden;
      img {
        width: 220px;
        height: 150px;
        display: block;
      }
    }
  }
  .news_one_img {
    padding: 26px 0;
    .left {
      img {
        width: 220px;
        height: 150px;
      }
    }
    .right {
      h4 {
        width: 100%;
        height: 40px;

        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        font-size: 20px;
        font-weight: 500;
      }
      p {
        height: 70px;
        overflow: hidden;
        line-height: 1.5;
        margin-bottom: 10px;
        a {
          color: #666;
          font-size: 14px;
        }
      }
      .post_right_bottom {
        height: 30px;
        line-height: 30px;
        .post_right_bottom_left {
          display: flex;
          flex: 1;
          align-items: center;
          height: 30px;
          line-height: 30px;
          font-size: 12px;
          color: #777;
          // background-color: red;
          img {
            width: 16px;
            height: 16px;
            vertical-align: sub;
          }
        }
        .post_right_bottom_right {
          width: 50px;
          height: 30px;
          color: orange;
          // background-color: blue;
        }
      }
    }
  }
}
.news_bottom {
  color: #777;
  line-height: 16px;
  .bottom_left {
    display: flex;
    flex: 1;
    align-items: center;
    // width: 170px;
    // justify-content: space-between;
    font-size: 12px;
    div {
      margin: 0 8px;
    }

    img {
      // justify-content: space-between;
      width: 16px;
      height: 16px;
      vertical-align: middle;
    }
  }
  .bottom_right {
    width: 100px;
    text-align: right;
    font-size: 18px;
    color: orange;
  }
}
</style>
