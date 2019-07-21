<template>
  <div class="hotel_map">
      
    <el-row class="hotel_map_content">
      <el-col :span="15" id="container" ></el-col>
      <el-col :span="9" class="container_item"></el-col>
    </el-row>
  
  </div>
</template>

<script>
export default {
  props: {
    data:{
      type:Object,
      default:{},
    }
  },
  mounted() {
    
    //   页面加载之后执行
    window.onLoad = function() {
      var map = new AMap.Map("container", {
        zoom: 19, //级别
        center: [data.location.longitude, data.location.latitude], //中心点坐标
        viewMode: "3D" //使用3D视图
      });

      var marker = new AMap.Marker({
    position: new AMap.LngLat(data.location.longitude,data.location.latitude),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
    title: '北京'
});
map.add(marker);
    }
    var key = "7325822086d3558de6783270b2f52caa";
    // 为什么不能加双引号
    var url = `https://webapi.amap.com/maps?v=1.4.15&key=${ key}&callback=onLoad`;
    var jsapi = document.createElement("script");
    jsapi.charset = "utf-8";
    jsapi.src = url;
    document.head.appendChild(jsapi);
  }
};
</script>

<style lang='less' scoped>
.hotel_map{
  margin: 30px 0;
#container {
  height: 400px;
}
}
</style>