<template>
  <div>
    <h3>相关攻略</h3>
    <div class="about-gl" v-for="(item,index) in recomment" :key="index">
      <nuxt-link :to="`/post/detail?id=${item.id}`">
        <el-row type="flex" justify="start"  class="aa">
          <div class="about-gl-img">
          <div class="tp">
            <img :src="item.images[0]" alt />
          </div>
        </div>
        <div class="about-glc">
          <p>{{item.title}}</p>
          <span>{{item.created_at | formatDate}}</span>
          <p>阅读：{{item.watch}}</p>
        </div>
      </el-row>
      </nuxt-link>
    </div>
  </div>
</template>
 
<script>
import { formatDate } from "@/components/commonUtil.js";
export default {
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, "yyyy-MM-dd h:m:s");
    }
  },
  data() {
    return {
      recomment: {},
      id: "",
      dataList: []
    };
  },
  mounted() {
    this.$axios({
      url: "/posts/recommend",
      method: "GET",
      params: {
        id: 4
      }
    }).then(res => {
      console.log(res);
      this.recomment = res.data.data;
      this.dataList = this.recomment;
      
    });
  }
};
</script>
 
<style lang="less" scoped>
h3 {
  font-size: 20px;
  font-weight: normal;
  border-bottom: 1px solid #dddddd;
  padding: 13px 0px;
}
.about-gl {
  // margin: 20px 0px;
  cursor: pointer;
  .aa {
    border-bottom: 1px solid #dddddd;
    padding: 20px 0px;
  }
  .about-gl-img {
    margin-right: 8px;
    .tp {
      width: 100px;
      height: 80px;
      border: 1px solid #c0c0c0;
      background-color: #dddddd;
      img {
        width: 100px;
        height: 80px;
      }
    }
  }
  .about-glc {
    font-size: 13px;
    color: #999999;
    p {
      color: #000;
      // margin-bottom: 20px;
    }
  }
}
</style>