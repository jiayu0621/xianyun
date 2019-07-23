<template>
  <div class="container">
    <el-row type="flex" justify="space-between">
      <div class="main">
        <h5>
          <nuxt-link to="/post">旅游攻略</nuxt-link>
          <span>/ 攻略详情</span>
        </h5>
        <h1>{{artical.title}}</h1>
        <hr />
        <div class="gongl">
          攻略：
          <span>{{artical.created_at | formatDate}}</span>
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
          <el-input type="textarea" :rows="2" placeholder="说点什么吧..." v-model="input"></el-input>
          <div class="button"></div>
          <div class="upload">
            <el-row type="flex" justify="space-between">
              <div class="upload-box">
                <el-upload
                  action="http://127.0.0.1:1337/upload"
                  list-type="picture-card"
                  :on-success="handlePictureCardPreview"
                  :on-remove="handleRemove"
                  name="files"
                >
                  <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                  <img width="100%" :src="dialogImageUrl" alt />
                </el-dialog>
              </div>

              <el-button type="success" size="mini" plain @click="handleAddcomment">提交</el-button>
            </el-row>
          </div>

          <div class="comment-show">
            <Comment v-for="(item,index) in dataList" :key="index" :data="item" />
          </div>

          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageIndex"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </div>

      <div class="aside">
        <PostAside />
      </div>
    </el-row>
  </div>
</template>
 
<script>
import Comment from "@/components/post/comment";
import PostAside from "@/components/post/postAside";
import { formatDate } from "@/components/commonUtil.js";

export default {
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, "yyyy-MM-dd h:m:s");
    }
  },
  components: {
    Comment,
    PostAside
  },
  data() {
    return {
      files: [],
      artical: {},
      num: 20,
      input: "",
      dialogImageUrl: "",
      dialogVisible: false,
      pageIndex: 1,
      pageSize: 5,
      total: 0,
      commentsList: []
    };
  },
  computed: {
    // 当前页面渲染的列表数据
    dataList() {
      return this.commentsList.slice(
        (this.pageIndex - 1) * this.pageSize,
        this.pageSize * this.pageIndex
      );
    }
  },
  methods: {
    // 获取所有评论数据
    getData() {
      this.$axios({
        url: "/posts/comments",
        params: { post: 4, _start: 0 }
      }).then(res => {
        console.log(res);
        this.commentsList = res.data.data;
        // console.log(this.commentsList);
        this.total = res.data.data.length;
      });
    },
    // 点击提交按钮添加评论
    handleAddcomment() {
      this.$axios({
        url: "/comments",
        method: "POST",
        data: { content: this.input, pics: this.files, post: 4 },
        headers: {
          Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
        }
      }).then(res => {
        console.log(res);
        this.getData();
        this.input = "";
        // this.dialogVisible = false;
      });
    },
    //   点击收藏
    handleshoucang() {
      this.$message.warning("用户已经收藏");
    },
    // 点击点赞
    handledianzan() {
      this.num++;
      this.$message.success("用户已经点赞");
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    // 点击已上传的文件链接时的钩子, 可以通过 file.response 拿到服务端返回数据
    handlePictureCardPreview(res, file) {
      this.files = res;
      console.log(res);
      console.log(file);
    },

    // 切换条数时触发
    handleSizeChange(value) {
      this.pageSize = value;
    },
    // 切换页数时触发
    handleCurrentChange(value) {
      this.pageIndex = value;
    }
  },
  mounted() {
    this.getData();
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
      /deep/ img {
        max-width: 706px;
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
    .comment {
      margin: 80px 0px;

      /deep/ .el-textarea__inner {
        resize: none;
        margin: 16px 0px;
      }
    }
    .upload {
      .el-button {
        height: 30px;
      }
    }
    .comment-show {
      border: 1px solid #ccc;
      margin: 30px 0px;
    }
  }

  .aside {
    width: 280px;
    margin: 20px;
  }
}
</style>