<template>
  <div class="container">
    <div class="commnt-List">
      <div class="comment-userInfo">
        <!-- {{data.account.defaultAvatar}} -->
        <img :src="$axios.defaults.baseURL+data.account.defaultAvatar" alt />
        <span>{{data.account.nickname}}</span>
        {{data.created_at | formatDate}}
      </div>
      <div class="comment-content">{{data.content}}</div>
      <div class="pic" v-for="(item2,index) in data.pics" :key="index">
        <img :src="`${$axios.defaults.baseURL}`+item2.url"  />
      </div>
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
  props: {
    data: {
      type: Object,
      default: {
        account: {}
      }
    }
  },
  data() {
    return {
      // commentList: {}
    };
  },
  computed: {
    ranktime() {
      var time = new Date(this.commentList.account.created_at);
      return time;
      console.log(time);
    }
  },
  mounted() {}
};
</script>
 
<style lang="less" scoped>
.container {
  width: 706px !important;
  &:last-child {
    border-bottom: none;
  }
  .commnt-List {
    padding: 20px;
    border-bottom: 1px dashed #ccc;

    .comment-userInfo {
      font-size: 12px;
      color: #999999;
      img {
        width: 16px;
        height: 16px;
        vertical-align: middle;
        margin-right: 3px;
      }
      span {
        color: #000;
        margin-right: 6px;
      }
    }
    .comment-content {
      margin: 10px 0px;
      text-indent: 1em;
    }
    .pic {
      width: 93px;
      height: 93px;
      border: 1px dashed #cccccc;
      img {
        width: 90px;
        height: 90px;
      }
    }
  }
}
</style>