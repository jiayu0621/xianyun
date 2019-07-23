<template>
  <div class="hotel">
    <el-row>
      <p class="hotel-header">
        酒店 >
        <span>{{form.name}}</span>酒店预订
      </p>
    </el-row>
    <el-row>
      <el-form>
        <el-autocomplete
          :fetch-suggestions="queryDepartSearch"
          v-model="form.cityname"
          placeholder="目的地"
          @select="handleDepartSelect"
          style="margin-right:15px"
        ></el-autocomplete>

        <el-date-picker
          v-model="value1"
          @change="shijiancufa"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>

        <el-select v-model="form.region" placeholder="人数未定">
          <el-option value>
            <span>每间</span>
            <span>
              <el-dropdown :hide-on-click="false">
                <span class="el-dropdown-link" style="display:inlin-block;">
                  下拉菜单
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown" style="  float: right;">
                  <el-dropdown-item>黄金糕</el-dropdown-item>
                  <el-dropdown-item>狮子头</el-dropdown-item>
                  <el-dropdown-item>螺蛳粉</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <el-dropdown :hide-on-click="false">
                <span class="el-dropdown-link" style="display:inlin-block;">
                  下拉菜单
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown" style="  float: right;">
                  <el-dropdown-item>黄金糕</el-dropdown-item>
                  <el-dropdown-item>狮子头</el-dropdown-item>
                  <el-dropdown-item>螺蛳粉</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </span>
            <hr />
          </el-option>
        </el-select>
        <el-button type="primary" style="margin-left:30px" @click="chakanjiage">查看价格</el-button>
      </el-form>
    </el-row>
    <el-row>
      <el-row class="chengshixiangqing">
        <el-row style="width:600px; float: left;" class="mianshu">
          <el-col class="quyu">
            区域:
            <el-col class="quyu-neirong">
              <span v-for="(item,index) in jingqu" :key="index">{{item.name}}</span>
            </el-col>
          </el-col>
          <el-col class="gonglue">
            攻略:
            <el-col
              class="gonglue-neirong"
            >北京，你想要的都能在这找到。博古通今，兼容并蓄，天下一城，如是帝都。 景点以故宫为中心向四处辐射；地铁便宜通畅，而且覆盖绝大多数景点。 由于早上有天安门升旗仪式，所以大多数人选择在天安门附近住宿。</el-col>
          </el-col>
          <el-col class="junjia">
            <span>均价:</span>
            <el-col class="junjia-neirong">
              <el-tooltip class="tishi" content="等级评定是针对房价，设施和服务等各方面水平的综合评估" placement="top-start">
                <el-button>
                  <span>💗💗💗￥332</span>
                </el-button>
              </el-tooltip>
              <el-tooltip class="tishi" content="等级评定是针对房价，设施和服务等各方面水平的综合评估" placement="top-start">
                <el-button>
                  <span>💗💗💗💗￥521</span>
                </el-button>
              </el-tooltip>
              <el-tooltip class="tishi" content="等级评定是针对房价，设施和服务等各方面水平的综合评估" placement="top-start">
                <el-button>
                  <span>💗💗💗💗💗￥768</span>
                </el-button>
              </el-tooltip>
            </el-col>
            <el-tooltip class="tishi" content="等级评价由平日价格计算得出，节假日价格会有上浮" placement="top-start">
              <el-button>?</el-button>
            </el-tooltip>
          </el-col>
        </el-row>
        <el-row class="hotelditu"></el-row>
      </el-row>
      <el-row type="flex" class="guolv">
        <el-col :span="6">
          <div class="block">
            <span>价格</span>
            <i>0-{{value}}</i>
            <el-slider v-model="value" :max="zuidazhi" style="margin:0 20px"></el-slider>
          </div>
        </el-col>
        <el-col :span="5" class="dengji" >
          <p>住宿等级</p>
          <el-dropdown class="dengji-xiala" >
            <span class="el-dropdown-link"  >
              {{radio}}
              <i class="el-icon-arrow-down el-icon--right" style="margin-left:120px"></i>
            </span>
            <el-dropdown-menu slot="dropdown" >
              <el-dropdown-item style="width:130px">
                <el-radio v-model="radio" label="1星">1星</el-radio>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-radio v-model="radio" label="2星">2星</el-radio>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-radio v-model="radio" label="3星">3星</el-radio>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-radio v-model="radio" label="4星">4星</el-radio>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-radio v-model="radio" label="5星">5星</el-radio>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
        <el-col :span="5" class="leixing">
          <p>住宿类型</p>
          <el-dropdown class="leixing-xiala">
            <span class="el-dropdown-link">
              {{radio2}}
              <i class="el-icon-arrow-down el-icon--right" style="margin-left:120px"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item style="width:130px">
                <el-radio v-model="radio2" label="经济型">经济型</el-radio>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-radio v-model="radio2" label="舒适型">舒适型</el-radio>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-radio v-model="radio2" label="高档型">高档型</el-radio>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-radio v-model="radio2" label="豪华型">豪华型</el-radio>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-radio v-model="radio2" label="度假村">度假村</el-radio>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-radio v-model="radio2" label="公寓式酒店">公寓式酒店</el-radio>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
        <el-col :span="4" class="sheshi">
          <p>酒店设施</p>
          <el-dropdown class="sheshi-xiala">
            <span class="el-dropdown-link">
              {{radio3}}
              <i class="el-icon-arrow-down el-icon--right" style="margin-left:90px"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item style="width:130px">
                <el-radio v-model="radio3" label="wifi">wifi</el-radio>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-radio v-model="radio3" label="热水壶">热水壶</el-radio>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-radio v-model="radio3" label="吹风机">吹风机</el-radio>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-radio v-model="radio3" label="外币兑换服务">外币兑换服务</el-radio>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-radio v-model="radio3" label="洗衣服务">洗衣服务</el-radio>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-radio v-model="radio3" label="电梯">电梯</el-radio>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
        <el-col :span="4" class="pinpai">
          <p>酒店品牌</p>
          <el-dropdown class="pinpai-xiala">
            <span class="el-dropdown-link">
              {{radio4}}
              <i class="el-icon-arrow-down el-icon--right" style="margin-left:90px"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item style="width:130px">
                <el-radio v-model="radio4" label="1星">1星</el-radio>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-radio v-model="radio4" label="2星">2星</el-radio>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-radio v-model="radio4" label="3星">3星</el-radio>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-radio v-model="radio4" label="4星">4星</el-radio>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-radio v-model="radio4" label="5星">5星</el-radio>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-row>
    <Jiudian :data='this.jiudian'/>
  </div>
