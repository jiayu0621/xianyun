<template>
  <div id="container"></div>
</template>

<script>
export default {
    props: {
    data: {
      type: Object,
      default: {}
    }
  },
  mounted() {
    // 页面加加载之后执行
    window.onLoad = function() {
      // 生成地图.container是显示地图的div的id
      var map = new AMap.Map("container", {
        zoom: 11, //放大级别
        center: [118.78 , 32.07], //中心点坐标，经纬度
        viewMode: "3D" //使用3D视图
      });
      var marker = new AMap.Marker({
        //content: "<div style='width:20px; height:20px; background:red;'>1</div>",
        position: new AMap.LngLat(116.39, 39.9), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        title: "北京"
      });

      map.add(marker);
    };

    // 地图的链接
    var key = "	7fe71d541727acd188f49c00b63eaf3a";
    var url = `https://webapi.amap.com/maps?v=1.4.15&key=${key}&callback=onLoad`;
    var jsapi = document.createElement("script");
    jsapi.charset = "utf-8";
    jsapi.src = url;
    document.head.appendChild(jsapi);
  }
};
</script>
<style lang="less" scoped>
#container {
  width: 100%;
  height: 100%;
}
</style>
