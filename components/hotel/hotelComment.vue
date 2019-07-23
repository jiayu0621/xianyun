<template>
  <div class="hotel_Comment">
    <!-- 评论模块 -->
    <el-row class="comment_floor default_color" v-for="(item,index) in data" :key="index">
      <el-col class="comment_let" :span="4">
        <div class="comment_person">
          <img
            src="https://n4-q.mafengwo.net/s11/M00/64/81/wKgBEFsmE0WAPbqnAAAOwSUlOKY63.jpeg?imageMogr2%2Fthumbnail%2F%2196x96r%2Fgravity%2FCenter%2Fcrop%2F%2196x96%2Fquality%2F90"
            alt
          />
          <span>LV.{{item.level}}</span>
          <p>时间</p>
        </div>
      </el-col>

      <el-col class="comment_right" :span="20">
        <p>{{item.content}}</p>
        <textarea
          class="text_content"
          placeholder="添加回复"
          @focus="handleTextArea(index)"
          :class="{active:currentIndex==index}"
          v-model="comment[item.id]"
          @blur="handleChangeHeigh(index)"
        ></textarea>
        <el-button v-if="currentIndex==index" type="success" size="mini" class="btn_add">添加</el-button>
        <next :data="item.followed" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "next",
  // props: {
  //   data: {
  //     type: Array,
  //     default: []
  //   }
  // },
  props: ["data"],
  data() {
    return {
      currentIndex: null,
      comment:{},
    };
  },
  methods: {
    handleTextArea(index) {
      this.currentIndex = index;
    },
    handleChangeHeigh(index){
      this.currentIndex = index;
    }
  },
  mounted() {}
};
</script>

<style lang='less' scoped>
.default_color {
  color: #666666;
}
.active {
  height: 50px;
}
.hotel_Comment {
  margin: 20px 0;

  .comment_floor {
    margin: 20px 0;
    .comment_let {
      .comment_person {
        img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          vertical-align: top;
          border: 1px solid orange;
        }
        span {
          color: red;
        }
      }
    }
    .comment_right {
      .text_content {
        width: 100%;
        // height: 20px;
        resize: none;
        padding: 5px 5px;
        margin-top: 10px;
      }
      .btn_add {
        float: right;
        // display: none;
      }
    }
  }
}
</style>