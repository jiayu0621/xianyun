<template>
  <div class="post_right">
    <el-row class="searchBar" type="flex">
      <input type="text" class="input" placeholder="请输入想去的地方，比如：'广州'" v-model="userKey"/>
      <i class="el-icon-search"></i>
    </el-row>
    <div class="suggest">
      推荐：
      <span>广州</span> &nbsp;
      <span>上海</span> &nbsp;
      <span>北京</span>
    </div>
    <el-row type="flex" justify="space-between" align="center" class="write_post">
      <h4>推荐攻略</h4>
      <div>
        <el-button type="primary" round size="mini">
          <i class="el-icon-edit"></i>&nbsp;写游记
        </el-button>
      </div>
    </el-row>
    <Postnews :userKey="userKey"/>
    
  </div>
</template>
<script>
import Postnews from "@/components/post/postnews.vue";
export default {
  components: {
    Postnews
  },
  data() {
    return {
        userKey:''
    };
  },
  methods:{
      
  },
 

};
</script>
<style lang="less" scoped>
.post_right {
  width: 700px;
  .searchBar {
    align-items: center;
    //   box-sizing: border-box;
    width: 100%;
    height: 43px;
    border: 3px solid orange;
    .input {
      flex: 1;
      height: 36px;
      line-height: 36px;
      padding: 0 20px;
      outline: none;
      border: none;
    }
    > i {
      font-size: 20px;
      font-weight: 700;
      color: orange;
      padding-right: 10px;
    }
  }
  .suggest {
    margin: 8px 0;
    font-size: 12px;
    color: #666;
    span {
      cursor: pointer;
      &:hover {
        border-bottom: 1px solid #666;
      }
    }
  }
  .write_post {
    height: 50px;
    h4 {
      line-height: 50px;
      border-bottom: 2px solid orange;
      color: orange;
      font-size: 20px;
      font-weight: 500;
    }
    > div {
      flex: 1;
      text-align: right;
      line-height: 50px;
      border-bottom: 1px solid #999;
    }
  }
}
</style>
