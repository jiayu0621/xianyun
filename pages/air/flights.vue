<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <FlightsFilters :data="cacheFlightsData"  @changeDataList="changeDataList"/>

        <!-- 航班头部布局 -->
        <div>
          <FlightsListHead />
        </div>

        <!-- 航班信息 -->
        <div>
          <FlightsItem v-for="(item,index) in dataList " :key="index" :data="item" />
          <div class="block">
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
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
        <FlightsAside/>
      </div>
    </el-row>
  </section>
</template>

<script>
import FlightsListHead from "@/components/air/flightsListHead.vue";
import FlightsItem from "@/components/air/flightsItem";
import FlightsFilters from "@/components/air/flightsFilters";
import FlightsAside from "@/components/air/flightsAside";
export default {
  data() {
    return {
      flightsData: {
        flights: [],
        info: {},
        options: {}
      }, // 后台返回的所有数据
      cacheFlightsData:{
        flights: [],
        info: {},
        options: {}
      },
      // dataList: [],
      pageIndex: 1,
      pageSize: 5,
      total: 0
    };
  },
  computed: {
    // 当前页面渲染的列表数据
    dataList() {
      return this.flightsData.flights.slice(
        (this.pageIndex - 1) * this.pageSize,
        this.pageSize * this.pageIndex
      );
    }
  },
  
  methods: {
    getData() {
      this.$axios({
        url: "airs",
        params: this.$route.query
      }).then(res => {
        console.log(res);
        this.flightsData = res.data;
        this.total = res.data.total;
        this.cacheFlightsData={...res.data}
        // this.setDataList()
        // console.log(this.flightsData);

        // this.setDataList();
      });
    },
  setDataList(){},
    // setDataList() {
    //   const satrt = (this.pageIndex - 1) * this.pageSize;
    //   const end = satrt + this.pageSize;
    //   this.dataList = this.flightsData.flights.slice(satrt, end);
    //   console.log(this.dataList);
    // },
    handleSizeChange(value) {
      console.log(value);
      this.pageSize = value;
      // this.setDataList()
    },
    handleCurrentChange(value) {
      this.pageIndex = value;
      // this.setDataList()
    },
     changeDataList(arr){
      //  console.log(123);
      this.flightsData.flights=arr
      this.total=this.flightsData.flights.length;
      this.pageIndex = 1
     },
  },
  // watch:{
  //   $route(){
  //     this.getData()
  //   }
  // },
  beforeRouteUpdate(to,from,next){
    next()
    this.getData()
  },
  mounted() {
    this.getData();
  },
  components: {
    FlightsListHead,
    FlightsItem,
    FlightsFilters,
    FlightsAside
  }
};
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>