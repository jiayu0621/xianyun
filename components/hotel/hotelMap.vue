<template>
  <div class="hotel_map">
    <el-row class="hotel_map_content default_color">
      <el-col :span="15" id="container"></el-col>
      <el-col :span="9" class="container_item">
        <el-tabs :tab-position="tabPosition" class="container_tab">
          <el-tab-pane label="风景" >
            <ul  class="container_ul">
              <li v-for="(item,index) in data.scenic" :key="index">{{item.name}}</li>
            </ul>
          </el-tab-pane>
          <el-tab-pane label="交通">配置管理</el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mapUrl:
        "https://webapi.amap.com/maps?v=1.4.15&key=7325822086d3558de6783270b2f52caa&callback=onLoad",
      tabPosition: "top"
    };
  },
  props: {
    data: {
      type: Object,
      default: {}
    }
  },

  methods: {
    init() {
      var map = new AMap.Map("container", {
        zoom: 19, //级别
        center: [this.data.location.longitude, this.data.location.latitude], //中心点坐标
        // center: [118.8718107, 31.32846821], //中心点坐标
        viewMode: "3D" //使用3D视图
      });

      var marker = new AMap.Marker({
        position: new AMap.LngLat(
          this.data.location.longitude,
          this.data.location.latitude
          // 118.8718107, 31.32846821
        ), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        title: this.data.real_city
      });
      map.add(marker);
    }
  },
  mounted() {
    // 页面加加载之后执行
    window.onLoad = this.init;
    // 地图的链接
    var jsapi = document.createElement("script");
    jsapi.charset = "utf-8";
    jsapi.src = this.mapUrl;
    document.head.appendChild(jsapi);
  }
};
</script>

<style lang='less' scoped>
.default_color {
  color: #666666;
}
.hotel_map {
  margin: 30px 0;
  #container {
    height: 300px;
  }
  .container_item{
    padding-left: 20px;
    .container_tab{
      padding: 5px;
      .container_ul{
        height: 300px;
      overflow: scroll;
      overflow-x: hidden;
        li{
          padding: 5px 0;
        }
      }
    }
  }
}
</style>