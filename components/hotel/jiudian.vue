<template>
  <div class="jiudian">
    <el-row class="fenge" v-for="(item,index) in data.data" :key="index">
      <el-row type="flex" class="jiudianxinxi">
        <el-col class="jiudiantupian" :span="8">
          <img style="width:100%;height:100%" :src="data.data[index].photos" alt />
        </el-col>
        <el-col :span="9" class="bingguanxinxi">
          <a
            href="#"
            class="jiudianname"
            @click="jiudianxiangqing(index) "
          >{{data.data[index].name}}</a>
          <el-row class="jiudianleixing">
            <span>{{data.data[index].alias}}</span>
            <span>💗💗💗</span>
            <span>{{data.data[index].hoteltype.name}}</span>
          </el-row>
          <el-row class="pingfen">
            <el-rate
              v-model="data.data[index].stars"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}"
            ></el-rate>
          </el-row>
          <el-row>位置</el-row>
        </el-col>
        <el-col :span="7" class="goumai">
          <a href="javascript,;" v-for="(item,index) in data.data[index].products" :key="index">
            <span>{{item.name}}</span>
            <span>￥{{item.price}}</span> 起 >
          </a>
        </el-col>
      </el-row>
    </el-row>
    <el-pagination
    class="fenye"
  small
  layout="prev, pager, next"
  :total='this.data.total*1'>
</el-pagination>

  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      value: 3.7,
      
    };
  },
  methods: {
    jiudianxiangqing(index) {
      // console.log(12);
      this.$router.push("/hotel/" + (index + 1) + ".html");
    }
  }
};
</script>

<style lang="less" scoped>
a {
  display: block;
  width: 240px;
  height: 50px;
  line-height: 50px;
}

.fenge {
  margin: 30px 0px 0px 0;
  border-bottom: 1px solid #ccc;
}
.jiudiantupian {
  width: 320px;
  height: 210px;
  background-color: red;
}
.jiudianxinxi {
  margin-bottom: 30px;
}
.bingguanxinxi {
  margin-left: 30px;
}
.jiudianname {
  font-size: 20px;
  overflow: hidden;
  font-weight: 400px;
  color: #000;
}
.jiudianleixing {
  color: #777;
  font-size: 16px;
}
.pingfen {
  margin: 20px 0;
}
.goumai a {
  border-bottom: 1px solid #ccc;
  // width: 240px;
  :hover {
    background: rgba(100, 100, 100, 0.4);
  }
}
.goumai a span:nth-child(1) {
  display: inline-block;
  width: 100px;
}
.goumai a span:nth-child(2) {
  display: inline-block;
  color: orange;
  font-size: 18px;
  padding-left: 50px;
}
.fenye{

}
</style>
