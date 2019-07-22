<template>
  <div>
    <h3>相关攻略</h3>
    <div class="about-gl">
      <el-row type="flex" justify="start">
        <div class="about-gl-img">
          <div class="tp"></div>
        </div>
        <div class="about-glc">
          <p>111</p>
          <span>666</span>
        </div>
      </el-row>
    </div>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      recomment: {}
    };
  },
  mounted() {
    // this.$axios({
    //     url:'/posts/recommend',
    //     method:"GET",
    //     params:{
    //         id:4,
    //     },
    // }).then(res=>{
    //     console.log(res);
    //     this.recomment = res.data.data
    // })
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
  margin: 20px 0px;
  .about-gl-img {
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
}
</style>