<template>
  <div class="container">
    <div class="main">
      <h5>
        <nuxt-link to="/post">旅游攻略</nuxt-link>
        <span>/ 攻略详情</span>
      </h5>
      <h1>{{artical.title}}</h1>
      <hr />
      <div class="gongl">
        攻略：
        <span>{{artical.updated_at}}</span>
        阅读：
        <span>{{artical.watch}}</span>
      </div>
      <div class="contenta" v-html="artical.content"></div>
      <!-- 用户操作，点赞，收藏等等 -->
      <div class="operation">
        <el-row type="flex" justify="center">
          <div class="icon-item">
            <i class="iconfont iconpinglun"></i>
            <p>评论（100）</p>
          </div>
          <div class="icon-item" @click="handleshoucang">
            <i class="iconfont iconstar1"></i>
            <p>收藏</p>
          </div>
          <div class="icon-item">
            <i class="iconfont iconfenxiang"></i>
            <p>分享</p>
          </div>
          <div class="icon-item" @click="handledianzan">
            <i class="iconfont iconding"></i>
            <p>点赞（{{num}}）</p>
          </div>
        </el-row>
      </div>

      <!-- 用户评论 -->
      <div class="comment">
          <p>评论</p>
      </div>
    </div>

    <div class="aside"></div>
  </div>
</template>
 
<script>
export default {
  filters: {},
  data() {
    return {
      artical: {},
      num: 20
    };
  },
  methods: {
    //   点击收藏
    handleshoucang() {
      this.$message.warning("用户已经收藏");
    },
    // 点击点赞
    handledianzan() {
      this.num++;
      this.$message.success("用户已经点赞");
    }
  },
  mounted() {
    const id = 4;
    this.$axios({
      url: `/posts?id=${id}`,
      method: "GET"
    }).then(res => {
      console.log(res);
      this.artical = res.data.data[0];
    });
  }
};
</script>
 
<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 0 auto;
  .main {
    width: 706px;
    h5 {
      margin: 20px 0;
      font-size: 14px;
      a {
        &:hover {
          color: skyblue;
        }
      }
      span {
        color: #606266;
      }
    }
    h1 {
      margin-bottom: 10px;
    }
    .gongl {
      margin: 20px 0px;
      color: #9999b3;
      text-align: right;
      :first-child {
        margin-right: 15px;
      }
    }
    .contenta {
      margin-bottom: 30px;
      /deep/ p:nth-child(2) img {
        width: 100%;
      }
      /deep/ p:nth-child(9) img {
        width: 100%;
      }
    }
    .operation {
        margin-bottom: 10px;
      .icon-item {
        margin-right: 30px;
        text-align: center;
        cursor: pointer;
        i {
          font-size: 38px;
          color: orange;
          vertical-align: middle;
          display: inline-block;
          margin-bottom: 8px;
        }
        p {
          font-size: 14px;
          color: #999999;
        }
      }
    }
    .comment{
        margin: 80px 0px;
    }
  }
  .aside {
  }
}
</style>