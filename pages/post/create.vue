<template>
  <div id="app">
    <el-row type="flex" justify="space-between">
      <div class="main">
        <h2>发表新攻略</h2>
        <p>分享你的游记，让更多人看到哦！</p>
        <el-input v-model="input" placeholder="请输入标题" class="input"></el-input>
        <!-- 富文本组件 -->
        <div class="fuwenben">
          <VueEditor :config="config" />
        </div>
        <div class="city">
          <span>选择城市</span>
          <!-- 远程搜索 -->
          <!-- fetch-suggestions: 当输入框输入值时候触发搜索建议事件 -->
          <!-- select：选中下拉框时候触发，参数是选中的参数对象 -->
          <el-autocomplete
            v-model="city"
            :fetch-suggestions="querySearchAsync"
            placeholder="请搜索游玩城市"
            @select="handleSelect"
          ></el-autocomplete>
        </div>
        <div class="submit">
          <el-button type="primary" size="mini" class="submitBtn">发布</el-button>或者
          <span>保存到草稿</span>
        </div>
      </div>
      <div class="aside">
        <h2>草稿箱（<span>{{num}}</span>）</h2>
      </div>
    </el-row>
  </div>
</template>

<script>
// 需要单独引入样式
import "quill/dist/quill.snow.css";
let VueEditor;

if (process.browser) {
  VueEditor = require("vue-word-editor").default;
}
export default {
  name: "app",
  data() {
    return {
      num:1,
      city: "",
      input: "",
      config: {
        modules: {
          // 工具栏
          toolbar: [
            ["bold", "italic", "underline", "strike"], // toggled buttons
            ["blockquote", "code-block"],
            ["image", "video"],

            [{ header: 1 }, { header: 2 }], // custom button values
            [{ list: "ordered" }, { list: "bullet" }],
            [{ script: "sub" }, { script: "super" }], // superscript/subscript
            [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
            [{ direction: "rtl" }] // text direction
          ]
        },
        // 主题
        theme: "snow",
        uploadImage: {
          url: "http://localhost:1337/upload",
          name: "files",
          uploadBefore(file) {
            return true;
          },
          uploadProgress(res) {},
          uploadSuccess(res, insert) {
            insert("http://localhost:1337" + res.data[0].url);
          },
          uploadError() {},
          showProgress: false
        },

        uploadVideo: {
          //url: "http://157.122.54.189:9095/upload",
          url: "http://localhost:1337/upload",
          name: "files",
          uploadBefore(file) {
            return true;
          },
          uploadProgress(res) {},
          uploadSuccess(res, insert) {
            insert("http://localhost:1337" + res.data[0].url);
          },
          uploadError() {}
        }
      }
    };
  },

  components: {
    VueEditor
  },
  methods: {
    //  当输入框输入值时候触发搜索建议事件
    querySearchAsync(value, cb) {
      if (!value.trim()) {
        cb([]);
        return;
      }
      this.$axios({
        url: "/cities",
        params: { name: value }
      }).then(res => {
        console.log(res);
        const { data } = res.data;
        const newData = data.map(v => {
          return {
            ...v,
            value: v.name.replace("市", "市")
          };
        });
        this.city = newData[0].value;
        cb(newData);
      });
    },
    // 选中下拉框时候触发，参数是选中的参数对象
    handleSelect(item) {
      this.city = item.value;
    }
  }
};
</script>

<style lang="less" scoped>
// * {
//   margin: 0;
//   padding: 0;
//   box-sizing: border-box;
// }
#app {
  width: 1000px;
  margin: 20px auto;
  .main {
    width: 752px;
    margin-right: 50px;
    h2 {
      font-weight: normal;
    }
    p {
      font-size: 14px;
      color: #999999;
      margin: 10px 0px;
    }
    .input {
      margin-bottom: 20px;
    }
    #vue-editor-wrapper {
      height: 460px;
      /deep/.ql-container {
        height: 88%;
      }
    }
    .submit {
      margin: 20px 0px;
      font-size: 14px;
      .submitBtn {
        color: #fff;
        font-size: 12px;
        margin-right: 10px;
      }
      span{
        color: orange;
        cursor: pointer;
      }
    }
  }
  .aside {
    width: 200px;
    height: 100px;
    border: 1px solid #dddddd;
    padding: 10px;
    h2{
      color: #666666;
      font-size: 16px;
      font-weight: normal;
    }
  }
}
</style>