</template>

<script>
import moment from "moment";
import Jiudian from "@/components/hotel/jiudian";
export default {
  data() {
    return {
      value: 4000,
      value1: "",
      // max:4000,
      radio: "不限",
      radio2: "不限",
      radio3: "不限",
      radio4: "不限",
      zuidazhi: 4000,
      jiudianmingzi:'',
      form: {
        name: "南京市",
        cityname: "",
        date1: "",
        region: "",
        id: "",
        enterTime: "",
        leftTime: ""
      },
      jingqu: [],
      jiudian:{
        jiudianxinxi:[],
        total:""
      }
    };
  },
  components: {
    Jiudian
  },
  mounted() {
    this.$axios({
        url: "/hotels",
        // params: { city: this.form.id }
      }).then(res=>{
        console.log(res);
        const {data} = res
        this.jiudian=data
      })
    this.jingquxuanran();
  },
  methods: {
    // 点击目的地时触发
    queryDepartSearch(value, cb) {
      //   console.log(value);
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
        this.jingqu = data[0].scenics;
        const newData = data.map(v => {
          return {
            ...v,
            value: v.name
          };
        });
        cb(newData);
      });
    },
    // 景区渲染
    jingquxuanran() {
      this.$axios({
        url: "/cities",
        params: { name: this.form.name }
      }).then(res => {
        // console.log(res);
        const { data } = res.data;
        this.jingqu = data[0].scenics;
      });
    },
    // 选择目的地时触发
    handleDepartSelect(value, cb) {
      console.log(value);
      this.form.name = value.value;
      this.form.id = value.id;
      this.$axios({
        url: "/hotels",
        params: { city: this.form.id }
      }).then(res => {
        console.log(res);
        const {data} = res.data
        this.$router.push(`?city=${this.form.id}`);
       
      });
    },
    // 查看价格
    chakanjiage() {
      // this.$router.push(
      //   `?city=${this.form.id}&enterTime=${this.form.enterTime}&leftTime=${this.form.leftTime}`
      // );
      let paramsArr = [
        ["city", this.form.id],
        ["enterTime", this.form.enterTime],
        ["startTime", this.form.startTime]
      ];
      paramsArr = paramsArr.reduce((res, o) => {
        if (o[1]) {
          res.push(o[0] + "=" + o[1]);
        }
        return res;
      }, []);

      const paramsStr = paramsArr.join("&");
      this.$router.push(paramsStr ? ('?' + paramsStr) : '');
    },
    // 选择时间时触发
    shijiancufa(value) {
      console.log(value[0]);
      this.form.enterTime = moment(value[0]).format("YYYY-MM-DD");
      this.form.leftTime = moment(value[1]).format("YYYY-MM-DD");
      // console.log( this.form.enterTime ,this.form.enterTime2 );
    }
  }
};
</script>

<style lang="less" scoped>
.hotel {
  font-size: 14px;
  font-weight: 400;
  color: #606266;
  width: 1000px;
  margin: 0 auto;
}

.hotel-header {
  height: 60px;
  line-height: 60px;
}
.hotelditu {
  height: 260px;
  background-color: red;
  width: 400px;
  float: right;
}
.chengshixiangqing {
  margin-bottom: 20px;
  margin-top: 20px;
}
.quyu,
.gonglue,
.junjia {
  margin-bottom: 30px;
}
.junjia {
  position: relative;
}
.junjia > .tishi {
  width: 15px;
  padding: 0;
  height: 15px;
  text-align: center;
  line-height: 15px;
  background-color: #999;
  border-radius: 50%;
  position: absolute;
  left: 30px;
  top: -10px;
  color: #eee;
}
.quyu-neirong,
.gonglue-neirong {
  width: 500px;
  float: right;
  margin-right: 50px;
}
.quyu-neirong span {
  margin-right: 15px;
}
.junjia-neirong {
  width: 500px;
  float: right;
  margin-right: 60px;
}
.junjia-neirong .tishi {
  padding: 0;
  border: none;
  padding: 0px 10px;
}
.block,
.dengji,
.leixing,
.sheshi {
  height: 70px;
  margin: 5px 0;
  border-right: 1px solid #ccc;
}
.pinpai {
  height: 70px;
  margin: 5px 0;
}
.block span {
  display: inline-block;
  padding: 10px 0 0 20px;
}
.block i {
  margin-left: 120px;
}
.guolv {
  border: 1px solid #ccc;
  margin-bottom: 30px;
}
.dengji p,
.dengji .el-dropdown-link,
.leixing p,
.leixing-xiala,
.sheshi p,
.sheshi-xiala,
.pinpai p,
.pinpai-xiala {
  margin: 10px 0 0 20px;
}
.dengji-xiala,
.leixing-xiala,
.sheshi-xiala,
.pinpai-xiala {
  margin-top: 18px;
}
</style>
  