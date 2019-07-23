<template>
    <div>
      <div class="postLeft">
        <div class="left_top">
          <ul class="leftTab">
            <li
              v-for="(item,index) in cityList"
              :key="index"
              class="tabList"
              ref="lis"
              @mouseover="mouseenter(index)"
              @mouseleave="mouseout(index)"
            >
            
              <i>{{item.type}}</i>
              <span>></span>
              <ul v-if="current===index" class="show_box">
                <li v-for="(v,i) in item.children" :key="i">
                  <nuxt-link :to="`/post?city=${v.city}`">
                  <i>{{i+1}}</i>&nbsp;&nbsp;
                  <strong>{{v.city}}</strong>&nbsp;&nbsp;
                  <span>{{v.desc}}</span>
                  </nuxt-link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div class="postbottom">
            <p>推荐城市</p>
            <div class="img">
                <a href="/post">
                <img src="http://157.122.54.189:9093/images/pic_sea.jpeg" alt="">
                </a>
            </div>
        </div>
      </div>
      <div class="postRight">
        <div class="right_content"></div>
      </div>
  </div>
</template>
<script>
export default {
     mounted() {
    this.$axios({
      url: "/posts/cities"
    }).then(res => {
      console.log(res);
      this.cityList = res.data.data;
      console.log(this.cityList);
      const others = this.cityList.map(v => {
        return v.children;
      });
    });
  },
  methods: {
    mouseenter(index) {
      console.log(index);
      this.current = index;
    },
    mouseout(index) {
      this.current = null;
    }
  },
  data() {
    return {
      cityList: [],
      current: null
    };
  }
}
</script>

<style lang="less" scoped>

  // 左边大盒子
  .postLeft {
    // tab栏等内容区域
    .left_top {
      position: relative;
      width: 260px;
      height: 160px;
      // 左边rab盒子
      .leftTab {
        .tabList {
          width: 260px;
          height: 39px;

          border: 1px solid #ddd;
          >i {
            display: inline-block;
            line-height: 39px;
            text-indent: 30px;
          }
          &:nth-child(-n+3){
              border-bottom:none;
          }
          > span {
            font-size: 18px;
            font-weight: 600;
            color: red;
            margin-left: 130px;
            color: #ddd;
          }
          &:hover {
              border-right: #fff;
            i {
              color: orange;
            }

            // border-right: 1px solid transparent;
            > span {
              color: orange;
            }
          }
          // 显示隐藏的盒子
          .show_box {
            z-index: 3;
            position: absolute;
            display: block;
            padding: 5px 20px;
            top: 0;
            left: 260px;
            width: 340px;
            height: 200px;
            background: #fff;
            border: 1px solid #ddd;
            li{
                cursor: pointer;
                height: 40px;
                line-height: 40px;
                padding-left: 10px;
                color: orange;
                a{
                  display: block;
                  width: 100%;
                  height: 100%;
                }
                i{
                    font-style: italic;
                    font-size: 24px;
                };
                strong{
                    font-weight: normal;
                };
                span{   
                    color: #999;
                    font-size: 14px;
                    line-height: 10px;
                }
            }
          }
        }
      }
    }
    .postbottom{
        margin-top: 30px;
       p{
            width: 260px;
            height: 30px;
            font-size: 18px;
            font-weight: 300;
            border-bottom: 1px solid #ddd;
            margin-bottom: 8px;
        }
        img{
            width: 260px;
            height: 174px;
        }
    }
  }
  
</style>
